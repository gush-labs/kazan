<script setup lang="ts">
import { computed } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import { database } from "@/core/Database";
import PageLink from "@/components/PageLink.vue";
import router from "@/router";
import { Storage } from "@/core/Storage";

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
const name = param === "hiragana" ? "Hiragana" : "Katakana";

type KanaPageState = {
  raw: { kana: string, selected: boolean }[];
}

function set(state: KanaPageState, kana: string, selected: boolean) {
  const entry = state.raw.find(v => v.kana == kana);
  if (entry) {
    entry.selected = selected;
  } else {
    state.raw.push({kana, selected});
  }
}

function get(state: KanaPageState, kana: string): boolean {
  const entry = state.raw.find(v => v.kana == kana);
  return entry ? entry.selected : false;
}

function selected(state: KanaPageState): string[] {
  return state.raw.filter(v => v.selected).map(v => v.kana);
}

const state = Storage.getObject<KanaPageState>(name.toLowerCase() + "-selected", { raw: [] });
const monographsSelected = computed(() => monographs.map(k => get(state, k)).reduce((l, r) => l && r));
const diacriticsSelected = computed(() => diacritics.map(k => get(state, k)).reduce((l, r) => l && r));
const anySelected = computed(() => selected(state).length > 0);
const kanaToReview = computed(() => selected(state));

function allMonographs() {
  const select = monographsSelected.value;
  monographs.forEach(v => set(state, v, !select));
};

function allDiacritics() {
  const select = diacriticsSelected.value;
  diacritics.forEach(v => set(state, v, !select));
};

function clearAll() {
  monographs.concat(diacritics).forEach(k => set(state, k, false));
}
</script>

<template>
<div class="d-flex flex-column justify-content-center mb-5 mt-5 pt-5">

  <div class="navigation-container d-flex flex-row justify-content-center mb-2">
    <PageLink :to="{ name: 'home', params: { page: 'kana' }}" 
      icon="arrow-left-short" 
      class='text-muted back-button' plain>Go back</PageLink>
  </div>

  <div class="header-container text-center mb-3 pb-1">
    <div></div>
    <div><h4 class="m-0">Select {{ name.toLowerCase() }}</h4></div>
    <div>
      <ActionButton class='text-muted h-100' plain @click="clearAll"><i class="bi bi-trash"></i></ActionButton>
    </div>
  </div>

  <ActionButton class="mb-3" switch @click="allMonographs" :switched="monographsSelected">All Monographs</ActionButton>

  <div class="kana-container">
    <ActionButton v-for="v, i in monographs"
      :key="i"
      switch 
      :switched="get(state, v)"
      @click="() => set(state, v, !get(state, v))">{{ (kana.alphabet as Record<string, any>)[v][0][0] }}</ActionButton>
  </div>

  <ActionButton class="mt-3" switch @click="allDiacritics" :switched="diacriticsSelected">All Diacritics</ActionButton>

  <div class="kana-container mt-3">
    <ActionButton v-for="v, i in diacritics" 
      :key="i"
      switch 
      :switched="get(state, v)"
      @click="() => set(state, v, !get(state, v))">{{ (kana.alphabet as Record<string, any>)[v][0][0] }}</ActionButton>
  </div>

  <PageLink 
    :to="{name: 'review', query: {entries: kanaToReview.toString(), db: name.toLowerCase() }}" 
    class="mt-3 start-button" 
    :disabled="!anySelected">
    Start!
  </PageLink>
</div>
</template>

<style scoped>
.back-button {
  margin-right: 1.5em;
}
.header-container {
  display: grid;
  grid-template-columns: 3em 1fr 3em;
}
.kana-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1em;
}
a {
  text-decoration: none;
}
</style>