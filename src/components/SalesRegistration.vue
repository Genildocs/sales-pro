<template>
  <div class="sales-registration">
    <h1>Registro de Vendas</h1>
    <Form @submit="handleFormSubmit" />
  </div>
</template>

<script setup>
import Form from './Form.vue';

const handleFormSubmit = (formData) => {
  // Aqui você pode implementar a lógica de submissão do formulário
  console.log('Dados do formulário:', formData)
}
</script>

<style scoped>
.sales-registration {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
</style> 