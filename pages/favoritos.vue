<template>
    <NuxtLayout  name="simple-layout"  >
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Mis Favoritos</h1>
      <p class="text-gray-600 mt-2">Productos que has marcado como favoritos</p>
    </div>

    <!-- Empty state when no favorites -->
    <div v-if="!hasFavorites" class="bg-white rounded-lg shadow-sm p-8 text-center">
      <div class="flex flex-col items-center">
        <svg class="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
        <h2 class="text-xl font-medium text-gray-900 mb-2">No tienes favoritos</h2>
        <p class="text-gray-600 mb-6">Explora nuestros productos y marca tus favoritos para verlos aquí</p>
        <NuxtLink to="/productos" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600">
          Ver productos
        </NuxtLink>
      </div>
    </div>

    <!-- Favorites grid -->
    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <p class="text-gray-600">{{ favoritesCount }} producto{{ favoritesCount !== 1 ? 's' : '' }}</p>
        <button 
          @click="clearAllFavorites" 
          class="text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          </svg>
          Eliminar todos
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="product in favorites" 
          :key="product.codigo" 
          class="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <button 
            @click="removeFavorite(product.codigo)" 
            class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
            title="Eliminar de favoritos"
          >
            <svg class="h-5 w-5 text-red-500 fill-current" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </button>

          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</NuxtLayout >
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useNuxtApp } from '#imports';
import { useFavoritesStore } from '~/stores/favorites';

const { $bus } = useNuxtApp();
const favoritesStore = useFavoritesStore();

// Computed properties
const favorites = computed(() => favoritesStore.favorites);
const hasFavorites = computed(() => favoritesStore.hasFavorites);
const favoritesCount = computed(() => favoritesStore.favoritesCount);

// Methods
function removeFavorite(productId) {
  favoritesStore.removeFavorite(productId);
}

function clearAllFavorites() {
  if (confirm('¿Estás seguro de que deseas eliminar todos tus favoritos?')) {
    favoritesStore.clearFavorites();
  }
}

// Lifecycle hooks
onMounted(() => {
  // Cargar favoritos guardados
  favoritesStore.loadFavorites();

  // Escuchar eventos del bus para mantener sincronizados los favoritos
  $bus.on('on-favourite-selected', (data) => {
    if (data.isFavorite) {
      favoritesStore.addFavorite(data.product);
    } else {
      favoritesStore.removeFavorite(data.product.codigo);
    }
  });
});
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>