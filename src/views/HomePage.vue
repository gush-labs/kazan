<script setup lang="ts">
import router from "@/router";
import { ref, watch } from "vue";
import Link from "@/components/Link.vue";
import type { Ref } from "vue";

class ButtonItem {
  name: string = "";
  page?: string = "";
  link?: any = {};
}

class Page {
  title = "";
  parent = "";
  name = "";
  buttons?: ButtonItem[] = [];
  component?: string = "";
}

const pages = new Map<string, Page>();
pages.set("home", {
  name: "Main menu",
  parent: "",
  title: "What do you want to practice?",
  buttons: [
    { name: "Kana", page: "kana" },
    { name: "Vocabulary", page: "vocab" },
    { name: "Grammar", page: "grammar" },
    { name: "Phonetics", page: "phonetics" },
  ],
});

pages.set("kana", {
  name: "Kana",
  parent: "home",
  title: "Which kana do you want to practice?",
  buttons: [
    { name: "Hiragana", page: "hiragana" },
    { name: "Katakana", page: "katakana" },
  ],
});

pages.set("hiragana", {
  name: "Hiragana",
  parent: "kana",
  title: "Select parts of hiragana",
  buttons: [
    { name: "Monographs", link: { name: "review", query: { db: "allMonographs"}} },
    { name: "Digraphs",   link: { name: "review", query: { db: "allDigraphs"}} },
    { name: "Monographs+" },
    { name: "Digraphs+" },
    { name: "All Hiragana", link: { name: "review", query: { db: "allHiragana" }} },
    { name: "Choose Manually" },
  ],
});

pages.set("vocab", {
  name: "Vocabulary",
  parent: "home",
  title: "Choose vocabulary",
  buttons: [
    { name: "WaniKani", page: "wk" },
    { name: "JLPT", page: "jlpt" },
  ],
});

pages.set("wk", {
  name: "Vocabulary",
  parent: "vocab",
  title: "Which WaniKani level to practice?",
  buttons: [
    { name: "Level 1", link: { name: "review", query: { db: "wkLevel1" }} },
    { name: "Level 2", link: { name: "review", query: { db: "wkLevel2"}} },
    { name: "Level 3" },
    { name: "Level 4" },
  ],
});

const paramPage = router.currentRoute.value.params.page?.toString();
const parentPage: Ref<Page | undefined> = ref(undefined);
const currentPage = ref(paramPage && pages.has(paramPage) ? pages.get(paramPage)! : pages.get("home")!);
parentPage.value = pages.get(currentPage.value.parent);

watch(() => router.currentRoute.value.params.page, (newPage) => {
  const page = pages.get(newPage?.toString());
  parentPage.value = page ? pages.get(page.parent) : undefined;
  currentPage.value = page ?? pages.get("home")!;
});
</script>

<template>
  <div class="menu-container pb-5">
    <div class="menu-center">

      <div class="title-container mb-2">
        <div class="title-control mb-3 text-muted">
          <div>
            <Link v-if="parentPage" 
              :to="{ name: 'home', params: { page: currentPage.parent }}" 
              class="text-muted"
              icon="arrow-left-short" plain>
              {{ parentPage.name }}
            </Link>
          </div>
          <div>Learning resources</div>
        </div>
        <div>
          <h4>{{ currentPage.title }}</h4>
        </div>
      </div>

      <div class="control-container mt-2">

        <div v-if="currentPage.buttons" class="control">
          <Link v-for="b in currentPage.buttons" 
            :disabled="b.link == undefined && (b.page == undefined || !pages.has(b.page))"
            :to="b.page ? b.page : (b.link ? b.link : 'home')">
            {{ b.name }}
          </Link>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.control {
  display: grid;
  grid-template-rows: minmax(auto, 1fr) minmax(auto, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  gap: 0.5rem;
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
  display: grid;
  grid-template-rows: 1fr 1fr;
}
.menu-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
