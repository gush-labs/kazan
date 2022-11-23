import HttpClient from "./HttpClient";

export type WaniKaniUser = { 

}

export class WaniKani {

  static auth(key: string): Promise<WaniKaniUser> {
    return HttpClient.get("", new Map())
      .then(response => {
        // Parse response from WaniKani
        return response;
      })
  }

}
