<script setup lang="ts">

const emits = defineEmits(["click"]);
const props = defineProps<{
  label?: string;
  icon?: string;
  disabled?: boolean;
  plain?: boolean;
  dropdown?: boolean;
  switch?: boolean;
  switched?: boolean;
}>();

</script>

<template>
  <button
    @click="(e) => emits('click', e)"
    :class="{ 
      plain: plain, 
      btn: !plain, 
      disabled: props.disabled, 
      'dropdown-toggle': dropdown, 
      switched: props.switch && props.switched }"
    :data-bs-toggle="dropdown ? 'dropdown' : ''">
    <div v-if="props.label" class="m">{{ props.label }}</div>
    <i v-if="props.icon" :class="'bi bi-' + props.icon"></i> <slot />
  </button>
</template>

<style scoped>
.switched {
  background-color: rgba(0,0,0,0.5) !important;
  color: white !important;
}
.plain {
  border: none;
  margin: 0;
  padding: 0;
  background-color: rgba(0,0,0,0);
  outline: none;
}
.btn {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.btn:hover {
  border-color: rgba(0, 0, 0, 0.25);
}
.m {
  position: absolute;
  font-size: 1.3em;
  top: 50%;
  transform: translateY(-50%);
}
</style>
