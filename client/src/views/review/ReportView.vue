<script setup lang="ts">
import DistributionView from "@/components/DistributionView.vue";
import ActionButton from "@/components/ActionButton.vue";
import { TimeDistribution } from "@/core/Utilities";
import type { Review } from "@/core/Review";
import router from "@/router";
import { ref } from "vue";

const emits = defineEmits(["start"]);
const props = defineProps<{ review: Review }>();

const review = ref(props.review);

const uniqueCards = new Set<string>();
review.value.getIncorrectCards().map((card) => uniqueCards.add(card.question));
const cards = Array.from(uniqueCards.values()).map((card) => {
  return { name: card, correct: false };
});
const allCorrect = review.value.getIncorrectCards().length == 0;

const congrats = [
  "No mistakes! Good job!",
  "Everything is correct!",
  "Nice progress!",
  "Keep it going!",
];
const congrat = congrats[Math.floor(Math.random() * 3)];

const timeDistribution = TimeDistribution.calculate(review.value.getTimers());
const slowestCount = review.value
  .getTimers()
  .filter((v) => v > timeDistribution.slowThreshold).length;
</script>

<template>
  <div class="d-flex flex-column justify-content-center mt-5 mb-5">
    <div v-if="cards.length == 0" class="text-center p-3">
      <h4>{{ congrat }} <i class="bi bi-hand-thumbs-up"></i></h4>
    </div>

    <div v-if="cards.length != 0" class="text-center p-3">
      <h4>Review results</h4>
    </div>

    <DistributionView :distribution="timeDistribution" />

    <div class="stats-window kz-container p-2 gap-top">
      <div class="flex-fill kz-text-success">
        <i class="bi bi-check-circle me-1"></i>&nbsp;{{
          review.getCorrectCards().length
        }}&nbsp;correct
      </div>
      <div class="flex-fill">
        <i class="bi bi-collection me-1"></i>&nbsp;{{
          review.getTotalCardsCount()
        }}&nbsp;total
      </div>
      <div class="flex-fill kz-text-error">
        <i class="bi bi-x-circle me-1"></i>&nbsp;{{
          review.getIncorrectCards().length
        }}&nbsp;<span v-if="review.getIncorrectCards().length == 1">mistake</span><span v-if="review.getIncorrectCards().length != 1">mistakes</span>
      </div>
    </div>

    <div class="buttons gap-top">
      <ActionButton
        icon="arrow-repeat"
        @click="() => emits('start', review.repeat())"
        >Repeat all</ActionButton
      >
      <ActionButton
        icon="x-circle"
        @click="() => emits('start', review.repeatIncorrect())"
        :disabled="allCorrect"
        >Repeat incorrect</ActionButton
      >
    </div>
    <div class="gap-top">
      <ActionButton
        icon="arrow-return-left"
        class="w-100"
        @click="() => router.back()"
        >Complete</ActionButton
      >
    </div>
  </div>
</template>

<style scoped>
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11em, 1fr));
  gap: var(--default-grid-gap);
}

.stats-window {
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7em, 1fr));
}
</style>
