import api from '../api'

export const salesService = {
  async getSales(params = {}) {
    const response = await api.get('/sales', { params })
    return response.data
  },

  async getSaleById(id) {
    const response = await api.get(`/sales/${id}`)
    return response.data
  },

  async createSale(data) {
    const response = await api.post('/sales', data)
    return response.data
  },

  async updateSale(id, data) {
    const response = await api.put(`/sales/${id}`, data)
    return response.data
  },

  async deleteSale(id) {
    await api.delete(`/sales/${id}`)
  },

  async updateSaleStatus(id, status) {
    const response = await api.patch(`/sales/${id}/status`, { status })
    return response.data
  }
} 