<script setup lang="ts">
import { Authentication } from "@/core/Authentication";
import ActionButton from "@/components/ActionButton.vue";
import PageLink from "@/components/PageLink.vue";
import router from "@/router";

const user = Authentication.user;

function goHome() {
  router.push({ name: "home" });
}
function signOut() {
  Authentication.logout();
}
</script>

<template>
  <div
    class="header d-flex flex-row justify-content-between align-items-center"
  >
    <div class="dropdown language">
      <ActionButton dropdown plain icon="translate" class="header-link"
        >English</ActionButton
      >
      <ul class="dropdown-menu language-links">
        <li>
          <ActionButton class="dropdown-item active">English</ActionButton>
        </li>
        <li>
          <ActionButton class="dropdown-item disabled">日本語</ActionButton>
        </li>
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
.dropdown-menu {
  border-radius: var(--dropdown-border-radius);
  border: var(--dropdown-border-width) solid var(--dropdown-border-color);
}
.dropdown-menu a {
  border: none;
}
.dropdown-menu .btn {
  border: none;
}
.header-link {
  text-decoration: none;
  border-radius: 0.5em;
}
.logo:hover {
  cursor: pointer;
}
.logo img {
  max-height: 4em;
  height: 4em;
}
</style>
