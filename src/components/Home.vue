<script setup>
import { ref } from 'vue';

const stats = ref({
  totalSales: 150,
  totalRevenue: 45000,
  pendingOrders: 12,
  completedOrders: 138,
});
</script>

<template>
  <div class="home">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p class="subtitle">Visão geral das vendas</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total de Vendas</h3>
        <p class="stat-value">{{ stats.totalSales }}</p>
      </div>
      <div class="stat-card">
        <h3>Receita Total</h3>
        <p class="stat-value">${{ stats.totalRevenue.toLocaleString() }}</p>
      </div>
      <div class="stat-card">
        <h3>Pedidos Pendentes</h3>
        <p class="stat-value">{{ stats.pendingOrders }}</p>
      </div>
      <div class="stat-card">
        <h3>Pedidos Concluídos</h3>
        <p class="stat-value">{{ stats.completedOrders }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
}

.subtitle {
  color: #6c757d;
  margin: 0.5rem 0 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin: 0 0 0.5rem;
  color: #6c757d;
  font-size: 1rem;
  font-weight: 500;
}

.stat-value {
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
}
</style>
