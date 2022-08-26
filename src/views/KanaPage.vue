<script setup lang="ts">
import Button from "@/components/Button.vue";
import { database } from "@/core/Database";
import { reactive, ref, watch } from "vue";
import Link from "@/components/Link.vue";
import router from "@/router";
import type { Ref } from "vue";

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

const selected = reactive(new Map<string, boolean>());
const monographsSelected = ref(false);
const diacriticsSelected = ref(false);
const allSelected = ref(false);
const someSelected = ref(false);

const kanaToReview: Ref<string[]> = ref([]);

watch(selected, (m) => {
  monographsSelected.value = monographs.map(k => m.get(k)!).reduce((l, r) => l && r);
  diacriticsSelected.value = diacritics.map(k => m.get(k)!).reduce((l, r) => l && r);
  someSelected.value = monographs.concat(diacritics).map(k => m.get(k)!).reduce((l, r) => l || r);
  allSelected.value = monographsSelected.value && diacriticsSelected.value;

  kanaToReview.value = [];
  m.forEach((v, k) => { if (v) { kanaToReview.value.push(k); }});
});

monographs.forEach(k => selected.set(k, false));
diacritics.forEach(k => selected.set(k, false));

function allKana() { 
  selected.forEach((v, k) => { selected.set(k, !allSelected.value); }); 
};

function allMonographs() {
  monographs.forEach(v => selected.set(v, !monographsSelected.value));
};

function allDiacritics(switched: boolean) {
  diacritics.forEach(v => selected.set(v, !diacriticsSelected.value));
};
</script>

<template>
<div class="d-flex flex-column justify-content-center mb-5 mt-5 pt-5">
  <div class="d-flex flex-row justify-content-center mb-3">
    <Link :to="{ name: 'home', params: { page: 'kana' }}" 
      icon="arrow-left-short" 
      class='text-muted' plain>Go back</Link>
  </div>

  <Button class="mb-3" switch @click="allKana" :switched="allSelected">All {{ name }}</Button>
  <Button class="mb-3" switch @click="allMonographs" :switched="monographsSelected">All Monographs</Button>

  <div class="kana-container">
    <Button v-for="v in monographs" 
      switch 
      :switched="selected.get(v)"
      @click="() => selected.set(v, !selected.get(v)!)">{{ (kana.alphabet as Record<string, any>)[v][0][0] }}</Button>
  </div>

  <Button class="mt-3" switch @click="allDiacritics" :switched="diacriticsSelected">All Diacritics</Button>

  <div class="kana-container mt-3">
    <Button v-for="v in diacritics" 
      switch 
      :switched="selected.get(v)"
      @click="() => selected.set(v, !selected.get(v)!)">{{ (kana.alphabet as Record<string, any>)[v][0][0] }}</Button>
  </div>
  <Link 
    :to="{name: 'review', query: {entries: kanaToReview.toString(), db: name.toLowerCase() }}" 
    class="mt-3" 
    :disabled="!someSelected">
    {{ someSelected ? "Start!" : "Select kana to practice"}}
  </Link>
</div>
</template>

<style scoped>
.kana-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1em;
}
a {
  text-decoration: none;
}
</style>