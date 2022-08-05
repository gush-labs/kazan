import { createRouter, createWebHistory } from "vue-router";
import ReviewPage from "@/views/ReviewPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ReviewPage,
    },
  ],
});

export default router;
