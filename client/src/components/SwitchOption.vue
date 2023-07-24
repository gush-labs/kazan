<script setup lang="ts">

const props = defineProps<{
  switch: boolean;      // state of the switch (toggled on or off)
  disabled?: boolean;   // if switch component is disabled
}>();

const emits = defineEmits(["click"]);
</script>

<template>
  <button
    class="switch-block d-flex flex-row align-items-center"
    :class="{ 'text-muted': props.disabled }"
    @click="(e) => emits('click', e)"
    :disabled="props.disabled"
  >
    <div class="toggle">
      <i
        :class="{
          'bi bi-toggle-off': !props.switch,
          'bi bi-toggle-on': props.switch,
        }"
      ></i>
    </div>
    <div class="text"><slot></slot></div>
  </button>
</template>

<style scoped>
.switch-block {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  margin: 0px;
  padding: 0px;
  color: var(--text-base-color);
}
.toggle {
  display: inline-block;
  font-size: 1.7em;
  margin-right: 0.3em;
}
.text {
  display: inline-block;
}
</style>
