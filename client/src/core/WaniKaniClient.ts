/**
 * Module contains an API to work with WaniKani integration
 */
import { Storage } from "@/core/Storage";

class WaniKaniData {
  apiKey: string | undefined = undefined;
}

export class WaniKaniClient {
  public static get data() {
    return Storage.getObject<WaniKaniData>("wanikani", new WaniKaniData());
  }

  public static setKey(key: string) {
    this.data.apiKey = key;
  }

  public static async request(resource: string, query: any = {}): Promise<any> {
    const api = this.data.apiKey;
    if (!api) {
      return Promise.reject("There is no WaniKani API key present");
    }

    const rawQuery = Object.entries(query)
      .filter(([_, value]) => value != undefined)
      .map(([key, value]) => key + "=" + value)
      .join("&");

    const request = new Request(
      "https://api.wanikani.com/v2/" + resource + "?" + rawQuery
    );
    request.headers.set("Wanikani-Revision", "20170710");
    request.headers.set("Authorization", "Bearer " + api);

    const response = await fetch(request);
    return response.json();
  }
}
