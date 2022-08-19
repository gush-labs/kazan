<script setup lang="ts">
import { ref } from "vue";
import { database, generateCards } from "@/storage/Database";
import { Review, RandomPicker } from "@/storage/Review";
import ReportView from "@/views/review/ReportView.vue";
import translator from "@/language/Translator.js";
import router from "@/router";

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

const dbQuery = router.currentRoute.value.query.db?.toString() ?? "allHiragana";
if (dbQuery == "allHiragana") { startReview(createReview(db.hiragana.all)); }
if (dbQuery == "allMonographs") { startReview(createReview(db.hiragana.monographs.all)); }
if (dbQuery == "allDiacritics") { startReview(createReview(db.hiragana.diacritics.all)); }
if (dbQuery == "wkLevel1") { startReview(createReview(db.kanji.wanikani[0], "hiragana")); }
if (dbQuery == "wkLevel2") { startReview(createReview(db.kanji.wanikani[1], "hiragana")); }
if (dbQuery == "test") { startReview(createReview(db.kanji.wanikani[0].slice(0, 2), "hiragana")); }


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

  if (rev.complete()) {
    complete.value = true;
  }
}
</script>

<template>
  <div v-if="!complete" class="d-flex flex-column justify-content-center">
    <div :class="{ wrong: wrong }" class="review-window text-center">
      <div class="review-title d-flex flex-column justify-content-end">
        <div></div>
      </div>
      <div>
        <h1 class="review-target">{{ card.target }}</h1>
      </div>
      <div class="review-answer d-flex flex-column justify-content-start">
        <div v-if="wrong">{{ card.answer }}</div>
      </div>
    </div>

    <div class="answer-container mb-3 mt-3">
      <form @submit="checkAnswer">
        <input
          v-model="input"
          @input="onChange"
          class="answer-form form-control"
          placeholder=""
        />
      </form>
    </div>

    <div class="stats-window mb-5">
      <div class="completed">
        <i class="bi bi-circle"></i> {{ review.getCorrect() }} completed
      </div>
      <div class="">{{ Math.round(review.progress() * 100) }}%</div>
      <div class="mistakes">
        <i class="bi bi-x-lg"></i> {{ review.getIncorrect() }} mistakes
      </div>
    </div>
  </div>

  <ReportView v-if="complete" @start="startReview" :review="review" />
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
  color: rgb(176, 56, 56) !important;
}

.stats-window {
  border-radius: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.stats-window .completed {
  color: rgb(25, 79, 13);
}
.stats-window .mistakes {
  color: rgb(82, 17, 17);
}

.review-window {
  display: grid;
  grid-template-rows: 2em 1fr 2em;
}
.review-window .review-target {
  font-size: 4.5em;
  font-weight: normal;
  margin: 0;
}
.review-window .review-answer {
  font-weight: bold;
  font-size: 1.5em;
}

.answer-container .answer-form {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  text-align: center;
  font-size: 2em;
}

textarea:focus,
input:focus {
  outline: none;
}
</style>
