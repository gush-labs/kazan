import { createRouter, createWebHistory } from "vue-router";
import ReviewPage from "@/views/ReviewPage.vue";
import TyperPage from "@/views/TyperPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ReviewPage,
    },
    {
      path: "/typer",
      name: "typer",
      component: TyperPage,
    }
  ],
});

export default router;
