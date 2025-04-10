<template>
  <div class="favorites-page">
    <div class="container mx-auto max-w-6xl px-4 py-6">
      <!-- Breadcrumb -->
      <BreadCrumb :items="[{ text: 'Favoritos' }]" class="mb-6" />
      
      <h1 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <i class="pi pi-heart text-red-500 mr-2"></i>
        Mis Favoritos
      </h1>
      
      <div v-if="loading" class="flex justify-center py-16">
        <LoadingSpinner />
      </div>
      
      <div v-else-if="favorites.length === 0" class="text-center py-16 bg-gray-50 rounded-lg">
        <div class="text-gray-400 mb-4">
          <i class="pi pi-heart text-4xl"></i>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">No tienes productos favoritos</h2>
        <p class="text-gray-600 mb-4">Explora nuestro catálogo y agrega productos a tus favoritos</p>
        <NuxtLink 
          to="/catalog" 
          class="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
        >
          Explorar catálogo
        </NuxtLink>
      </div>
      
      <div v-else>
        <div class="mb-4 flex justify-between items-center">
          <p class="text-gray-700">
            <span class="font-medium">{{ favorites.length }}</span> productos en favoritos
          </p>
          
          <button 
            @click="clearFavorites" 
            class="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
          >
            <i class="pi pi-trash mr-1"></i>
            Eliminar todos
          </button>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div 
            v-for="product in favorites" 
            :key="product.codigo"
            class="favorite-card bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div class="relative pt-[60%] overflow-hidden">
              <NuxtLink :to="`/product/${product.codigo}`" class="block">
                <img 
                  :src="product.imagen" 
                  :alt="product.nombre" 
                  class="absolute inset-0 w-full h-full object-contain p-4"
                />
              </NuxtLink>
              
              <button
                class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
                @click="removeFavorite(product.codigo)"
                aria-label="Quitar de favoritos"
              >
                <i class="pi pi-heart-fill text-red-500"></i>
              </button>
            </div>
            
            <div class="p-4">
              <div class="mb-2">
                <p class="text-xs text-gray-500">{{ product.desc_division }}</p>
              </div>
              
              <NuxtLink :to="`/product/${product.codigo}`" class="block">
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2 hover:text-gray-600">
                  {{ product.nombre }}
                </h3>
              </NuxtLink>
              
              <div class="mt-2 flex justify-between items-center">
                <p class="text-lg font-bold text-gray-900">
                  Gs. {{ formatPrice(product.precio) }}
                </p>
                
                <button
                  v-if="product.stock > 0"
                  class="bg-gray-700 hover:bg-gray-800 text-white text-sm py-1 px-3 rounded-md flex items-center transition-colors duration-200"
                  @click="addToCart(product)"
                >
                  <i class="pi pi-shopping-cart mr-1"></i>
                  <span>Añadir</span>
                </button>
                <button
                  v-else
                  class="bg-gray-300 text-gray-600 text-sm py-1 px-3 rounded-md flex items-center cursor-not-allowed"
                  disabled
                >
                  <i class="pi pi-shopping-cart mr-1"></i>
                  <span>Agotado</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useFavoritesStore } from '~/stores/favoritesStore';
import { useCartStore } from '~/stores/cartStore';
import type { Producto } from '~/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import emitter from '~/utils/eventBus';

// Definir título y meta tags para SEO
useHead({
  title: 'Mis Favoritos - Paraná Hogar',
  meta: [
    { name: 'description', content: 'Gestiona tus productos favoritos de Paraná Hogar. Añade productos a tu carrito o elimínalos de tu lista de favoritos.' }
  ]
});

// Stores
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

// Estado
const loading = ref(true);

// Obtener favoritos
const favorites = computed(() => {
  return favoritesStore.favorites;
});

// Formatear precio con separadores de miles
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-PY').format(price);
};

// Eliminar un producto de favoritos
const removeFavorite = (productId: number) => {
  favoritesStore.removeFavorite(productId);
  emitter.emit('product:removeFromFavorites', { productId });
  emitter.emit('favorites:update', undefined);
};

// Eliminar todos los favoritos
const clearFavorites = () => {
  if (confirm('¿Estás seguro de que deseas eliminar todos los productos de favoritos?')) {
    favoritesStore.clearFavorites();
    emitter.emit('favorites:update', undefined);
  }
};

// Añadir un producto al carrito
const addToCart = (product: Producto) => {
  if (product.stock > 0) {
    cartStore.addToCart(product, 1);
    emitter.emit('product:addToCart', { product, quantity: 1 });
    emitter.emit('cart:update', undefined);
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  // Cargar favoritos desde localStorage
  favoritesStore.loadFavorites();
  loading.value = false;
  
  // Escuchar eventos de actualización de favoritos
  emitter.on('favorites:update', () => {
    favoritesStore.loadFavorites();
  });
});
</script>
