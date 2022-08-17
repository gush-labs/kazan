<script setup lang="ts">
import router from "@/router";

function goHome() {
  router.push({ name: "home" });
}
</script>

<template>
  <div class="header mb-5 d-flex flex-row justify-content-between">
    <div class="dropdown language">
      <a class="dropdown-toggle header-link pb-2" data-bs-toggle="dropdown"
        ><i class="bi bi-translate"></i> English</a
      >
      <ul class="dropdown-menu">
        <li><a class="dropdown-item active" href="#">English</a></li>
        <li><a class="dropdown-item disabled" href="#">日本語</a></li>
      </ul>
    </div>

    <div @click="goHome" class="logo">
      <img src="/public/logo.png" />
    </div>

    <div class="dropdown profile">
      <a class="dropdown-toggle header-link pb-2" data-bs-toggle="dropdown"
        ><i class="bi bi-person-fill"></i> Profile</a
      >
      <div class="dropdown-menu dropdown-menu-end profile-menu">
        <ul class="profile-links">
          <li><a class="dropdown-item disabled" href="#">Sign in</a></li>
          <li><a class="dropdown-item disabled" href="#">Settings</a></li>
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
}
</style>
