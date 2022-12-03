import handler from "./Handlers";
import { Configuration, config} from "./Configuration";
import * as functions from "@google-cloud/functions-framework";

if (Configuration.get(config.environment) === "standalone") {
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
