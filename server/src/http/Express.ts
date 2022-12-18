/**
 * Module implements standalone HTTP server using express framework.
 */
import { Response, handler } from "./Handler";
import createApplication from "express";
import { Response as ExpressResponse } from "express";

export class ExpressResponseData extends Response {

  private rawStatus?: number;
  private rawContent?: string;

  public send(content: string): ExpressResponseData {
    this.rawContent = content;
    return this;
  }

  public status(status: number): ExpressResponseData {
    this.rawStatus = status;
    return this;
  }

  public complete<T extends ExpressResponse>(response: T): T {
    if (this.rawStatus) { response.status(this.rawStatus); }
    return response.send(this.rawContent ?? "");
  }
}

export namespace Express {

  export function start() {
    console.log("Starting standalone server...");
    const app = createApplication();

    app.get("/", async (request, response) => {
      const responseData = await handler(request, new ExpressResponseData());
      responseData.complete(response);
    });

    console.log("Startup completed");
    console.log("Running on: http://localhost:8080");
    app.listen(8080);
  }

}
