/**
 * This module contains the main HTTP request handler
 * for our server. It is used by different server frameworks
 * to be called.
 * 
 * We use different HTTP frameworks depending on the environment.
 * We want our server to be easily portable across cloud providers and 
 * even run independently as a standalone application.
 */
import { Database } from "../Database";

/**
 * General interface for request object.
 * Should be implemented by all request objects on top of
 * framework specific Request types.
 */
export abstract class Request {}

/**
 * General interface for response object
 * which contains all required data to construct a specific
 * Response object for a certain framework.
 */
export abstract class Response {
  abstract send(content: string): Response;
  abstract status(code: number): Response;
}

/**
 * All frameworks should call this handler whenever they have an incoming HTTP request.
 * 
 * @param request incoming request
 * @param response pre-constructed response object which will be filled with data
 * @returns provided and modified response object (as a Promise<>)
 */
export async function handler<T extends Response>(request: Request, response: T): Promise<T> {

  const operation = Database.dbsize().then(size => {
    response.send("Database contains: " + size + " documents");
  });
    
  operation.catch(error => {
    console.error("Failed to handle HTTP request: ", error);
    response.status(500).send("Internal error ;C");
  });

  return response;
}
