<template>
  <div
      class="relative flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
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
    <div 
      class="relative pt-[100%] overflow-hidden rounded-t-lg cursor-pointer"
      @click="openImageTheater"
    >
      <img
          :alt="product.nombre"
          :src="product.imagen"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-contain object-center p-5"
          style="aspect-ratio: 4/3;"
      />
      <!-- Quick Action Buttons -->
      <div class="absolute top-2 right-2 flex flex-col space-y-2">
        <button 
          class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          @click.stop="toggleFavorite"
        >
          <svg 
            :class="[isFavorite ? 'text-red-500 fill-current' : 'text-gray-600', heartAnimation ? 'animate-heartbeat' : '']" 
            class="h-5 w-5 transition-all duration-300" 
            :fill="isFavorite ? 'currentColor' : 'none'" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"/>
          </svg>
        </button>
        <button 
          class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          @click.stop="openPreview"
          title="Vista previa"
        >
          <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex-1 p-4 flex flex-col">
      <h3 class="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">{{ product.nombre }}</h3>
      <p class="text-xs text-gray-500 mb-2">{{ product.categoria }}</p>

      <div class="mt-auto">
        <p class="text-base sm:text-lg font-bold text-gray-900">Gs. {{ product.precio }}</p>
        <button
            :class="[
              'mt-3 w-full text-white text-sm py-2 px-3 rounded-md flex items-center justify-center transition-colors duration-200',
              product.stock > 0 
                ? 'bg-gray-500 hover:bg-gray-600 cursor-pointer' 
                : 'bg-gray-300 cursor-not-allowed'
            ]"
            @click="handleCartClick"
            :disabled="product.stock <= 0"
            :title="product.stock <= 0 ? 'Producto sin stock' : ''"
        >
          <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            />
          </svg>
          {{ product.stock > 0 ? 'Agregar al carrito' : 'Sin stock' }}
        </button>
      </div>
    </div>
    
    <!-- Preview Dialog -->
    <ProductCardPreviewDialog 
      :is-open="isPreviewOpen" 
      :product="product" 
      @close="closePreview"
    />
    
    <!-- Image Theater -->
    <ProductCardImageTheater
      :is-open="isImageTheaterOpen"
      :product="product"
      @close="closeImageTheater"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#imports';
import ProductCardImageTheater from './ProductCardImageTheater.vue';

const { $bus } = useNuxtApp();

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const isFavorite = ref(false);
const heartAnimation = ref(false);
const isPreviewOpen = ref(false);
const isImageTheaterOpen = ref(false);

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function handleCartClick() {
  if (props.product.stock > 0) {
    // Si hay stock, emitir evento para agregar al carrito
    $bus.emit('on-add-to-cart', props.product);
  } else {
    // Si no hay stock, emitir evento especial
    $bus.emit('on-product-selected-nostock', {
      product: props.product,
      timestamp: new Date().toISOString()
    });
  }
}

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
  heartAnimation.value = true;
  
  // Emitir evento al bus con el producto seleccionado
  $bus.emit('on-favourite-selected', {
    product: props.product,
    isFavorite: isFavorite.value
  });
  
  // Detener la animación después de completarse
  setTimeout(() => {
    heartAnimation.value = false;
  }, 1000);
}

function openPreview() {
  isPreviewOpen.value = true;
}

function closePreview() {
  isPreviewOpen.value = false;
}

function openImageTheater() {
  isImageTheaterOpen.value = true;
}

function closeImageTheater() {
  isImageTheaterOpen.value = false;
}
</script>

<style scoped>
.animate-heartbeat {
  animation: heartbeat 1s ease-in-out;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>