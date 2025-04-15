import { computed, ref } from 'vue'

export function usePagination(initialPage = 1, initialPerPage = 10) {
  const currentPage = ref(initialPage)
  const itemsPerPage = ref(initialPerPage)
  const totalItems = ref(0)

  const totalPages = computed(() => 
    Math.ceil(totalItems.value / itemsPerPage.value)
  )

  const hasNextPage = computed(() => 
    currentPage.value < totalPages.value
  )

  const hasPreviousPage = computed(() => 
    currentPage.value > 1
  )

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (hasPreviousPage.value) {
      currentPage.value--
    }
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const setTotalItems = (total) => {
    totalItems.value = total
  }

  const reset = () => {
    currentPage.value = initialPage
    itemsPerPage.value = initialPerPage
    totalItems.value = 0
  }

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    goToPage,
    setTotalItems,
    reset
  }
} 