<template>
	<div class="filter-sidebar bg-white rounded-lg shadow-sm p-3">
		<h3 class="text-base font-semibold mb-3 flex items-center">
			<i class="pi pi-filter text-gray-500 mr-2"></i>
			Filtros
		</h3>

		<!-- Buscador -->
		<div class="mb-5">
			<h4 class="font-medium text-gray-700 mb-1 text-sm">Buscar productos</h4>
			<div class="flex flex-col space-y-2">
				<input
					v-model="localSearchQuery"
					class="w-full p-2 border rounded text-sm"
					placeholder="Nombre del producto..."
					type="text"
				/>
				<button
					class="w-full bg-gray-700 hover:bg-gray-800 text-white py-1 px-3 rounded text-xs transition-colors flex items-center justify-center"
					@click="applySearchFilter"
				>
					<i class="pi pi-search mr-2"></i>
					Buscar
				</button>
			</div>
		</div>

		<!-- Categorías -->
		<div class="mb-5">
			<h4 class="font-medium text-gray-700 mb-1 text-sm">Categorías</h4>
			<div v-if="loading"
				class="py-1 text-center text-gray-500">
				<i class="pi pi-spin pi-spinner mr-2"></i>
				Cargando...
			</div>
			<div v-else
				class="max-h-120 overflow-y-auto pr-1 category-list">
				<div
					v-for="categoria in categoriasList"
					:key="categoria.codigo_categoria"
					class="mb-1"
				>
					<div
						:class="{ 'bg-gray-100': isSelectedCategory(categoria.codigo_categoria) }"
						class="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-gray-50"
						@click="toggleCategory(categoria.codigo_categoria)"
					>
						<div class="flex items-center">
							<input
								:id="`cat-${categoria.codigo_categoria}`"
								:checked="isSelectedCategory(categoria.codigo_categoria)"
								class="mr-2 h-4 w-4 text-gray-700 rounded"
								type="checkbox"
								@change="toggleCategory(categoria.codigo_categoria)"
								@click.stop
							/>
							<label :for="`cat-${categoria.codigo_categoria}`"
								class="cursor-pointer text-sm">
								{{ categoria.desc_categoria }}
								<span class="text-xs text-gray-500 ml-1">({{ categoria.total_categoria }})</span>
							</label>
						</div>
						<button
							v-if="hasSubcategories(categoria.codigo_categoria)"
							class="text-gray-500 hover:text-gray-700"
							@click.stop="toggleSubcategoryVisibility(categoria.codigo_categoria)"
						>
							<i
								:class="expandedCategories.includes(categoria.codigo_categoria) ? 'pi-chevron-down' : 'pi-chevron-right'"
								class="pi"
							></i>
						</button>
					</div>

					<!-- Subcategorías -->
					<div
						v-if="expandedCategories.includes(categoria.codigo_categoria) && hasSubcategories(categoria.codigo_categoria)"
						class="ml-5 mt-1 subcategory-list"
					>
						<div
							v-for="subcategoria in getSubcategoriesByCategory(categoria.codigo_categoria)"
							:key="subcategoria.codigo_subcategoria"
							class="mb-1"
						>
							<div class="flex items-center p-1 rounded hover:bg-gray-50">
								<input
									:id="`subcat-${subcategoria.codigo_subcategoria}`"
									:checked="isSelectedSubcategory(subcategoria.codigo_subcategoria)"
									class="mr-2 h-4 w-4 text-gray-700 rounded"
									type="checkbox"
									@change="toggleSubcategory(subcategoria.codigo_subcategoria, categoria.codigo_categoria)"
								/>
								<label :for="`subcat-${subcategoria.codigo_subcategoria}`"
									class="cursor-pointer text-xs">
									{{ subcategoria.desc_subcategoria }}
									<span class="text-xs text-gray-500 ml-1">({{
											subcategoria.total_subcategoria
										}})</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Rango de precio -->
		<div class="mb-5">
			<h4 class="font-medium text-gray-700 mb-1 text-sm">Rango de precio</h4>
			<div class="flex items-center space-x-2">
				<input
					v-model="localPriceMin"
					class="w-full p-1 border rounded text-xs"
					min="0"
					placeholder="Mín"
					type="number"
				/>
				<span class="text-gray-500">-</span>
				<input
					v-model="localPriceMax"
					class="w-full p-1 border rounded text-xs"
					min="0"
					placeholder="Máx"
					type="number"
				/>
			</div>
			<button
				class="mt-1 w-full bg-gray-700 hover:bg-gray-800 text-white py-1 px-3 rounded text-xs transition-colors flex items-center justify-center"
				@click="applyPriceFilter"
			>
				<i class="pi pi-check-circle mr-2"></i>
				Aplicar
			</button>
		</div>

		<!-- Botón para limpiar filtros -->
		<button
			class="w-full border border-gray-300 text-gray-700 py-1 px-3 rounded text-xs hover:bg-gray-50 transition-colors flex items-center justify-center"
			@click="clearAllFilters"
		>
			<i class="pi pi-filter-slash mr-2"></i>
			Limpiar filtros
		</button>
	</div>
