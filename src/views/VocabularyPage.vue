<script setup lang="ts">
import SwitchOption from "@/components/SwitchOption.vue";
import PageLink from "@/components/PageLink.vue";
import { Storage } from "@/core/Storage";
import ReviewCreator from "@/core/ReviewCreator";
import { computed, ref, watch } from "vue";

const vocabularyReviews = ReviewCreator.getAllReviews();
class VocabularyReviewSelectData {
  reviewId: string = vocabularyReviews[0].id;
  translation = false;
  meaning = false;
  reading = true;
  shuffle = true;
  level = 0;
}

const select = Storage.getObject<VocabularyReviewSelectData>(
  "vocabulary-review-select",
  new VocabularyReviewSelectData()
);

const review = computed(
  () => vocabularyReviews.filter((v) => v.id == select.reviewId)[0]
);
const levels = computed(() => review.value.levels());
// god dammit this doesn't work
const status = ref(review.value.status());
watch(review.value.status(), newStatus => status.value = newStatus)

</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="vocabulary-container d-flex flex-column">
      <div class="text-center link-container mb-2">
        <PageLink
          :to="{ name: 'home', params: { page: 'home' } }"
          icon="arrow-left-short"
          class="text-muted"
          plain
          >Go back</PageLink
        >
      </div>

      <div class="text-center mb-3"><h4>Select vocabulary</h4></div>

      <select
        class="form-select mb-3"
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
            <i class="bi bi-exclamation-circle me-1"></i> Review is not
            available
          </div>
          <div class="text-center">{{ status.reason }}</div>
        </div>

        <select
          class="form-select mb-3"
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
            :switch="select.meaning"
            @click="() => (select.meaning = !select.meaning)"
            :disabled="!review.meaning"
            >Meaning of words</SwitchOption
          >
          <SwitchOption
            :switch="select.reading"
            @click="() => (select.reading = !select.reading)"
            :disabled="!review.reading"
          >
            Reading of words</SwitchOption
          >
          <SwitchOption
            :switch="select.translation"
            @click="() => (select.translation = !select.translation)"
            :disabled="!review.translation"
            >To Japanese translation</SwitchOption
          >
        </div>

        <PageLink
          :to="{
            name: 'review',
            query: {
              review: select.reviewId,
              params: [
                select.level,
                select.reading,
                select.meaning,
                select.translation,
                false,
              ].toString(),
            },
          }"
          class="mt-3"
          >Start!</PageLink
        >
      </div>
    </div>
  </div>
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
.vocabulary-container .form-select {
  border: var(--button-border-width) solid var(--button-border-color);
  border-radius: var(--button-border-radius);
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
@media screen and (max-width: 650px) {
  .vocabulary-container {
    width: 100%;
  }
}
@media screen and (min-width: 650px) {
  .vocabulary-container {
    width: 75%;
  }
}
</style>
