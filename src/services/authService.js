/**
 * Serviço de autenticação
 * @module authService
 * @description Gerencia a autenticação do usuário, incluindo login, logout e verificação de estado
 */

import axios from 'axios';

const API_URL = 'https://salespro-bsfy.onrender.com';

const authService = {
  async login(email, senha) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        senha,
      });

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  logout() {
    localStorage.removeItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService;
