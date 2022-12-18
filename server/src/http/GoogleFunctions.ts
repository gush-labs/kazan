/**
 * Implementation of HTTP handler as Google Cloud Function.
 * Their API is compatible with Express framework, so it's
 * very straightforward.
 */
import * as functions from "@google-cloud/functions-framework";
import { handler } from "./Handler";
import { ExpressResponseData } from "./Express";

export namespace GoogleFunctions {

  export function start() {
    console.log("Starting up as Google Cloud Function...");

    functions.http("main", async (request, response) => {
      const responseData = await handler(request, new ExpressResponseData());
      responseData.complete(response);
    });

    console.log("Startup completed!");
  }

}