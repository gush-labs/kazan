<script setup lang="ts">
import type { TimeDistribution } from "@/core/Utilities";
import { ref } from "vue";

const props = defineProps<{ distribution: TimeDistribution }>();
const distribution: TimeDistribution = ref(props.distribution).value;

const values = new Array(distribution.buckets.length);
const maxCount = distribution.buckets.reduce((l, r) => Math.max(l, r));
distribution.buckets.forEach((v, i) => (values[i] = (v / maxCount) * 100));
</script>

<template>
  <div class="graph-container kz-container pt-2">
    <div
      class="title-container d-flex flex-row justify-content-between px-2 mb-1"
    >
      <div class="min text-muted">
        {{ Math.round(distribution.range.start * 10) / 10 }} sec.
      </div>
      <div class="text-muted pb-1">
        <i class="bi bi-stopwatch"></i> Answer time
      </div>
      <div class="max text-muted">
        {{ Math.round(distribution.range.end * 10) / 10 }} sec.
      </div>
    </div>
    <div class="dist-container">
      <div
        v-for="(value, i) in values"
        :key="i"
        class="value-store d-flex flex-column justify-content-end"
      >
        <div class="value" :style="{ height: value + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-container .min {
  padding-left: 0.5em;
}
.title-container .max {
  padding-right: 0.5em;
}

.value-store {
  background-color: white;
}
.dist-container :last-child {
  border-bottom-right-radius: var(--button-border-radius);
}
.dist-container :first-child {
  border-bottom-left-radius: var(--button-border-radius);
}
.value-store .value {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0px;
}
.dist-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  gap: 1px;
  min-height: 3em;
  background-color: #f2f2f7;
  border-top: var(--button-border-width) solid #f2f2f7;
}
</style>
