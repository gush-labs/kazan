<script setup lang="ts">
import LoadingCircle from "./LoadingCircle.vue";
import { Status } from "@/core/Status";

const process = Status.currentProcess;
const error = Status.currentError;
</script>

<template>
  <div class="footer d-flex flex-row justify-content-center text-muted">
    <div v-if="!process && !error">
      version 0.4 
      <i class="bi bi-dot"></i>
      <a class="author-link text-muted" href="https://github.com/gush-labs">@gush-labs</a>
    </div>
    <div v-if="process && !error">
      <LoadingCircle class='me-2'/>
      {{ process }}
    </div>
    <div class="error" v-if="error">
      <i class="bi bi-exclamation-circle me-2"></i>
      {{ error }}
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
