import handler from "./Handlers";
import { Configuration, config} from "./Configuration";
import * as functions from "@google-cloud/functions-framework";

if (Configuration.get(config.environment) === "standalone") {
  // When running as a serverless function we don't want to
  // load dependencies that we will not use. And because of that
  // "express" will be requested only if app has been started in standalone mode.

  // We can't do the same for the "functions-framework" dependency below, because
  // import("functions-framework") will return Promise which will be resolved
  // only after Google Cloud will try to find an entry point. Which means
  // that function will fail to launch.

  import("express").then(module => {
    const express = module.default;

    console.log("Starting app as a standalone server...");

    const expressApp = express();
    expressApp.get(handler.path, handler.handle);

    console.log("Startup completed");
    expressApp.listen(8080);
  });
}

if (Configuration.get(config.environment) === "cloud-function") {
  console.log("Initializing as Google Cloud Function...");

  functions.http(handler.name, handler.handle);

  console.log("Initialization completed");
}
