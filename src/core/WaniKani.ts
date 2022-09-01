import { Storage } from "@/core/Database";

class WaniKani {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  static request(resource: string, query: any = {}): Promise<any> {
    const api = this.ref.value?.apiKey;
    if (api == undefined) {
      return Promise.resolve(undefined);
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

  static get ref() {
    return Storage.get<WaniKani>("wanikani");
  }
}

export default WaniKani;
