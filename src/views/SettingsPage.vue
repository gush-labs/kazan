<script setup lang="ts">
import GoBackButton from "@/components/GoBackButton.vue";
import { Application, ConfigurationOptions } from "@/core/Application";
import SwitchOption from "@/components/SwitchOption.vue";
import { computed } from "vue";
import DisplayContainer from "@/components/DisplayContainer.vue";

const configuration = Application.configuration;
const fonts = ConfigurationOptions.availableJapaneseFonts;

const showAnswer = computed(() => configuration.showAnswers);
</script>

<template>
  <DisplayContainer center short>
    <GoBackButton class='mb-3'/>

    <div class="title-container text-center mb-2"><h4>Settings</h4></div>

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

    <SwitchOption
      :switch="showAnswer"
      class="mt-3"
      @click="() => (configuration.showAnswers = !configuration.showAnswers)"
      >Always show answers</SwitchOption
    >
  </DisplayContainer>
</template>

<style scoped>
.font-sample {
  border-radius: var(--button-border-radius);
  background-color: var(--button-bg-color);
}
</style>
