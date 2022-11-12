<script setup lang="ts">
import GoBackButton from "@/components/GoBackButton.vue";
import DisplayContainer from "@/components/DisplayContainer.vue";
</script>

<template>
  <DisplayContainer center short class="text-center">
    <GoBackButton class='mb-3'/>

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
      </div>
    </div>
  </DisplayContainer>
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
</style>
