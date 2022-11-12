<script setup lang="ts">

const props = defineProps<{
  center?: boolean;
  start?: boolean;
  end?: boolean;
  short?: boolean;
}>();
</script>

<template>
<div 
  class="d-flex flex-column align-items-center" 
  :class="{
    'justify-content-center': props.center,
    'justify-content-start': props.start,
    'justify-content-end': props.end,
  }">
  <div 
    class="d-flex flex-column" 
    :class="{ 'short-container': props.short, 'w-100': !props.short }">
    <slot />
  </div>
</div>
</template>

<style scoped>
@media screen and (max-width: 650px) {
  .short-container {
    width: 100%;
  }
}
@media screen and (min-width: 650px) {
  .short-container {
    width: 75%;
  }
}
</style>
