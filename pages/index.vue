<template>
  <div class="home-page">
    <!-- Banner principal -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 mb-8">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-4">Bienvenido a Paraná Hogar</h1>
            <p class="text-lg mb-6">Descubre nuestra amplia selección de productos para tu hogar con la mejor calidad y precio.</p>
            <NuxtLink 
              to="/catalog" 
              class="inline-block bg-white text-gray-700 hover:bg-gray-100 transition-colors py-3 px-6 rounded-md font-medium"
            >
              Ver catálogo completo
            </NuxtLink>
          </div>
          <div class="hidden md:block">
            <img src="/images/banner-home.jpg" alt="Paraná Hogar" class="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Categorías destacadas -->
    <div class="container mx-auto max-w-6xl px-4 mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Categorías destacadas</h2>
      
      <div v-if="loadingCategorias" class="flex justify-center py-8">
        <LoadingSpinner />
      </div>
      
      <div v-else-if="errorCategorias" class="text-center py-8">
        <p class="text-red-500">{{ errorCategorias }}</p>
      </div>
      
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <NuxtLink 
          v-for="categoria in categorias" 
          :key="categoria.codigo"
          :to="`/catalog?cat=${categoria.codigo}`"
          class="category-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div class="aspect-square relative overflow-hidden">
            <img 
              :src="categoria.imagen || '/images/placeholder.jpg'" 
              :alt="categoria.nombre"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <h3 class="text-white font-medium p-4 w-full text-center">{{ categoria.nombre }}</h3>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Productos destacados -->
    <div class="container mx-auto max-w-6xl px-4 mb-12">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Productos destacados</h2>
        <NuxtLink 
          to="/catalog" 
          class="text-gray-700 hover:text-gray-800 font-medium flex items-center"
        >
          Ver todos
          <i class="pi pi-arrow-right ml-1"></i>
        </NuxtLink>
      </div>
      
      <div v-if="loadingProductos" class="flex justify-center py-8">
        <LoadingSpinner />
      </div>
      
      <div v-else-if="errorProductos" class="text-center py-8">
        <p class="text-red-500">{{ errorProductos }}</p>
      </div>
      
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductCard 
          v-for="producto in productosDestacados" 
          :key="producto.codigo" 
          :product="producto" 
        />
      </div>
    </div>
    
    <!-- Beneficios -->
    <div class="bg-gray-50 py-12 px-4 mb-12">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">¿Por qué elegirnos?</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm text-center">
            <div class="text-gray-700 text-3xl mb-4">
              <i class="pi pi-truck"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Envío a todo el país</h3>
            <p class="text-gray-600">Entregamos tus productos en la puerta de tu casa con rapidez y seguridad.</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm text-center">
            <div class="text-gray-700 text-3xl mb-4">
              <i class="pi pi-shield"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Garantía de calidad</h3>
            <p class="text-gray-600">Todos nuestros productos cuentan con garantía para tu tranquilidad.</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm text-center">
            <div class="text-gray-700 text-3xl mb-4">
              <i class="pi pi-credit-card"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Múltiples formas de pago</h3>
            <p class="text-gray-600">Aceptamos tarjetas de crédito, débito, transferencias y más.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCategoriaStore } from '~/stores/categoriaStore';
import { useProductoStore } from '~/stores/productoStore';
import { useFavoritesStore } from '~/stores/favoritesStore';
import { useCartStore } from '~/stores/cartStore';
import LoadingSpinner from '~/components/LoadingSpinner.vue';

// Definir título y meta tags para SEO
useHead({
  title: 'Paraná Hogar - Catálogo de Productos',
  meta: [
    { name: 'description', content: 'Descubre nuestra amplia selección de productos para tu hogar con la mejor calidad y precio.' }
  ]
});

// Stores
const categoriaStore = useCategoriaStore();
const productoStore = useProductoStore();
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

// Estado
const loadingCategorias = ref(true);
const errorCategorias = ref<string | null>(null);
const loadingProductos = ref(true);
const errorProductos = ref<string | null>(null);

// Obtener categorías destacadas
const categorias = computed(() => {
  return categoriaStore.categorias.slice(0, 8);
});

// Obtener productos destacados (simulados como los primeros 8 productos)
const productosDestacados = computed(() => {
  return productoStore.productos.slice(0, 8);
});

// Cargar datos al montar el componente
onMounted(async () => {
  // Cargar favoritos y carrito desde localStorage
  favoritesStore.loadFavorites();
  cartStore.loadCart();
  
  // Cargar categorías
  try {
    loadingCategorias.value = true;
    errorCategorias.value = null;
    await categoriaStore.fetchCategorias();
  } catch (err) {
    console.error('Error al cargar categorías:', err);
    errorCategorias.value = 'Error al cargar las categorías. Por favor, intente nuevamente.';
  } finally {
    loadingCategorias.value = false;
  }
  
  // Cargar productos
  try {
    loadingProductos.value = true;
    errorProductos.value = null;
    await productoStore.fetchProductos();
  } catch (err) {
    console.error('Error al cargar productos:', err);
    errorProductos.value = 'Error al cargar los productos. Por favor, intente nuevamente.';
  } finally {
    loadingProductos.value = false;
  }
});
</script>
