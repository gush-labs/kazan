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

function click(e: any) {
  (document.activeElement as HTMLElement).blur();
  if (!(props.disabled && props.disabled == true)) {
    emits("click", e);
  }
}
</script>

<template>
  <button
    @click="click"
    class="kz-text"
    :class="{
      plain: plain,
      btn: !plain,
      'kz-button': !plain,
      'kz-button-disabled': props.disabled,
      'dropdown-toggle': dropdown,
      'kz-button-active': props.switch && props.switched,
    }"
    :data-bs-toggle="dropdown ? 'dropdown' : ''"
  >
    <div v-if="props.label" class="m">{{ props.label }}</div>
    <i v-if="props.icon" :class="'bi bi-' + props.icon"></i> <slot />
  </button>
</template>

<style scoped>
.plain {
  border: none;
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
}
.m {
  position: absolute;
  font-size: 1.3em;
  top: 50%;
  transform: translateY(-50%);
}
</style>
