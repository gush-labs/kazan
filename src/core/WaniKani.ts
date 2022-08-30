import { Storage, type StorageRef } from "@/core/Database";

export class WaniKani {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  static get ref(): StorageRef<WaniKani> {
    return Storage.get<WaniKani>("wanikani");
  }

  static request(resource: string, query: any = {}): Promise<any> {
    const api = this.ref.value?.apiKey;
    if (api == undefined) { return Promise.resolve(undefined); }

    var q = "?";
    for (const [key, value] of Object.entries(query)) {
      if (value != undefined) {
        q += key + "=" + value + "&";
      }
    }

    const request = new Request("https://api.wanikani.com/v2/" + resource + q);
    request.headers.set("Wanikani-Revision", "20170710");
    request.headers.set("Authorization", "Bearer " + api);

    return fetch(request).then(response => response.json())
  }
}