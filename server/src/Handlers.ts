/**
 * List of HTTP handlers which are responsible for handling HTTP
 * request at different endpoints.
 */
import { Database } from "./Database";

type Response = {
  send: (body: string) => Response;
  status: (code: number) => Response;
}

type Handler = {
  name: string;
  path: string;
  handle: (request: any, response: Response) => any;
}

const handler: Handler = {
  name: "main", 
  path: "/", 
  handle: (request, response) => { 
    const operation = Database.dbsize().then(size => {
      response.send("Database contains: " + size + " documents");
    });
    
    operation.catch(error => {
      console.error("Failed to handle HTTP request: ", error);
      response.status(500).send("Internal error ;C");
    });
  }
};

export default handler;