import { database, WanikaniProfile } from "@/storage/Database";

class Auth {

  loadSaved() {
    const userRaw = localStorage.getItem("user");
    if (userRaw) {
      const user = JSON.parse(userRaw);
      this.login(user.api);
    }
  }

  login(api: string): Promise<boolean> {
    const request = new Request("https://api.wanikani.com/v2/user");
    request.headers.set("Wanikani-Revision", "20170710");
    request.headers.set("Authorization", "Bearer " + api);

    return fetch(request)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.username && data.data.level) {
          const profile = new WanikaniProfile();
          profile.username = data.data.username;
          profile.level = data.data.level;
          profile.api = api;
          database.wanikaniProfile.value = profile;
          localStorage.setItem("user", JSON.stringify(profile));
          return true;
        }
        return false;
      });
  }
}

const auth = new Auth();
auth.loadSaved();

export default auth;