/**
 * Module responsible for authentication actions (login, logout, etc.).
 */
import { WaniKaniClient } from "@/core/WaniKaniClient";
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

  public static get user(): StorageRef<User> {
    return Storage.get<User>("user");
  }

  public static onLogin(action: (user: User) => void) {
    watchUpdate(this.user, (user) => action(user));
  }

  public static async login(loginData?: LoginData): Promise<boolean> {
    try {
      if (loginData) {
        WaniKaniClient.setKey(loginData.wanikaniApiKey);
      }

      const response = await WaniKaniClient.request("user");
      if (response == undefined || !response.data || response.code == 401) {
        return false;
      }
      this.user.value = this.parse(response);
      return true;

    } catch (error) {
      console.error("Failed to authenticate", error);
      return false;
    } 
  }

  private static parse(response: any): User {
    const data = response.data;
    const user = new User();
    user.username = data.username;
    user.level = data.level;
    user.paid = data.subscription.active;
    return user;
  }

  public static logout() {
    Storage.clear();
  }
}

// Attempt to login on startup
Authentication.login();
