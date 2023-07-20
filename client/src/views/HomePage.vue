<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import router from "@/router";
import DisplayContainer from "@/components/DisplayContainer.vue";
</script>

<template>
  <DisplayContainer center>
    <div class="menu-center">
      <div class="title-container mb-2">
        <div>
          <h4>Welcome back!</h4>
        </div>
      </div>

      <div class="control-container mt-2">
        <div class="control">

          <ActionButton
            class="kz-button-main kz-button-lessons"
            @click="() => {}">Lessons
            <span class="badge text-bg-light">4</span>
          </ActionButton>

          <ActionButton
            class="kz-button-main kz-button-reviews"
            @click="() => {}">Reviews
            <span class="badge text-bg-light">10</span>
          </ActionButton>

          <ActionButton
            @click="() => router.push('kana/hiragana')">Hiragana
          </ActionButton>

          <ActionButton
            @click="() => router.push('kana/katanaka')">Katakana
          </ActionButton>

          <ActionButton
            @click="() => router.push('vocabulary')">Vocabulary
          </ActionButton>

          <ActionButton
            @click="() => router.push('kanji')">Kanji
          </ActionButton>

        </div>
      </div>
    </div>
  </DisplayContainer>
</template>

<style scoped>
.kz-button-lessons {
  background-color: rgb(217, 64, 184);
  color: white;
  min-height: 4rem;
}
.kz-button-lessons:hover {
  background-color: rgb(240, 94, 208);
}
.kz-button-reviews {
  background-color: rgb(64, 138, 217);
  color: white;
  min-height: 4rem;
}
.kz-button-reviews:hover {
  background-color: rgb(86, 157, 234);
}
.control {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  gap: var(--default-grid-gap);
}
.title-control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
}
.title-control a {
  text-decoration: none;
}
.title-container {
  display: flex;
  flex-direction: column;
  justify-content: end;
  text-align: center;
}
.control-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.menu-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
