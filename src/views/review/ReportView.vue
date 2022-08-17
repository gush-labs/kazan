<script setup lang="ts">
import type { Review } from "@/storage/Review";
import Button from "../../components/Button.vue";
import router from "@/router";

const props = defineProps<{
  setReview: (review: Review) => void;
  redirectTo: (page: string) => void;
  review: Review;
}>();

const review = props.review;
const picker = review.picker;

const cards: Array<any> = [];
picker
  .getCorrect()
  .forEach((card) => cards.push({ target: card.target, correct: true }));
picker
  .getIncorrect()
  .forEach((card) => cards.push({ target: card.target, correct: false }));

function repeatAll() {
  props.setReview(review.repeat());
}

function repeatIncorrect() {
  props.setReview(review.repeatIncorrect());
}

function complete() {
  router.go(-1);
}
</script>

<template>
  <div class="d-flex flex-column justify-content-center mt-5">
    <div class="stats-window mb-3 d-flex flex-row">
      <div class="flex-fill completed">
        <i class="bi bi-circle"></i> {{ picker.getCorrect().length }} completed
      </div>
      <div class="flex-fill mistakes">
        <i class="bi bi-x-lg"></i> {{ picker.getIncorrect().length }} mistakes
      </div>
    </div>

    <div class="report mb-3">
      <div
        v-for="result in cards"
        :class="{
          'card-correct': result.correct,
          'card-incorrect': !result.correct,
        }"
        class="card-item p-1"
      >
        {{ result.target }}
      </div>
    </div>

    <div class="buttons">
      <Button @click="repeatAll" icon="arrow-repeat"> Repeat all</Button>
      <Button v-if="picker.getIncorrect().length != 0" @click="repeatIncorrect">
        Repeat incorrect</Button
      >
      <Button @click="complete" icon="arrow-return-left"> Complete</Button>
    </div>
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
  gap: 0.5em;
}
.report .card-item {
  color: white;
  text-align: center;
  border: 1px solid white;
}
.report .card-correct {
  border-color: rgb(107, 174, 107);
  color: rgb(107, 174, 107);
}
.report .card-incorrect {
  border-color: rgb(189, 108, 108);
  color: rgb(189, 108, 108);
}

.stats-window .completed {
  color: rgb(25, 79, 13);
}
.stats-window .mistakes {
  color: rgb(82, 17, 17);
}

.stats-window {
  border-radius: 10px;
  text-align: center;
}
</style>
