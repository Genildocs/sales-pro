import api from '../api'

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async logout() {
    await api.post('/auth/logout')
    localStorage.removeItem('token')
  },

  async getProfile() {
    const response = await api.get('/auth/profile')
    return response.data
  },

  async refreshToken() {
    const response = await api.post('/auth/refresh-token')
    return response.data
  }
} 