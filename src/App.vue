<script setup lang="ts">
import { RouterView } from "vue-router";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>
.app-container {
  position: relative;

  max-width: 600px;
  min-height: 100vh;
  padding-top: 1em;
  padding-bottom: 1em;
  margin-left: auto;
  margin-right: auto;

  display: grid;
  grid-template-rows: auto 1fr auto;
}

@media screen and (max-width: 650px) {
  .app-container {
    margin-left: 1em;
    margin-right: 1em;
  }
}

/* THEME */
:root {
  --text-base-color: #212529;
  --text-light-color: white;
  --text-error-color: rgb(97, 33, 33);
  --text-dunger-color: rgb(176, 56, 56);
  --text-success-color: rgb(25, 79, 13);
  --border-base-color: rgba(0, 0, 0, 0.1);
  --border-hover-color: rgba(0, 0, 0, 0.25);
  --button-active-color: rgba(0, 0, 0, 0.5);
  --button-disabled-opacity: 0.65;
}

/* BASIC CLASSES */
.kz-text {
  color: var(--text-base-color);
}
.kz-text-error {
  color: var(--text-error-color);
}
.kz-text-dunger {
  color: var(--text-dunger-color);
}
.kz-text-success {
  color: var(--text-success-color);
}
.kz-button {
  position: relative;
  border: 1px solid var(--border-base-color);
}
.kz-button:hover {
  border: 1px solid var(--border-hover-color);
}
.kz-button:focus {
  border: 1px solid var(--border-hover-color);
}
.kz-button-active {
  color: var(--text-light-color) !important;
  background-color: var(--button-active-color) !important;
}
.kz-button-disabled {
  opacity: var(--button-disabled-opacity);
}
.kz-button-disabled:focus {
  border: 1px solid var(--border-base-color) !important;
}
.kz-button-disabled:hover {
  cursor: default;
  border: 1px solid var(--border-base-color) !important;
}

/* Fonts for japanese texts (not great, but better than default ones) */
.japanese {
  font-family: "Noto Sans JP", sans-serif;
}

/* Styles to properly size text related to parent elements.
   Bootstrap by default sizes everything related to a global font size. */
h4 {
  font-size: calc(1.275em + 0.3vw);
}
.btn {
  font-size: 1em;
}

/* Just global style to make some things look a little bit better */
.dropdown-menu {
  border-radius: 0px;
  padding: 0;
}
.dropdown-toggle::after {
  display: none;
}
.btn {
  border-radius: 0px;
}
</style>
