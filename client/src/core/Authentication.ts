/**
 * Module responsible for authentication actions (login, logout, etc.).
 */
import { Application } from "@/core/Application";
import { WaniKaniClient } from "@/core/WaniKaniClient";
import { BackendClient } from "@/core/BackendClient";
import { Storage, type StorageRef } from "@/core/Storage";
import { watchUpdate } from "@/core/Utilities";

export class User {
  username = "";
  level = 0;
  paid = false;
}

export type LoginData = {
  wanikaniApiKey: string;
};

/**
 * Authenticates user
 */
export class Authentication {
  static get user(): StorageRef<User> {
    return Storage.get<User>("user");
  }

  static onLogin(action: (user: User) => void) {
    watchUpdate(this.user, (user) => action(user));
  }

  /**
   * Parses incoming data from WaniKani
   */
  private static parse(response: any): User {
    const data = response.data;
    const user = new User();
    user.username = data.username;
    user.level = data.level;
    user.paid = data.subscription.active;
    return user;
  }

  /**
   * Tries to login both to WaniKani and to our backend.
   * If login data is not passed, then saved tokens from the browser
   * storage are used.
   */
  static login(data?: LoginData): Promise<boolean> {
    if (data) {
      WaniKaniClient.setKey(data.wanikaniApiKey);
    }

    // Request user data from the WaniKani API
    return WaniKaniClient.request("user")
      .then((response) => {
        if (response != undefined && response.code == 401 && this.user.value) {
          Application.status.errorSet("wk-login-error", "Please sign in again");
          setTimeout(
            () => Application.status.errorClear("wk-login-error"),
            5000
          );
          // if we failed to login, it means that any saved data is not valid anymore
          // including any API keys and WaniKani dictionary
          this.logout();
          return false;
        }

        // If required data is not present in the response we should just fail
        if (response == undefined || !response.data) {
          return false;
        }

        // Parse user response
        this.user.value = this.parse(response);
        Application.status.errorClear("wk-login-error");

        // After we verified that WaniKani API key is valid
        // we can use it to authenticate on our side
        // (we will postpone this operation, because it's not important)
        setTimeout(() => this.internalLogin(), 0);

        // Notify that login is succesfull
        return true;
      })
      .catch(() => false);
  }

  private static internalLogin() {
    // Now we know that WaniKani API key is valid, and we can use it
    // to authenticate this user on our side
    const verifiedApiKey = WaniKaniClient.data.apiKey;
    if (!verifiedApiKey) {
      return;
    }

    // Save the API key
    BackendClient.setKey(verifiedApiKey);

    // Now we can login
    BackendClient.request(["login"], {})
      .then((response) => {
        const status = response.status as string | undefined;
        if (status == "ok") {
          console.log("Backend: User logged in!");
        } else if (status == "saved") {
          console.log("Backend: User completed registration!");
        } else {
          console.log("Backend: Login attempt failed");
          return;
        }

        // Now we can use remote storage to load all saved user data
        Storage.initRemoteStorage(BackendClient.remoteStorage);
      })
      .catch((e) => {
        console.warn("Backend: Failed to login", e);
      });
  }

  public static logout() {
    Storage.clear();
  }
}

// login on startup
Authentication.login();
