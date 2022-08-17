<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import type { Ref } from "vue";

class ButtonItem {
  name = "";
  link = "";
}

class Page {
  title = "";
  parent = "";
  name = "";
  buttons: ButtonItem[] = [];
  action?: () => void;

  static action(action: () => void): Page {
    return { title: "", parent: "", name: "", buttons: [], action };
  }
}

const pages = new Map<string, Page>();
pages.set("home", {
  name: "Main menu",
  parent: "",
  title: "What do you want to practice?",
  buttons: [
    { name: "Kana", link: "kana" },
    { name: "Vocabulary", link: "vocab" },
    { name: "Grammar", link: "grammar" },
    { name: "Phonetics", link: "phonetics" },
  ],
});

pages.set("kana", {
  name: "Kana",
  parent: "home",
  title: "Which kana do you want to practice?",
  buttons: [
    { name: "Hiragana", link: "hiragana" },
    { name: "Katakana", link: "katakana" },
  ],
});

pages.set("hiragana", {
  name: "Hiragana",
  parent: "kana",
  title: "Select parts of hiragana",
  buttons: [
    { name: "Monographs", link: "actionMonographs" },
    { name: "Digraphs", link: "actionDigraphs" },
    { name: "Monographs+", link: "actionAllMonographs" },
    { name: "Digraphs+", link: "actionAllDigraphs" },
    { name: "All Hiragana", link: "actionAllHiragana" },
    { name: "Choose Manually", link: "actionSelectHiragana" },
  ],
});

pages.set(
  "actionAllMonographs",
  Page.action(() => {
    router.push({ name: "review", query: { db: "allMonographs" } });
  })
);
pages.set(
  "actionAllDigraphs",
  Page.action(() => {
    router.push({ name: "review", query: { db: "allDigraphs" } });
  })
);
pages.set(
  "actionAllHiragana",
  Page.action(() => {
    router.push({ name: "review", query: { db: "allHiragana" } });
  })
);

pages.set("vocab", {
  name: "Vocabulary",
  parent: "home",
  title: "Which vocabulary do you want to choose?",
  buttons: [
    { name: "WaniKani", link: "wk" },
    { name: "JLPT", link: "jlpt" },
  ],
});

pages.set("wk", {
  name: "Vocabulary",
  parent: "vocab",
  title: "Which WaniKani level to practice?",
  buttons: [
    { name: "Level 1", link: "actionWkL1" },
    { name: "Level 2", link: "actionWkL2" },
    { name: "Level 3", link: "actionWkL3" },
    { name: "Level 4", link: "actionWkL4" },
  ],
});
pages.set(
  "actionWkL1",
  Page.action(() => {
    router.push({ name: "review", query: { db: "wkLevel1" } });
  })
);
pages.set(
  "actionWkL2",
  Page.action(() => {
    router.push({ name: "review", query: { db: "wkLevel2" } });
  })
);

const prevPage: Ref<Page | undefined> = ref(undefined);
const queryPage = router.currentRoute.value.query.page?.toString();
const currentPage = ref(
  queryPage && pages.has(queryPage) ? pages.get(queryPage)! : pages.get("home")!
);
prevPage.value = pages.get(currentPage.value.parent);

function openPage(link: string) {
  const page = pages.get(link);
  if (page) {
    if (page.action) {
      page.action();
      return;
    }

    router.replace({ name: "home", query: { page: link } });
    prevPage.value = currentPage.value;
    currentPage.value = page;
  }
}

function openPrev() {
  const page = pages.get(currentPage.value.parent);
  if (page) {
    let query = undefined;
    if (page.parent) {
      query = { page: currentPage.value.parent };
    }
    router.replace({ name: "home", query });
    prevPage.value = pages.get(page.parent);
    currentPage.value = page;
  }
}
</script>

<template>
  <div class="menu-container">
    <div class="menu-center mb-5">
      <div class="title-container mb-2">
        <div class="title">
          <div class="title-control mb-3 text-muted">
            <div>
              <a href="#" class="text-muted" v-if="prevPage" @click="openPrev">
                <i class="bi bi-arrow-left-short"></i> {{ prevPage.name }}</a
              >
            </div>
            <div>Learning resources</div>
          </div>
          <div>
            <h4>{{ currentPage.title }}</h4>
          </div>
        </div>
      </div>

      <div class="control mt-2">
        <button
          v-for="button in currentPage.buttons"
          :class="{ disabled: !pages.has(button.link) }"
          @click="() => openPage(button.link)"
          type="button"
          class="btn"
        >
          {{ button.name }}
        </button>
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
.control .btn {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.btn:hover {
  border-color: rgba(0, 0, 0, 0.25);
}
.title-container {
  display: flex;
  flex-direction: column;
  justify-content: end;
  text-align: center;
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
