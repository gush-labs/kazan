<script setup lang="ts">
import { Authentication, User } from "@/core/Authentication";
import ActionButton from "@/components/ActionButton.vue";
import PageLink from "@/components/PageLink.vue";
import router from "@/router";

const user = User.ref;

function goHome() {
  router.push({ name: "home" });
}
function signOut() {
  Authentication.logout();
}
</script>

<template>
  <div class="header d-flex flex-row justify-content-between">
    <div class="dropdown language">
      <ActionButton dropdown plain icon="translate" class="header-link"
        >English</ActionButton
      >
      <ul class="dropdown-menu language-links">
        <li><button class="dropdown-item active" href="#">English</button></li>
        <li><button class="dropdown-item disabled" href="#">日本語</button></li>
      </ul>
    </div>

    <div @click="goHome" class="logo">
      <img src="/public/logo.png" />
    </div>

    <div class="dropdown profile">
      <ActionButton dropdown plain icon="person-circle" class="header-link">
        {{ user ? user.username : "Profile" }}
      </ActionButton>
      <div class="dropdown-menu dropdown-menu-end profile-menu">
        <ul class="profile-links">
          <PageLink
            v-if="user == undefined"
            :to="{ name: 'login' }"
            class="dropdown-item"
            >Sign in</PageLink
          >
          <ActionButton class="dropdown-item disabled" href="#"
            >Settings</ActionButton
          >
          <ActionButton
            v-if="user != undefined"
            @click="signOut"
            class="dropdown-item"
            >Sign out</ActionButton
          >
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
