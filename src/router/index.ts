import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ReviewPage from "@/views/ReviewPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import KanaPage from "@/views/KanaPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import LearningPage from "@/views/LearningPage.vue";
import VocabularyPage from "@/views/VocabularyPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:page(.*)?",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/learning",
      name: "learning",
      component: LearningPage,
    },
    {
      path: "/kana/:kana",
      name: "kana",
      component: KanaPage,
    },
    {
      path: "/review",
      name: "review",
      component: ReviewPage,
    },
    {
      path: "/vocabulary",
      name: "vocabulary",
      component: VocabularyPage,
    },
    {
      path: "/:path(.*)*",
      name: "notfound",
      component: NotFoundPage,
    },
  ],
});

export default router;
