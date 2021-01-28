import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/signup/enter-cnic',
    name: 'EnterCNIC',
    component: () => import('@/views/Signup/Signup-1.vue'),
  },
  {
    path: '/signup/verify-identity',
    name: 'VerifyIdentity',
    component: () => import('@/views/Signup/Signup-2.vue'),
  },
  {
    path: '/signup/enter-contact',
    name: 'EnterContact',
    component: () => import('@/views/Signup/Signup-3.vue'),
  },
  {
    path: '/signup/confirm-contact',
    name: 'ConfirmContact',
    component: () => import('@/views/Signup/Signup-4.vue'),
  },
  {
    path: '/signup/success',
    name: 'SignupSuccess',
    component: () => import('@/views/Signup/Signup-5.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
