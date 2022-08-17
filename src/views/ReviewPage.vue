<script setup lang="ts">
import { ref } from "vue";
import type { Review } from "@/storage/Review";
import ReviewView from "./review/ReviewView.vue";
import CollectionView from "./review/CollectionView.vue";
import ReportView from "./review/ReportView.vue";

const state = ref("collection");
const review = ref<Review | null>(null);

const redirectTo = (page: string) => (state.value = page);
const setReview = (newReview: Review) => (review.value = newReview);
</script>

<template>
  <CollectionView
    v-if="state == 'collection'"
    :setReview="setReview"
    :redirectTo="redirectTo"
  />

  <ReviewView
    v-if="state == 'review' && review"
    :review="review"
    :redirectTo="redirectTo"
  />

  <ReportView
    v-if="state == 'report' && review && review.complete()"
    :setReview="setReview"
    :review="review"
    :redirectTo="redirectTo"
  />
</template>
