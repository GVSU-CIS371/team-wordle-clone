import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/login', component: ()=> import('../components/view.vue') },
  { path: '/game', component: ()=> import('../components/gameview.vue')},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;