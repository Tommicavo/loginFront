import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/components/pages/HomePage.vue';
import NotFoundPage from '@/components/pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes: [
        { path: '/', name: 'homePage', component: HomePage },
        
        { path: '/notFoundPage', name: 'notFoundPage', component: NotFoundPage },
        { path: '/:pathMatch(.*)*', redirect: '/notFoundPage' },
    ]
});

export { router };
