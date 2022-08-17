import { createRouter, createWebHistory } from "vue-router";
import ReviewPage from "@/views/ReviewPage.vue";
import TyperPage from "@/views/TyperPage.vue";
import HomePage from "@/views/HomePage.vue";
import ReviewView from "@/views/review/ReviewView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/old",
      name: "old",
      component: ReviewPage,
    },
    {
      path: "/typer",
      name: "typer",
      component: TyperPage,
    },
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/review",
      name: "review",
      component: ReviewView,
    },
  ],
});

export default router;
