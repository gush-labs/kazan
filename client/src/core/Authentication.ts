/**
 * Module responsible for authentication actions (login, logout, etc.).
 */
import { WaniKaniClient } from "@/core/WaniKaniClient";
import { useStorage } from "@vueuse/core";
import type { Ref } from "vue";
import { watchUpdate } from "@/core/Utilities";

export class User {
  login = false;
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

  public static get user(): Ref<User> {
    return useStorage<User>("user", new User());
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
      this.user.value.login = true;
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
    this.user.value = new User();
  }
}

// Attempt to login on startup
Authentication.login();
