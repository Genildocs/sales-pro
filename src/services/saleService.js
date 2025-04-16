import axios from 'axios';
import authService from './authService';

const API_URL = 'https://salespro-bsfy.onrender.com';

const saleService = {
  async createSale(saleData) {
    try {
      const token = authService.getToken();
      const response = await axios.post(`${API_URL}/vendas`, saleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getSales() {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/vendas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getSaleById(id) {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/vendas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateSale(id, saleData) {
    try {
      const token = authService.getToken();
      const response = await axios.put(`${API_URL}/vendas/${id}`, saleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default saleService;
