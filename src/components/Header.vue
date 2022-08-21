<script setup lang="ts">
import router from "@/router";
import Button from "@/components/Button.vue";
import Link from "@/components/Link.vue";
import { database } from "@/storage/Database";

function goHome() { router.push({ name: "home" }); }
const db = database;
const profile = db.wanikaniProfile;
</script>

<template>
  <div class="header d-flex flex-row justify-content-between">
    <div class="dropdown language">
      <Button dropdown plain icon="translate">English</Button>
      <ul class="dropdown-menu language-links">
        <li><button class="dropdown-item active" href="#">English</button></li>
        <li><button class="dropdown-item disabled" href="#">日本語</button></li>
      </ul>
    </div>

    <div @click="goHome" class="logo">
      <img src="/public/logo.png" />
    </div>

    <div class="dropdown profile">
      <Button dropdown plain icon="person-circle">
        {{ profile ? profile.username : "Profile" }}
      </Button>
      <div class="dropdown-menu dropdown-menu-end profile-menu">
        <ul class="profile-links">
          <Link v-if="profile == undefined" :to="{name: 'login'}" class="dropdown-item">Sign in</Link>
          <Button class="dropdown-item disabled" href="#">Settings</Button>
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
  color: black;
}
.header-link:hover {
  cursor: pointer;
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
