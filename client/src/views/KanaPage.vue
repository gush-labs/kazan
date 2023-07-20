<script setup lang="ts">
import { computed } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import { database } from "@/core/Database";
import router from "@/router";
import type { RouteLocationRaw } from "vue-router";
import DisplayContainer from "@/components/DisplayContainer.vue";
import { useStorage } from "@vueuse/core"

const monographs: string[] = [
  "a", "ka", "sa", "ta", "na", 
  "ha", "ma", "ya", "ra", "wa",
  "kya", "sha", "cha", "nya", "hya",
  "mya", "rya"]

const diacritics: string[] = [
  "ga", "za", "da", "ba", "pa",
  "gya", "jya1", "jya2", "bya", "pya" ]

const param = router.currentRoute.value.params.kana?.toString() ?? "katakana";
const kana = param === "hiragana" ? database.hiragana : database.katakana;
const name = param === "hiragana" ? "hiragana" : "katakana";

// Object that we use to store selected kana on the page
// TODO(vadim): This should be replace with Map<>
type KanaPageState = {
  raw: { kana: string, selected: boolean }[];
}

// Sync selected kana on the page with the browser storage
// TODO(vadim): Versioning!
const state = useStorage<KanaPageState>(name + "-selected", { raw: []});

function set(state: KanaPageState, kana: string, selected: boolean) {
  state.raw = state.raw.filter(v => v.kana !== kana);
  state.raw.push({ kana, selected });
}

function get(state: KanaPageState, kana: string): boolean {
  const entry = state.raw.find(v => v.kana == kana);
  return entry ? entry.selected : false;
}

function selected(state: KanaPageState): string[] {
  return state.raw.filter(v => v.selected).map(v => v.kana);
}

// TODO(vadim): Everything below should be refactored
const monographsSelected = computed(() => monographs.map(k => get(state.value, k)).reduce((l, r) => l && r));
const diacriticsSelected = computed(() => diacritics.map(k => get(state.value, k)).reduce((l, r) => l && r));
const anySelected = computed(() => selected(state.value).length > 0);
const kanaToReview = computed(() => selected(state.value));

function allMonographs() {
  const select = monographsSelected.value;
  monographs.forEach(v => set(state.value, v, !select));
};

function allDiacritics() {
  const select = diacriticsSelected.value;
  diacritics.forEach(v => set(state.value, v, !select));
};

function clearAll() {
  monographs.concat(diacritics).forEach(k => set(state.value, k, false));
}

function goTo(path: RouteLocationRaw) {
  router.push(path);
}
</script>

<template>
<DisplayContainer center class="pt-4">

  <div class="header-container text-center mb-3 pb-1">
    <div></div>
    <div><h4 class="m-0">Select {{ name }}</h4></div>
    <div>
      <ActionButton class='text-muted h-100' plain @click="clearAll"><i class="bi bi-trash"></i></ActionButton>
    </div>
  </div>

  <ActionButton class="kana-title" switch @click="allMonographs" :switched="monographsSelected">All Monographs</ActionButton>

  <div class="kana-container japanese">
    <ActionButton v-for="v, i in monographs"
      :key="i"
      switch 
      :switched="get(state, v)"
      @click="() => set(state, v, !get(state, v))">{{ (kana.alphabet as Record<string, any>)[v][0][0] }}</ActionButton>
  </div>

  <ActionButton class="kana-title mt-4" switch @click="allDiacritics" :switched="diacriticsSelected">All Diacritics</ActionButton>

  <div class="kana-container japanese">
    <ActionButton v-for="v, i in diacritics" 
      :key="i"
      switch 
      :switched="get(state, v)"
      @click="() => set(state, v, !get(state, v))">{{ (kana.alphabet as Record<string, any>)[v][0][0] }}</ActionButton>
  </div>

  <ActionButton
    @click="() => goTo({name: 'review', query: {entries: kanaToReview.toString(), db: name }})" 
    class="start-button mt-4 kz-success" 
    :disabled="!anySelected">
    Start!
  </ActionButton>

</DisplayContainer>
</template>

<style scoped>
.header-container {
  display: grid;
  grid-template-columns: 3em 1fr 3em;
}
.kana-title {
  margin-bottom: var(--default-grid-gap);
}
.kana-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--default-grid-gap);
}
</style>