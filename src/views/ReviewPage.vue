<script setup lang="ts">
import { ref } from "vue";
import type ReviewCollection from "@/storage/ReviewCollection";
import type ReviewReport from "@/storage/ReviewReport";
import Review from "./review/Review.vue";
import Collection from "./review/Collection.vue";
import Report from "./review/Report.vue";

const state = ref("collection");
const collection = ref<ReviewCollection | null>(null);
const report = ref<ReviewReport | null>(null);

const redirectTo = (page: string) => (state.value = page);
const setCollection = (newCollection: ReviewCollection) =>
  (collection.value = newCollection);
const setReport = (newReport: ReviewReport) => (report.value = newReport);
</script>

<template>
  <Collection
    v-if="state == 'collection'"
    :setCollection="setCollection"
    :redirectTo="redirectTo"
  />

  <Review
    v-if="state == 'review' && collection"
    :setReport="setReport"
    :collection="collection"
    :redirectTo="redirectTo"
  />

  <Report
    v-if="state == 'report' && collection && report"
    :setCollection="setCollection"
    :report="report"
    :collection="collection"
    :redirectTo="redirectTo"
  />
</template>
