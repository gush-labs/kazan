<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import { ref, watch, type Ref } from "vue";
import router from "@/router";
import type { RouteLocationRaw } from "vue-router";
import DisplayContainer from "@/components/DisplayContainer.vue";

class ButtonItem {
  name = "";
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
    { name: "Vocabulary", link: { name: "vocabulary" } },
  ],
});

pages.set("kana", {
  name: "Kana",
  parent: "home",
  title: "Which kana do you want to practice?",
  buttons: [
    { name: "Hiragana", link: { name: "kana", params: { kana: "hiragana" } } },
    { name: "Katakana", link: { name: "kana", params: { kana: "katakana" } } },
  ],
});

pages.set("vocab", {
  name: "Vocabulary",
  parent: "home",
  title: "Choose vocabulary",
  buttons: [
    { name: "WaniKani", page: "wk" },
    { name: "JLPT" },
    {
      name: "Test",
      link: {
        name: "review",
        query: { query: "wanikani", params: "1,true,true,true" },
      },
    },
  ],
});

pages.set("wk", {
  name: "Vocabulary",
  parent: "vocab",
  title: "Which WaniKani level to practice?",
  buttons: [
    { name: "Level 1", link: { name: "review", query: { db: "wkLevel1" } } },
    { name: "Level 2", link: { name: "review", query: { db: "wkLevel2" } } },
    { name: "Level 3" },
    { name: "Level 4" },
  ],
});

const paramPage = router.currentRoute.value.params.page?.toString();
const parentPage: Ref<Page | undefined> = ref(undefined);
const currentPage = ref(
  paramPage && pages.has(paramPage) ? pages.get(paramPage)! : pages.get("home")!
);
parentPage.value = pages.get(currentPage.value.parent);

watch(
  () => router.currentRoute.value.params.page,
  (newPage) => {
    const page = pages.get(newPage?.toString());
    parentPage.value = page ? pages.get(page.parent) : undefined;
    currentPage.value = page ?? pages.get("home")!;
  }
);

function goTo(path: RouteLocationRaw) {
  router.push(path);
}
</script>

<template>
  <DisplayContainer center>
    <div class="menu-center">
      <div class="title-container mb-2">
        <div>
          <h4>{{ currentPage.title }}</h4>
        </div>
      </div>

      <div class="control-container mt-2">
        <div v-if="currentPage.buttons" class="control">
          <ActionButton
            v-for="(b, i) in currentPage.buttons"
            :key="i"
            :disabled="
              b.link == undefined && (b.page == undefined || !pages.has(b.page))
            "
            @click="() => goTo(b.page ? b.page : b.link ? b.link : 'home')"
          >
            {{ b.name }}
          </ActionButton>
        </div>
      </div>
    </div>
  </DisplayContainer>
</template>

<style scoped>
.control {
  display: grid;
  grid-template-rows: minmax(auto, 1fr) minmax(auto, 1fr);
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
  display: grid;
  grid-template-rows: 1fr 1fr;
}
</style>
