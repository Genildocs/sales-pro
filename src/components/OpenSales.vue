<template>
  <div class="open-sales">
    <h1>Vendas Abertas</h1>
    <div class="cards-container">
      <div v-for="(sale, index) in sales" :key="index" class="sale-card">
        <div class="card-header">
          <h3>{{ sale.name }}</h3>
          <span class="status" :class="sale.status">{{ sale.status }}</span>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span class="label">Products:</span>
            <span class="value">{{ sale.products }}</span>
          </div>
          <div class="info-row">
            <span class="label">Price:</span>
            <span class="value">${{ sale.price }}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="btn view-details" @click="viewDetails(sale)">View Details</button>
          <button class="btn update-status" @click="updateStatus(sale)">Update Status</button>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dados de exemplo
const sales = ref([
  {
    name: 'John Doe',
    products: 5,
    price: 1500,
    status: 'pending'
  },
  {
    name: 'Jane Smith',
    products: 3,
    price: 900,
    status: 'completed'
  },
  {
    name: 'Mike Johnson',
    products: 7,
    price: 2100,
    status: 'processing'
  }
])

const viewDetails = (sale) => {
  // Implementar lógica para visualizar detalhes
  console.log('Viewing details for:', sale)
}

const updateStatus = (sale) => {
  // Implementar lógica para atualizar status
  console.log('Updating status for:', sale)
}
</script>

<style scoped>
.open-sales {
  width: 100%;
  padding: 1rem 0;
}

@media (min-width: 768px) {
  .open-sales {
    padding: 2rem;
  }
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.sale-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.sale-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status.completed {
  background-color: #d4edda;
  color: #155724;
}

.status.processing {
  background-color: #cce5ff;
  color: #004085;
}

.card-body {
  margin-bottom: 1.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.label {
  color: #6c757d;
}

.value {
  font-weight: 500;
  color: #2c3e50;
}

.card-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.view-details {
  background-color: #007bff;
  color: white;
}

.view-details:hover {
  background-color: #0056b3;
}

.update-status {
  background-color: #6c757d;
  color: white;
}

.update-status:hover {
  background-color: #5a6268;
}
</style> 