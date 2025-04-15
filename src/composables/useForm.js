import { computed, ref } from 'vue'

export function useForm(initialValues) {
  const form = ref({ ...initialValues })
  const errors = ref({})
  const isSubmitting = ref(false)
  const isDirty = ref(false)

  const reset = () => {
    form.value = { ...initialValues }
    errors.value = {}
    isDirty.value = false
  }

  const setFieldValue = (field, value) => {
    form.value[field] = value
    isDirty.value = true
  }

  const setFieldError = (field, error) => {
    errors.value[field] = error
  }

  const clearFieldError = (field) => {
    delete errors.value[field]
  }

  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  return {
    form,
    errors,
    isSubmitting,
    isDirty,
    reset,
    setFieldValue,
    setFieldError,
    clearFieldError,
    hasErrors
  }
} 