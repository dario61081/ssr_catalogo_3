<template>
	<div class="catalog-page">
		<div class="container mx-auto max-w-6xl px-4 py-6">
			<!-- Cabecera del catálogo con título y breadcrumb -->
			<CatalogHeader title="Catálogo de Productos"/>

			<div v-if="loading"
				class="flex justify-center py-16">
				<LoadingSpinner/>
			</div>

			<div v-else-if="error">
				<CatalogEmpty :error="error"
					@retry="loadData"/>
			</div>

			<div v-else
				class="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<!-- Sidebar de filtros -->
				<div class="lg:col-span-1">
					<LazyFilterSidebar v-model:selectedCategories="filterState.categorias"
						v-model:selectedSubcategories="filterState.subcategorias"
						:priceMax="filterState.precioMax"
						:priceMin="filterState.precioMin"
						:searchQuery="filterState.searchQuery"
						@update:priceMin="filterState.precioMin = $event"
						@update:priceMax="filterState.precioMax = $event"
						@update:searchQuery="filterState.searchQuery = $event"
						@filter-changed="applyFilters"
						@clear-filters="clearFilters"/>
				</div>

				<!-- Listado de productos -->
				<div class="lg:col-span-3">
					<LazyCatalogProductGrid
						:currentPage="currentPage"
						:loading="filterLoading"
						:products="paginatedProducts"
						:sortBy="filterState.sortBy"
						:totalPages="totalPages"
						:totalProducts="filteredProducts.length"
						@sort-changed="(newSort) => { filterState.sortBy = newSort; applyFilters(); }"
						@page-change="goToPage"
						@clear-filters="clearFilters(false)"/>
				</div>
			</div>
		</div>
		<!-- Modal de vista previa de producto -->
		<LazyProductModalPreview :isOpen="showProductPreview"
			:productId="selectedProductId"
			@close="showProductPreview = false"/>
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
import emitter from '~/utils/eventBus';

// Importar componentes del catálogo
import CatalogHeader from '~/components/catalog/CatalogHeader.vue';
import CatalogEmpty from '~/components/catalog/CatalogEmpty.vue';

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
