<script setup lang="ts">
import { Storage, User } from "@/core/Database";
import Button from "@/components/Button.vue";
import Link from "@/components/Link.vue";
import { Auth } from "@/core/Auth";
import router from "@/router";

function goHome() { router.push({ name: "home" }); }
const user = Storage.read<User>(User.storageKey);

function signOut() { Auth.logout(); }
</script>

<template>
  <div class="header d-flex flex-row justify-content-between">
    <div class="dropdown language">
      <Button dropdown plain icon="translate" class="header-link">English</Button>
      <ul class="dropdown-menu language-links">
        <li><button class="dropdown-item active" href="#">English</button></li>
        <li><button class="dropdown-item disabled" href="#">日本語</button></li>
      </ul>
    </div>

    <div @click="goHome" class="logo">
      <img src="/public/logo.png" />
    </div>

    <div class="dropdown profile">
      <Button dropdown plain icon="person-circle" class="header-link">
        {{ user ? user.username : "Profile" }}
      </Button>
      <div class="dropdown-menu dropdown-menu-end profile-menu">
        <ul class="profile-links">
          <Link v-if="user == undefined" :to="{name: 'login'}" class="dropdown-item">Sign in</Link>
          <Button class="dropdown-item disabled" href="#">Settings</Button>
          <Button v-if="user != undefined" @click="signOut" class="dropdown-item">Sign out</Button>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-links {
  list-style: none;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.dropdown-menu a {
  border: none;
}
.dropdown-menu .btn {
  border: none;
}
.header-link {
  text-decoration: none;
}
.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.logo:hover {
  cursor: pointer;
}
.logo img {
  max-height: 5em;
  height: 5em;
}
</style>
