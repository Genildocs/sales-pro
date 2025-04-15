<template>
  <div class="sales-list">
    <div class="sales-header">
      <h2>Lista de Vendas</h2>
      <div class="filters">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters.global.value"
            placeholder="Buscar..."
            class="search-input"
          />
        </span>
        <Dropdown
          v-model="filters.tipo.value"
          :options="tiposVenda"
          optionLabel="label"
          optionValue="value"
          placeholder="Filtrar por tipo"
          class="filter-dropdown"
        />
        <Calendar
          v-model="filters.data.value"
          placeholder="Filtrar por data"
          dateFormat="dd/mm/yy"
          showIcon
          class="filter-calendar"
        />
      </div>
    </div>

    <DataTable
      :value="filteredSales"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} vendas"
      :loading="loading"
      :globalFilterFields="['nome', 'vendedor', 'tipo']"
      :filters="filters"
      :filterDisplay="'row'"
      stripedRows
      showGridlines
      responsiveLayout="scroll"
      dataKey="id"
    >
      <Column field="nome" header="Cliente" sortable>
        <template #body="{ data }">
          <div class="client-info">
            <span class="client-name">{{ data.nome }}</span>
            <span class="client-details">{{ data.cpf }} | {{ data.telefone }}</span>
          </div>
        </template>
      </Column>

      <Column field="data" header="Data" sortable>
        <template #body="{ data }">
          {{ formatDate(data.data) }}
        </template>
      </Column>

      <Column field="tipo" header="Tipo" sortable>
        <template #body="{ data }">
          <Tag
            :value="data.tipo === 'BUDGET' ? 'Orçamento' : 'Pedido'"
            :severity="data.tipo === 'BUDGET' ? 'info' : 'success'"
          />
        </template>
      </Column>

      <Column field="total" header="Total" sortable>
        <template #body="{ data }">
          <span class="total-value">{{ formatCurrency(data.total) }}</span>
        </template>
      </Column>

      <Column field="vendedor" header="Vendedor" sortable>
        <template #body="{ data }">
          <div class="vendedor-info">
            <Avatar
              :label="getInitials(data.vendedor)"
              class="vendedor-avatar"
              size="small"
            />
            <span class="vendedor-nome">{{ data.vendedor }}</span>
          </div>
        </template>
      </Column>

      <Column header="Ações" style="width: 200px">
        <template #body="{ data }">
          <div class="action-buttons">
            <Button
              icon="pi pi-whatsapp"
              class="p-button-help p-button-sm"
              @click="enviarWhatsApp(data)"
              :loading="loadingWhatsApp[data.id]"
              v-tooltip.top="'Enviar por WhatsApp'"
            />
            <Button
              icon="pi pi-envelope"
              class="p-button-info p-button-sm"
              @click="enviarEmail(data)"
              :loading="loadingEmail[data.id]"
              v-tooltip.top="'Enviar por E-mail'"
            />
            <Button
              icon="pi pi-download"
              class="p-button-secondary p-button-sm"
              @click="downloadDocument(data)"
              :loading="loadingDownload[data.id]"
              v-tooltip.top="'Baixar documento'"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <Toast />
  </div>
</template>

<script setup>
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref } from 'vue'

// Composables
const toast = useToast()

// State
const sales = ref([])
const loading = ref(false)
const loadingWhatsApp = ref({})
const loadingEmail = ref({})
const loadingDownload = ref({})

// Filtros
const filters = ref({
  global: { value: null, matchMode: 'contains', operator: 'and' },
  tipo: { value: null, matchMode: 'equals', operator: 'and' },
  data: { value: null, matchMode: 'date', operator: 'and' },
  nome: { value: null, matchMode: 'contains', operator: 'and' },
  vendedor: { value: null, matchMode: 'contains', operator: 'and' },
  total: { value: null, matchMode: 'equals', operator: 'and' }
})

const tiposVenda = [
  { label: 'Todos', value: null },
  { label: 'Orçamento', value: 'BUDGET' },
  { label: 'Pedido', value: 'ORDER' }
]

// Computed
const filteredSales = computed(() => {
  let result = [...sales.value]

  // Filtro global
  const globalFilter = filters.value.global?.value
  if (globalFilter) {
    const search = globalFilter.toLowerCase()
    result = result.filter(sale => 
      (sale.nome?.toLowerCase() ?? '').includes(search) ||
      (sale.vendedor?.toLowerCase() ?? '').includes(search) ||
      (sale.tipo?.toLowerCase() ?? '').includes(search)
    )
  }

  // Filtro por tipo
  const tipoFilter = filters.value.tipo?.value
  if (tipoFilter) {
    result = result.filter(sale => sale.tipo === tipoFilter)
  }

  // Filtro por data
  const dataFilter = filters.value.data?.value
  if (dataFilter) {
    const filterDate = new Date(dataFilter)
    result = result.filter(sale => {
      const saleDate = new Date(sale.data)
      return saleDate.toDateString() === filterDate.toDateString()
    })
  }

  return result
})

