<template>
  <div class="relative flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <!-- Stock Badge -->
    <div 
      :class="[
        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 
        'absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-medium'
      ]"
    >
      {{ product.stock > 0 ? 'En Stock' : 'Sin Stock' }}
    </div>
    
    <!-- Product Image -->
    <div class="relative pt-[100%] overflow-hidden rounded-t-lg">
      <img 
        :src="product.imagen" 
        :alt="product.nombre" 
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <!-- Quick Action Buttons -->
      <div class="absolute top-2 right-2 flex flex-col space-y-2">
        <button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Product Info -->
    <div class="flex-1 p-4 flex flex-col">
      <h3 class="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">{{ product.nombre }}</h3>
      <p class="text-xs text-gray-500 mb-2">{{ product.categoria }}</p>
      
      <div class="mt-auto">
        <p class="text-base sm:text-lg font-bold text-gray-900">Gs. {{ formatPrice(product.precio) }}</p>
        <button class="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 px-3 rounded-md flex items-center justify-center transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
}
</script>