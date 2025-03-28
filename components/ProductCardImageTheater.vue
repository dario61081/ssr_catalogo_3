
<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity">
    <div class="relative bg-white rounded-lg shadow-xl w-[90vw] max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
      <!-- Close button -->
      <button 
        @click="close" 
        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors"
      >
        <svg class="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <!-- Main image container -->
      <div class="flex-1 flex items-center justify-center bg-gray-100 p-4 min-h-[70vh]">
        <img 
          v-if="product && images.length > 0" 
          :src="images[currentImageIndex]" 
          :alt="product.nombre" 
          class="max-w-full max-h-full object-contain"
        />
        <div v-else class="text-gray-400 text-center">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <p class="mt-2">No hay imágenes disponibles</p>
        </div>
      </div>
      
      <!-- Navigation arrows for larger screens -->
      <button 
        v-if="images.length > 1" 
        @click="prevImage" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors hidden md:block"
      >
        <svg class="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button 
        v-if="images.length > 1" 
        @click="nextImage" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors hidden md:block"
      >
        <svg class="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      
      <!-- Thumbnail gallery -->
      <div class="p-4 bg-white border-t border-gray-200">
        <div class="flex space-x-2 justify-center">
          <button 
            v-for="(image, index) in images.slice(0, 3)" 
            :key="index"
            :class="[
              'border-2 rounded-md p-1 transition-all',
              currentImageIndex === index ? 'border-blue-500' : 'border-gray-300 hover:border-gray-500'
            ]"
            @click="setCurrentImage(index)"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <img 
              :src="image" 
              :alt="`Miniatura ${index + 1}`" 
              class="h-16 w-16 object-contain"
            />
          </button>
          
          <!-- Placeholder thumbnails if less than 3 images -->
          <template v-if="images.length < 3">
            <div 
              v-for="i in 3 - images.length" 
              :key="`placeholder-${i}`"
              class="border-2 border-gray-200 rounded-md p-1 h-[66px] w-[66px] flex items-center justify-center bg-gray-50"
            >
              <svg class="h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </template>
        </div>
        
        <!-- Image counter -->
        <div v-if="images.length > 0" class="text-center text-sm text-gray-500 mt-2">
          Imagen {{ currentImageIndex + 1 }} de {{ images.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

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

// Estado para el índice de la imagen actual
const currentImageIndex = ref(0);

// Computar las imágenes disponibles del producto
const images = computed(() => {
  if (!props.product) return [];
  
  // Imagen principal siempre se incluye
  const imageList = [props.product.imagen];
  
  // Agregar imágenes adicionales si existen
  if (props.product.imagenes && Array.isArray(props.product.imagenes)) {
    imageList.push(...props.product.imagenes);
  }
  
  // Filtrar imágenes nulas o vacías
  return imageList.filter(img => img);
});

// Resetear el índice de imagen cuando cambia el producto
watch(() => props.product, () => {
  currentImageIndex.value = 0;
});

// Resetear el índice de imagen cuando se abre el modal
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    currentImageIndex.value = 0;
  }
});

// Métodos para navegación de imágenes
function prevImage() {
  if (images.value.length <= 1) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + images.value.length) % images.value.length;
}

function nextImage() {
  if (images.value.length <= 1) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
}

function setCurrentImage(index) {
  if (index >= 0 && index < images.value.length) {
    currentImageIndex.value = index;
  }
}

function close() {
  emit('close');
}
</script>

<style scoped>
.transition-opacity {
  transition: opacity 0.3s ease;
}

.transition-all {
  transition: all 0.2s ease;
}

/* Animación para las flechas de navegación */
button:active svg {
  transform: scale(0.9);
}

/* Soporte para gestos táctiles en dispositivos móviles */
@media (max-width: 768px) {
  .max-h-\[90vh\] {
    max-height: 80vh;
  }
}
</style>