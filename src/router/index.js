import { createRouter, createWebHistory } from 'vue-router';

const routes = [  
    {
        path: '/',
        name: 'Search',
        component: () => import('/src/components/Search.vue'),
    },
    {
        path: '/people',
        name: 'people',
        component: () => import('/src/components/List.vue'),
    },
    {
        path: '/planets',
        name: 'planets',
        component: () => import('/src/components/List.vue'),
    },
    {
        path: '/films',
        name: 'films',
        component: () => import('/src/components/List.vue'),
    },
    {
        path: '/species',
        name: 'species',
        component: () => import('/src/components/List.vue'),
    },
    {
        path: '/vehicles',
        name: 'vehicles',
        component: () => import('/src/components/List.vue'),
    },
    {
        path: '/starships',
        name: 'starships',
        component: () => import('/src/components/List.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router