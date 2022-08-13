<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="header container-fluid mb-5 p-3">
    <div class="container">
      <h2>
        <RouterLink :to="{name:'home'}">ジャレド</RouterLink>
      </h2>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
.header {
  font-family: "Mochiy Pop One", sans-serif;
  font-weight: bolder;
  background-color: #fef4db;
  border-bottom: 4px solid rgba(0, 0, 0, 0.1);
}
.header a {
  text-decoration: none;
  color: black;
}
</style>
