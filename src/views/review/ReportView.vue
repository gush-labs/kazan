<script setup lang="ts">
import Distribution from "@/components/Distribution.vue";
import Button from "@/components/Button.vue";
import type { Review } from "@/core/Review";
import router from "@/router";

const emits = defineEmits(["start"]);
const props = defineProps<{ review: Review; }>();

const review = props.review;
const cards: Array<any> = review.getIncorrectCards()
  .map(card => { return { target: card.target, correct: false }});
const allCorrect = review.getIncorrectCards().length == 0;

const congrats = [
  "No mistakes! Good job!",
  "Everything is correct!",
  "Nice progress!",
  "Keep it going!"]
const congrat = congrats[Math.floor(Math.random() * 3)]
</script>

<template>
<div class="d-flex flex-column justify-content-center mt-5 mb-5 pt-5">
  
  <div v-if="cards.length == 0" class="text-center p-3">
    <h4>{{ congrat }} <i class="bi bi-hand-thumbs-up"></i></h4>
  </div>

  <Distribution :values="review.getTimers()" class="mb-3"></Distribution>

  <div class="stats-window mb-3 pb-3">
    <div class="flex-fill kz-text-success"><i class="bi bi-circle"></i>&nbsp;{{ review.getCorrectCards().length }}&nbsp;completed</div>
    <div class="flex-fill hard"><i class="bi bi-clock-history"></i>&nbsp;5&nbsp;slowest</div>
    <div class="flex-fill kz-text-error"><i class="bi bi-x-lg"></i>&nbsp;{{ review.getIncorrectCards().length }}&nbsp;mistakes</div>
  </div>

  <div v-if="cards.length > 0" class="report mb-3">
    <div
      v-for="result in cards"
      :class="{'card-incorrect': !result.correct}"
      class="card-item p-1">
      {{ result.target }}
    </div>
  </div>

  <div class="buttons">
    <Button  icon="arrow-repeat"
      @click="() => emits('start', review.repeat())">Repeat all</Button>
    <Button v-if="allCorrect" icon="clock-history"
      @click="() => {}" disabled>Repeat slowest</Button>
    <Button v-if="!allCorrect" 
      @click="() => emits('start', review.repeatIncorrect())">Repeat incorrect</Button>
  </div>
  <div class="complete-container">
    <Button icon="arrow-return-left" class="w-100"
      @click="() => router.back()">Complete</Button>
  </div>
</div>
</template>

<style scoped>
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11em, 1fr));
  gap: 1em;
}
.complete-container .btn {
  margin-top: 1em;
}

.report {
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
  gap: 0.5em;
}
.report .card-item {
  text-align: center;
}
.report .card-incorrect {
  border: 1px solid var(--text-dunger-color);
  color: var(--text-dunger-color);
  opacity: 0.7;
}

.stats-window .hard {
  color: rgb(112, 86, 22);
}

.stats-window {
  text-align: center;
  border-bottom: 1px solid var(--border-base-color);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
}

@media screen and (max-width: 650px) {
  .stats-window .hard {
    display: none;
  }
}
</style>
