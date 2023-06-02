import { createRouter, createWebHistory } from "vue-router";

const Welcome = () => import("@/pages/WelcomePage.vue");

const routes = [
  { path: "/", component: Welcome },
  // lazy load
  { path: "/library", component: () => import("@/pages/LibraryPage.vue") },
  { path: "/gameMain", component: () => import("@/pages/GamePageMain.vue") },
  { path: "/game", component: () => import("@/pages/GamePage.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
