
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="flex flex-col lg:flex-row">
      <!-- Product Images Section -->
      <div class="w-full lg:w-2/5">
        <!-- Main Image with Stock Badge -->
        <div class="relative">
          <div class="pt-[75%] sm:pt-[100%] relative overflow-hidden">
            <img 
              :src="product.imagen" 
              :alt="product.nombre" 
              class="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div 
              :class="[
                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 
                'absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-medium'
              ]"
            >
              {{ product.stock > 0 ? 'En Stock' : 'Sin Stock' }}
            </div>
          </div>
        </div>
        
        <!-- Thumbnail Gallery -->
        <div class="p-4 flex space-x-2 overflow-x-auto">
          <button 
            v-for="(thumbnail, index) in thumbnails" 
            :key="index"
            class="w-16 h-16 border-2 rounded overflow-hidden flex-shrink-0"
            :class="selectedThumbnail === index ? 'border-orange-500' : 'border-gray-200'"
            @click="selectedThumbnail = index"
          >
            <img :src="thumbnail" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover object-center" />
          </button>
        </div>
      </div>
      
      <!-- Product Details Section -->
      <div class="w-full lg:w-3/5 p-4 sm:p-6 flex flex-col">
        <!-- Product Header -->
        <div class="mb-4">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{{ product.nombre }}</h1>
            <div class="flex items-center mt-2 sm:mt-0">
              <img :src="brandLogo" alt="Brand Logo" class="h-6 mr-2" />
              <span class="text-sm text-gray-500">{{ product.marca }}</span>
            </div>
          </div>
          <p class="text-sm text-gray-500">Código: {{ product.codigo }}</p>
        </div>
        
        <!-- Price and Stock -->
        <div class="mb-4">
          <div class="flex flex-col sm:flex-row sm:items-center">
            <p class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-0 sm:mr-4">
              Gs. {{ formatPrice(product.precio) }}
            </p>
            <span 
              :class="[
                product.stock > 0 ? 'text-green-600' : 'text-red-600', 
                'text-sm font-medium'
              ]"
            >
              {{ product.stock > 0 ? 'En Stock' : 'Sin Stock' }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mt-1">18 cuotas de Gs. {{ formatPrice(product.precio / 18) }}</p>
        </div>
        
        <!-- Product Description -->
        <div class="mb-6">
          <p class="text-gray-700">{{ product.descripcion || 'Este producto combina estilo y funcionalidad para tu hogar. Diseñado con materiales de alta calidad para garantizar durabilidad y rendimiento.' }}</p>
        </div>
        
        <!-- Action Section -->
        <div class="mt-auto">
          <!-- Quantity Selector -->
          <div class="mb-4">
            <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <select 
              id="quantity" 
              v-model="quantity" 
              class="w-full sm:w-24 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          
          <!-- Action Buttons -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Financiar
            </button>
            <button class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Consultar por WhatsApp
            </button>
          </div>
          
          <!-- Add to Cart Button -->
          <button 
            class="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            :disabled="product.stock <= 0"
            :class="{ 'opacity-50 cursor-not-allowed': product.stock <= 0 }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Agregar al Carrito
          </button>
        </div>
        
        <!-- Additional Information Accordions -->
        <div class="mt-8 border-t border-gray-200 pt-6">
          <div class="mb-3">
            <button 
              @click="toggleAccordion('shipping')" 
              class="flex justify-between items-center w-full text-left"
            >
              <span class="text-base font-medium text-gray-900">Información de Envío</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 text-gray-500 transform transition-transform duration-200" 
                :class="openAccordions.shipping ? 'rotate-180' : ''"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="openAccordions.shipping" class="mt-2 text-sm text-gray-600">
              <p>Envío gratis a todo el país en compras superiores a Gs. 500.000.</p>
              <p class="mt-1">Tiempo estimado de entrega: 2-5 días hábiles.</p>
            </div>
          </div>
          
          <div class="py-3 border-t border-gray-200">
            <button 
              @click="toggleAccordion('warranty')" 
              class="flex justify-between items-center w-full text-left"
            >
              <span class="text-base font-medium text-gray-900">Garantía</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 text-gray-500 transform transition-transform duration-200" 
                :class="openAccordions.warranty ? 'rotate-180' : ''"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="openAccordions.warranty" class="mt-2 text-sm text-gray-600">
              <p>Este producto cuenta con 12 meses de garantía por defectos de fabricación.</p>
            </div>
          </div>
          
          <div class="py-3 border-t border-gray-200">
            <button 
              @click="toggleAccordion('payment')" 
              class="flex justify-between items-center w-full text-left"
            >
              <span class="text-base font-medium text-gray-900">Métodos de Pago</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 text-gray-500 transform transition-transform duration-200" 
                :class="openAccordions.payment ? 'rotate-180' : ''"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="openAccordions.payment" class="mt-2 text-sm text-gray-600">
              <p>Aceptamos tarjetas de crédito, débito, transferencia bancaria y efectivo.</p>
              <p class="mt-1">Hasta 18 cuotas sin interés con tarjetas seleccionadas.</p>
            </div>
          </div>
        </div>
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
  
  data() {
    return {
      selectedThumbnail: 0,
      quantity: 1,
      openAccordions: {
        shipping: false,
        warranty: false,
        payment: false
      },
      thumbnails: [
        // Placeholder thumbnails - would be replaced with actual product images
        '/img/placeholder1.jpg',
        '/img/placeholder2.jpg',
        '/img/placeholder3.jpg',
        '/img/placeholder4.jpg'
      ],
      brandLogo: '/img/brand-logo.png' // Placeholder brand logo
    }
  },
  
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    
    toggleAccordion(section) {
      this.openAccordions[section] = !this.openAccordions[section];
    }
  },
  
  created() {
    // In a real implementation, you would load the thumbnails from the product data
    // This is just a placeholder
    if (this.product.imagen) {
      this.thumbnails[0] = this.product.imagen;
    }
  }
}
</script>