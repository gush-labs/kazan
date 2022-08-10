<script setup lang="ts">
import ReviewCollection from "@/storage/ReviewCollection";
import type ReviewReport from "@/storage/ReviewReport.js";

const props = defineProps<{
  setCollection: (collection: ReviewCollection) => void;
  redirectTo: (page: string) => void;
  collection: ReviewCollection;
  report: ReviewReport;
}>();

const report = props.report;
const collection = props.collection;
const correct = report.correct.size;
const incorrect = report.incorrect.size;

const cards: Array<any> = [];
report.correct.forEach((id) =>
  cards.push({ target: collection.pairs[id][0], correct: true })
);
report.incorrect.forEach((id) =>
  cards.push({ target: collection.pairs[id][0], correct: false })
);

const repeatAll = () => props.redirectTo("review");
const complete = () => props.redirectTo("collection");

function repeatIncorrect() {
  const newCollection: Array<Array<string>> = [];
  report.incorrect.forEach((id) => newCollection.push(collection.pairs[id]));
  props.setCollection(new ReviewCollection(newCollection, collection.kana));
  props.redirectTo("review");
}
</script>

<template>
  <div class="container stats-window my-5 d-flex flex-row p-0">
    <div class="bg-success flex-fill p-3 first">{{ correct }} correct</div>
    <div class="bg-danger flex-fill p-3 last">{{ incorrect }} incorrect</div>
  </div>

  <div class="container report mb-5 p-3">
    <div
      v-for="result in cards"
      :class="{
        'report-correct': result.correct,
        'report-incorrect': !result.correct,
      }"
      class="report-item p-1"
    >
      {{ result.target }}
    </div>
  </div>

  <div class="buttons container p-0 mb-5">
    <button @click="repeatAll" class="btn btn-primary btn-lg w-100 p-3">
      <i class="bi bi-arrow-repeat"></i> Repeat all
    </button>
    <button
      @click="repeatIncorrect"
      v-if="incorrect > 0"
      class="btn btn-primary btn-lg w-100 p-3"
    >
      <i class="bi bi-arrow-repeat"></i> Repeat incorrect
    </button>
    <button @click="complete" class="btn btn-primary btn-lg w-100 p-3">
      <i class="bi bi-arrow-return-left"></i> Complete
    </button>
  </div>
</template>

<style scoped>
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  gap: 1em;
}
.report {
  border-radius: 10px;
  border: 4px solid rgba(0, 0, 0, 0.1);

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  gap: 1em;
}
.report-item {
  color: white;
  font-size: 1.5em;
  text-align: center;
  border-radius: 10px;
}
.report-correct {
  background-color: rgb(107, 174, 107);
}
.report-incorrect {
  background-color: rgb(189, 108, 108);
}

.stats-window .first {
  border-radius: 10px 0px 0px 10px;
}
.stats-window .last {
  border-radius: 0px 10px 10px 0px;
}
.stats-window {
  background-color: #fef4db;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  font-size: 1.2em;
  text-align: center;
}
</style>
