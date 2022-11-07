<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import { Application, ConfigurationOptions } from "@/core/Application";
import { computed } from "vue";
import router from "@/router";

const configuration = Application.configuration;
const fonts = ConfigurationOptions.availableJapaneseFonts;
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="settings-container d-flex flex-column">
      <ActionButton
        plain
        @click="() => router.back()"
        class="text-muted pe-2"
        icon="arrow-left-short"
        >Go back</ActionButton
      >

      <div class="title-container text-center mt-2 mb-2"><h4>Settings</h4></div>

      <div class="font-sample d-flex flex-column py-2">
        <div class="text-muted text-center">Font preview</div>
        <div class="japanese text-center"><h3>私は寿司が好きです</h3></div>
      </div>

      <select
        class="form-select gap-top"
        aria-label="Default select example"
        v-model="configuration.japaneseFont"
      >
        <option v-for="(font, id) in fonts" :key="id" :value="id">
          {{ font.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.font-sample {
  border-radius: var(--button-border-radius);
  background-color: var(--button-bg-color);
}
@media screen and (max-width: 650px) {
  .settings-container {
    width: 100%;
  }
}
@media screen and (min-width: 650px) {
  .settings-container {
    width: 75%;
  }
}
</style>
