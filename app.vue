<template>
  <div class="app">
    <!-- Header -->
    <header style="background-color: var(--header-background-color); color: var(--header-color);" class="shadow-sm">
      <div class="container mx-auto max-w-6xl px-4 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center"> <!-- Logo -->
          <NuxtLink to="/" class="mb-4 md:mb-0">
            <NuxtImg src="/img/logo.svg" alt="Paraná Hogar" width="180" height="44" />
          </NuxtLink>

          <!-- Navegación -->
          <nav class="flex items-center space-x-6">
            <NuxtLink to="/" class="text-white hover:text-gray-300 transition-colors">
              Inicio
            </NuxtLink>
            <NuxtLink to="/catalog" class="text-white hover:text-gray-300 transition-colors">
              Catálogo
            </NuxtLink>

            <!-- Favoritos -->
            <NuxtLink to="/favorites" class="text-white hover:text-gray-300 transition-colors relative">
              <i class="pi pi-heart"></i>
              <span v-if="favoritesCount > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {{ favoritesCount }}
              </span>
            </NuxtLink>

            <!-- Carrito -->
            <NuxtLink to="/cart" class="text-white hover:text-gray-300 transition-colors relative">
              <i class="pi pi-shopping-cart"></i>
              <span v-if="cartItemCount > 0"
                class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {{ cartItemCount }}
              </span>
            </NuxtLink>

            <!-- Theme Toggle -->
            <ThemeToggle class="ml-4" />
          </nav>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="min-h-screen bg-gray-50">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>

    <!-- Footer -->
    <Layout-Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useFavoritesStore } from '~/stores/favoritesStore';
import { useCartStore } from '~/stores/cartStore';
import { useThemeStore } from '~/stores/themeStore';
import emitter from '~/utils/eventBus';

// Stores
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

// Contadores
const favoritesCount = computed(() => favoritesStore.favorites.length);
const cartItemCount = computed(() => cartStore.itemCount);

// Cargar datos al montar el componente
onMounted(() => {
  // Cargar favoritos y carrito desde localStorage
  favoritesStore.loadFavorites();
  cartStore.loadCart();

  // Escuchar eventos de actualización
  emitter.on('favorites:update', () => {
    favoritesStore.loadFavorites();
  });

  emitter.on('cart:update', () => {
    cartStore.loadCart();
  });

  // Inicializar tema
  const themeStore = useThemeStore();
  themeStore.initTheme();
});
</script>

<style>
/* Estilos globales */
body {
  color: #333;
  line-height: 1.5;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
