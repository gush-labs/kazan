import { Storage } from "@/core/Database";

export class WaniKani {

  static request(resource: string, query: any = {}): Promise<any> {
    const apiKey = Storage.read("wanikani");
    if (apiKey.value == undefined) { return Promise.resolve(undefined); }

    var q = "?";
    for (const [key, value] of Object.entries(query)) {
      if (value != undefined) {
        q += key + "=" + value + "&";
      }
    }

    const request = new Request("https://api.wanikani.com/v2/" + resource + q);
    request.headers.set("Wanikani-Revision", "20170710");
    request.headers.set("Authorization", "Bearer " + apiKey.value);

    return fetch(request).then(response => response.json())
  }

}