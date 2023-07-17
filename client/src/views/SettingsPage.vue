<script setup lang="ts">
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
    <div class="title-container text-center mb-2"><h4>Settings</h4></div>

    <div class="kz-container d-flex flex-column py-2">
      <div class="text-muted text-center">Font preview</div>
      <div class="japanese text-center"><h3>私は寿司が好きです</h3></div>
    </div>

    <select
      class="form-select gap-top kz-select px-3"
      aria-label="Default select example"
      v-model="configuration.japaneseFont"
    >
      <option v-for="(font, id) in fonts" :key="id" :value="id">
        {{ font.name }}
      </option>
    </select>

    <div class="kz-container gap-top px-3 d-flex flex-column">
      <SwitchOption
        :switch="showAnswer"
        @click="() => (configuration.showAnswers = !configuration.showAnswers)"
        >Always show answers</SwitchOption
      >
    </div>
  </DisplayContainer>
</template>
