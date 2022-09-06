/**
 * Handles all communication between our application
 * and WaniKani API.
 */
import { Storage } from "@/core/Storage";

class WaniKaniData {
  apiKey: string | undefined = undefined;
}

export class WaniKaniClient {
  private static data = Storage.getObject<WaniKaniData>(
    "wanikani",
    new WaniKaniData()
  );

  static setKey(key: string) {
    this.data.apiKey = key;
  }

  static request(resource: string, query: any = {}): Promise<any> {
    const api = this.data.apiKey;
    if (!api) {
      return Promise.reject("There is no WaniKani API key present");
    }

    let q = "";
    Object.entries(query)
      .filter(([_, value]) => value != undefined)
      .forEach(([key, value]) => (q += key + "=" + value + "&"));

    const request = new Request(
      "https://api.wanikani.com/v2/" + resource + "?" + q
    );
    request.headers.set("Wanikani-Revision", "20170710");
    request.headers.set("Authorization", "Bearer " + api);
    return fetch(request).then((response) => response.json());
  }
}