</template>

<script lang="ts"
	setup>
import {computed, nextTick, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {FilterData} from '~/types';
import emitter from '~/utils/eventBus';
import {useFiltersData} from '~/composables/useFiltersData';

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

// Estado local
const expandedCategories = ref<number[]>([]);
const localSelectedCategories = ref<number[]>([...props.selectedCategories]);
const localSelectedSubcategories = ref<number[]>([...props.selectedSubcategories]);
const localPriceMin = ref<number | null>(props.priceMin);
const localPriceMax = ref<number | null>(props.priceMax);
const localSearchQuery = ref<string>(props.searchQuery);

// Obtener datos de filtros
const {filtrosData, loading} = useFiltersData();

// Sincronizar props con estado local
watch(() => props.selectedCategories, (newVal) => {
	localSelectedCategories.value = [...newVal];
});

watch(() => props.selectedSubcategories, (newVal) => {
	localSelectedSubcategories.value = [...newVal];
});

watch(() => props.priceMin, (newVal) => {
	localPriceMin.value = newVal;
});

watch(() => props.priceMax, (newVal) => {
	localPriceMax.value = newVal;
});

watch(() => props.searchQuery, (newVal) => {
	localSearchQuery.value = newVal;
});

// Obtener lista única de categorías
const categoriasList = computed(() => {
	const categoriasMap = new Map<number, FilterData>();

	filtrosData.value.forEach(item => {
		if (!categoriasMap.has(item.codigo_categoria)) {
			categoriasMap.set(item.codigo_categoria, item);
		}
	});

	return Array.from(categoriasMap.values());
});

// Verificar si una categoría está seleccionada
const isSelectedCategory = (categoryId: number): boolean => {
	return localSelectedCategories.value.includes(categoryId);
};

// Verificar si una subcategoría está seleccionada
const isSelectedSubcategory = (subcategoryId: number): boolean => {
	return localSelectedSubcategories.value.includes(subcategoryId);
};

// Verificar si una categoría tiene subcategorías
const hasSubcategories = (categoryId: number): boolean => {
	return filtrosData.value.some(item =>
		item.codigo_categoria === categoryId &&
		item.codigo_subcategoria !== null
	);
};

// Obtener subcategorías por categoría
const getSubcategoriesByCategory = (categoryId: number) => {
	return filtrosData.value
		.filter(item => item.codigo_categoria === categoryId)
		.map(item => ({
			codigo_subcategoria: item.codigo_subcategoria,
			desc_subcategoria: item.desc_subcategoria,
			total_subcategoria: item.total_subcategoria
		}));
};

// Mostrar/ocultar subcategorías
const toggleSubcategoryVisibility = (categoryId: number) => {
	if (expandedCategories.value.includes(categoryId)) {
		expandedCategories.value = expandedCategories.value.filter(id => id !== categoryId);
	} else {
		expandedCategories.value.push(categoryId);
	}
};

// Seleccionar/deseleccionar categoría
const toggleCategory = (categoryId: number) => {
	if (isSelectedCategory(categoryId)) {
		// Si la categoría está seleccionada, la quitamos
		localSelectedCategories.value = localSelectedCategories.value.filter(id => id !== categoryId);

		// También quitamos las subcategorías asociadas
		const subcatsToRemove = getSubcategoriesByCategory(categoryId)
			.map(subcat => subcat.codigo_subcategoria);

		localSelectedSubcategories.value = localSelectedSubcategories.value.filter(
			id => !subcatsToRemove.includes(id)
		);
	} else {
		// Deseleccionar todas las categorías previamente seleccionadas
		const previouslySelectedCategories = [...localSelectedCategories.value];

		// Limpiar las categorías seleccionadas
		localSelectedCategories.value = [];

		// Limpiar las subcategorías de las categorías previamente seleccionadas
		if (previouslySelectedCategories.length > 0) {
			const allSubcatsToRemove = [];

			// Recopilar todas las subcategorías a eliminar
			previouslySelectedCategories.forEach(catId => {
				const subcats = getSubcategoriesByCategory(catId)
					.map(subcat => subcat.codigo_subcategoria);
				allSubcatsToRemove.push(...subcats);
			});

			// Filtrar las subcategorías seleccionadas
			localSelectedSubcategories.value = localSelectedSubcategories.value.filter(
				id => !allSubcatsToRemove.includes(id)
			);
		}

		// Seleccionar la nueva categoría
		localSelectedCategories.value.push(categoryId);

		// Seleccionar automáticamente todas las subcategorías
		if (hasSubcategories(categoryId)) {
			const subcatsToAdd = getSubcategoriesByCategory(categoryId)
				.map(subcat => subcat.codigo_subcategoria);

			// Añadir subcategorías que no estén ya seleccionadas
			subcatsToAdd.forEach(subcatId => {
				if (!localSelectedSubcategories.value.includes(subcatId)) {
					localSelectedSubcategories.value.push(subcatId);
				}
			});

			// Expandimos la categoría para mostrar subcategorías
			if (!expandedCategories.value.includes(categoryId)) {
				expandedCategories.value.push(categoryId);
			}
		}
	}

	// Emitir eventos
	emit('update:selectedCategories', localSelectedCategories.value);
	emit('update:selectedSubcategories', localSelectedSubcategories.value);
	emit('filter-changed');

	// Notificar a través del event bus
	emitter.emit('filter:change', {
		categoryId: categoryId
	});

	// Actualizar URL con los parámetros de filtro
	updateUrlParams();
};

// Seleccionar/deseleccionar subcategoría
const toggleSubcategory = (subcategoryId: number,
						   categoryId: number) => {
	if (isSelectedSubcategory(subcategoryId)) {
		// Si la subcategoría está seleccionada, la quitamos
		localSelectedSubcategories.value = localSelectedSubcategories.value.filter(id => id !== subcategoryId);
	} else {
		// Si la subcategoría no está seleccionada, la añadimos
		localSelectedSubcategories.value.push(subcategoryId);

		// Aseguramos que la categoría padre esté seleccionada
		if (!localSelectedCategories.value.includes(categoryId)) {
			localSelectedCategories.value.push(categoryId);
		}
	}

	// Emitir eventos
	emit('update:selectedCategories', localSelectedCategories.value);
	emit('update:selectedSubcategories', localSelectedSubcategories.value);
	emit('filter-changed');

	// Notificar a través del event bus
	emitter.emit('filter:change', {
		categoryId: categoryId,
		subcategoryId: subcategoryId
	});

	// Actualizar URL con los parámetros de filtro
	updateUrlParams();
};

// Aplicar filtro de precio
const applyPriceFilter = () => {
	emit('update:priceMin', localPriceMin.value);
	emit('update:priceMax', localPriceMax.value);
	emit('filter-changed');

	// Actualizar URL con los parámetros de filtro
	updateUrlParams();
};

// Aplicar filtro de búsqueda
const applySearchFilter = () => {
	emit('update:searchQuery', localSearchQuery.value);
	emit('filter-changed');
};

// Limpiar todos los filtros
const clearAllFilters = () => {
	// Limpiar estado local
	localSelectedCategories.value = [];
	localSelectedSubcategories.value = [];
	localPriceMin.value = null;
	localPriceMax.value = null;
	localSearchQuery.value = '';

	// Emitir eventos para actualizar el estado en el componente padre
	emit('update:selectedCategories', []);
	emit('update:selectedSubcategories', []);
	emit('update:priceMin', null);
	emit('update:priceMax', null);
	emit('update:searchQuery', '');

	// Emitir evento de limpieza de filtros
	emit('clear-filters');

	// Nota: Comentamos esta línea para evitar conflictos con la navegación en el componente padre
	// router.push({query: {}});

	// Forzar actualización de la UI
	nextTick(() => {
		// Cerrar todas las categorías expandidas
		expandedCategories.value = [];
	});
};

// Actualizar parámetros de URL
const updateUrlParams = () => {
	const query = {...router.currentRoute.value.query};

	// Categorías
	if (localSelectedCategories.value.length > 0) {
		query.cat = localSelectedCategories.value.join(',');
	} else {
		delete query.cat;
	}

	// Subcategorías
	if (localSelectedSubcategories.value.length > 0) {
		query.subcat = localSelectedSubcategories.value.join(',');
	} else {
		delete query.subcat;
	}

	// Rango de precio
	if (localPriceMin.value) {
		query.min = localPriceMin.value.toString();
	} else {
		delete query.min;
	}

	if (localPriceMax.value) {
		query.max = localPriceMax.value.toString();
	} else {
		delete query.max;
	}

	// Búsqueda
	if (localSearchQuery.value) {
		query.q = localSearchQuery.value;
	} else {
		delete query.q;
	}

	router.push({query});
};
</script>

<style scoped>
.category-list, .subcategory-list {
	scrollbar-width: thin;
	scrollbar-color: #cbd5e0 #f7fafc;
}

.category-list::-webkit-scrollbar, .subcategory-list::-webkit-scrollbar {
	width: 6px;
}

.category-list::-webkit-scrollbar-track, .subcategory-list::-webkit-scrollbar-track {
	background: #f7fafc;
}

.category-list::-webkit-scrollbar-thumb, .subcategory-list::-webkit-scrollbar-thumb {
	background-color: #cbd5e0;
	border-radius: 20px;
}

/* checkbox debe ser un cuadrado interno pequeño color negro */
input[type="checkbox"] {
	width: 16px !important;
	height: 16px !important;
	margin-right: 5px;
}

</style>
