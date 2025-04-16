<template>
  <header class="main-header" v-if="isAuthenticated">
    <div class="logo">
      <h1>SalesPro</h1>
    </div>

    <nav class="main-nav">
      <button class="menu-toggle" @click="toggleMenu">
        <Menu class="hamburger-icon" />
      </button>

      <div class="nav-links" :class="{ show: isMenuOpen }">
        <router-link to="/home" class="nav-item">Dashboard</router-link>
        <router-link to="/sales-registration" class="nav-item"
          >Registro de Vendas</router-link
        >
        <router-link to="/open-sales" class="nav-item"
          >Vendas Abertas</router-link
        >
        <router-link to="/list-overview" class="nav-item"
          >Relatórios</router-link
        >
      </div>
    </nav>

    <div class="user-info" @click="toggleUserMenu">
      <span class="user-avatar">{{ userInitials }}</span>
      <span class="user-name" v-if="userName">{{ userName }}</span>

      <div class="user-menu" v-if="isUserMenuOpen">
        <router-link to="/profile" class="menu-item">
          <User class="icon" />
          Perfil
        </router-link>
        <router-link to="/settings" class="menu-item">
          <Settings class="icon" />
          Configurações
        </router-link>
        <button class="menu-item logout" @click="handleLogout">
          <LogOut class="icon" />
          Sair
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import authService from '@/services/authService';
import { LogOut, Menu, Settings, User } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const isMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

const isAuthenticated = computed(() => authService.isAuthenticated());

// Dados do usuário (serão substituídos pela API)
const userName = ref('');
const userInitials = computed(() => {
  if (userName.value) {
    return userName.value
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
  return 'AG';
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const handleLogout = () => {
  authService.logout();
  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Logout realizado com sucesso!',
    life: 3000,
  });
  router.push('/');
};
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.logo h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.main-nav {
  display: flex;
  align-items: center;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-icon {
  width: 24px;
  height: 24px;
  color: #2c3e50;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-item {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.nav-item:hover {
  background-color: #f0f0f0;
}

.nav-item.router-link-active {
  background-color: #007bff;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-name {
  font-weight: 500;
  color: #2c3e50;
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  margin-top: 0.5rem;
  z-index: 1000;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #2c3e50;
  transition: background-color 0.3s;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f8f9fa;
}

.menu-item.logout {
  color: #dc3545;
}

.menu-item .icon {
  width: 20px;
  height: 20px;
  color: currentColor;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: none;
  }

  .nav-links.show {
    display: flex;
  }

  .nav-item {
    width: 100%;
    text-align: center;
  }

  .user-name {
    display: none;
  }
}
</style>
