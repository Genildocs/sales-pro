import { createRouter, createWebHistory } from 'vue-router'

// Importação dos componentes
import Form from '../components/Form.vue'
import Home from '../components/Home.vue'
import ListOverview from '../components/ListOverview.vue'
import OpenSales from '../components/OpenSales.vue'
import RegistrationPage from '../components/pages/RegistrationPage.vue'
import Profile from '../components/Profile.vue'
import SalesList from '../components/SalesList.vue'
import Settings from '../components/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sales-registration',
    name: 'SalesRegistration',
    component: RegistrationPage
  },
  {
    path: '/open-sales',
    name: 'OpenSales',
    component: OpenSales
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/list-overview',
    name: 'ListOverview',
    component: ListOverview
  },
  {
    path: '/sales-list',
    name: 'sales-list',
    component: SalesList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 