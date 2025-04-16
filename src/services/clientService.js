import axios from 'axios';
import authService from './authService';

const API_URL = 'https://salespro-bsfy.onrender.com';

const clientService = {
  async createClient(clientData) {
    try {
      const token = authService.getToken();
      const response = await axios.post(`${API_URL}/clients`, clientData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getClients() {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getClientById(id) {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateClient(id, clientData) {
    try {
      const token = authService.getToken();
      const response = await axios.put(`${API_URL}/clients/${id}`, clientData, {
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

export default clientService;
