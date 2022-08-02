import { createRouter, createWebHistory } from "vue-router";
import ReviewView from "@/views/ReviewView.vue";
import ReportView from "@/views/ReportView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/review",
      name: "review",
      component: ReviewView,
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView
    }
  ],
});

export default router;
