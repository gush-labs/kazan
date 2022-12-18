import { HttpClient } from "./http/HttpClient";

export type WaniKaniUser = {
  key: string;
};

export namespace WaniKani {

  export function auth(key: string): Promise<WaniKaniUser> {
    return HttpClient.get("", new Map()).then((response) => {
      // TODO: Parse response from WaniKani
      return response;
    });
  }

}
