<script setup lang="ts">
import { generateCards, database } from "@/storage/Database";
import { Review, RandomPicker } from "@/storage/Review";
import Button from "../../components/Button.vue";

const props = defineProps<{
  redirectTo: (page: string) => void;
  setReview: (review: Review) => void;
}>();

function startReview(collection: Array<Array<string>>, kana = "romanji") {
  props.setReview(new Review(new RandomPicker(generateCards(collection)), kana));
  props.redirectTo("review");
}

const db = database;
</script>

<template>
  <div class="collection-title container text-center d-flex flex-row">
    <div><h2>Hiragana</h2></div>
    <div class="w-100 mb-3 ms-3 line"></div>
  </div>

  <div class="collection container p-3">
    <div class="w-100 buttons">
      <Button @click="() => startReview(db.hiragana.monographs.main)" label="あ">Monographs</Button>
      <Button @click="() => startReview(db.hiragana.monographs.digraphs)" label="きゅ">Digraphs</Button>
      <Button @click="() => startReview(db.hiragana.diacritics.main)" label="が">Diacritics</Button>
      <Button @click="() => startReview(db.hiragana.diacritics.digraphs)" label="じゅ">Digraphs</Button>
      <Button @click="() => startReview(db.hiragana.monographs.all)" label="ちゃ">All Monographs</Button>
      <Button @click="() => startReview(db.hiragana.diacritics.all)" label="ぎゃ">All Digraphs</Button>
      <Button @click="() => startReview(db.hiragana.all)" label="あえ">All Hiragana</Button>
    </div>
  </div>

  <div class="collection-title container text-center d-flex flex-row mt-5">
    <div><h2>Kanji</h2></div>
    <div class="w-100 mb-3 ms-3 line"></div>
  </div>

  <div class="collection container p-3">
    <div class="w-100 buttons">
      <Button @click="() => startReview(db.kanji.numbers.kanji, 'hiragana')" label="十二">Basic Numbers</Button>
      <Button @click="() => startReview(db.kanji.numbers.things, 'hiragana')" label="一人">Count Things</Button>
      <Button @click="() => startReview(db.kanji.wanikani[0], 'hiragana')" label="人工">Wanikani L1</Button>
      <Button @click="() => startReview(db.kanji.wanikani[1], 'hiragana')" label="四月">Wanikani L2</Button>
    </div>
  </div>

  <div class="collection-title container text-center d-flex flex-row mt-5">
    <div><h2>Grammar</h2></div>
    <div class="w-100 mb-3 ms-3 line"></div>
  </div>

  <div class="collection container p-3">
    <div class="w-100 buttons">
      <Button label="良い" disabled>い Adjectives</Button>
      <Button label="大好き" disabled>な Adjectives</Button>
      <Button label="食べる" disabled>る Verb</Button>
      <Button label="聞く" disabled>う Verb</Button>
    </div>
  </div>

</template>

<style scoped>
.line {
  border-block-end: 4px solid rgba(0, 0, 0, 0.1);
}
.collection-title {
  color: rgba(0, 0, 0, 0.75);
}
.collection {
  text-align: center;
  border-block-start-width: 0px;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17em, 1fr));
  gap: 1em;
}
</style>
