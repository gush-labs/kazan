<script setup lang="ts">
import { RouterView } from "vue-router";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import { Application, ConfigurationOptions } from "@/core/Application";
import { computed } from "vue";

const configuration = Application.configuration;
const fonts = ConfigurationOptions.availableJapaneseFonts;
const currentFont = computed(
  () => '"' + fonts[configuration.japaneseFont].name + '"'
);
const currentStyle = computed(() => fonts[configuration.japaneseFont].style);
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>

/* The main div container where all content is placed */
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

/* Resize app container to mobile screens */
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
  --text-danger-color: rgb(176, 56, 56);
  --text-success-color: rgb(25, 79, 13);
  --text-mute-color: #6c757d;
  --app-background-color: #f2f2f7;

  --border-base-color: rgba(0, 0, 0, 0.1);
  --border-hover-color: rgba(0, 0, 0, 0.1);

  --button-active-color: rgba(0, 0, 0, 0.5);
  --button-active-text-color: var(--text-light-color);
  --button-disabled-opacity: 0.65;
  --button-border-radius: 10px;
  --button-bg-color: white;
  --button-hover-bg-color: #eeeef3;
  --button-border-width: 1px;
  --button-border-color: var(--border-base-color);

  --input-border-radius: var(--button-border-radius);
  --input-border-width: 1px;
  --input-border-color: var(--border-base-color);

  --select-border-radius: var(--button-border-radius);
  --select-border-width: 1px;
  --select-border-color: var(--border-base-color);

  --dropdown-border-radius: var(--button-border-radius);
  --dropdown-border-width: var(--button-border-width);
  --dropdown-border-color: var(--button-border-color);

  --default-grid-gap: 0.75rem;
  --default-grid-gap-big: 1.5rem;
}

body {
  background-color: var(--app-background-color);
}

/* Different gaps between elements */
.gap-bottom {
  margin-bottom: var(--default-grid-gap);
}
.gap-right {
  margin-right: var(--default-grid-gap);
}
.gap-left {
  margin-left: var(--default-grid-gap);
}
.gap-bottom-big {
  margin-bottom: var(--default-grid-gap-big);
}
.gap-top {
  margin-top: var(--default-grid-gap);
}
.gap-top-big {
  margin-top: var(--default-grid-gap-big);
}

/* Basic white container for any content */
.kz-container {
  border: var(--button-border-width) solid var(--border-base-color);
  border-radius: var(--button-border-radius);
  background-color: var(--button-bg-color);
}

/* All text on the pages */
.kz-text {
  color: var(--text-base-color);
}
.kz-text-error {
  color: var(--text-error-color);
}
.kz-text-dunger {
  color: var(--text-danger-color);
}
.kz-text-success {
  color: var(--text-success-color);
}

/* Input field */
.kz-input {
  border: var(--input-border-width) solid var(--input-border-color);
  border-radius: var(--input-border-radius);
}

/* Select field */
.kz-select {
  border: var(--select-border-width) solid var(--select-border-color);
  border-radius: var(--select-border-radius);
}

/* Button component */
.kz-button {
  position: relative;
  border: var(--button-border-width) solid var(--border-base-color);
  border-radius: var(--button-border-radius);
  background-color: var(--button-bg-color);
  padding-block-start: 0.45em;
  padding-block-end: 0.45em;
  transition: 0.2s;
}
.kz-button:hover {
  border: var(--button-border-width) solid var(--border-hover-color);
  background-color: var(--button-hover-bg-color);
}
.kz-button:focus {
  border: var(--button-border-width) solid var(--border-hover-color);
  background-color: var(--button-bg-color);
}
.kz-button-active {
  color: var(--button-active-text-color) !important;
  background-color: var(--button-active-color) !important;
}
.kz-button-disabled {
  opacity: var(--button-disabled-opacity);
  border-radius: var(--button-border-radius);
  color: rgba(0, 0, 0, 0.5);
}
.kz-button-disabled:focus {
  border: var(--button-border-width) solid var(--border-base-color) !important;
}
.kz-button-disabled:hover {
  cursor: default;
  border: var(--button-border-width) solid var(--border-base-color) !important;
}

/* Frequently used colors */
.kz-success {
  background-color: rgb(73, 184, 73) !important;
  color: white !important;
}
.kz-danger {
  background-color: rgb(203, 81, 81) !important;
  color: white !important;
}

.japanese {
  font-family: v-bind(currentFont);
  font-style: v-bind(currentStyle);
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
</style>
