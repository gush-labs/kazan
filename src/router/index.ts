import { createRouter, createWebHistory } from "vue-router";
import TyperPage from "@/views/TyperPage.vue";
import HomePage from "@/views/HomePage.vue";
import ReviewPage from "@/views/ReviewPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import KanaPage from "@/views/KanaPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import LearningPage from "@/views/LearningPage.vue";

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
      path: "/typer",
      name: "typer",
      component: TyperPage,
    },
    {
      path: "/review",
      name: "review",
      component: ReviewPage,
    },
    {
      path: "/:path(.*)*",
      name: "notfound",
      component: NotFoundPage,
    },
  ],
});

export default router;
