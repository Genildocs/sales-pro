<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="form-grid">
      <div class="form-group">
        <label for="nome">Nome</label>
        <InputText
          id="nome"
          v-model="formData.nome"
          required
          placeholder="Digite o nome completo"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="cpf">CPF</label>
        <InputMask
          id="cpf"
          v-model="formData.cpf"
          mask="999.999.999-99"
          required
          placeholder="000.000.000-00"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="telefone">Telefone</label>
        <InputMask
          id="telefone"
          v-model="formData.telefone"
          mask="(99) 99999-9999"
          required
          placeholder="(00) 00000-0000"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="endereco">Endereço</label>
        <InputText
          id="endereco"
          v-model="formData.endereco"
          required
          placeholder="Digite o endereço"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="numero">Número</label>
        <InputText
          id="numero"
          v-model="formData.numero"
          required
          placeholder="Número da residência"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="bairro">Bairro</label>
        <InputText
          id="bairro"
          v-model="formData.bairro"
          required
          placeholder="Digite o bairro"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="cidade">Cidade</label>
        <InputText
          id="cidade"
          v-model="formData.cidade"
          required
          placeholder="Digite a cidade"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="cep">CEP</label>
        <InputMask
          id="cep"
          v-model="formData.cep"
          mask="99999-999"
          required
          placeholder="00000-000"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="data">Data</label>
        <Calendar
          id="data"
          v-model="formData.data"
          required
          dateFormat="dd/mm/yy"
          showIcon
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label for="tipo">Tipo</label>
        <div class="checkbox-group">
          <Checkbox
            v-model="formData.tipo"
            value="BUDGET"
            inputId="budget"
            :binary="false"
          />
          <label for="budget" class="ml-2">Orçamento</label>

          <Checkbox
            v-model="formData.tipo"
            value="ORDER"
            inputId="order"
            :binary="false"
            class="ml-4"
          />
          <label for="order" class="ml-2">Pedido</label>
        </div>
      </div>
    </div>

    <ItemForm v-model="formData.itens" />

    <div class="form-actions">
      <div class="vendedor-info" v-if="vendedorNome">
        <span class="vendedor-label">Vendedor:</span>
        <span class="vendedor-nome">{{ vendedorNome }}</span>
      </div>
      <div class="action-buttons">
        <Button
          type="submit"
          label="Registrar"
          icon="pi pi-check"
          :loading="isSubmitting"
          class="p-button-success"
        />
        <div class="send-document-buttons" v-if="vendedorNome">
          <Button
            label="Enviar por WhatsApp"
            icon="pi pi-whatsapp"
            class="p-button-help"
            @click="enviarWhatsApp"
            :loading="isEnviandoWhatsApp"
          />
          <Button
            label="Enviar por E-mail"
            icon="pi pi-envelope"
            class="p-button-info"
            @click="enviarEmail"
            :loading="isEnviandoEmail"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import { onMounted, ref } from 'vue'
import ItemForm from './ItemForm.vue'

const formData = ref({
  nome: '',
  cpf: '',
  telefone: '',
  endereco: '',
  numero: '',
  bairro: '',
  cidade: '',
  cep: '',
  data: '',
  tipo: [],
  itens: []
})

const isSubmitting = ref(false)
const isEnviandoWhatsApp = ref(false)
const isEnviandoEmail = ref(false)
const vendedorNome = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    // Simulando chamada à API
    const response = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          vendedor: {
            nome: 'João Silva'
          }
        })
      }, 2000)
    })
    
    vendedorNome.value = response.vendedor.nome
    console.log('Dados do formulário:', formData.value)
  } catch (error) {
    console.error('Erro ao enviar formulário:', error)
  } finally {
    isSubmitting.value = false
  }
}

const enviarWhatsApp = async () => {
  isEnviandoWhatsApp.value = true
  try {
    // Simulando envio por WhatsApp
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Documento enviado por WhatsApp')
  } catch (error) {
    console.error('Erro ao enviar por WhatsApp:', error)
  } finally {
    isEnviandoWhatsApp.value = false
  }
}

const enviarEmail = async () => {
  isEnviandoEmail.value = true
  try {
    // Simulando envio por E-mail
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Documento enviado por E-mail')
  } catch (error) {
    console.error('Erro ao enviar por E-mail:', error)
  } finally {
    isEnviandoEmail.value = false
  }
}

onMounted(() => {
  // Inicializa a data atual
  const today = new Date()
  formData.value.data = today
})
</script>

<style scoped>
.form-container {
  background-color: var(--surface-card);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color);
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.send-document-buttons {
  display: flex;
  gap: 0.5rem;
}

.vendedor-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--surface-100);
  border-radius: 6px;
  font-size: 0.875rem;
}

.vendedor-label {
  color: var(--text-color-secondary);
  font-weight: 500;
}

.vendedor-nome {
  color: var(--primary-color);
  font-weight: 600;
}

:deep(.p-inputtext) {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--surface-300);
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background-color: var(--surface-50);
}

:deep(.p-inputtext:focus) {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.1);
}

:deep(.p-inputtext::placeholder) {
  color: var(--text-color-secondary);
}

:deep(.p-calendar) {
  width: 100%;
}

:deep(.p-calendar .p-inputtext) {
  padding-right: 2.5rem;
}

:deep(.p-checkbox) {
  margin-right: 0.5rem;
}

:deep(.p-checkbox .p-checkbox-box) {
  border-radius: 4px;
  transition: all 0.2s ease;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

:deep(.p-button) {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
}

:deep(.p-button-success) {
  background-color: var(--green-500);
  border-color: var(--green-500);
}

:deep(.p-button-success:hover) {
  background-color: var(--green-600);
  border-color: var(--green-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
}

:deep(.p-button-success:active) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

:deep(.p-button:disabled) {
  background-color: var(--surface-300);
  border-color: var(--surface-300);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
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

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .checkbox-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .action-buttons {
    align-items: stretch;
  }

  .send-document-buttons {
    flex-direction: column;
  }

  .vendedor-info {
    order: 2;
    justify-content: center;
  }

  .p-button {
    width: 100%;
  }
}
</style> 