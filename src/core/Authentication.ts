/**
 * Module responsible for authentication actions (login, logout, etc.).
 */
import { Application } from "@/core/Application";
import { WaniKaniClient } from "@/core/WaniKaniClient";
import { Storage, type StorageRef } from "@/core/Storage";
import { watchUpdate } from "@/core/Utilities";

class User {
  username = "";
  level = 0;
  paid = false;
}

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
   * Uses currently saved WaniKani API key in order to sign in.
   */
  static login(): Promise<boolean> {
    return WaniKaniClient.request("user")
      .then((response) => {
        // If we'd tried to login using saved WaniKani API key
        // but failed, it means that this API key is not valid anymore
        if (response != undefined && response.code == 401 && this.user.value) {
          Application.status.errorSet("wk-login-error", "Please sign in again");
          setTimeout(() => {
            Application.status.errorClear("wk-login-error");
          }, 5000);
          this.logout();
          return false;
        }

        // If required data is not present in the response we should just fail
        if (response == undefined || !response.data) {
          return false;
        }

        this.user.value = this.parse(response);
        Application.status.errorClear("wk-login-error");
        return true;
      })
      .catch(() => false);
  }

  static logout() {
    Storage.clear();
    WaniKaniClient.deleteKey();
  }
}

// login on startup
Authentication.login();
