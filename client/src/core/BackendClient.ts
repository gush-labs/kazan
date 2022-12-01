import { Storage, type RemoteStorage, type RemoteData } from "./Storage";

class BackendClientData {
  apiKey: string | undefined = undefined;
}

/**
 * Responsible for all communication between
 * the frontend and the backend.
 */

export class BackendClient {
  private static get data(): BackendClientData {
    return Storage.getObject("backend", new BackendClientData());
  }

  public static setKey(key: string) {
    this.data.apiKey = key;
  }

  public static request(path: string[], data: any): Promise<any> {
    const api = this.data.apiKey;
    if (!api) {
      return Promise.reject("There is no user API key present");
    }

    const request = new Request(
      "https://server.kana.vadimgush.com/" + path.join("/"),
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    request.headers.set("Key", api);
    return fetch(request).then((response) => response.json());
  }

  public static get remoteStorage(): RemoteStorage {
    return {
      loadAll(): Promise<RemoteData> {
        // TODO: Implement
        return Promise.resolve({ version: 0, data: new Map<string, any>() });
      },
      setVersion(version: number) {
        BackendClient.request(["storage", "version"], JSON.stringify(version));
      },
      save(key: string, value: any) {
        BackendClient.request(["storage", "save", key], JSON.stringify(value))
      },
    };
  }
}
