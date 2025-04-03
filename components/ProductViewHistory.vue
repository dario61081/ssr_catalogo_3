<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-30 z-40 flex justify-center items-start pt-10">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 overflow-hidden">
      <div class="p-4 border-b flex items-center justify-between">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          </svg>
          <h3 class="text-lg font-semibold">Productos vistos recientemente</h3>
        </div>
        <button class="text-gray-500 hover:text-gray-700" @click="close">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="product in viewedProducts" :key="product.codigo" class="bg-white rounded-lg shadow-sm overflow-hidden relative">
          <div class="flex flex-col h-full">
            <div class="relative pt-[100%] overflow-hidden">
              <!-- Stock Badge -->
              <div v-if="product.stock > 0" class="absolute top-0 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded-br-lg z-10">
                En Stock
              </div>
              <img :src="product.imagen" :alt="product.nombre" class="absolute inset-0 w-full h-full object-contain p-2" />
            </div>
            
            <div class="p-3 flex flex-col">
              <h4 class="font-medium text-sm uppercase line-clamp-2 mb-1">{{ product.nombre }}</h4>
              <p class="text-xs text-gray-500 mb-2">{{ product.categoria || 'SIN ASIGNAR' }}</p>
              <p class="font-bold mt-auto">Gs. {{ formatPrice(product.precio) }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="viewedProducts.length === 0" class="text-center py-8 text-gray-500">
        No hay productos en el historial
      </div>
      
      <div class="p-4 border-t flex justify-end">
        <button 
          @click="clearHistory" 
          class="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Borrar historial
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useNuxtApp } from '#imports'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const { $bus } = useNuxtApp()
const viewedProducts = ref([])

// Formatear precios
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// Cargar productos vistos desde localStorage
const loadViewedProducts = () => {
  const savedProducts = localStorage.getItem('viewedProducts')
  if (savedProducts) {
    viewedProducts.value = JSON.parse(savedProducts)
  }
}

// Guardar productos vistos en localStorage
const saveViewedProducts = () => {
  localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts.value))
}

// Agregar producto al historial
const addProductToHistory = (product) => {
  // Verificar si el producto ya está en el historial
  const existingIndex = viewedProducts.value.findIndex(p => p.codigo === product.codigo)
  
  if (existingIndex !== -1) {
    // Si existe, moverlo al inicio
    viewedProducts.value.splice(existingIndex, 1)
  }
  
  // Agregar al inicio
  viewedProducts.value.unshift(product)
  
  // Mantener solo los últimos 10 productos
  if (viewedProducts.value.length > 10) {
    viewedProducts.value = viewedProducts.value.slice(0, 10)
  }
  
  // Guardar cambios
  saveViewedProducts()
}

// Limpiar historial
const clearHistory = () => {
  viewedProducts.value = []
  saveViewedProducts()
}

// Escuchar eventos de productos vistos
const listenForProductViews = () => {
  $bus.on('product-viewed', (product) => {
    addProductToHistory(product)
  })
}

// Cerrar el historial
const close = () => {
  emit('close')
}

// Inicializar
onMounted(() => {
  loadViewedProducts()
  listenForProductViews()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>
