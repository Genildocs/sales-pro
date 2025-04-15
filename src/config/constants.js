export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SALES: '/sales',
  PROFILE: '/profile'
}

export const APP = {
  NAME: 'VD Anjos',
  DESCRIPTION: 'Sistema de gerenciamento de vendas',
  VERSION: '1.0.0',
  AUTHOR: 'VD Anjos Team'
}

export const API = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  MAX_RETRIES: 3
}

export const STORAGE = {
  TOKEN_KEY: 'vd_anjos_token',
  USER_KEY: 'vd_anjos_user',
  THEME_KEY: 'vd_anjos_theme'
}

export const VALIDATION = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
}

export const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
}

export const STATUS_LABELS = {
  [STATUS.PENDING]: 'Pendente',
  [STATUS.APPROVED]: 'Aprovado',
  [STATUS.REJECTED]: 'Rejeitado',
  [STATUS.CANCELLED]: 'Cancelado'
}

export const STATUS_COLORS = {
  [STATUS.PENDING]: 'warning',
  [STATUS.APPROVED]: 'success',
  [STATUS.REJECTED]: 'danger',
  [STATUS.CANCELLED]: 'secondary'
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  MAX_PER_PAGE: 100,
  PER_PAGE_OPTIONS: [10, 20, 50, 100]
}

export const SALE_STATUS = {
  PENDING: 'PENDENTE',
  APPROVED: 'APROVADA',
  REJECTED: 'REJEITADA',
  CANCELLED: 'CANCELADA'
}

export const SALE_STATUS_LABELS = {
  [SALE_STATUS.PENDING]: 'Pendente',
  [SALE_STATUS.APPROVED]: 'Aprovado',
  [SALE_STATUS.REJECTED]: 'Rejeitado',
  [SALE_STATUS.CANCELLED]: 'Cancelado'
}

export const SALE_STATUS_COLORS = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'danger',
  CANCELLED: 'gray'
}

export const DATE_FORMATS = {
  DEFAULT: 'DD/MM/YYYY',
  DATETIME: 'DD/MM/YYYY HH:mm',
  TIME: 'HH:mm'
}

export const CURRENCY = {
  SYMBOL: 'R$',
  DECIMAL_SEPARATOR: ',',
  THOUSANDS_SEPARATOR: '.',
  DECIMAL_PLACES: 2
}

export const NOTIFICATION = {
  DURATION: 5000,
  POSITION: 'top-right'
} 