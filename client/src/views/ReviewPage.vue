<script setup lang="ts">
import { database, generateCards } from "@/core/Database";
import { Review, RandomPicker, ReviewCard } from "@/core/Review";
import Reviews from "@/core/Reviews";
import ReportView from "@/views/review/ReportView.vue";
import Language from "@/core/Language";
import router from "@/router";
import { ref, computed } from "vue";
import { parseParams } from "@/core/reviews/Creator";
import ActionButton from "@/components/ActionButton.vue";
import { Application } from "@/core/Application";

function createReview(
  collection: Array<Array<string>>,
  kana = "romanji"
): Review {
  return new Review(new RandomPicker(generateCards(collection)), kana);
}

const showReport = ref(false);
const wrongAnswer = ref(false);
const questionFontSize = ref("4em");
const questionFontWeight = ref("bold");
const showAnswer = ref(false);
const answerInput = ref("");
const error = ref<string | undefined>(undefined);

const db = database;
const review = ref(createReview(db.hiragana.all));

const card = ref<ReviewCard>(review.value.take());
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

function takeCard(review: Review) {
  // Take a new card from the review queue
  card.value = review.take();

  // Redefine all variables which describe state of the
  // currently shown card
  showAnswer.value = Application.configuration.showAnswers;
  wrongAnswer.value = false;
  answerInput.value = "";

  // Resize text for the card
  const sf = 20;
  const length = card.value ? card.value.question.length : 0;
  questionFontSize.value =
    Math.max(2, 2 * (Math.max(0, sf - length) / sf) + 2) + "em";
  const latin = Language.latinOnly(card.value ? card.value.question : "");
  questionFontWeight.value = latin ? "bold" : "normal";
}

function startReview(r: Review) {
  review.value = r;
  showReport.value = false;
  takeCard(review.value);
}

