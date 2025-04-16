import axios from 'axios';
import authService from './authService';

const API_URL = 'https://salespro-bsfy.onrender.com';

const productService = {
  async createProduct(productData) {
    try {
      const token = authService.getToken();
      const response = await axios.post(`${API_URL}/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getProducts() {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getProductById(id) {
    try {
      const token = authService.getToken();
      const response = await axios.get(`${API_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateProduct(id, productData) {
    try {
      const token = authService.getToken();
      const response = await axios.put(
        `${API_URL}/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productService;
