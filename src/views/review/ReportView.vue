<script setup lang="ts">
import type { Review } from "@/storage/Review";
import Button from "../../components/Button.vue";

const props = defineProps<{
  setReview: (review: Review) => void;
  redirectTo: (page: string) => void;
  review: Review;
}>();

const review = props.review;
const picker = review.picker;

const cards: Array<any> = [];
picker.getCorrect().forEach(card => cards.push({ target: card.target, correct: true }));
picker.getIncorrect().forEach(card => cards.push({ target: card.target, correct: false }));

function repeatAll() {
  props.setReview(review.repeat());
  props.redirectTo("review");
}

function repeatIncorrect() {
  props.setReview(review.repeatIncorrect());
  props.redirectTo("review");
}
</script>

<template>
  <div class="container stats-window my-5 d-flex flex-row p-0">
    <div class="bg-success flex-fill p-3 first">{{ picker.getCorrect().length }} correct</div>
    <div class="bg-danger flex-fill p-3 last">{{ picker.getIncorrect().length }} incorrect</div>
  </div>

  <div class="container report mb-5 p-3">
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

  <div class="buttons container p-0 mb-5">
    <Button @click="repeatAll" icon="arrow-repeat"> Repeat all</Button>
    <Button v-if="picker.getIncorrect().length != 0" @click="repeatIncorrect"> Repeat incorrect</Button>
    <Button @click="() => props.redirectTo('collection')" icon="arrow-return-left"> Complete</Button>
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
.card-item {
  color: white;
  font-size: 1.5em;
  text-align: center;
  border-radius: 10px;
}
.card-correct {
  background-color: rgb(107, 174, 107);
}
.card-incorrect {
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