// Utils
const formatDate = (date) => {
  if (!date) return ''
  try {
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) return ''
    return parsedDate.toLocaleDateString('pt-BR')
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return ''
  }
}

const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00'
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value))
  } catch (error) {
    console.error('Erro ao formatar moeda:', error)
    return 'R$ 0,00'
  }
}

const getInitials = (name) => {
  if (!name || typeof name !== 'string') return ''
  try {
    return name
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .toUpperCase()
  } catch (error) {
    console.error('Erro ao gerar iniciais:', error)
    return ''
  }
}

// Notificações
const showSuccess = (message) => {
  if (!message) return
  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: message,
    life: 3000
  })
}

const showError = (message) => {
  if (!message) return
  toast.add({
    severity: 'error',
    summary: 'Erro',
    detail: message,
    life: 3000
  })
}

// Ações
const enviarWhatsApp = async (sale) => {
  if (!sale?.id) return
  loadingWhatsApp.value[sale.id] = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    showSuccess(`Documento enviado por WhatsApp para ${sale.nome || 'cliente'}`)
  } catch (error) {
    showError(`Erro ao enviar por WhatsApp: ${error?.message || 'Erro desconhecido'}`)
  } finally {
    loadingWhatsApp.value[sale.id] = false
  }
}

const enviarEmail = async (sale) => {
  if (!sale?.id) return
  loadingEmail.value[sale.id] = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    showSuccess(`Documento enviado por E-mail para ${sale.nome || 'cliente'}`)
  } catch (error) {
    showError(`Erro ao enviar por E-mail: ${error?.message || 'Erro desconhecido'}`)
  } finally {
    loadingEmail.value[sale.id] = false
  }
}

const downloadDocument = async (sale) => {
  if (!sale?.id) return
  loadingDownload.value[sale.id] = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    showSuccess(`Documento baixado para ${sale.nome || 'cliente'}`)
  } catch (error) {
    showError(`Erro ao baixar documento: ${error?.message || 'Erro desconhecido'}`)
  } finally {
    loadingDownload.value[sale.id] = false
  }
}

// Lifecycle
onMounted(async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    sales.value = [
      {
        id: 1,
        nome: 'Cliente 1',
        cpf: '123.456.789-00',
        telefone: '(11) 99999-9999',
        data: new Date(),
        tipo: 'BUDGET',
        total: 1500.00,
        vendedor: 'João Silva'
      },
      {
        id: 2,
        nome: 'Cliente 2',
        cpf: '987.654.321-00',
        telefone: '(11) 98888-8888',
        data: new Date(),
        tipo: 'ORDER',
        total: 2500.00,
        vendedor: 'Maria Santos'
      }
    ]
  } catch (error) {
    showError('Erro ao carregar vendas')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.sales-list {
  background-color: var(--surface-card);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sales-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.sales-header h2 {
  margin: 0;
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 600;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-input {
  width: 250px;
}

.filter-dropdown,
.filter-calendar {
  width: 200px;
}

.client-info {
  display: flex;
  flex-direction: column;
}

.client-name {
  font-weight: 500;
  color: var(--text-color);
}

.client-details {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

.total-value {
  font-weight: 600;
  color: var(--primary-color);
}

.vendedor-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.vendedor-avatar {
  background-color: var(--primary-color);
  color: white;
}

.vendedor-nome {
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

:deep(.p-button-sm) {
  padding: 0.5rem;
}

:deep(.p-button-help) {
  background-color: #25d366;
  border-color: #25d366;
}

:deep(.p-button-help:hover) {
  background-color: #128c7e;
  border-color: #128c7e;
}

:deep(.p-button-info) {
  background-color: #2196f3;
  border-color: #2196f3;
}

:deep(.p-button-info:hover) {
  background-color: #1976d2;
  border-color: #1976d2;
}

:deep(.p-button-secondary) {
  background-color: var(--surface-400);
  border-color: var(--surface-400);
}

:deep(.p-button-secondary:hover) {
  background-color: var(--surface-500);
  border-color: var(--surface-500);
}

@media (max-width: 768px) {
  .sales-header {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    flex-direction: column;
  }

  .search-input,
  .filter-dropdown,
  .filter-calendar {
    width: 100%;
  }

  .action-buttons {
    flex-direction: column;
  }

  :deep(.p-button-sm) {
    width: 100%;
  }
}
</style> 