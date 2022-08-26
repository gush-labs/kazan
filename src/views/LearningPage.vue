<script setup lang="ts">
import Button from "../components/Button.vue";
import router from "@/router";

const links = [
  {
    name: "Kana Guide",
    description: "Kana guide by Tofugu (authors of WaniKani) will teach you hiragana and katakana in easy-to-remember and fun form.",
    links: [ 
      { name: "hiragana guide", link: "https://www.tofugu.com/japanese/learn-hiragana/" },
      { name: "katakana guide", link: "https://www.tofugu.com/japanese/learn-katakana/" },
    ]
  },
  {
    name: "WaniKani",
    description: "Service that helps you to easily learn Japanese kanji through magic of SRS.",
    links: [ { name: "wanikani.com", link: "https://wanikani.com/" } ]
  },
  {
    name: "BunPro",
    description: "Service for learning Japanese grammar for all levels of JLPT.",
    links: [ { name: "bunpro.jp", link: "https://bunpro.jp/" } ]
  },
  {
    name: "Japanese Phonetics by Dogen",
    description: "Online course on Patron on Japanese phonetics.",
    links: [ { name: "@dogen", link: "https://www.patreon.com/dogen/posts" } ]
  },
]
</script>

<template>
<div class="d-flex flex-column justify-content-center pt-2 mt-5 mb-5">
  <div class="list-container">

    <div class="d-flex flex-row justify-content-center">
      <Button plain @click="() => router.back()" class='text-muted' icon="arrow-left-short">Go back</Button>
    </div>
    <div v-for="link in links">
      <h4>{{link.name}}</h4>
      <p class="mb-1">{{link.description}}</p>
      <div class="d-flex links-container flex-row justify-content-start">
        <a v-for="l in link.links" :href="l.link"><i class="bi bi-box-arrow-up-right"></i> {{ l.name }}</a>
      </div>
    </div>

  </div>
</div>
</template>

<style scoped>
.links-container a {
  margin-right: 1em;
  text-decoration: none;
  background-color: rgba(0,0,0,0);
  color: rgba(0,0,0,0.75);
}

.list-container {
  display: grid;
  gap: 1.5em;
}
</style>