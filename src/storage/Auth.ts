import { database, WanikaniProfile } from "@/storage/Database";

class Auth {

  login(api: string): Promise<boolean> {
    database.wanikaniApi = api;
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
          database.wanikaniProfile.value = profile;
          return true;
        }
        return false;
      });
  }

}

const auth = new Auth();
export default auth;