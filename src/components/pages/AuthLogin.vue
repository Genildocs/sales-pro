/** * Componente de Login * @component * @description Componente responsável
pela autenticação de usuários no sistema */
<template>
  <div class="auth-container">
    <div class="auth-content">
      <div class="auth-header">
        <h1 class="auth-title">Login</h1>
        <p class="auth-subtitle">Acesse sua conta</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">E-mail</label>
          <InputText
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="Digite seu e-mail"
            :class="{ 'p-invalid': errors.email }"
            class="w-full" />
          <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <Password
            id="password"
            v-model="formData.password"
            :feedback="false"
            toggleMask
            placeholder="Digite sua senha"
            :class="{ 'p-invalid': errors.password }"
            class="w-full" />
          <small v-if="errors.password" class="p-error">{{
            errors.password
          }}</small>
        </div>

        <Button
          type="submit"
          label="Entrar"
          class="p-button-primary login-btn"
          :loading="isLoading" />
      </form>
    </div>
  </div>
</template>

<script setup>
import authService from '@/services/authService';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const isLoading = ref(false);

/**
 * Dados do formulário de login
 * @type {Object}
 * @property {string} email - E-mail do usuário
 * @property {string} password - Senha do usuário
 */
const formData = ref({
  email: '',
  password: '',
});

/**
 * Objeto contendo mensagens de erro de validação
 * @type {Object}
 * @property {string} email - Mensagem de erro do campo e-mail
 * @property {string} password - Mensagem de erro do campo senha
 */
const errors = ref({
  email: '',
  password: '',
});

/**
 * Valida o formato do e-mail
 * @param {string} email - E-mail a ser validado
 * @returns {boolean} true se o e-mail for válido, false caso contrário
 */
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Valida os campos do formulário
 * @returns {boolean} true se o formulário for válido, false caso contrário
 */
const validateForm = () => {
  let isValid = true;
  errors.value = {
    email: '',
    password: '',
  };

  if (!formData.value.email) {
    errors.value.email = 'E-mail é obrigatório';
    isValid = false;
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = 'E-mail inválido';
    isValid = false;
  }

  if (!formData.value.password) {
    errors.value.password = 'Senha é obrigatória';
    isValid = false;
  } else if (formData.value.password.length < 6) {
    errors.value.password = 'A senha deve ter no mínimo 6 caracteres';
    isValid = false;
  }

  return isValid;
};

/**
 * Manipula o processo de login
 * @async
 * @function handleLogin
 * @throws {Error} Erro retornado pela API de autenticação
 */
const handleLogin = async () => {
  if (!validateForm()) {
    toast.add({
      severity: 'error',
      summary: 'Erro de Validação',
      detail: 'Por favor, corrija os erros no formulário',
      life: 3000,
    });
    return;
  }

  isLoading.value = true;
  try {
    await authService.login(formData.value.email, formData.value.password);
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Login realizado com sucesso!',
      life: 3000,
    });
    router.push('/home');
  } catch (error) {
    const response = error.response?.data;

    if (response && response.message) {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: response.message,
        life: 5000,
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível realizar o login. Tente novamente.',
        life: 5000,
      });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.auth-content {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 1rem;
}

.auth-header {
  margin-bottom: 2rem;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.auth-subtitle {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background: #2c3e50;
  border: none;
  margin-top: 1rem;
}

.login-btn:hover {
  background: #34495e;
}

:deep(.p-inputtext) {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
}

:deep(.p-password) {
  width: 100%;
}

:deep(.p-password input) {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
}

.p-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

:deep(.p-invalid) {
  border-color: #dc3545;
}

:deep(.p-invalid:focus) {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>
