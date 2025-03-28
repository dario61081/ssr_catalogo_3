<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
    <div class="relative bg-white rounded-lg shadow-xl w-[80vw] max-w-6xl max-h-[90vh] overflow-auto">
      <!-- Close button -->
      <button 
        @click="close" 
        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors"
      >
        <svg class="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <div class="flex flex-col md:flex-row">
        <!-- Product image section -->
        <div class="w-full md:w-1/2 p-6 flex flex-col">
          <!-- Main image -->
          <div class="flex-1 flex items-center justify-center bg-white" style="aspect-ratio: 4/3;">
            <img 
              v-if="product" 
              :src="product.imagen" 
              :alt="product.nombre" 
              class="max-w-full max-h-full object-contain"
            />
          </div>
          
          <!-- Thumbnail gallery -->
          <div class="mt-4 flex space-x-2 justify-center">
            <button class="border-2 border-gray-300 rounded-md p-1 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img 
                v-if="product" 
                :src="product.imagen" 
                :alt="product.nombre" 
                class="h-16 w-16 object-contain"
              />
            </button>
            <button class="border-2 border-gray-300 rounded-md p-1 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img 
                v-if="product" 
                :src="product.imagen" 
                :alt="product.nombre" 
                class="h-16 w-16 object-contain"
              />
            </button>
            <button class="border-2 border-gray-300 rounded-md p-1 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img 
                v-if="product" 
                :src="product.imagen" 
                :alt="product.nombre" 
                class="h-16 w-16 object-contain"
              />
            </button>
          </div>
          
          <p class="text-center text-sm text-gray-500 mt-4">Imagen ilustrativa</p>
        </div>
        
        <!-- Product info section -->
        <div class="w-full md:w-1/2 p-6 flex flex-col">
          <!-- Product title and details -->
          <h1 class="text-2xl font-bold text-gray-900 mt-2">{{ product?.nombre }}</h1>
          <p class="text-sm text-gray-500 mt-1">Art. {{ product?.codigo }}</p>
          
          <!-- Price and stock -->
          <div class="mt-6">
            <p class="text-2xl font-bold text-gray-900">Gs. {{ formatPrice(product?.precio) }}</p>
            <div class="mt-1">
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  product?.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]"
              >
                {{ product?.stock > 0 ? 'En stock' : 'Sin stock' }}
              </span>
            </div>
          </div>
          
          <!-- Product description -->
          <div class="mt-6">
            <p class="text-gray-700">
              {{ product?.descripcion || 'Potente y versátil, con pantalla de alta resolución. Conéctate con WiFi y Bluetooth. Batería de larga duración y acceso a miles de apps. ¡Compra online al mejor precio!' }}
            </p>
          </div>
          
          <!-- Brand logo -->
          <div class="mt-6 flex">
            <img 
              v-if="product?.marca" 
              :src="`/images/brands/${product.marca.toLowerCase()}.png`" 
              :alt="product.marca"
              class="h-8 object-contain"
              onerror="this.style.display='none'"
            />
            <span v-else class="text-xl font-bold text-gray-500">{{ product?.marca || 'MARCA' }}</span>
          </div>
          
          <!-- Quantity selector -->
          <div class="mt-6 flex items-center">
            <label for="quantity" class="mr-3 text-sm font-medium text-gray-700">Cant.:</label>
            <select 
              id="quantity" 
              v-model="quantity"
              class="rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          
          <!-- Add to cart button -->
          <button
            v-if="product"
            :class="[
              'mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
              product.stock > 0 
                ? 'bg-blue-900 hover:bg-blue-800 focus:ring-blue-500' 
                : 'bg-gray-300 cursor-not-allowed'
            ]"
            @click="addToCart"
            :disabled="product.stock <= 0"
            :title="product.stock <= 0 ? 'Producto sin stock' : ''"
          >
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            {{ product.stock > 0 ? 'AGREGAR AL CARRITO' : 'SIN STOCK' }}
          </button>
          
          <!-- Payment options -->
          <div class="mt-6 flex flex-wrap gap-2">
            <div class="flex items-center">
              <span class="text-sm text-gray-700 mr-2">18 x Gs. {{ formatPrice(Math.round(product?.precio / 18)) }}</span>
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium">
              FINANCIAR
            </button>
            
            <button class="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium flex items-center">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              CONSULTAR
            </button>
          </div>
          
          <!-- Accordion sections -->
          <div class="mt-8 border-t border-gray-200">
            <div class="border-b border-gray-200">
              <button class="flex w-full justify-between items-center py-4 text-left" @click="toggleSection('envios')">
                <span class="text-base font-medium text-gray-900">Envíos</span>
                <svg 
                  :class="{'transform rotate-180': openSections.envios}"
                  class="h-5 w-5 text-gray-500 transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="openSections.envios" class="pb-4 text-sm text-gray-700">
                <p>Realizamos envíos a todo el país. El costo y tiempo de entrega varía según la ubicación.</p>
              </div>
            </div>
            
            <div class="border-b border-gray-200">
              <button class="flex w-full justify-between items-center py-4 text-left" @click="toggleSection('garantia')">
                <span class="text-base font-medium text-gray-900">Garantía de productos</span>
                <svg 
                  :class="{'transform rotate-180': openSections.garantia}"
                  class="h-5 w-5 text-gray-500 transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="openSections.garantia" class="pb-4 text-sm text-gray-700">
                <p>Todos nuestros productos cuentan con garantía oficial del fabricante.</p>
              </div>
            </div>
            
            <div class="border-b border-gray-200">
              <button class="flex w-full justify-between items-center py-4 text-left" @click="toggleSection('pagos')">
                <span class="text-base font-medium text-gray-900">Medios de pago</span>
                <svg 
                  :class="{'transform rotate-180': openSections.pagos}"
                  class="h-5 w-5 text-gray-500 transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="openSections.pagos" class="pb-4 text-sm text-gray-700">
                <p>Aceptamos tarjetas de crédito, débito, transferencias bancarias y efectivo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useNuxtApp } from '#imports';

const { $bus } = useNuxtApp();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);
const quantity = ref(1);
const openSections = reactive({
  envios: false,
  garantia: false,
  pagos: false
});

function close() {
  emit('close');
}

function formatPrice(price) {
  if (!price) return '';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function addToCart() {
  if (props.product && props.product.stock > 0) {
    // Si hay stock, emitir evento para agregar al carrito
    $bus.emit('on-add-to-cart', {
      ...props.product,
      quantity: quantity.value
    });
  } else if (props.product) {
    // Si no hay stock, emitir evento especial
    $bus.emit('on-product-selected-nostock', {
      product: props.product,
      timestamp: new Date().toISOString()
    });
  }
  close();
}

function toggleSection(section) {
  openSections[section] = !openSections[section];
}
</script>

<style scoped>
/* Animación de entrada y salida para el modal */
.transition-opacity {
  transition: opacity 0.3s ease;
}

.transition-transform {
  transition: transform 0.3s ease;
}
</style>