<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="header container-fluid mb-5 p-3">
    <div class="container"><h2>ジャレド</h2></div>
  </div>
  <RouterView />
</template>

<style scoped>
.header {
  font-family: 'Mochiy Pop One', sans-serif;
  font-weight: bolder;
  background-color: #FEF4DB;
  border-bottom: 4px solid rgba(0,0,0,0.1);
}
</style>
