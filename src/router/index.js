import authService from '@/services/authService';
import { createRouter, createWebHistory } from 'vue-router';

// Importação dos componentes
import Form from '../components/Form.vue';
import Home from '../components/Home.vue';
import ListOverview from '../components/ListOverview.vue';
import OpenSales from '../components/OpenSales.vue';
import AuthLogin from '../components/pages/AuthLogin.vue';
import LoginPage from '../components/pages/LoginPage.vue';
import RegistrationPage from '../components/pages/RegistrationPage.vue';
import PDFTest from '../components/PDFTest.vue';
import Profile from '../components/Profile.vue';
import Settings from '../components/Settings.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/auth/login',
    name: 'AuthLogin',
    component: AuthLogin,
    meta: { requiresAuth: false },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/sales-registration',
    name: 'SalesRegistration',
    component: RegistrationPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/open-sales',
    name: 'OpenSales',
    component: OpenSales,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: '/list-overview',
    name: 'ListOverview',
    component: ListOverview,
    meta: { requiresAuth: true },
  },
  {
    path: '/pdf-test',
    name: 'PDFTest',
    component: PDFTest,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guarda de navegação
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = authService.isAuthenticated();

  if (requiresAuth && !isAuthenticated) {
    next('/auth/login');
  } else if (to.path === '/auth/login' && isAuthenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router;
