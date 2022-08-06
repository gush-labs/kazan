<script setup lang="ts">
import { reactive, ref } from "vue";
import type ReviewCollection from '@/storage/ReviewCollection';
import ReviewCounter from '@/storage/ReviewCounter';
import ReviewReport from "@/storage/ReviewReport";
import translator from "@/language/Translator.js";

const props = defineProps<{
  redirectTo: (page: string) => void,
  setReport: (report: ReviewReport) => void,
  collection: ReviewCollection,
}>();

const collection = props.collection;
const card = ref(collection.take());
const counter = reactive(new ReviewCounter(collection.size(), 1));
const input = ref("");
const wrong = ref(false);

function onChange() {
  if (collection.typeHiragana) {
    const inputText = input.value.split(" ").join("");
    input.value = translator.toHiragana(inputText);
  }
}

function checkAnswer(e: any) {
  e.preventDefault();

  // remove all spaces from the input
  const inputText = input.value.split(" ").join("");

  if (inputText != "" && !wrong.value) {
    // verify the current review card
    const correct = collection.verify(card.value, inputText);
    if (correct) { 
      // take a new one if it's correct
      counter.addCorrect(card.value); 
      card.value = collection.take();
      input.value = ""; 
    } else { 
      // otherwise we want to show the correct answer 
      wrong.value = true;
      counter.addIncorrect(card.value); 
    }
  } else if (wrong.value) {
    wrong.value = false;
    card.value = collection.take();
    input.value = "";
  }

  if (counter.getProgress() >= 100) {
    props.setReport(new ReviewReport(counter.getCorrectCards(), counter.getIncorrectCards()));
    props.redirectTo("report");
  }
}
</script>

<template>

<div class="container p-0 mt-5">
  <div class="progress">
    <div class="progress-bar progress-bar-striped" role="progressbar" :style="{'width': counter.getProgress() + '%'}" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>

<div class="stats-window container p-0 d-flex flex-row">
  <div class="bg-success flex-fill p-3 first">{{ counter.getCorrect() }} correct</div>
  <div class="bg-danger flex-fill p-3 last">{{ counter.getIncorrect() }} incorrect</div>
</div>

<div :class="{ 'wrong': wrong }" class="review-window mt-0 container text-center p-5">
 <div class="review-target">{{ card.target }}</div>
 <div v-if="wrong" class="review-answer"><span class="badge text-bg-light">{{ card.answer }}</span></div>
</div>

<div class="container p-0">
  <form @submit="checkAnswer" class="mt-5">
    <input v-model="input" 
      @input="onChange"
      :class="{ 'wrong': wrong }" 
      class="answer-form p-4 form-control form-control-lg text-center" placeholder="" />
  </form>
</div>
</template>

<style scoped>
.progress {
  background-color: #e1d7c0;
  border-radius: 10px 10px 0px 0px;
}
.progress-bar {
  background-color: #b6ab90;
}
.wrong {
  background-color: rgba(255,150,150,1) !important;
}
.stats-window {
  background-color: #FEF4DB;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  font-size: 1.2em;
  text-align: center;
}
.review-answer {
  font-size: 2em;
  position: absolute;
  right: 50%;
  transform: translate(50%, -0.5em);
}

.review-window {
  background-color: #FEF4DB;
  border-radius: 0px 0px 10px 10px;
  border: 4px solid rgba(0,0,0,0.1);
  border-block-start: 0px;
}
.review-target {
  font-size: 5em;
}
.answer-form {
  border: 4px solid rgba(0,0,0,0.1);
  font-size: 2em;
  border-radius: 10px;
}
textarea:focus, input:focus{
    outline: none;
}
</style>