// Take the review ID and review parameters from URL parameters
const reviewId = router.currentRoute.value.query.review?.toString();
const reviewParams = router.currentRoute.value.query.params?.toString();
if (reviewId && reviewParams) {
  const [reviewCreatorParams, reviewCreatorRawParams] =
    parseParams(reviewParams);
  const review = Reviews.create(
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

function onAnswerInput() {
  let inputText = answerInput.value;
  const kanaInput =
    card.value.input == "hiragana" || card.value.input == "katakana";

  if (kanaInput) {
    // remove spaces from kana input
    const inputCharacters = answerInput.value.split("").filter((c) => c != " ");
    inputText =
      inputCharacters.length > 0 ? inputCharacters.reduce((l, r) => l + r) : "";
  }

  if (card.value.input == "hiragana") {
    answerInput.value = Language.toHiragana(inputText);
  } else if (card.value.input == "katakana") {
    answerInput.value = Language.toKatakana(inputText);
  }

  if (Language.kanaOnly(inputText) || Language.latinOnly(inputText)) {
    error.value = undefined;
  }
}

function checkAnswer(e: Event) {
  e.preventDefault();
  const rev = review.value;

  const inputCharacters = answerInput.value.split(" ").filter((c) => c != "");
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

  // If we're currently showing that the answer was wrong
  if (wrongAnswer.value) {
    // Clear the input and take a new card
    takeCard(rev);
    wrongAnswer.value = false;
    answerInput.value = "";
  } else {
    // Otherwise verify the current review card
    const correctAnswer = rev.verify(card.value, inputText);
    if (correctAnswer) {
      // take a new one if it's correct
      takeCard(rev);
      answerInput.value = "";
    } else {
      // otherwise we want to show the correct answer
      wrongAnswer.value = true;
    }
  }

  showReport.value = rev.completed();
}

// [Note 1]
// <input type="url"> disables keyboard suggestions on iOS 16 safari, and
// <form novalidate> disables validation for being a url (that gets enabled by type url).
// This is an (only?) acceptable use for this pattern - for teaching purposes,
// where we want to verify that the user can spell words without help.
// This is a hack and it will eventually break.
</script>

<template>
  <div v-if="!showReport" class="d-flex flex-column justify-content-center">

    <div class="review-window text-center kz-container d-flex flex-column">

      <div class="my-3">
        <h1 class="review-target japanese">{{ card.question }}</h1>
      </div>
      <div
        class="review-answer d-flex flex-row justify-content-center flex-wrap"
      >
        <div v-if="!wrongAnswer && card.note == '' && !error" class="empty">
          empty
        </div>

        <!-- TODO: Don't take additional space if there are no cards with notes -->

        <div
          v-if="!wrongAnswer && card.note != '' && !error"
          class="note text-muted w-100 d-flex flex-column justify-content-center"
        >
          <div>{{ card.note }}</div>
        </div>

        <div
          v-if="!wrongAnswer && error"
          class="error w-100 d-flex flex-column justify-content-center"
        >
          <div><i class="bi bi-exclamation-circle"></i> {{ error }}</div>
        </div>

        <div
          v-if="wrongAnswer"
          class="d-flex flex-row justify-content-center align-items-center flex-wrap answer-store w-100 kz-success"
        >
          <div v-if="showAnswer">
            <div
              v-for="answer in card.shownAnswers"
              :key="answer"
              class="ms-2 me-2 answer-item px-3"
            >
              {{ answer }}
            </div>
          </div>
          <div v-if="!showAnswer">
            <ActionButton
              plain
              icon="check-circle"
              @click="() => (showAnswer = true)"
              class="show-answer-button"
              >Show answer</ActionButton
            >
          </div>
        </div>
      </div>
    </div>

    <div class="answer-container gap-top">
      <div
        class="card-type p-1"
        :class="{
          'kz-danger': wrongAnswer,
          'card-type-reading': card.type == 'reading',
        }"
      >
        {{ typeName }}
      </div>
      <form @submit="checkAnswer" novalidate>
        <input
          v-model="answerInput"
          @input="onAnswerInput"
          class="kz-input answer-form japanese w-100 p-2"
          :class="{ 'kz-danger': wrongAnswer }"
          placeholder=""
          spellcheck="false"
          type="url"
        />
        <!-- see [Note 1] -->
      </form>
    </div>

    <div class="control-container gap-top">
      <ActionButton icon="info-circle" disabled>Item info</ActionButton>
      <ActionButton
        v-if="!wrongAnswer"
        icon="check-circle"
        @click="(e) => checkAnswer(e)"
        >Check</ActionButton
      >
      <ActionButton
        v-if="wrongAnswer"
        icon="caret-right"
        @click="(e) => checkAnswer(e)"
        >Next card</ActionButton
      >
    </div>
  </div>

  <ReportView v-if="showReport" @start="startReview" :review="review" />
</template>

<style scoped>
.card-type {
  display: block;
  border: var(--input-border-width) solid var(--input-border-color);
  border-top-left-radius: var(--button-border-radius);
  border-top-right-radius: var(--button-border-radius);
  border-bottom: none !important;
  text-align: center;
}
.note {
  background-color: rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: var(--button-border-radius);
  border-bottom-right-radius: var(--button-border-radius);
}
.error {
  background-color: rgba(255, 140, 0, 0.199);
  border-bottom-left-radius: var(--button-border-radius);
  border-bottom-right-radius: var(--button-border-radius);
  color: rgb(147, 71, 0);
}
.answer-store {
  border-bottom-left-radius: var(--button-border-radius);
  border-bottom-right-radius: var(--button-border-radius);
}
.answer-item {
  font-size: 1.2em;
}
.review-answer {
  border-top: var(--button-border-width) solid var(--button-border-color);
  min-height: 2.5rem;
}
.review-answer .empty {
  opacity: 0;
  min-height: 2.5rem;
}
/* That's name is awful and not obvious what is answer-container and what is answer-store >_<) */
.show-answer-button {
  color: white;
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
  font-size: v-bind(questionFontSize);
  font-weight: v-bind(questionFontWeight);
  margin: 0;
}

.answer-container .answer-form {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  text-align: center;
  font-size: 1.75em;
}
.anwer-container .answer-form:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.control-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--default-grid-gap);
}

textarea:focus,
input:focus {
  outline: none;
}
</style>
@/core/Reviews