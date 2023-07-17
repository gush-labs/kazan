<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import router from "@/router";
let currentPath = router.currentRoute;
</script>

<template>
  <div class="footer d-flex flex-row justify-content-center text-muted align-items-end">
    <ActionButton v-if="currentPath.path !== '/'" class="px-5 text-muted shadow-sm" @click="() => router.back()"><i class="bi bi-arrow-left me-1"></i> Go back</ActionButton>
  </div>
</template>

<style scoped>
.footer .kz-button {
  border-radius: 2rem;
  background-color: var(--button-bg-color);
}
.footer .author-link {
  text-decoration: none;
}
.footer {
  min-height: 4em;
}
</style>
