/**
 * Serviço de gerenciamento de clientes
 * @module clientService
 * @description Gerencia as operações CRUD de clientes
 */

import axios from 'axios';
import authService from './authService';

const API_URL = 'https://salespro-bsfy.onrender.com';

/**
 * Cria um novo cliente
 * @async
 * @function createClient
 * @param {Object} clientData - Dados do cliente a ser criado
 * @param {string} clientData.name - Nome do cliente
 * @param {string} clientData.email - E-mail do cliente
 * @param {string} clientData.phone - Telefone do cliente
 * @param {string} clientData.address - Endereço do cliente
 * @returns {Promise<Object>} Dados do cliente criado
 * @throws {Error} Erro retornado pela API
 */
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

  /**
   * Obtém todos os clientes
   * @async
   * @function getClients
   * @returns {Promise<Array>} Lista de clientes
   * @throws {Error} Erro retornado pela API
   */
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

  /**
   * Obtém um cliente específico pelo ID
   * @async
   * @function getClientById
   * @param {string|number} id - ID do cliente
   * @returns {Promise<Object>} Dados do cliente
   * @throws {Error} Erro retornado pela API
   */
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

  /**
   * Atualiza os dados de um cliente
   * @async
   * @function updateClient
   * @param {string|number} id - ID do cliente
   * @param {Object} clientData - Novos dados do cliente
   * @param {string} [clientData.name] - Nome do cliente
   * @param {string} [clientData.email] - E-mail do cliente
   * @param {string} [clientData.phone] - Telefone do cliente
   * @param {string} [clientData.address] - Endereço do cliente
   * @returns {Promise<Object>} Dados atualizados do cliente
   * @throws {Error} Erro retornado pela API
   */
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
