<script setup lang="ts">
import SwitchOption from "@/components/SwitchOption.vue";
import { Storage } from "@/core/Storage";
import Reviews from "@/core/Reviews";
import { type CreatorParams, exportParams } from "@/core/reviews/Creator";
import { computed } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import router from "@/router";
import DisplayContainer from "@/components/DisplayContainer.vue";

// Get all reviews that are available in the web-app
const vocabularyReviews = Reviews.getAllReviews();

// Define selected vocabulary state to be stored in the browser storage
class VocabularyReviewSelectData {
  reviewId: string = vocabularyReviews[0].id; // the first review selected by default
  translation = false;
  meaning = false;
  reading = true;
  shuffle = true;
  level = 0;
}

// Get last selected vocabulary from the browser storage
const select = Storage.getObject<VocabularyReviewSelectData>(
  "vocabulary-review-select",
  new VocabularyReviewSelectData()
);

// Get currently selected review
const review = computed(
  () => vocabularyReviews.filter((v) => v.id == select.reviewId)[0]
);

const levels = computed(() => review.value.levels());
const status = computed(() => review.value.status());
const fixedParams = computed<CreatorParams>(() => review.value.enabledParameters);

const anySelected = computed(() => {
  const meaning = fixedParams.value.meaning ?? select.meaning;
  const reading = fixedParams.value.reading ?? select.reading;
  const translation = fixedParams.value.translation ?? select.translation;
  return meaning || reading || translation;
});

const reviewParams = computed(() => {
  return exportParams(
    {
      meaning: fixedParams.value.meaning ?? select.meaning,
      translation: fixedParams.value.translation ?? select.translation,
      reading: fixedParams.value.reading ?? select.reading,
      level: fixedParams.value.level ?? select.level,
      shuffle: fixedParams.value.shuffle ?? select.shuffle,
    },
    []
  );
});

function startReview() {
  if (anySelected.value) {
    router.push({
      name: "review",
      query: { review: review.value.id, params: reviewParams.value },
    });
  }
}
</script>

<template>
  <DisplayContainer short center class="pt-4">

    <div class="text-center mb-3"><h4>Select vocabulary</h4></div>

    <select
      class="form-select kz-select gap-bottom"
      aria-label="Default select example"
      v-model="select.reviewId"
    >
      <option
        v-for="review in vocabularyReviews"
        :key="review.id"
        :value="review.id"
      >
        {{ review.name }}
      </option>
    </select>

    <div class="d-flex flex-column review-params-container">
      <div
        v-if="!status.available"
        class="overlay d-flex justify-content-center flex-column"
      >
        <div class="text-center fw-bold mb-3">
          <i class="bi bi-exclamation-circle me-1"></i> Review is not available
        </div>
        <div class="text-center">{{ status.reason }}</div>
      </div>

      <select
        class="form-select kz-select gap-bottom"
        aria-label="Default select example"
        v-model="select.level"
        :disabled="levels.length == 0"
      >
        <option v-for="(level, id) in levels" :key="level" :value="id">
          {{ level }}
        </option>
      </select>

      <div class="switch-container">
        <SwitchOption
          :switch="fixedParams.meaning ?? select.meaning"
          @click="() => (select.meaning = !select.meaning)"
          :disabled="fixedParams.meaning != undefined"
          >Meaning of words</SwitchOption
        >
        <SwitchOption
          :switch="fixedParams.reading ?? select.reading"
          @click="() => (select.reading = !select.reading)"
          :disabled="fixedParams.reading != undefined"
        >
          Reading of words</SwitchOption
        >
        <SwitchOption
          :switch="fixedParams.translation ?? select.translation"
          @click="() => (select.translation = !select.translation)"
          :disabled="fixedParams.translation != undefined"
          >Japanese translation</SwitchOption
        >
      </div>

      <ActionButton
        class="gap-top kz-success"
        @click="() => startReview()"
        :disabled="!anySelected"
        >Start!</ActionButton
      >
    </div>
  </DisplayContainer>
</template>

<style scoped>
.review-params-container {
  position: relative;
}
.overlay {
  position: absolute;
  background-color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.level-container .button {
  font-size: 2em;
}
.level-container h4 {
  margin: 0px;
}
.switch-container {
  display: grid;
}
.vocabulary-container a {
  text-decoration: none;
}
.link-container {
  margin-right: 1.5em;
}
</style>
@/core/Reviews