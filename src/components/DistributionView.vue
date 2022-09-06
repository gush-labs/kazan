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
  <div class="graph-container">
    <div class="title-container d-flex flex-row justify-content-between">
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
  border-left: 2px solid rgba(0, 0, 0, 0.1);
}
.title-container .max {
  padding-right: 0.5em;
  border-right: 2px solid rgba(0, 0, 0, 0.1);
}

.value-store {
  background-color: rgba(0, 0, 0, 0.1);
}
.value-store .value {
  background-color: rgba(0, 0, 0, 0.2);
}
.dist-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  gap: 1px;
  min-height: 3em;
}
</style>
