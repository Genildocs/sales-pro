<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';

</script>

<template>
  <div class="app-wrapper">    
    <div class="app-container">
      <Header />
      <main class="app-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: #f8f9fa;
  width: 100%;
}

.app-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
