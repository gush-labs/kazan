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
function goProfile() {
  router.push({ name: "profile" });
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
      <ActionButton icon="translate" class="header-link-mobile"></ActionButton>
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
      <ActionButton
        @click="() => goProfile()"
        plain
        icon="person-circle"
        class="header-link"
      >
        {{ user ? user.username : "Profile" }}
      </ActionButton>
      <ActionButton
        @click="() => goProfile()"
        icon="person-circle"
        class="header-link-mobile"
      ></ActionButton>
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
}
.header-link-mobile {
  border-radius: 50%;
  font-size: 1.1em;
  height: 3em;
  width: 3em;
}
.logo:hover {
  cursor: pointer;
}
.logo img {
  max-height: 4em;
  height: 4em;
}

@media screen and (max-width: 650px) {
  .header-link {
    display: none;
  }
  .header-link-mobile {
    display: block;
  }
}
@media screen and (min-width: 650px) {
  .header-link {
    display: block;
  }
  .header-link-mobile {
    display: none;
  }
}
</style>
