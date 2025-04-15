<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      { 'base-button--full-width': fullWidth }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.base-button--full-width {
  width: 100%;
}

.base-button--primary {
  background-color: #007bff;
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.base-button--secondary {
  background-color: #6c757d;
  color: white;
}

.base-button--secondary:hover:not(:disabled) {
  background-color: #5a6268;
}

.base-button--danger {
  background-color: #dc3545;
  color: white;
}

.base-button--danger:hover:not(:disabled) {
  background-color: #c82333;
}

.base-button--success {
  background-color: #28a745;
  color: white;
}

.base-button--success:hover:not(:disabled) {
  background-color: #218838;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 