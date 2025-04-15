export const ROUTES = {
  HOME: {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true,
      title: 'Dashboard'
    }
  },
  LOGIN: {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: false,
      title: 'Login'
    }
  },
  OPEN_SALES: {
    path: '/open-sales',
    name: 'OpenSales',
    meta: {
      requiresAuth: true,
      title: 'Vendas Abertas'
    }
  },
  PROFILE: {
    path: '/profile',
    name: 'Profile',
    meta: {
      requiresAuth: true,
      title: 'Perfil'
    }
  },
  FORM: {
    path: '/form',
    name: 'Form',
    meta: {
      requiresAuth: true,
      title: 'Formulário'
    }
  }
}

export const NAVIGATION = [
  {
    label: 'Dashboard',
    icon: 'home',
    route: ROUTES.HOME
  },
  {
    label: 'Vendas Abertas',
    icon: 'shopping-cart',
    route: ROUTES.OPEN_SALES
  },
  {
    label: 'Perfil',
    icon: 'user',
    route: ROUTES.PROFILE
  },
  {
    label: 'Formulário',
    icon: 'form',
    route: ROUTES.FORM
  }
]

export const PUBLIC_ROUTES = ['/login'] 