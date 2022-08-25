<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "@/components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="app-container">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<style>
.app-container {
  position: relative;

  max-width: 600px;
  min-height: 100vh;
  padding-top: 1em;
  padding-bottom: 1em;
  margin-left: auto;
  margin-right: auto;

  display: grid;
  grid-template-rows: auto 1fr auto;
}

@media screen and (max-width: 650px) {
  .app-container {
    margin-left: 1em;
    margin-right: 1em;
  }
}

.japanese {
  /* Honestly, this is terrible font. I don't like it.
     but fonts.google doesn't have anything better. Maybe adobe will have
     something nicer to offer. */
  font-family: 'Noto Sans JP', sans-serif;
}

/* Styles to properly size text related to parent elements.
   Bootstrap by default sizes everything related to a global font size. */
h4 {
  font-size: calc(1.275em + 0.3vw);
}
.btn {
  font-size: 1em;
}

/* Just global style to make some things look a little bit better */
.dropdown-menu {
  border-radius: 0px;
  padding: 0;
}
.dropdown-toggle::after {
  display: none;
}
.btn {
  border-radius: 0px;
}
</style>
