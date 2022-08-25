<script setup lang="ts">

const props = defineProps<{ values: number[] }>();
const input: number[] = props.values;

// Initialize distribution array
const resolution: number = 40;
const distribution: number[] = [];
for (var i = 0; i < resolution + 1; i++) { distribution.push(0); }

// Init and normalize maxTime
const meanTime = input.reduce((l, r) => l + r) / input.length;
const maxTime = (Math.floor(input.reduce((l, r) => Math.max(l, r)) / 5) + 1) * 5;
const minTime = 0;

// Calculate the actual distribution
input
  .map(v => Math.floor((v - minTime) / (maxTime - minTime) * resolution))
  .forEach(v => distribution[v] += 1);

const maxCount = distribution.reduce((l, r) => Math.max(l, r));
const minCount = distribution.reduce((l, r) => Math.min(l, r));

const values = distribution.map(v => ((v - minCount) / (maxCount - minCount)) * 100 );
</script>

<template>
<div class="graph-container">
  <div class="title-container d-flex flex-row justify-content-between">
    <div class="min text-muted">{{ Math.round(minTime * 10) / 10 }} sec.</div>
    <div class="text-muted pb-1"><i class="bi bi-stopwatch"></i> Answer time</div>
    <div class="max text-muted">{{ Math.round(maxTime * 10) / 10 }} sec.</div>
  </div>
  <div class="dist-container">
    <div v-for="value, i in values" class="value-store d-flex flex-column justify-content-end">
      <div class="value" :style="{ 'height': value + '%' }"></div>
    </div>
  </div>
</div>
</template>

<style scoped>

.title-container .min {
  padding-left: 0.5em;
  border-left: 2px solid rgba(0,0,0,0.1);
}
.title-container .max {
  padding-right: 0.5em;
  border-right: 2px solid rgba(0,0,0,0.1);
}

.value-store {
  background-color: rgba(0,0,0,0.1);
}
.value-store .value {
  background-color: rgba(0,0,0,0.2);
}
.dist-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  gap: 1px;
  min-height: 3em;
}
</style>
