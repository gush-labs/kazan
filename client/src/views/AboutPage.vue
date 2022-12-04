<script setup lang="ts">
import GoBackButton from "@/components/GoBackButton.vue";
import DisplayContainer from "@/components/DisplayContainer.vue";
import { BackendClient } from "@/core/BackendClient";
import { ref } from "vue";

const status = ref<boolean | undefined>(undefined);
BackendClient.status.then((result) => (status.value = result));
</script>

<template>
  <DisplayContainer center short class="text-center">
    <GoBackButton class="mb-3" />

    <div class="w-100">
      <h4>About the app</h4>
      <p><b>Kazan</b> - WaniKani assistance tool.</p>
      <div class="d-flex flex-column info-container text-muted">
        <div class="d-flex flex-row justify-content-between info-item">
          <div class="fw-bold">Version</div>
          <div>1.1</div>
        </div>

        <div class="d-flex flex-row justify-content-between info-item">
          <div class="fw-bold">Source</div>
          <div>
            <a class="text-muted" href="https://github.com/gush-labs/kazan"
              >@gush-labs/kazan</a
            >
          </div>
        </div>

        <div class="d-flex flex-row justify-content-between info-item">
          <div class="fw-bold">Server Status</div>
          <div>
            <div v-if="status === true">
              <span class="online-icon"><i class="bi bi-circle-fill"></i></span>
              Online
            </div>
            <div v-if="status === false">
              <span class="offline-icon"
                ><i class="bi bi-circle-fill"></i
              ></span>
              Offline
            </div>
            <div v-if="status === undefined">
              <span class="checkingon"><i class="bi bi-circle"></i></span>
              Checking...
            </div>
          </div>
        </div>
      </div>
    </div>
  </DisplayContainer>
</template>

<style>
.online-icon {
  color: rgba(0, 176, 0, 0.5);
}
.offline-icon {
  color: rgba(176, 0, 0, 0.5);
}
.checking-icon {
  color: rgba(0, 0, 0, 0.5);
}
.info-item {
  background-color: var(--button-bg-color);
  padding: 0.5em;
  padding-inline-end: 1em;
  padding-inline-start: 1em;
  margin-bottom: 1px;
}
.info-item:last-child {
  border-bottom-left-radius: var(--button-border-radius);
  border-bottom-right-radius: var(--button-border-radius);
}
.info-item:first-child {
  border-top-left-radius: var(--button-border-radius);
  border-top-right-radius: var(--button-border-radius);
}
</style>
