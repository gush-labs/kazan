<script setup lang="ts">
import { computed } from "vue";
const emits = defineEmits(["click"]);

const props = defineProps<{
  label?: string;         // text inside of the button
  icon?: string;          // icon for the button
  disabled?: boolean;     // if button is disabled or not
  plain?: boolean;        // if button should have outline
  switch?: boolean;       // if button represents a switch (can be toggled on and off)
  switched?: boolean;     // state of the switch: enabled or disabled
  type?: "success" | "default" | "active";
}>();

const buttonType = computed(() => props.type ?? "default");

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
      'kz-success': buttonType == 'success',
      'kz-button-disabled': props.disabled,
      'kz-button-active': buttonType == 'active' || switched,
    }"
  >
    <div v-if="props.label" class="label">{{ props.label }}</div>
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
.label {
  position: absolute;
  font-size: 1.3em;
  top: 50%;
  transform: translateY(-50%);
}
</style>
