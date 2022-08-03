<script setup lang="ts">
import router from '@/router';
import global from '@/storage/Global';
import ReviewCollection from '@/storage/ReviewCollection';

const results: Array<any> = [];
const reviewReport = global.reviewReport;
const reviewCollection = global.reviewCollection;

var correct = 0;
var incorrect = 0;

if (reviewReport && reviewCollection) {
  // make a report from data
  reviewReport.correct.forEach(id => {
    results.push({ target: reviewCollection.pairs[id][0], correct: true }); });
  correct = reviewReport.correct.size;

  reviewReport.incorrect.forEach(id => {
    results.push({ target: reviewCollection.pairs[id][0], correct: false }); });
  incorrect = reviewReport.incorrect.size;
} else {
  // if there is no report is present we should redirect user
  // to the home page
  router.push({ name: "home" });
}

function repeatAll() {
  router.push({ name: "review" });
}

function repeatIncorrect() {
  if (reviewCollection && reviewReport) {

    const collection: Array<Array<string>> = [];
    reviewReport.incorrect.forEach(id => {
      collection.push(reviewCollection.pairs[id]); });
    global.reviewCollection = new ReviewCollection(collection);

    router.push({ name: "review" });
  }
}

function complete() {
  router.push({ name: "home" });
}

</script>

<template>

<div class="container stats-window my-5 d-flex flex-row p-0">
  <div class="bg-success flex-fill p-3 first">{{ correct }} correct</div>
  <div class="bg-danger flex-fill p-3 last">{{ incorrect }} incorrect</div>
</div>

<div class="container report mb-5 p-3">
  <div v-for="result in results" 
    :class="{'report-correct': result.correct, 'report-incorrect': !result.correct }" 
    class="report-item p-1">{{ result.target }}</div>
</div>

<div class="buttons container p-0 mb-5">
  <button @click="repeatAll" class="btn btn-primary btn-lg w-100 p-3"><i class="bi bi-arrow-repeat"></i> Repeat all</button>
  <button @click="repeatIncorrect" 
    v-if="incorrect > 0"
    class="btn btn-primary btn-lg w-100 p-3"><i class="bi bi-arrow-repeat"></i> Repeat incorrect</button>
  <button @click="complete" class="btn btn-primary btn-lg w-100 p-3"><i class="bi bi-arrow-return-left"></i> Complete</button>
</div>

</template>

<style scoped>
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  gap: 1em;
}
.report {
  border-radius: 10px ;
  border: 4px solid rgba(0,0,0,0.1);

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
  background-color: #FEF4DB;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  font-size: 1.2em;
  text-align: center;
}
</style>