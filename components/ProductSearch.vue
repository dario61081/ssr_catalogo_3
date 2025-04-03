<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </svg>
    </div>
    <input
      v-model="searchQuery"
      type="text"
      class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Buscar productos..."
      @keydown.esc="clearSearch"
    />
    <div v-if="searchQuery" class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" @click="clearSearch">
      <svg class="h-5 w-5 text-gray-400 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref(props.modelValue)

// Asegurarse de que el componente refleje cambios externos en modelValue
watch(() => props.modelValue, (newValue) => {
  searchQuery.value = newValue
})

// Limpiar búsqueda y ejecutar limpiar filtros
const clearSearch = () => {
  searchQuery.value = ''
  emit('update:modelValue', '')
  emit('clear-filters')
}

// Actualizar el valor del padre
watch(searchQuery, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
