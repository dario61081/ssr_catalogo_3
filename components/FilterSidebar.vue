<template>
	<div>
		<!-- Botón para mostrar filtros en móvil -->
		<FilterMobileToggle :showMobileFilters="showMobileFilters"
			@toggle-mobile="showMobileFilters = !showMobileFilters" />

		<!-- Panel de filtros -->
		<div :class="{
			'fixed inset-y-0 left-0 w-80 z-50 transform transition-transform duration-300 ease-in-out': true,
			'-translate-x-full': !showMobileFilters,
			'translate-x-0': showMobileFilters,
			'lg:translate-x-0 lg:static lg:w-auto': true
		}" class="filter-sidebar bg-white rounded-lg shadow-sm p-3">
			<div class="flex items-center justify-between mb-3">
				<h3 class="text-base font-semibold flex items-center">
					<i class="pi pi-filter text-gray-500 mr-2"></i>
					Filtros
				</h3>
				<button class="lg:hidden text-gray-500" @click="showMobileFilters = false">
					<i class="pi pi-times"></i>
				</button>
			</div>

			<div class="filter-sidebar bg-white rounded-lg shadow-sm p-3">
				<!-- Buscador -->
				<FilterSearch :searchQuery="searchQuery" @update:searchQuery="$emit('update:searchQuery', $event)"
					@search-changed="applyFiltersAndCloseMobile" />

				<!-- Categorías -->
				<FilterCategories :selectedCategories="selectedCategories"
					:selectedSubcategories="selectedSubcategories"
					@update:selectedCategories="$emit('update:selectedCategories', $event)"
					@update:selectedSubcategories="$emit('update:selectedSubcategories', $event)"
					@filter-changed="applyFiltersAndCloseMobile" />

				<!-- Rango de precio -->
				<FilterPrice :priceMin="priceMin" :priceMax="priceMax" :minPrice="categoryPriceRange.min"
					:maxPrice="categoryPriceRange.max" @update:priceMin="$emit('update:priceMin', $event)"
					@update:priceMax="$emit('update:priceMax', $event)" @price-changed="applyFiltersAndCloseMobile" />

				<!-- Botón para limpiar filtros -->
				<button
					class="w-full border border-gray-300 text-gray-700 h-[38px] py-1 px-3 rounded text-xs hover:bg-gray-50 transition-colors flex items-center justify-center"
					@click="clearAllFilters">
					<i class="pi pi-filter-slash mr-2"></i>
					Limpiar filtros
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductoStore } from '~/stores/productoStore';

// Importar componentes de filtros
import FilterSearch from '~/components/filters/FilterSearch.vue';
import FilterCategories from '~/components/filters/FilterCategories.vue';
import FilterPrice from '~/components/filters/FilterPrice.vue';
import FilterMobileToggle from '~/components/filters/FilterMobileToggle.vue';

// Props
const props = defineProps({
	priceMin: {
		type: Number,
		default: null
	},
	priceMax: {
		type: Number,
		default: null
	},
	selectedCategories: {
		type: Array as () => number[],
		default: () => []
	},
	selectedSubcategories: {
		type: Array as () => number[],
		default: () => []
	},
	searchQuery: {
		type: String,
		default: ''
	}
});

// Emits
const emit = defineEmits([
	'update:selectedCategories',
	'update:selectedSubcategories',
	'update:priceMin',
	'update:priceMax',
	'update:searchQuery',
	'filter-changed',
	'clear-filters'
]);

// Router
const router = useRouter();

// Estado para controlar la visibilidad en móvil
const showMobileFilters = ref(false);

// Stores
const productoStore = useProductoStore();

// Constante para el precio máximo
const maxPriceLimit = 1000000; // 1 millón como límite máximo

// Calcular rango de precios para la categoría seleccionada
const categoryPriceRange = computed(() => {
	const productos = productoStore.productos;
	let filteredProducts = productos;

	if (props.selectedCategories.length > 0) {
		filteredProducts = productos.filter(prod =>
			props.selectedCategories.includes(prod.codigo_division)
		);
	}

	if (props.selectedSubcategories.length > 0) {
		filteredProducts = filteredProducts.filter(prod =>
			props.selectedSubcategories.includes(prod.codigo_categoria)
		);
	}

	if (filteredProducts.length === 0) {
		return { min: 0, max: maxPriceLimit };
	}

	return {
		min: Math.min(...filteredProducts.map(p => p.precio)),
		max: Math.max(...filteredProducts.map(p => p.precio))
	};
});

// Cerrar filtros en móvil después de aplicar filtros
const applyFiltersAndCloseMobile = () => {
	emit('filter-changed');
	if (window.innerWidth < 1024) { // 1024px es el breakpoint lg de Tailwind
		showMobileFilters.value = false;
	}
};

// Limpiar todos los filtros
const clearAllFilters = () => {
	// Emitir evento de limpieza de filtros
	emit('clear-filters');

	// Forzar actualización de la UI y cerrar panel móvil
	nextTick(() => {
		if (window.innerWidth < 1024) {
			showMobileFilters.value = false;
		}
	});
};
</script>

<style scoped>
/* Asegurar que el panel de filtros tenga scroll vertical en móvil */
.filter-sidebar {
	@media (max-width: 1024px) {
		height: 100%;
		overflow-y: auto;
	}
}
</style>
