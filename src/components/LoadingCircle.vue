<template>
  <div class="load"><i class="load bi bi-arrow-clockwise"></i></div>
</template>

<style scoped>
.load {
  display: inline-block;
  animation-duration: 1s;
  animation-name: rotate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}
</style>
