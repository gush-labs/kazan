<template>
  <div class="icon"></div>
</template>

<style scoped>
.icon {
  display: inline-block;
  min-width: 1em;
  min-height: 1em;
  max-width: 1em;
  max-height: 1em;
  background-color: var(--text-mute-color);
  border-radius: 50%;

  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
