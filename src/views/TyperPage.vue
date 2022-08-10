<script setup lang="ts">
import translator from "@/language/Translator.js";
import { ref } from "vue";

const input = ref("");

const text = ref("おじいさんがやまへきをきりにいけば");
const textParsed = text.value.split("");
const checked = ref<Array<{ text: string; corrected: boolean }>>([]);
const typed = ref("");

let correctId = 0;
let wasError = false;

function onChange(e: any) {
  input.value = translator.toHiragana(input.value);

  const characters = input.value.split("");
  let localId = 0;
  characters.forEach((ch) => {
    if (!translator.isRomanji(ch)) {
      if (ch === textParsed[correctId + localId]) {
        checked.value.push({ text: ch, corrected: wasError });
        localId += 1;
        wasError = false;
      } else {
        wasError = true;
      }
    }
  });
  correctId += localId;

  input.value = input.value.slice(localId);
  typed.value = input.value;
}
</script>

<template>
  <div class="container">
    <div class="text">
      <input @input="onChange" class="input" v-model="input" />

      <div class="source-text">{{ text }}</div>
      <div class="text-container d-flex flex-row">
        <div class="input-text" ref="inputTextComponent">
          <span
            v-for="element in checked"
            class="correct"
            :class="{ corrected: element.corrected }"
            >{{ element.text }}</span
          >
          <span class="typed">{{ typed }}</span>
        </div>
        <div class="carriage"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-container {
  position: relative;
  min-height: 1.5em;
}
.typed {
  white-space: pre;
}
.text {
  position: relative;
  height: 300px;
  font-size: 2em;
}
.input-text {
  color: black;
  display: inline-block;
  position: relative;
}
.correct {
  color: green;
  white-space: pre;
}
.corrected {
  color: rgb(218, 94, 0) !important;
}
.source-text {
  color: rgb(150, 150, 150);
}
.input {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
}
.carriage {
  font-weight: bold;
  min-width: 0.2em;
  margin: 0.2em;
  border-radius: 4px;
  background-color: black;

  /*
  animation-duration: 1s;
  animation-name: blink;
  animation-iteration-count: infinite;
  */
}
@keyframes blink {
  0% {
    background-color: white;
  }
  50% {
    background-color: black;
  }
  100% {
    background-color: white;
  }
}
</style>
