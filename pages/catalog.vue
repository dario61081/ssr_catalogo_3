<template>
	<div class="catalog-page">
		<div class="container mx-auto max-w-6xl px-4 py-6">
			<!-- Breadcrumb -->
			<BreadCrumb :items="[{ text: 'Catálogo' }]"
				class="mb-6"/>

			<h1 class="text-2xl font-bold text-gray-900 mb-6">Catálogo de Productos</h1>

			<div v-if="loading"
				class="flex justify-center py-16">
				<LoadingSpinner/>
			</div>

			<div v-else-if="error"
				class="text-center py-16">
				<div class="text-red-500 mb-4">
					<i class="pi pi-exclamation-triangle text-4xl"></i>
				</div>
				<h2 class="text-xl font-semibold text-gray-800 mb-2">Error al cargar el catálogo</h2>
				<p class="text-gray-600">{{ error }}</p>
				<button
					class="mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
					@click="()=>loadData()"
				>
					Reintentar
				</button>
			</div>

			<div v-else
				class="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<!-- Sidebar de filtros -->
				<div class="lg:col-span-1">
					<FilterSidebar
						v-model:selectedCategories="filterState.categorias"
						v-model:selectedSubcategories="filterState.subcategorias"
						:priceMax="filterState.precioMax"
						:priceMin="filterState.precioMin"
						:searchQuery="filterState.searchQuery"
						@update:priceMin="filterState.precioMin = $event"
						@update:priceMax="filterState.precioMax = $event"
						@update:searchQuery="filterState.searchQuery = $event"
						@filter-changed="applyFilters"
						@clear-filters="clearFilters"
					/>
				</div>

				<!-- Listado de productos -->
				<div class="lg:col-span-3">
					<!-- Opciones de ordenamiento y vista -->
					<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
						<div class="flex items-center">
							<p class="text-gray-700 mr-2">
								<span class="font-medium">{{ filteredProducts.length }}</span>
								productos encontrados
							</p>
						</div>

						<SortOptions
							v-model:sortBy="filterState.sortBy"
							@sort-changed="applyFilters"
						/>
					</div>

					<!-- Loading de productos -->
					<div v-if="loading || filterLoading"
						class="mb-6">
						<ProductGridLoading/>
					</div>

					<!-- Productos -->
					<div v-if="!loading && !filterLoading && filteredProducts.length > 0"
						class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div v-for="product in paginatedProducts"
							:key="product.codigo"
							class="h-full">
							<ProductCard
								:product="product"
								:showActions="true"
							/>
						</div>
					</div>

					<div v-else-if="!loading && !filterLoading && filteredProducts.length === 0"
						class="text-center py-16 bg-gray-50 rounded-lg">
						<div class="text-gray-400 mb-4">
							<i class="pi pi-search text-4xl"></i>
						</div>
						<h2 class="text-xl font-semibold text-gray-800 mb-2">No se encontraron productos</h2>
						<p class="text-gray-600 mb-4">Intenta con otros filtros o categorías</p>
						<button
							class="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
							@click="()=>{clearFilters(false)}"
						>
							Limpiar filtros
						</button>
					</div>

					<!-- Paginación -->
					<div v-if="totalPages > 1"
						class="flex justify-center mt-8">
						<div class="flex space-x-1">
							<button
								:class="currentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
								:disabled="currentPage === 1"
								class="px-3 py-1 rounded border"
								@click="goToPage(currentPage - 1)"
							>
								<i class="pi pi-chevron-left"></i>
							</button>

							<button
								v-for="page in paginationItems"
								:key="`page-${page.value}`"
								:class="[
                  page.type === 'ellipsis' ? 'text-gray-400 border-gray-200 cursor-default' : '',
                  page.type === 'page' && page.value === currentPage ? 'bg-gray-700 text-white border-gray-700' : '',
                  page.type === 'page' && page.value !== currentPage ? 'text-gray-700 border-gray-300 hover:bg-gray-50' : ''
                ]"
								class="px-3 py-1 rounded border"
								@click="page.type === 'page' && goToPage(page.value)"
							>
								{{
									page.type === 'ellipsis' ?
										'...' :
										page.value
								}}
							</button>

							<button
								:class="currentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
								:disabled="currentPage === totalPages"
								class="px-3 py-1 rounded border"
								@click="goToPage(currentPage + 1)"
							>
								<i class="pi pi-chevron-right"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- Modal de vista previa de producto -->
		<ProductModalPreview
			:isOpen="showProductPreview"
			:productId="selectedProductId"
			@close="showProductPreview = false"
		/>
	</div>
</template>

<script lang="ts"
	setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useProductoStore} from '~/stores/productoStore';
import {useFavoritesStore} from '~/stores/favoritesStore';
import {useCartStore} from '~/stores/cartStore';
import {useFiltersData} from '~/composables/useFiltersData';
import type {FilterState, SortCriteria} from '~/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import FilterSidebar from '~/components/FilterSidebar.vue';
import SortOptions from '~/components/SortOptions.vue';
import BreadCrumb from '~/components/BreadCrumb.vue';
import ProductModalPreview from '~/components/ProductModalPreview.vue';
import emitter from '~/utils/eventBus';
import ProductGridLoading from "~/components/ProductGridLoading.vue";

