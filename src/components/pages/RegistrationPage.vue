<template>
  <div class="registration-page">
    <BaseCard>
      <template #header>
        <h2>Registro de Vendas</h2>
      </template>

      <Form @submit="handleSubmit" />
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from '@/components/common/BaseCard.vue'
import Form from '@/components/Form.vue'
import { salesService } from '@/services/sales'

const handleSubmit = async (formData) => {
  try {
    await salesService.createSale({
      ...formData,
      type: formData.isBudget ? 'BUDGET' : 'ORDER'
    })
  } catch (error) {
    console.error('Erro ao registrar venda:', error)
  }
}
</script>

<style scoped>
.registration-page {
  padding: 2rem;
}
</style> 