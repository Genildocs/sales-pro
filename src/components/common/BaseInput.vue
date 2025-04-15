<template>
  <div class="base-input" :class="{ 'base-input--error': error }">
    <label v-if="label" :for="id" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="base-input__field"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="error" class="base-input__error">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.base-input__label {
  font-weight: 500;
  color: #2c3e50;
}

.base-input__required {
  color: #dc3545;
}

.base-input__field {
  padding: 0.5rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.base-input__field:focus {
  outline: none;
  border-color: #007bff;
}

.base-input__field:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.base-input--error .base-input__field {
  border-color: #dc3545;
}

.base-input__error {
  color: #dc3545;
  font-size: 0.875rem;
}
</style> 