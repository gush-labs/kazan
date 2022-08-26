import { Storage, User } from "@/core/Database";
import { WaniKani } from "@/core/WaniKani";

export class Auth {

  /**
   * Parses incoming data from WaniKani
   * @param response response from WaniKani
   * @returns if parsing is successfull, then return a new user, otherwse undefined
   */
  private static parse(response: any): User | undefined {
    const data = response.data;
    if (response.data && data.username && data.level) {
      const user = new User();
      user.username = data.username;
      user.level = data.level;
      user.paid = data.subscription.active;
      return user;
    }
    return undefined;
  }

  /**
   * Uses currently saved WaniKani API key in order to sign in.
   * @returns user if sign in is complete, otherwise undefined
   */
  static login(): Promise<boolean> {
    return WaniKani.request("user").then(response => {
      const apiKey = Storage.read<string>("wanikani").value;
      if (response == undefined) { return false; };
      
      const user = Auth.parse(response);
      if (user) { 
        user.apiKey = apiKey!; 
        Storage.save("user", user);
      }
      return user != undefined;
    });
  }

  static logout() {
    Storage.clear();
  }
}

// And we will try to login on the startup
Auth.login();