import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ReviewPage from "@/views/ReviewPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import KanaPage from "@/views/KanaPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import VocabularyPage from "@/views/VocabularyPage.vue";
import ApiGuide from "@/views/ApiGuide.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import AboutPage from "@/views/AboutPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:page(.*)?",
      name: "home",
      component: HomePage,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsPage,
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
    },
    {
      path: "/api-guide",
      name: "api-guide",
      component: ApiGuide,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
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
