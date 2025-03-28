<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Producto } from '~/models';
import { useRoute } from 'vue-router';
import ProductosCarrouselSmall from '~/components/ProductosCarrouselSmall.vue';

// SEO metadata
useHead({
  title: () => producto.value?.nombre || 'Producto',
  meta: [
    { name: 'description', content: () => producto.value?.nombre || 'Detalles del producto' },
    { property: 'og:title', content: () => producto.value?.nombre || 'Producto' },
    { property: 'og:description', content: () => `${producto.value?.nombre} - ${producto.value?.categoria}` },
    { property: 'og:image', content: () => producto.value?.imagen || '' },
    { property: 'og:type', content: 'product' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]
});


const route = useRoute();
const producto = ref<Producto | null>(null);
const cantidad = ref(1);
const loading = ref(true);
const productImages = ref<string[]>([]);

// Fetch product data
onMounted(async () => {
  try {
    const response = await fetch(`/api/articulos/${route.params.codigo}`);
    const data = await response.json();
    
    if (data) {
      producto.value = new Producto(
        data.ART_COD, 
        data.ART_DESCRIPCION, 
        data.LINEA, 
        data.PRECIO, 
        data.ART_DIR_IMAG1, 
        data.STOCK
      );
      
      // Initialize product images array
      // In a real scenario, you would get all images from the API
      productImages.value = [
        data.ART_DIR_IMAG1, // Main image
        // Add additional images if available
        data.ART_DIR_IMAG2 || data.ART_DIR_IMAG1,
        data.ART_DIR_IMAG3 || data.ART_DIR_IMAG1
      ].filter(Boolean); // Remove any undefined/null values
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  } finally {
    loading.value = false;
  }
});

// Methods
const incrementQuantity = () => {
  if (producto.value && cantidad.value < producto.value.stock) {
    cantidad.value++;
  }
};

const decrementQuantity = () => {
  if (cantidad.value > 1) {
    cantidad.value--;
  }
};

const addToCart = () => {
  // Implement cart functionality
  console.log('Adding to cart:', producto.value, 'Quantity:', cantidad.value);
};

const buyNow = () => {
  // Implement buy now functionality
  console.log('Buying now:', producto.value, 'Quantity:', cantidad.value);
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Breadcrumbs -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Products</NuxtLink>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <NuxtLink v-if="producto" :to="`/categoria/${producto.categoria}`" class="ml-2 text-gray-500 hover:text-gray-700">{{ producto.categoria }}</NuxtLink>
          </li>
          <li class="flex items-center">
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <span v-if="producto" class="ml-2 text-gray-700 font-medium">{{ producto.nombre }}</span>
          </li>
        </ol>
      </nav>
    </div>

    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>

    <div v-else-if="producto" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Product Images Carousel -->
        <div class="bg-gray-100 rounded-lg overflow-hidden">
          <ProductosCarrouselSmall :images="productImages" />
        </div>

        <!-- Product Details -->
        <div>
          <!-- Category -->
          <NuxtLink :to="`/categoria/${producto.categoria}`" class="text-blue-600 hover:underline">
            {{ producto.categoria }}
          </NuxtLink>

          <!-- Product Title -->
          <h1 class="text-3xl font-bold text-gray-900 mt-2">{{ producto.nombre }}</h1>

          <!-- Reviews -->
          <div class="flex items-center mt-4">
            <div class="flex">
              <template v-for="i in 5" :key="i">
                <svg :class="i <= 4 ? 'text-yellow-400' : 'text-gray-300'" class="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </template>
            </div>
            <p class="ml-2 text-sm text-gray-600">4 reviews</p>
          </div>

          <!-- Description -->
          <div class="mt-6">
            <p class="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam.
            </p>
          </div>

          <div class="mt-8 grid grid-cols-2 gap-8">
            <!-- Quantity Selector -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">QUANTITY</h3>
              <div class="flex items-center border border-gray-300 rounded">
                <button 
                  @click="decrementQuantity" 
                  class="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  :disabled="cantidad <= 1"
                >
                  -
                </button>
                <span class="px-4 py-1 text-center">{{ cantidad }}</span>
                <button 
                  @click="incrementQuantity" 
                  class="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  :disabled="producto && cantidad >= producto.stock"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Price -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">PRICE</h3>
              <p class="text-xl font-medium text-gray-900">Gs. {{ producto.precio }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-8 flex gap-4">
            <button 
              @click="addToCart" 
              class="flex-1 bg-white border border-orange-500 text-orange-500 py-3 px-6 rounded hover:bg-orange-50 font-medium"
            >
              ADD TO CART
            </button>
            <button 
              @click="buyNow" 
              class="flex-1 bg-orange-500 border border-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 font-medium"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h2 class="text-2xl font-bold text-gray-900">Product not found</h2>
      <p class="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/" class="mt-4 inline-block text-blue-600 hover:underline">Return to home page</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>