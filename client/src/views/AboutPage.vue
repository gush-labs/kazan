<script setup lang="ts">
import DisplayContainer from "@/components/DisplayContainer.vue";
import { BackendClient } from "@/core/BackendClient";
import { ref } from "vue";

const status = ref<boolean | undefined>(undefined);
BackendClient.status.then((result) => (status.value = result));
</script>

<template>
  <DisplayContainer center short class="text-center">
    <div class="w-100">
      <h4>About the app</h4>
      <p><b>Kazan</b> - WaniKani assistance tool.</p>
      <div class="d-flex flex-column kz-container text-muted">
        <div class="d-flex flex-row justify-content-between info-item">
          <div>Version</div>
          <div>1.1</div>
        </div>

        <div class="d-flex flex-row justify-content-between info-item">
          <div>Source</div>
          <div>
            <a
              class="text-muted source-link"
              href="https://github.com/gush-labs/kazan"
              >@gush-labs/kazan</a
            >
          </div>
        </div>
      </div>
    </div>
  </DisplayContainer>
</template>

<style>
.source-link {
  text-decoration: none;
}
.info-item {
  background-color: var(--button-bg-color);
  padding: 0.5em;
  padding-inline-end: 1em;
  padding-inline-start: 1em;
  border-bottom: var(--button-border-width) solid var(--button-border-color);
}
.info-item:last-child {
  border-bottom-left-radius: var(--button-border-radius);
  border-bottom-right-radius: var(--button-border-radius);
  border-bottom: none;
}
.info-item:first-child {
  border-top-left-radius: var(--button-border-radius);
  border-top-right-radius: var(--button-border-radius);
}
</style>
