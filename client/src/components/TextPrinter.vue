<script setup lang="ts">
import { ref } from "vue";

type TextPart = {
  text: string;
  after?: number;
  before?: number;
  speed?: number;
};

const props = defineProps<{
  text: TextPart[];
}>();

const output = ref("");
let partIterator = 0;
let charIterator = 0;

function printCharacters(part: TextPart) {
  if (charIterator == part.text.length) {
    partIterator += 1;
    charIterator = 0;
    setTimeout(() => printCurrentPart(), (part.after ?? 0) * 1000);
    return;
  }

  setTimeout(() => {
    output.value += part.text[charIterator];
    charIterator += 1;
    printCharacters(part);
  }, 50 / (part.speed ?? 1));
}

function printCurrentPart() {
  if (partIterator == props.text.length) {
    return;
  }

  const part = props.text[partIterator];
  setTimeout(() => {
    printCharacters(part);
  }, (part.before ?? 0) * 1000);
}

printCurrentPart();
</script>

<template>
  <div>
    {{ output }}
  </div>
</template>
