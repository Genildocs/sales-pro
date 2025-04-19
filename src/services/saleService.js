/**
 * Serviço de gerenciamento de vendas
 * @module saleService
 * @description Gerencia as operações CRUD de vendas
 */

import axios from 'axios';
import authService from './authService';

const API_URL = 'https://salespro-bsfy.onrender.com';

/**
 * Cria uma nova venda
 * @async
 * @function createSale
 * @param {Object} saleData - Dados da venda a ser criada
 * @param {string} saleData.clientId - ID do cliente
 * @param {Array} saleData.products - Lista de produtos da venda
 * @param {string} saleData.products[].productId - ID do produto
 * @param {number} saleData.products[].quantity - Quantidade do produto
 * @param {string} [saleData.observation] - Observações da venda
 * @returns {Promise<Object>} Dados da venda criada
 * @throws {Error} Erro retornado pela API
 */
const createSale = async (saleData) => {
  const response = await axios.post(`${API_URL}/vendas`, saleData, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  return response.data;
};

/**
 * Obtém todas as vendas
 * @async
 * @function getSales
 * @returns {Promise<Array>} Lista de vendas
 * @throws {Error} Erro retornado pela API
 */
const getSales = async () => {
  const response = await axios.get(`${API_URL}/vendas`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  return response.data;
};

/**
 * Obtém uma venda específica pelo ID
 * @async
 * @function getSaleById
 * @param {string|number} id - ID da venda
 * @returns {Promise<Object>} Dados da venda
 * @throws {Error} Erro retornado pela API
 */
const getSaleById = async (id) => {
  const response = await axios.get(`${API_URL}/vendas/${id}`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  return response.data;
};

/**
 * Atualiza os dados de uma venda
 * @async
 * @function updateSale
 * @param {string|number} id - ID da venda
 * @param {Object} saleData - Novos dados da venda
 * @param {string} [saleData.clientId] - ID do cliente
 * @param {Array} [saleData.products] - Lista de produtos da venda
 * @param {string} [saleData.observation] - Observações da venda
 * @returns {Promise<Object>} Dados atualizados da venda
 * @throws {Error} Erro retornado pela API
 */
const updateSale = async (id, saleData) => {
  const response = await axios.put(`${API_URL}/vendas/${id}`, saleData, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  return response.data;
};

export default {
  createSale,
  getSales,
  getSaleById,
  updateSale,
};
