<script setup lang="ts">

const props = defineProps<{ values: number[] }>();
const input: number[] = props.values;

const resolution: number = 40;
const distribution: number[] = [];
for (var i = 0; i < resolution + 1; i++) { distribution.push(0); }

var maxTime = input[0];
var minTime = input[0];
input.forEach(t => { if (t > maxTime) maxTime = t; })
input.forEach(t => { if (t < minTime) minTime = t; })
if (input.length == 1) { minTime = 0; maxTime = input[0]; }

var mean = 0;
input.forEach(t => {
  mean += t;
  const i = Math.floor((t - minTime) / (maxTime - minTime) * resolution);
  distribution[i] += 1;
});

var maxCount = distribution[0];
var minCount = distribution[0];
distribution.forEach(n => { if (n > maxCount) maxCount = n; })
distribution.forEach(n => { if (n < minCount) minCount = n; })

const values: number[] = [];
distribution.forEach(v => { values.push(((v - minCount) / (maxCount - minCount)) * 100); });
</script>

<template>
<div class="graph-container">

  <div class="title-container d-flex flex-row justify-content-between">
    <div class="min text-muted">{{ Math.round(minTime * 10) / 10 }} sec.</div>
    <div class="text-muted pb-1"><i class="bi bi-stopwatch"></i> Answer time</div>
    <div class="max text-muted">{{ Math.round(maxTime * 10) / 10 }} sec.</div>
  </div>
  <div class="dist-container">
    <div v-for="value in values" class="value-store d-flex flex-column justify-content-end">
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
