<template>
	<div class="home-page">
		<!-- Banner principal con slider de imágenes -->
		<div class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 mb-8 overflow-hidden">
			<!-- Slider de imágenes de fondo -->
			<div class="absolute inset-0 w-full h-full">
				<div v-for="(image, index) in backgroundImages" :key="index" 
					class="absolute inset-0 w-full h-full transition-opacity duration-1000 bg-cover bg-center"
					:style="{ 
						backgroundImage: `url(${image || '/images/placeholder.jpg'})`,
						opacity: currentSlide === index ? 1 : 0
					}">
					<div class="absolute inset-0 bg-blue-900/60"></div>
				</div>
			</div>
			
			<div class="container mx-auto max-w-6xl relative z-10">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
					<div>
						<h1 class="text-3xl md:text-4xl font-bold mb-4">Bienvenido a Paraná Hogar</h1>
						<p class="text-lg mb-6">Descubre nuestra amplia selección de productos para tu hogar con la
							mejor calidad y precio.</p>
						<NuxtLink
							class="inline-block bg-white text-gray-700 hover:bg-gray-100 transition-colors py-3 px-6 rounded-md font-medium"
							to="/catalog"
						>
							Ver catálogo completo
						</NuxtLink>
					</div>
				</div>
			</div>
			
			<!-- Indicadores del slider -->
			<div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
				<button 
					v-for="(_, index) in backgroundImages" 
					:key="index"
					@click="currentSlide = index"
					class="w-2 h-2 rounded-full transition-all duration-300"
					:class="currentSlide === index ? 'bg-white w-4' : 'bg-white/50'"
					aria-label="Cambiar imagen de fondo">
				</button>
			</div>
		</div>

		<!-- Productos destacados -->
		<div class="container mx-auto max-w-6xl px-4 mb-12">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-2xl font-bold text-gray-900">Productos destacados</h2>
				<NuxtLink
					class="text-gray-700 hover:text-gray-800 font-medium flex items-center"
					to="/catalog"
				>
					Ver todos
					<i class="pi pi-arrow-right ml-1"></i>
				</NuxtLink>
			</div>

			<div v-if="loadingProductos"
				class="flex justify-center py-8">
				<LoadingSpinner/>
			</div>

			<div v-else-if="errorProductos"
				class="text-center py-8">
				<p class="text-red-500">{{ errorProductos }}</p>
			</div>

			<div v-else
				class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
						<p class="text-gray-600">Entregamos tus productos en la puerta de tu casa con rapidez y
							seguridad.</p>
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

<script lang="ts"
	setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useCategoriaStore} from '~/stores/categoriaStore';
import {useProductoStore} from '~/stores/productoStore';
import {useFavoritesStore} from '~/stores/favoritesStore';
import {useCartStore} from '~/stores/cartStore';
import LoadingSpinner from '~/components/LoadingSpinner.vue';

// Definir título y meta tags para SEO
useHead({
	title: 'Paraná Hogar - Catálogo de Productos',
	meta: [
		{
			name: 'description',
			content: 'Descubre nuestra amplia selección de productos para tu hogar con la mejor calidad y precio.'
		}
	]
});

// Stores
const categoriaStore = useCategoriaStore();
const productoStore = useProductoStore();
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

// Estado
const loadingProductos = ref(true);
const errorProductos = ref<string | null>(null);
const currentSlide = ref(0);
const slideInterval = ref<number | null>(null);

// Obtener imágenes de categorías para el slider
const backgroundImages = computed(() => {
	return categoriaStore.getCategoriasImages;
});

// Obtener productos destacados (simulados como los primeros 8 productos)
const productosDestacados = computed(() => {
	return productoStore.productos.slice(0, 8);
});

// Función para cambiar al siguiente slide
const nextSlide = () => {
	if (backgroundImages.value.length > 0) {
		currentSlide.value = (currentSlide.value + 1) % backgroundImages.value.length;
	}
};

// Cargar datos al montar el componente
onMounted(async () => {
	// Cargar favoritos y carrito desde localStorage
	favoritesStore.loadFavorites();
	cartStore.loadCart();

	// Cargar productos y categorías
	try {
		loadingProductos.value = true;
		errorProductos.value = null;
		
		// Cargar productos
		await productoStore.fetchProductos();
		
		// Cargar categorías para obtener las imágenes
		await categoriaStore.fetchCategorias();
		
		// Iniciar el slider automático
		if (backgroundImages.value.length > 0) {
			slideInterval.value = window.setInterval(nextSlide, 5000);
		}
	} catch (err) {
		console.error('Error al cargar datos:', err);
		errorProductos.value = 'Error al cargar los datos. Por favor, intente nuevamente.';
	} finally {
		loadingProductos.value = false;
	}
});

// Limpiar el intervalo cuando se desmonta el componente
onUnmounted(() => {
	if (slideInterval.value !== null) {
		clearInterval(slideInterval.value);
	}
});
</script>
