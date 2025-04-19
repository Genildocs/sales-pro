/**
 * Serviço de gerenciamento de produtos
 * @module productService
 * @description Gerencia as operações CRUD de produtos
 */

import axios from 'axios';
import authService from './authService';

const API_URL = 'https://salespro-bsfy.onrender.com';

/**
 * Cria um novo produto
 * @async
 * @function createProduct
 * @param {Object} productData - Dados do produto a ser criado
 * @param {string} productData.name - Nome do produto
 * @param {number} productData.price - Preço do produto
 * @param {string} productData.description - Descrição do produto
 * @param {number} productData.stock - Quantidade em estoque
 * @returns {Promise<Object>} Dados do produto criado
 * @throws {Error} Erro retornado pela API
 */
const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  return response.data;
};

/**
 * Obtém todos os produtos
 * @async
 * @function getProducts
 * @returns {Promise<Array>} Lista de produtos
 * @throws {Error} Erro retornado pela API
 */
const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  return response.data;
};

/**
 * Obtém um produto específico pelo ID
 * @async
 * @function getProductById
 * @param {string|number} id - ID do produto
 * @returns {Promise<Object>} Dados do produto
 * @throws {Error} Erro retornado pela API
 */
const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  return response.data;
};

/**
 * Atualiza os dados de um produto
 * @async
 * @function updateProduct
 * @param {string|number} id - ID do produto
 * @param {Object} productData - Novos dados do produto
 * @param {string} [productData.name] - Nome do produto
 * @param {number} [productData.price] - Preço do produto
 * @param {string} [productData.description] - Descrição do produto
 * @param {number} [productData.stock] - Quantidade em estoque
 * @returns {Promise<Object>} Dados atualizados do produto
 * @throws {Error} Erro retornado pela API
 */
const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/products/${id}`, productData, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  return response.data;
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
};
