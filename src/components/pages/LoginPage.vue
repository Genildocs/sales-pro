<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-header">
        <h1 class="login-title">salesPro</h1>
        <p class="login-subtitle">Manage sales efficiently and easily!</p>
      </div>

      <div class="login-buttons">
        <Button
          label="Get Started"
          class="p-button-primary get-started-btn"
          @click="navigateToRegistration" />
        <Button
          label="Access"
          class="p-button-secondary access-btn"
          @click="navigateToLogin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToRegistration = () => {
  router.push('/sales-registration');
};

const navigateToLogin = () => {
  router.push('/auth/login');
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-content {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  margin-bottom: 2rem;
}

.login-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.login-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.login-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.get-started-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  background: #2c3e50;
  border: none;
}

.get-started-btn:hover {
  background: #34495e;
}

.access-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  background: transparent;
  color: #2c3e50;
  border: 2px solid #2c3e50;
}

.access-btn:hover {
  background: #f8f9fa;
}

:deep(.p-button) {
  border-radius: 8px;
  transition: all 0.3s ease;
}

:deep(.p-button:focus) {
  box-shadow: none;
}
</style>
