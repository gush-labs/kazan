import ApplicationStatus from "@/core/AppStatus";
import { Storage, User } from "@/core/Database";
import WaniKani from "@/core/WaniKani";

/**
 * Authenticates user
 */
class Authentication {
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
    return WaniKani.request("user")
      .then((response) => {
        const api = WaniKani.ref.value?.apiKey;

        // If we'd tried to login using saved WaniKani API key
        // but failed, it means that this API key is not valid anymore
        if (response != undefined && response.code == 401 && User.ref.value) {
          ApplicationStatus.errorSet(
            "wk-login-error",
            "WaniKani API key is not valid anymore. Please sign in again."
          );
          this.logout();
          return false;
        }

        // If required data is not present in the response we should just fail
        if (!api || response == undefined || !response.data) {
          return false;
        }

        User.ref.value = this.parse(response);
        ApplicationStatus.errorClear("wk-login-error");
        return true;
      })
      .catch(() => false);
  }

  static logout() {
    Storage.clear();
  }
}

// login on startup
Authentication.login();

export default Authentication;
