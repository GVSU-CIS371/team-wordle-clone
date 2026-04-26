import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: () => import('../components/home.vue')},
    { path: '/login', component: () => import('../components/view.vue')},
    { path: '/signup', component: () => import('../components/signup.vue')},
    { path: '/game', component: () => import('../components/gameview.vue')},
    { path: '/stats', component: () => import('../components/statview.vue')}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
