import http from "https";

class HttpClient {

  static get(url: string, headers: Map<string, string>): Promise<any> {

    const promise = new Promise((resolve, reject) => http.get(url, response => {
      const data: Buffer[] = [];
      response.on('data', chunk => data.push(chunk));
      response.on('close', () => {
        try {
          if (response.complete) {
            const responseObject = JSON.parse(Buffer.concat(data).toString());
            resolve(responseObject);
            return;
          }
          reject();
        } catch (e) {
          console.error("Failed to deserialize JSON on GET request to " + url, e);
          reject();
        }
      })
    }));

    return promise;
  }

}

export default HttpClient;