<script setup lang="ts">
const props = defineProps<{ 
  label?: string,
  icon?: string,
  disabled?: boolean,
  click?: (e: any) => void,
}>();

function onClick(e: any) {
  const action = props.click;
  if (action) { action(e); }
}
</script>

<template>
  <button @click="onClick" class="button btn btn-lg btn-primary" :class="{ 'disabled': props.disabled }">
    <div v-if="props.label" class="m">{{ props.label }}</div>
    <i v-if="props.icon" :class="'bi bi-' + props.icon"></i><slot />
  </button>
</template>

<style scoped>
.button {
  position: relative;
}
.m {
  position: absolute;
  font-size: 1.3em;
  top: 50%;
  transform: translateY(-50%);
}
</style>