import { Configuration, config} from "./Configuration";
import { GoogleFunctions } from "./http/GoogleFunctions";

if (Configuration.get(config.environment) === "standalone") {
  // When running as a serverless function we don't want to
  // load dependencies that we will not use. And this is why
  // we use import("") function here.

  // We can't do the same for the serverless frameworks below. Because
  // import("") returns a Promise<> which gets resolved only at the end of execution.
  // And as a result, some serverless environments are unnable to detect
  // registered functions (in particular this is the case with Google Cloud Functions)
  import("./http/Express").then(module => {
    module.Express.start();
  });
}

if (Configuration.get(config.environment) === "cloud-function") {
  GoogleFunctions.start();
}
