<template>
  <aside class="fixed right-0 top-0 h-full w-80 bg-gray-50 text-black shadow-lg transform transition-transform duration-300 z-50 border-l border-gray-400"
         :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }">
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="p-5 border-b bg-black flex justify-between items-center text-white">
        <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
        <h2 class="text-lg font-semibold">Buscar Artículos</h2>
        <button @click="cerrarBuscador" class="text-red-500 hover:text-red-500">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Search Input -->
      <div class="p-4 border-b">
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Buscar artículos..." 
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            @keyup.enter="buscarArticulos"
          />
          <button 
            @click="buscarArticulos" 
            class="absolute right-2 top-2 text-gray-500 hover:text-indigo-700"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Search Results -->
      <div class="flex-grow overflow-y-auto p-4">
        <div v-if="loading" class="flex justify-center items-center h-full">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
        <div v-else-if="resultados.length === 0" class="text-center text-gray-500 py-8">
          No se encontraron resultados
        </div>
        <div v-else class="space-y-4">
          <div v-for="(articulo, index) in resultados" :key="index" class="border rounded-lg p-3 hover:shadow-md transition">
            <div class="flex items-center">
              <img :src="articulo.imagen" alt="Producto" class="w-16 h-16 object-contain mr-3" />
              <div>
                <h3 class="font-medium">{{ articulo.nombre }}</h3>
                <p class="text-sm text-gray-500">{{ articulo.categoria }}</p>
                <p class="font-bold text-indigo-600">Gs. {{ formatPrice(articulo.precio) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      searchQuery: '',
      resultados: [],
      loading: false
    };
  },
  
  methods: {
    cerrarBuscador() {
      this.$emit('close');
    },
    
    async buscarArticulos() {
      if (!this.searchQuery.trim()) return;
      
      this.loading = true;
      try {
        const response = await fetch(`/api/articulos?q=${encodeURIComponent(this.searchQuery)}`);
        const data = await response.json();
        this.resultados = data;
      } catch (error) {
        console.error('Error al buscar artículos:', error);
        this.resultados = [];
      } finally {
        this.loading = false;
      }
    },
    
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}
</style>
