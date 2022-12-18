/**
 * Simple implementation of HTTP client.
 */
import https from "https";

export class HttpClient {

  static get(url: string, headers: Map<string, string>): Promise<any> {
    return new Promise((resolve, reject) =>
      https.get(url, response => {
        const data: Buffer[] = [];
        response.on("data", (chunk) => data.push(chunk));
        response.on("close", () => {
          try {
            if (response.complete) {
              const responseObject = JSON.parse(Buffer.concat(data).toString());
              resolve(responseObject);
              return;
            }
            reject();
          } catch (e) {
            console.error(
              "Failed to deserialize JSON on GET request to " + url,
              e
            );
            reject();
          }
        });
      })
    );
  }

}
