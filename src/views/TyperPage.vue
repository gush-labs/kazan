<script setup lang="ts">
import translator from "@/language/Translator.js";
import { ref } from "vue";

class Line {
  sourceText: string;
  text: string[];
  validated: { text: string; corrected: boolean }[] = [];
  compareIterator = 0;
  active = false;
  wasError = false;
  typed = "";

  constructor(text: string) {
    this.sourceText = text;
    this.text = text.split("");
  }

  validate(input: string): number {
    // Take characters from the input
    const inputCharacters = input.split("");
    // Count number of correct characters
    let correctChars = 0;
    // Compare every character with target text
    inputCharacters.forEach((ch) => {
      if (!translator.isRomanji(ch)) {
        if (ch === this.text[this.compareIterator + correctChars]) {
          this.validated.push({ text: ch, corrected: this.wasError });
          correctChars += 1;
          this.wasError = false;
        } else {
          this.wasError = true;
        }
      }
    });
    // Move comparator further
    this.compareIterator += correctChars;

    // Put correct characters to typed text
    this.typed = input.slice(correctChars);
    return correctChars;
  }

  complete(): boolean {
    return this.compareIterator == this.text.length;
  }
}

const sourceText = [
  "むかしむかしあるところに",
  "おじいさんとおばあさんがいました",
  "おじいさんがやまへきをきりにいけば",
  "おばあさんはかわへせんたくにでかけます",
  "おじいさんはようもどってきなされ",
  "おばあさんもきをつけてな",
  "まいにちやさしくいいあってでかけます",
];
const text = ref<Line[]>([]);
sourceText.forEach((line) => text.value.push(new Line(line)));
const lineBlocks = ref<HTMLDivElement[]>([]);
// sourceText.forEach(() => lineBlocks.value.push(ref(null)));

let line = 0;
text.value[line].active = true;

const input = ref("");
function onChange() {
  const currentLine = text.value[line];

  // validate against the current line of text
  if (!currentLine.complete()) {
    input.value = translator.toHiragana(input.value);
    const correctChars = currentLine.validate(input.value);
    input.value = input.value.slice(correctChars);
  }

  // if current line is completed and it's not the last one
  // then move to the next line of the text
  if (currentLine.complete() && line < text.value.length - 1) {
    currentLine.active = false;
    line += 1;
    text.value[line].active = true;

    const cursor = lineBlocks.value[line];
    console.log("SCROLL " + cursor);
    if (cursor) {
      console.log("SCROLL " + cursor.offsetTop);
      window.scrollTo(0, cursor.offsetTop);
    }
  }
}
</script>

<template>
  <div class="container mb-5">
    <div class="text">
      <input @input="onChange" class="input" v-model="input" />

      <div
        class="line-parent"
        v-for="(line, i) in text"
        ref="lineBlocks"
        :key="i"
      >
        <div class="source-text">{{ line.sourceText }}</div>
        <div class="text-container d-flex flex-row">
          <div class="input-text">
            <span
              v-for="(element, id) in line.validated"
              :key="id"
              class="correct"
              :class="{ corrected: element.corrected }"
              >{{ element.text }}</span
            >
            <span class="typed">{{ line.typed }}</span>
          </div>
          <div :class="{ hide: !line.active }" class="carriage"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-parent {
  position: relative;
}
.text-container {
  position: relative;
  min-height: 1.5em;
}
.typed {
  white-space: pre;
}
.text {
  position: relative;
  min-height: 300px;
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
}
.hide {
  display: none !important;
}
</style>
