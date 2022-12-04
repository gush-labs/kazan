import { Storage, type RemoteStorage, type RemoteData } from "./Storage";
import { Temporary } from "./Utilities";

class BackendClientData {
  apiKey: string | undefined = undefined;
}

/**
 * Responsible for all communication between
 * the frontend and the backend.
 */
export class BackendClient {
  // Current status of the server (true - online, false - offline, undefined - not checked)
  private static currentStatus = new Temporary<boolean>(undefined, 30 * 1000);

  private static get data(): BackendClientData {
    return Storage.getObject("backend", new BackendClientData());
  }

  /**
   * Set the auth key that will be used by the server
   * to identify the user.
   * @param key user session key
   */
  public static setKey(key: string) {
    this.data.apiKey = key;
  }

  /**
   * Send a request to server
   * @param path url
   * @param data Object which contains request data
   * @returns Promise with an HTTP response
   */
  public static request(path: string[], data: any): Promise<Response> {
    const request = new Request(
      "https://server.kazan.vadimgush.com/" + path.join("/"),
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    if (this.data.apiKey) {
      request.headers.set("Key", this.data.apiKey);
    }
    return fetch(request);
  }

  /**
   * Checks status of the server. Status will be checked
   * only once in 30 seconds in order to avoid too many requests
   * to the server.
   * @returns Promise with the status (true - online, false - offline)
   */
  public static get status(): Promise<boolean> {
    if (this.currentStatus.expired) {
      const request = { action: "health" };
      return this.request([], request)
        .then((response) => response.status === 200)
        .catch((_) => false)
        .then((status) => {
          this.currentStatus.set(status);
          return status;
        });
    }
    return Promise.resolve(this.currentStatus.value ?? false);
  }

  /**
   * Provides an interface for the Storage class to load
   * user data from the remote server.
   *
   * This way we have ability to load saved settings or
   * selected vocabulary or other data from the cloud.
   */
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
        BackendClient.request(["storage", "save", key], JSON.stringify(value));
      },
    };
  }
}
