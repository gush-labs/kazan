<script setup lang="ts">
import LoadingCircle from "./LoadingCircle.vue";
import AppStatus from "@/core/AppStatus";

const process = AppStatus.currentProcess;
const error = AppStatus.currentError;
</script>

<template>
  <div class="footer d-flex flex-row justify-content-center text-muted">
    <div v-if="!process && !error">
      version 0.4
      <i class="bi bi-dot"></i>
      <a class="author-link text-muted" href="https://github.com/gush-labs"
        >@gush-labs</a
      >
    </div>
    <div v-if="process && !error">
      <LoadingCircle class="me-2" />
      {{ process.message }}
    </div>
    <div class="error" v-if="error">
      <i class="bi bi-exclamation-circle me-2"></i>
      {{ error.message }}
    </div>
  </div>
</template>

<style scoped>
.error {
  color: var(--text-error-color) !important;
}
.footer .author-link {
  text-decoration: none;
}
</style>
