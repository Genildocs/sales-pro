<template>
  <div class="base-card" :class="{ 'base-card--hover': hover }">
    <div v-if="$slots.header" class="base-card__header">
      <slot name="header" />
    </div>
    <div class="base-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  hover: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.base-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.base-card--hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.base-card--hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.base-card__header {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.base-card__body {
  padding: 1rem;
}

.base-card__footer {
  padding: 1rem;
  border-top: 1px solid #f0f0f0;
  background-color: #f8f9fa;
}
</style> 