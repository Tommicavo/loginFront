import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/components/pages/HomePage.vue';
import RegisterPage from '@/components/pages/RegisterPage.vue';
import LoginPage from '@/components/pages/LoginPage.vue';
import UserPage from '@/components/pages/UserPage.vue';
import NotFoundPage from '@/components/pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes: [
        { path: '/', name: 'homePage', component: HomePage },
        { path: '/register', name: 'registerPage', component: RegisterPage },
        { path: '/login', name: 'loginPage', component: LoginPage },
        { path: '/:slug/home', name: 'userPage', component: UserPage },
        
        { path: '/notFoundPage', name: 'notFoundPage', component: NotFoundPage },
        { path: '/:pathMatch(.*)*', redirect: '/notFoundPage' }
    ]
});

export { router };
