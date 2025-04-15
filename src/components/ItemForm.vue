<template>
  <div class="item-form">
    <div class="form-header">
      <h3>Itens</h3>
      <div class="header-actions">
        <span class="total-geral">
          Total: {{ formatCurrency(totalGeral) }}
        </span>
        <div class="buttons-group">
          <button
            v-if="items.length > 0"
            class="btn btn-danger"
            @click="clearAllItems"
            title="Limpar todos os itens"
          >
            <i class="icon-trash"></i>
          </button>
          <button
            class="btn btn-primary"
            @click="addItem"
            title="Adicionar item"
          >
            <i class="icon-plus"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table class="items-table">
        <thead>
          <tr>
            <th>Quantidade</th>
            <th>Material</th>
            <th>Medidas</th>
            <th>Cor</th>
            <th>Espessura</th>
            <th>Valor Unitário</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="items.length === 0">
            <td colspan="8" class="empty-message">
              Nenhum item adicionado
            </td>
          </tr>
          <tr v-for="(item, index) in items" :key="index">
            <td>
              <input
                type="number"
                v-model="item.quantidade"
                min="1"
                max="999"
                :class="{ 'input-error': !isValidQuantity(item.quantidade) }"
                @input="calculateSubtotal(item)"
              />
              <span v-if="!isValidQuantity(item.quantidade)" class="error-message">
                Quantidade inválida
              </span>
            </td>
            <td>
              <input
                type="text"
                v-model="item.material"
                :class="{ 'input-error': !item.material }"
                placeholder="Material"
              />
              <span v-if="!item.material" class="error-message">
                Campo obrigatório
              </span>
            </td>
            <td>
              <input
                type="text"
                v-model="item.medidas"
                :class="{ 'input-error': !item.medidas }"
                placeholder="Medidas"
              />
              <span v-if="!item.medidas" class="error-message">
                Campo obrigatório
              </span>
            </td>
            <td>
              <input
                type="text"
                v-model="item.cor"
                :class="{ 'input-error': !item.cor }"
                placeholder="Cor"
              />
              <span v-if="!item.cor" class="error-message">
                Campo obrigatório
              </span>
            </td>
            <td>
              <input
                type="text"
                v-model="item.espessura"
                :class="{ 'input-error': !item.espessura }"
                placeholder="Espessura"
              />
              <span v-if="!item.espessura" class="error-message">
                Campo obrigatório
              </span>
            </td>
            <td>
              <input
                type="number"
                v-model="item.unitario"
                min="0"
                step="0.01"
                :class="{ 'input-error': !isValidUnitario(item.unitario) }"
                @input="calculateSubtotal(item)"
              />
              <span v-if="!isValidUnitario(item.unitario)" class="error-message">
                Valor inválido
              </span>
            </td>
            <td class="subtotal">
              {{ formatCurrency(item.subtotal) }}
            </td>
            <td>
              <button
                class="btn btn-danger btn-icon"
                @click="removeItem(index)"
                title="Remover item"
              >
                <i class="icon-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const items = ref(props.modelValue)

const totalGeral = computed(() => {
  return items.value.reduce((total, item) => total + (item.subtotal || 0), 0)
})

const isValidQuantity = (value) => {
  return value && value >= 1 && value <= 999
}

const isValidUnitario = (value) => {
  return value !== null && value !== undefined && value >= 0
}

const addItem = () => {
  items.value.push({
    quantidade: 1,
    material: '',
    medidas: '',
    cor: '',
    espessura: '',
    unitario: 0,
    subtotal: 0
  })
}

const removeItem = (index) => {
  items.value.splice(index, 1)
}

const clearAllItems = () => {
  items.value = []
}

const calculateSubtotal = (item) => {
  if (isValidQuantity(item.quantidade) && isValidUnitario(item.unitario)) {
    item.subtotal = item.quantidade * item.unitario
  } else {
    item.subtotal = 0
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

watch(items, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })
</script>

<style scoped>
.item-form {
  margin-top: 2rem;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.buttons-group {
  display: flex;
  gap: 0.5rem;
}

.total-geral {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2563eb;
}

.form-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.items-table th {
  background-color: #f3f4f6;
  color: #1f2937;
  font-weight: 600;
  padding: 0.75rem;
  text-align: left;
}

.items-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.items-table tr:hover {
  background-color: #f9fafb;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background-color: #f9fafb;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  background-color: #fff;
}

.input-error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.input-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

.subtotal {
  font-weight: 600;
  color: #2563eb;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

.btn-danger {
  background-color: #ef4444;
  color: white;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
}

.btn-danger:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
}

.btn-danger:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
}

.btn-icon {
  width: 32px;
  height: 32px;
  padding: 0.5rem;
}

.btn-registrar {
  background-color: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.btn-registrar:hover {
  background-color: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
}

.btn-registrar:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.btn-registrar:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.empty-message {
  text-align: center;
  color: #6b7280;
  padding: 2rem;
}

.icon-plus,
.icon-trash {
  width: 16px;
  height: 16px;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
}

.icon-plus {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3C/svg%3E");
}

.icon-trash {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'/%3E%3C/svg%3E");
}

@media (max-width: 768px) {
  .form-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style> 