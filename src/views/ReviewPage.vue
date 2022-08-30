<script setup lang="ts">
import { database, generateCards } from "@/core/Database";
import { Review, RandomPicker } from "@/core/Review";
import ReportView from "@/views/review/ReportView.vue";
import translator from "@/language/Translator.js";
import router from "@/router";
import { ref } from "vue";

function createReview(collection: Array<Array<string>>, kana = "romanji"): Review {
  return new Review(new RandomPicker(generateCards(collection)), kana);
}

const db = database;
const review = ref(createReview(db.hiragana.all));
const card = ref(review.value.take());
const input = ref("");
const wrong = ref(false);
const complete = ref(false);

function startReview(r: Review) {
  review.value = r;
  input.value = "";
  wrong.value = false;
  complete.value = false;
  card.value = review.value.take();
}

// TODO: Move this logic to the database selector (create a new class for that)
const queryTable = router.currentRoute.value.query.db?.toString() ?? "allHiragana";
if (queryTable == "wkLevel1") { startReview(createReview(db.vocabular.wanikani[0], "hiragana")); }
if (queryTable == "wkLevel2") { startReview(createReview(db.vocabular.wanikani[1], "hiragana")); }
if (queryTable == "test") { startReview(createReview(db.vocabular.wanikani[0].slice(0, 2), "hiragana")); }

const queryEntries = router.currentRoute.value.query.entries?.toString().split(",") ?? [];
if (queryEntries.length > 0) {
  if (queryTable == "hiragana") { 
    startReview(createReview(queryEntries
      .map(q => (db.hiragana.alphabet as Record<string, any>)[q])
      .reduce((l, r) => l.concat(r)))); 
  }
  if (queryTable == "katakana") { 
    startReview(createReview(queryEntries
      .map(q => (db.katakana.alphabet as Record<string, any>)[q])
      .reduce((l, r) => l.concat(r)))); 
  }
}

function onChange() {
  const inputText = input.value.split(" ").join("");
  if (review.value.kana == "hiragana") {
    input.value = translator.toHiragana(inputText);
  } else if (review.value.kana == "katakana") {
    input.value = translator.toKatakana(inputText);
  }
}

function checkAnswer(e: any) {
  e.preventDefault();
  const rev = review.value;

  // remove all spaces from the input
  let inputText = input.value.split(" ").join("");
  if (rev.kana == "hiragana") inputText = translator.completeHiragana(inputText);
  if (rev.kana == "katakana") inputText = translator.completeKatakana(inputText);

  if (inputText != "" && !wrong.value) {
    // verify the current review card
    const correct = rev.verify(card.value, inputText);
    if (correct) {
      // take a new one if it's correct
      card.value = rev.take();
      input.value = "";
    } else {
      // otherwise we want to show the correct answer
      wrong.value = true;
    }
  } else if (wrong.value) {
    wrong.value = false;
    card.value = rev.take();
    input.value = "";
  }

  complete.value = rev.completed();
}
</script>

<template>
  <div v-if="!complete" class="d-flex flex-column justify-content-center">
    <div :class="{ 'kz-text-dunger': wrong }" class="review-window text-center">
      <div class="d-flex flex-column justify-content-end fw-bold">
        <div>{{ card.type }}</div>
      </div>
      <div><h1 class="review-target japanese">{{ card.target }}</h1></div>
      <div class="review-answer d-flex flex-column justify-content-start">
        <div v-if="wrong">{{ card.answer }}</div>
      </div>
    </div>

    <div class="answer-container mb-3 mt-3">
      <form @submit="checkAnswer">
        <input
          v-model="input"
          @input="onChange"
          class="answer-form form-control japanese"
          placeholder=""
          spellcheck="false"
        />
      </form>
    </div>

    <div class="stats-window mb-5">
      <div class="kz-text-success"><i class="bi bi-circle"></i> {{ review.getCorrectCards().length }} completed</div>
      <div>{{ Math.floor(review.progress() * 100) }}%</div>
      <div class="kz-text-error"><i class="bi bi-x-lg"></i> {{ review.getIncorrectCards().length }} mistakes</div>
    </div>
  </div>

  <ReportView v-if="complete" @start="startReview" :review="review" />
</template>

<style scoped>
.stats-window {
  border-radius: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.review-window {
  display: grid;
  grid-template-rows: 2em 1fr 2em;
}
.review-window .review-target {
  font-size: 4.5em;
  font-weight: 400;
  margin: 0;
}
.review-window .review-answer {
  font-weight: bold;
  font-size: 1.5em;
}

.answer-container .answer-form {
  border: 1px solid var(--border-base-color);
  border-radius: 0px;
  text-align: center;
  font-size: 2em;
}

textarea:focus, input:focus {
  outline: none;
}
</style>
