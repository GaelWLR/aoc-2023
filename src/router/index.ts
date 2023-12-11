import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
];

const dayRoutes = Array.from({ length: 5 }, (_, i) => i + 1).map((i) => ({
  path: `/day-${i}`,
  name: `day-${i}`,
  component: () => import(`../views/Day${i}View.vue`),
}));

routes.push(...dayRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
