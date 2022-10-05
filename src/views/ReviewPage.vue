<script setup lang="ts">
import { database, generateCards } from "@/core/Database";
import { Review, RandomPicker, ReviewCard } from "@/core/Review";
import ReviewCreator from "@/core/ReviewCreator";
import ReportView from "@/views/review/ReportView.vue";
import Language from "@/core/Language";
import router from "@/router";
import { ref, computed } from "vue";
import { parseParams } from "@/core/reviews/Creator";

function createReview(
  collection: Array<Array<string>>,
  kana = "romanji"
): Review {
  return new Review(new RandomPicker(generateCards(collection)), kana);
}

const db = database;
const review = ref(createReview(db.hiragana.all));
const card = ref<ReviewCard>(review.value.take());
const input = ref("");
const wrong = ref(false);
const complete = ref(false);
const error = ref<string | undefined>(undefined);
const typeName = computed(() => {
  switch (card.value.type) {
    case "meaning":
      return "Meaning";
    case "reading":
      return "Reading";
    case "translation":
      return "In Japanese";
  }
  return "";
});

function startReview(r: Review) {
  review.value = r;
  input.value = "";
  wrong.value = false;
  complete.value = false;
  card.value = review.value.take();
}

// Take the review ID and review parameters from URL parameters
const reviewId = router.currentRoute.value.query.review?.toString();
const reviewParams = router.currentRoute.value.query.params?.toString();
if (reviewId && reviewParams) {
  const [reviewCreatorParams, reviewCreatorRawParams] =
    parseParams(reviewParams);
  const review = ReviewCreator.create(
    reviewId,
    reviewCreatorParams,
    reviewCreatorRawParams
  );
  if (review) {
    startReview(review);
  }
}

// ===> EVERYTHING BELOW SHOULD BE DELETED <===

// TODO: Move this logic to the database selector (create a new class for that)
const queryTable =
  router.currentRoute.value.query.db?.toString() ?? "allHiragana";
if (queryTable == "wkLevel1") {
  startReview(createReview(db.vocabular.wanikani[0], "hiragana"));
}
if (queryTable == "wkLevel2") {
  startReview(createReview(db.vocabular.wanikani[1], "hiragana"));
}
if (queryTable == "test") {
  startReview(createReview(db.vocabular.wanikani[0].slice(0, 2), "hiragana"));
}

const queryEntries =
  router.currentRoute.value.query.entries?.toString().split(",") ?? [];
if (queryEntries.length > 0) {
  if (queryTable == "hiragana") {
    startReview(
      createReview(
        queryEntries
          .map((q) => (db.hiragana.alphabet as Record<string, string[][]>)[q])
          .reduce((l, r) => l.concat(r))
      )
    );
  }
  if (queryTable == "katakana") {
    startReview(
      createReview(
        queryEntries
          .map((q) => (db.katakana.alphabet as Record<string, string[][]>)[q])
          .reduce((l, r) => l.concat(r))
      )
    );
  }
}

// =============> EVERYTHING ABOVE SHOULD BE REMOVED <=================

function onChange() {
  let inputText = input.value;
  const kanaInput =
    card.value.input == "hiragana" || card.value.input == "katakana";

  if (kanaInput) {
    // remove spaces from kana input
    const inputCharacters = input.value.split("").filter((c) => c != " ");
    inputText =
      inputCharacters.length > 0 ? inputCharacters.reduce((l, r) => l + r) : "";
  }

  if (card.value.input == "hiragana") {
    input.value = Language.toHiragana(inputText);
  } else if (card.value.input == "katakana") {
    input.value = Language.toKatakana(inputText);
  }

  if (Language.kanaOnly(inputText) || Language.latinOnly(inputText)) {
    error.value = undefined;
  }
}

function checkAnswer(e: Event) {
  e.preventDefault();
  const rev = review.value;

  const inputCharacters = input.value.split(" ").filter((c) => c != "");
  let inputText =
    inputCharacters.length > 0
      ? inputCharacters.reduce((l, r) => l + " " + r)
      : "";

  if (card.value.input == "hiragana") {
    inputText = Language.completeHiragana(inputText);
  } else if (card.value.input == "katakana") {
    inputText = Language.completeKatakana(inputText);
  }

  const kanaInput =
    card.value.input == "hiragana" || card.value.input == "katakana";

  if (inputText.length == 0) {
    error.value = "Answer can't be empty";
    return;
  } else if (kanaInput && !Language.kanaOnly(inputText)) {
    error.value = "Answer should contain only kana";
    return;
  } else if (!kanaInput && !Language.latinOnly(inputText)) {
    error.value = "Answer should have only latin characters or spaces";
    return;
  } else {
    error.value = undefined;
  }

  if (!wrong.value) {
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
      <div class="d-flex flex-column justify-content-end fw-bold"></div>
      <div>
        <h1 class="review-target japanese">{{ card.question }}</h1>
      </div>
      <div
        class="review-answer d-flex flex-row justify-content-center flex-wrap"
      >
        <div v-if="!wrong && card.note == ''" class="empty">empty</div>

        <!-- TODO: Don't take additional space if there are no cards with notes -->
        <div v-if="!wrong && card.note != ''" class="note text-muted">
          {{ card.note }}
        </div>
        <div
          v-if="wrong"
          class="d-flex flex-row justify-content-center flex-wrap"
        >
          <div
            v-for="answer in card.shownAnswers"
            :key="answer"
            class="ms-2 me-2"
          >
            {{ answer }}
          </div>
        </div>
      </div>
    </div>

    <div class="answer-container mb-3 mt-3">
      <div
        class="card-type p-1"
        :class="{ 'card-type-reading': card.type == 'reading' }"
      >
        {{ typeName }}
      </div>
      <form @submit="checkAnswer">
        <input
          v-model="input"
          @input="onChange"
          class="kz-input answer-form japanese w-100 p-2"
          placeholder=""
          spellcheck="false"
        />
      </form>
    </div>

    <div v-if="error" class="error-window mb-5 text-center">
      <i class="bi bi-exclamation-circle"></i>
      {{ error }}
    </div>

    <div v-if="error == undefined" class="stats-window mb-5">
      <div class="kz-text-success">
        <i class="bi bi-check-circle me-1"></i>
        {{ review.getCorrectCards().length }}
        <span class="stats-text">completed</span>
      </div>
      <div>{{ Math.floor(review.progress() * 100) }}%</div>
      <div class="kz-text-error">
        <i class="bi bi-x-circle me-1"></i>
        {{ review.getIncorrectCards().length }}
        <span class="stats-text">mistakes</span>
      </div>
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
.card-type {
  display: block;
  border: var(--input-border-width) solid var(--input-border-color);
  border-top-left-radius: var(--button-border-radius);
  border-top-right-radius: var(--button-border-radius);
  border-bottom: none !important;
  text-align: center;
}
.card-type-reading {
  background-color: var(--button-active-color);
  border: 1px solid rgba(0, 0, 0, 0);
  color: var(--button-active-text-color);
}
.review-window {
  display: grid;
  grid-template-rows: 2em 1fr auto;
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

.review-answer .empty {
  opacity: 0;
}

.answer-container .answer-form {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  text-align: center;
  font-size: 2em;
}
.anwer-container .answer-form:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

textarea:focus,
input:focus {
  outline: none;
}

@media screen and (max-width: 650px) {
  .stats-text {
    display: none;
  }
}
</style>
