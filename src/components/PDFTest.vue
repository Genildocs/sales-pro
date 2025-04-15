<template>
  <div class="pdf-test">
    <h2>Teste de Geração de PDF</h2>
    
    <div class="test-form">
      <div class="form-group">
        <label>Tipo</label>
        <select v-model="testData.tipo">
          <option value="BUDGET">Orçamento</option>
          <option value="ORDER">Pedido</option>
        </select>
      </div>

      <div class="form-group">
        <label>Nome do Cliente</label>
        <input v-model="testData.nome" type="text" placeholder="Nome do cliente">
      </div>

      <div class="form-group">
        <label>CPF</label>
        <input v-model="testData.cpf" type="text" placeholder="CPF">
      </div>

      <div class="form-group">
        <label>Telefone</label>
        <input v-model="testData.telefone" type="text" placeholder="Telefone">
      </div>

      <div class="form-group">
        <label>Endereço</label>
        <input v-model="testData.endereco" type="text" placeholder="Endereço">
      </div>

      <div class="form-group">
        <label>Número</label>
        <input v-model="testData.numero" type="text" placeholder="Número">
      </div>

      <div class="form-group">
        <label>Bairro</label>
        <input v-model="testData.bairro" type="text" placeholder="Bairro">
      </div>

      <div class="form-group">
        <label>Cidade</label>
        <input v-model="testData.cidade" type="text" placeholder="Cidade">
      </div>

      <div class="form-group">
        <label>CEP</label>
        <input v-model="testData.cep" type="text" placeholder="CEP">
      </div>

      <div class="form-group">
        <label>Vendedor</label>
        <input v-model="testData.vendedor" type="text" placeholder="Nome do vendedor">
      </div>

      <div class="items-section">
        <h3>Itens</h3>
        <div v-for="(item, index) in testData.itens" :key="index" class="item-row">
          <input v-model="item.quantidade" type="number" placeholder="Qtd">
          <input v-model="item.material" type="text" placeholder="Material">
          <input v-model="item.medidas" type="text" placeholder="Medidas">
          <input v-model="item.cor" type="text" placeholder="Cor">
          <input v-model="item.unitario" type="number" placeholder="Valor Unit.">
          <button @click="removeItem(index)" class="btn-remove">Remover</button>
        </div>
        <button @click="addItem" class="btn-add">Adicionar Item</button>
      </div>

      <button @click="generatePDF" class="btn-generate">Gerar PDF</button>
    </div>
  </div>
</template>

<script setup>
import { generateSalePDF } from '@/services/pdfService'
import { ref } from 'vue'

const testData = ref({
  tipo: 'BUDGET',
  nome: 'João da Silva',
  cpf: '123.456.789-00',
  telefone: '(11) 99999-9999',
  endereco: 'Rua das Flores',
  numero: '123',
  bairro: 'Centro',
  cidade: 'São Paulo',
  cep: '01234-567',
  vendedor: 'Maria Santos',
  data: new Date(),
  itens: [
    {
      quantidade: 2,
      material: 'Vidro Temperado',
      medidas: '100x200cm',
      cor: 'Incolor',
      unitario: 150.00,
      subtotal: 300.00
    }
  ]
})

const addItem = () => {
  testData.value.itens.push({
    quantidade: 1,
    material: '',
    medidas: '',
    cor: '',
    unitario: 0,
    subtotal: 0
  })
}

const removeItem = (index) => {
  testData.value.itens.splice(index, 1)
}

const generatePDF = () => {
  // Calcula os subtotais antes de gerar o PDF
  testData.value.itens.forEach(item => {
    item.subtotal = item.quantidade * item.unitario
  })
  
  generateSalePDF(testData.value)
}
</script>

<style scoped>
.pdf-test {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.test-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
}

.items-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
}

.item-row {
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 120px auto;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.btn-add,
.btn-remove,
.btn-generate {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-add {
  background-color: #3b82f6;
  color: white;
  margin-top: 1rem;
}

.btn-add:hover {
  background-color: #2563eb;
}

.btn-remove {
  background-color: #ef4444;
  color: white;
}

.btn-remove:hover {
  background-color: #dc2626;
}

.btn-generate {
  background-color: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  margin-top: 2rem;
}

.btn-generate:hover {
  background-color: #059669;
}
</style> 