// Definir título y meta tags para SEO
useHead({
	title: 'Catálogo de Productos - Paraná Hogar',
	meta: [
		{
			name: 'description',
			content: 'Explora nuestro catálogo completo de productos para el hogar. Encuentra muebles, electrodomésticos y más con los mejores precios y calidad.'
		}
	]
});

// Variables para el modal de vista previa
const showProductPreview = ref(false);
const selectedProductId = ref('');

// Escuchar evento de vista previa de producto
onMounted(() => {
	// @ts-ignore - Ignore event typing issues as we're using a custom event bus
	emitter.on('product:preview', (productId) => {
		selectedProductId.value = productId;
		showProductPreview.value = true;
	});
});

// Router y route
const route = useRoute();
const router = useRouter();

// Stores
const productoStore = useProductoStore();
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

// Obtener datos de filtros
const {filtrosData, loading: filtersLoading} = useFiltersData();

// Estado
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const itemsPerPage = ref(12);

// Estado de filtros
const filterState = ref<FilterState>({
	categorias: [],
	subcategorias: [],
	precioMin: 0,
	precioMax: 0,
	searchQuery: '',
	sortBy: 'recientes'
});

// Getters computados
const productos = computed(() => productoStore.productos);

// Productos filtrados según los criterios seleccionados
const filteredProducts = computed(() => {
	let result = [...productos.value];

	// Filtrar por categorías
	if (filterState.value.categorias.length > 0) {
		result = result.filter(prod =>
			filterState.value.categorias.includes(prod.codigo_division)
		);
	}

	// Filtrar por subcategorías
	if (filterState.value.subcategorias.length > 0) {
		result = result.filter(prod =>
			filterState.value.subcategorias.includes(prod.codigo_categoria)
		);
	}

	// Filtrar por precio mínimo
	if (filterState.value.precioMin !== null) {
		result = result.filter(prod => prod.precio >= (filterState.value.precioMin || 0));
	}

	// Filtrar por precio máximo
	if (filterState.value.precioMax !== null) {
		result = result.filter(prod => prod.precio <= (filterState.value.precioMax || Infinity));
	}

	// Filtrar por búsqueda
	if (filterState.value.searchQuery) {
		const query = filterState.value.searchQuery.toLowerCase();
		result = result.filter(prod =>
			prod.nombre.toLowerCase()
				.includes(query) ||
			prod.desc_division.toLowerCase()
				.includes(query) ||
			prod.desc_categoria.toLowerCase()
				.includes(query)
		);
	}

	// Ordenar productos
	switch (filterState.value.sortBy) {
		case 'nombre_asc':
			result.sort((a,
						 b) => a.nombre.localeCompare(b.nombre));
			break;
		case 'nombre_desc':
			result.sort((a,
						 b) => b.nombre.localeCompare(a.nombre));
			break;
		case 'precio_asc':
			result.sort((a,
						 b) => a.precio - b.precio);
			break;
		case 'precio_desc':
			result.sort((a,
						 b) => b.precio - a.precio);
			break;
		case 'recientes':
			// Aquí podríamos ordenar por fecha si tuviéramos ese dato
			// Por ahora, usamos el código como aproximación (asumiendo que códigos más altos son más recientes)
			result.sort((a,
						 b) => b.codigo - a.codigo);
			break;
	}

	return result;
});

// Productos paginados
const paginatedProducts = computed(() => {
	const startIndex = (currentPage.value - 1) * itemsPerPage.value;
	const endIndex = startIndex + itemsPerPage.value;
	return filteredProducts.value.slice(startIndex, endIndex);
});

// Total de páginas
const totalPages = computed(() => {
	return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
});

// Elementos de paginación
const paginationItems = computed(() => {
	const items: Array<{ type: 'page' | 'ellipsis'; value: number }> = [];
	const maxVisiblePages = 5;

	if (totalPages.value <= maxVisiblePages) {
		for (let i = 1; i <= totalPages.value; i++) {
			items.push({type: 'page', value: i});
		}
	} else {
		items.push({type: 'page', value: 1});

		let startPage = Math.max(2, currentPage.value - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPages.value - 1, startPage + maxVisiblePages - 3);

		if (startPage > 2) {
			items.push({type: 'ellipsis', value: Math.floor((1 + startPage) / 2)});
		}

		for (let i = startPage; i <= endPage; i++) {
			items.push({type: 'page', value: i});
		}

		if (endPage < totalPages.value - 1) {
			items.push({type: 'ellipsis', value: Math.floor((endPage + totalPages.value) / 2)});
		}

		items.push({type: 'page', value: totalPages.value});
	}

	return items;
});

