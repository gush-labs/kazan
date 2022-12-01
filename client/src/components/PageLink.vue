<script setup lang="ts">
import { RouterLink } from "vue-router";

const emits = defineEmits(["click"]);
const props = defineProps<{
  label?: string;
  icon?: string;
  disabled?: boolean;
  plain?: boolean;
  dropdown?: boolean;
  to: any;
}>();

function click(e: any) {
  if (props.disabled == undefined || !props.disabled) {
    (document.activeElement as HTMLElement).blur();
    emits("click", e);
  }
}
</script>

<template>
  <router-link
    :to="to"
    @click="click"
    class="kz-text"
    :class="{
      plain: plain,
      btn: !plain,
      'kz-button': !plain,
      'kz-button-disabled': props.disabled,
      'dropdown-toggle': dropdown,
    }"
    :data-bs-toggle="dropdown ? 'dropdown' : ''"
    :disabled="props.disabled"
  >
    <div v-if="props.label" class="m">{{ props.label }}</div>
    <i v-if="props.icon" :class="'bi bi-' + props.icon"></i> <slot />
  </router-link>
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
