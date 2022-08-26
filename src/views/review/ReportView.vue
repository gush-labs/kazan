<script setup lang="ts">
import Distribution from "@/components/Distribution.vue";
import Button from "@/components/Button.vue";
import type { Review } from "@/core/Review";
import router from "@/router";

const emits = defineEmits(["start"]);
const props = defineProps<{ review: Review; }>();

const review = props.review;
// const picker = review.picker;

const cards: Array<any> = review.getIncorrectCards()
  .map(card => { return { target: card.target, correct: false }});
const allCorrect = review.getIncorrectCards().length == 0;

// picker.getIncorrect().forEach(card => cards.push({ target: card.target, correct: false }));

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
    <div class="flex-fill completed"><i class="bi bi-circle"></i>&nbsp;{{ review.getCorrectCards().length }}&nbsp;completed</div>
    <div class="flex-fill hard"><i class="bi bi-clock-history"></i>&nbsp;5&nbsp;slowest</div>
    <div class="flex-fill mistakes"><i class="bi bi-x-lg"></i>&nbsp;{{ review.getIncorrectCards().length }}&nbsp;mistakes</div>
  </div>

  <div v-if="cards.length > 0" class="report mb-3">
    <div
      v-for="result in cards"
      :class="{'card-correct': result.correct, 'card-incorrect': !result.correct}"
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
.stats-window .hard {
  color: rgb(82, 64, 17);
}

.stats-window {
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
}

@media screen and (max-width: 650px) {
  .stats-window .hard {
    display: none;
  }
}
</style>
