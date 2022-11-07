<script setup lang="ts">
import router from "@/router";
import ActionButton from "@/components/ActionButton.vue";
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div
      class="about-container d-flex flex-column align-items-center text-center"
    >
      <ActionButton
        plain
        @click="() => router.back()"
        class="text-muted mb-2 pe-2"
        icon="arrow-left-short"
        >Go back</ActionButton
      >
      <div class="w-100">
        <h4>About the app</h4>
        <p><b>Kazan</b> - WaniKani assistance tool.</p>
        <div class="d-flex flex-column info-container text-muted">
          <div class="d-flex flex-row justify-content-between info-item">
            <div class="fw-bold">Version</div>
            <div>1.0</div>
          </div>
          <div class="d-flex flex-row justify-content-between info-item">
            <div class="fw-bold">Source</div>
            <div>
              <a class="text-muted" href="https://github.com/gush-labs/kazan"
                >@gush-labs/kazan</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
@media screen and (max-width: 650px) {
  .about-container {
    width: 100%;
  }
}
@media screen and (min-width: 650px) {
  .about-container {
    width: 75%;
  }
}
</style>