// Cargar datos iniciales
const loadData = async () => {
	loading.value = true;
	error.value = null;

	try {
		// Cargar productos
		await productoStore.fetchProductos();

		// Verificar si se cargaron productos
		if (productoStore.productos.length === 0) {
			console.warn('No se cargaron productos desde la API');
		} else {
			console.log(`Se cargaron ${productoStore.productos.length} productos correctamente`);
		}

		// Aplicar filtros desde la URL o limpiar filtros si no hay parámetros
		if (Object.keys(route.query).length > 0) {
			applyFiltersFromUrl();
		} else {
			// Asegurarse de que los filtros estén limpios al iniciar
			clearFilters(false); // Pasar false para no redirigir y evitar ciclos
		}

		// Inicializar página
		currentPage.value = 1;
	} catch (err) {
		console.error('Error al cargar datos:', err);
		error.value = 'Error al cargar los datos. Por favor, intente nuevamente.';
	} finally {
		// Asegurar que el estado de carga se desactive correctamente
		loading.value = false;
		filterLoading.value = false;
	}
};

// Ir a una página específica
const goToPage = (page: number) => {
	if (page >= 1 && page <= totalPages.value) {
		currentPage.value = page;
		// Actualizar la URL con el parámetro de página
		const query = {...route.query, page: page.toString()};
		router.push({query});
		// Scroll al inicio de los productos
		window.scrollTo({top: 0, behavior: 'smooth'});
	}
};

// Aplicar filtros
const filterLoading = ref(false);
const applyFilters = async () => {
	// Activar el estado de carga
	filterLoading.value = true;

	// Resetear a la primera página cuando se aplican filtros
	currentPage.value = 1;

	// Construir query params para la URL
	const query: Record<string, string | string[]> = {};

	// Añadir categorías seleccionadas
	if (filterState.value.categorias.length > 0) {
		query.cat = filterState.value.categorias.join(',');
	}

	// Añadir subcategorías seleccionadas
	if (filterState.value.subcategorias.length > 0) {
		query.subcat = filterState.value.subcategorias.join(',');
	}

	// Añadir rango de precios
	if (filterState.value.precioMin > 0) {
		query.min = filterState.value.precioMin.toString();
	}

	if (filterState.value.precioMax < Infinity && filterState.value.precioMax > 0) {
		query.max = filterState.value.precioMax.toString();
	}

	// Añadir término de búsqueda
	if (filterState.value.searchQuery) {
		query.q = filterState.value.searchQuery;
	}

	// Añadir criterio de ordenamiento
	if (filterState.value.sortBy !== 'nombre_asc') {
		query.sort = filterState.value.sortBy;
	}

	// Esperar 1 segundo antes de actualizar
	await new Promise(resolve => setTimeout(resolve, 1000));

	// Actualizar la URL con los nuevos parámetros
	await router.push({query});

	// Desactivar el estado de carga
	filterLoading.value = false;
};

// Limpiar filtros
const clearFilters = async (redirectToHome = true) => {
	// Activar estado de carga
	filterLoading.value = true;

	// Resetear el estado de filtros
	console.log('Limpiando filtros');
	filterState.value = {
		categorias: [],
		subcategorias: [],
		precioMin: 0,
		precioMax: 0,
		searchQuery: '',
		sortBy: 'recientes'
	};

	// Resetear la página actual
	currentPage.value = 1;

	// Limpiar los parámetros de la URL
	if (redirectToHome) {
		await router.push({query: {}});
	}

	// Desactivar estado de carga después de un breve retraso para asegurar que la UI se actualice
	setTimeout(() => {
		filterLoading.value = false;
	}, 300);
};

// Aplicar filtros desde la URL
const applyFiltersFromUrl = () => {
	const query = route.query;

	// Resetear el estado de filtros antes de aplicar los de la URL
	filterState.value = {
		categorias: [],
		subcategorias: [],
		precioMin: 0,
		precioMax: 0,
		searchQuery: '',
		sortBy: 'recientes'
	};

	// Categorías
	if (query.cat) {
		filterState.value.categorias = (query.cat as string).split(',')
			.map(Number);
	}

	// Subcategorías
	if (query.subcat) {
		filterState.value.subcategorias = (query.subcat as string).split(',')
			.map(Number);
	}

	// Precio mínimo
	if (query.min) {
		filterState.value.precioMin = Number(query.min);
	}

	// Precio máximo
	if (query.max) {
		filterState.value.precioMax = Number(query.max);
	}

	// Búsqueda
	if (query.q) {
		filterState.value.searchQuery = query.q as string;
	}

	// Ordenamiento
	if (query.sort) {
		filterState.value.sortBy = query.sort as SortCriteria;
	}

	// Página
	if (query.page) {
		currentPage.value = Number(query.page);
	} else {
		currentPage.value = 1; // Asegurar que la página sea 1 si no se especifica
	}

	console.log('Filtros aplicados desde URL:', filterState.value);
};

// Observar cambios en la ruta para actualizar filtros
watch(() => route.query, () => {
	applyFiltersFromUrl();
}, {deep: true});

// Cargar datos al montar el componente
onMounted(() => {
	loadData();
});
</script>
