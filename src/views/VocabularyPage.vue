<script setup lang="ts">
import SwitchOption from "@/components/SwitchOption.vue";
import PageLink from "@/components/PageLink.vue";
import ActionButton from "@/components/ActionButton.vue";
import { Storage } from "@/core/Storage";

const vocabularies = [
  { id: "wanikani", name: "WaniKani"},
  { id: "lessons", name: "Japanese Lessons"},
  { id: "jlpt", name: "JLPT"},
];

class VocabularySelectData {
  meaning: boolean = false;
  reading: boolean = true;
  translation: boolean = false;
  vocabulary: string = vocabularies[0].id;
}

const select = Storage.getObject<VocabularySelectData>(
  "vocabulary-select",
  new VocabularySelectData()
);
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="vocabulary-container d-flex flex-column">
      <div class="text-center link-container mb-2">
        <PageLink
          :to="{ name: 'home', params: { page: 'kana' } }"
          icon="arrow-left-short"
          class="text-muted"
          plain
          >Go back</PageLink
        >
      </div>

      <div class="text-center mb-3"><h4>Select vocabulary</h4></div>

      <select class="form-select mb-3" aria-label="Default select example" v-model="select.vocabulary">
        <option v-for="vocab in vocabularies" :id="vocab.id" :value="vocab.id">
          {{ vocab.name }}</option>
      </select>

      <div class="level-container d-flex flex-row justify-content-between mb-3">
        <div class="button me-3"><i class="bi bi-dash-circle"></i></div>
        <div class="button me-3"><i class="bi bi-dash-circle-dotted"></i></div>
        <div class="text-center d-flex flex-column justify-content-center">
          <div class="level-label">Vocabulary level 3</div>
        </div>
        <div class="button ms-3"><i class="bi bi-plus-circle-dotted"></i></div>
        <div class="button ms-3"><i class="bi bi-plus-circle"></i></div>
      </div>

      <SwitchOption
        :switch="select.meaning"
        @click="() => select.meaning = !select.meaning"
        >Words meaning</SwitchOption
      >
      <SwitchOption
        :switch="select.reading"
        @click="() => select.reading = !select.reading"
        >Words reading</SwitchOption
      >
      <SwitchOption
        :switch="select.translation"
        @click="() => select.translation = !select.translation"
        >To Japanese translation</SwitchOption
      >

      <ActionButton class="mt-3">Start!</ActionButton>
    </div>
  </div>
</template>

<style scoped>
.level-container .button {
  font-size: 2em;
}
.vocabulary-container .form-select {
  border: 1px solid var(--border-base-color);
  border-radius: 0px;
}
.level-container h4 {
  margin: 0px;
}
.vocabulary-container a {
  text-decoration: none;
}
.link-container {
  margin-right: 1.5em;
}
@media screen and (max-width: 650px) {
  .vocabulary-container {
    width: 100%;
  }
}
@media screen and (min-width: 650px) {
  .vocabulary-container {
    width: 75%;
  }
}
</style>
