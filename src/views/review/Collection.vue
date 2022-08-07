<script setup lang="ts">
import database from "@/storage/Database";
import ReviewCollection from "@/storage/ReviewCollection";

const props = defineProps<{
  redirectTo: (page: string) => void
  setCollection: (collection: ReviewCollection) => void,
}>();

function startReview(collection: Array<Array<string>>, kana: string = "romanji") {
  props.setCollection(new ReviewCollection(collection, kana));
  props.redirectTo("review");
}

const hiraganaMonographs = () => startReview(database.hiragana.monographs.main);
const hiraganaMonographsPlus = () => startReview(database.hiragana.monographs.digraphs);
const hiraganaDiacritics = () => startReview(database.hiragana.diacritics.main);
const hiraganaDiacriticsPlus = () => startReview(database.hiragana.diacritics.digraphs);
const hiraganaAllMonographs = () => startReview(database.hiragana.monographs.all);
const hiraganaAllDiacritics = () => startReview(database.hiragana.diacritics.all);
const hiraganaAll = () => startReview(database.hiragana.all);
const words1 = () => startReview(database.wanikani.words[0], "hiragana");
</script>

<template>
<div class="collection-title container text-center d-flex flex-row">
  <div><h2>Hiragana</h2></div>
  <div class="w-100 mb-3 ms-3 line"></div>
</div>

<div class="collection container p-3 ">
  <div class="w-100 buttons">
    <button @click="hiraganaMonographs" class="btn btn-lg btn-primary"><div class="m">あ</div>Monographs</button>
    <button @click="hiraganaMonographsPlus" class="btn btn-lg btn-primary"><div class="m">きゅ</div>Monographs+</button>
    <button @click="hiraganaDiacritics" class="btn btn-lg btn-primary"><div class="m">が</div>Diacritics</button>
    <button @click="hiraganaDiacriticsPlus" class="btn btn-lg btn-primary"><div class="m">じゅ</div>Diacritics+</button>
    <button @click="hiraganaAllMonographs" class="btn btn-lg btn-primary"><div class="m">ちゃ</div>All monographs</button>
    <button @click="hiraganaAllDiacritics" class="btn btn-lg btn-primary"><div class="m">ぎゃ</div>All diacritics</button>
    <button @click="hiraganaAll" class="btn btn-lg btn-primary"><div class="m">あえ</div>All hiragana</button>
  </div>
</div>

<div class="collection-title container text-center d-flex flex-row mt-5">
  <div><h2>WaniKani&nbsp;Vocabularity</h2></div>
  <div class="w-100 mb-3 ms-3 line"></div>
</div>

<div class="collection container p-3">
  <div class="w-100 buttons">
    <button @click="words1" class="btn btn-lg btn-primary"><div class="m">人工</div> Level 1</button>
    <button class="btn btn-lg btn-primary disabled"><div class="m">四月</div> Level 2</button>
    <button class="btn btn-lg btn-primary disabled"><div class="m">半分</div> Level 3</button>
    <button class="btn btn-lg btn-primary disabled"><div class="m">元気</div> Level 4</button>
  </div>
</div>
</template>

<style scoped>
.line {
  border-block-end: 4px solid rgba(0,0,0,0.1);
}
.collection-title {
  color: rgba(0,0,0,0.75);
}

.collection {
  text-align: center;
  border-block-start-width: 0px;
}
.collection .btn {
  position: relative;
}
.m {
  position: absolute;
  font-size: 1.3em;
  top: 50%;
  transform: translateY(-50%);
}
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17em, 1fr));
  gap: 1em;
}
</style>