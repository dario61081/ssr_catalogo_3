<template>
	<div>
		<!-- Botón para mostrar filtros en móvil -->
		<!--		<button-->
		<!--			class="lg:hidden fixed bottom-4 left-4 z-50 bg-gray-700 text-white rounded-full p-3 shadow-lg flex items-center"-->
		<!--			@click="showMobileFilters = true">-->
		<!--			<i class="pi pi-filter mr-2"></i>-->
		<!--			Filtros-->
		<!--		</button>-->

		<!-- Overlay para móvil -->
		<div v-if="showMobileFilters"
			class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
			@click="showMobileFilters = false">
		</div>

		<!-- Panel de filtros -->
		<div :class="{
		  'fixed inset-y-0 left-0 w-80 z-50 transform transition-transform duration-300 ease-in-out': true,
		  '-translate-x-full': !showMobileFilters,
		  'translate-x-0': showMobileFilters,
		  'lg:translate-x-0 lg:static lg:w-auto': true
    	}"
			class="filter-sidebar p-3">
			<!-- Categorías -->
			<div class="mb-5">
				<h4 class="font-medium text-gray-700 mb-1 text-sm">Categorías</h4>
				<div v-if="loading"
					class="py-1 text-center text-gray-500">
					<i class="pi pi-spin pi-spinner mr-2"></i>
					Cargando...
				</div>
				<div v-else
					class="pr-1 category-list">
					<div v-for="categoria in categoriasList"
						:key="categoria.codigo_categoria"
						class="mb-1">
						<div :class="{ 'bg-gray-100': isSelectedCategory(categoria.codigo_categoria) }"
							class="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-gray-50"
							@click="toggleCategory(categoria.codigo_categoria)">
							<div class="flex items-center">
								<input :id="`cat-${categoria.codigo_categoria}`"
									:checked="isSelectedCategory(categoria.codigo_categoria)"
									class="mr-2 h-4 w-4 text-gray-700 rounded"
									type="checkbox"
									@change="toggleCategory(categoria.codigo_categoria)"
									@click.stop/>
								<label :for="`cat-${categoria.codigo_categoria}`"
									class="cursor-pointer text-sm"
									@click.stop>
									{{ categoria.desc_categoria }}
									<span class="text-xs text-gray-500 ml-1">({{
											categoria.total_categoria
										}})</span>
								</label>
							</div>
							<button v-if="hasSubcategories(categoria.codigo_categoria)"
								class="text-gray-500 hover:text-gray-700"
								@click.stop="toggleSubcategoryVisibility(categoria.codigo_categoria)">
								<i :class="expandedCategories.includes(categoria.codigo_categoria) ? 'pi-chevron-down' : 'pi-chevron-right'"
									class="pi"></i>
							</button>
						</div>

						<!-- Subcategorías -->
						<div v-if="expandedCategories.includes(categoria.codigo_categoria) && hasSubcategories(categoria.codigo_categoria)"
							class="ml-5 mt-1 subcategory-list">
							<div v-for="subcategoria in getSubcategoriesByCategory(categoria.codigo_categoria)"
								:key="subcategoria.codigo_subcategoria"
								class="mb-1">
								<div class="flex items-center p-1 rounded hover:bg-gray-50">
									<input :id="`subcat-${subcategoria.codigo_subcategoria}`"
										:checked="isSelectedSubcategory(subcategoria.codigo_subcategoria)"
										class="mr-2 h-4 w-4 text-gray-700 rounded"
										type="checkbox"
										@change="toggleSubcategory(subcategoria.codigo_subcategoria, categoria.codigo_categoria)"/>
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
		</div>
	</div>
</template>
<script lang="ts"
	setup>
import {computed, nextTick, ref} from 'vue';
import {useFiltersData} from '~/composables/useFiltersData';
import emitter from '~/utils/eventBus';

const emit = defineEmits([
	'update:selectedCategories',
	'update:selectedSubcategories',
	'filter-changed',
	'clear-filters',
]);

const expandedCategories = ref<number[]>([]);
const localSelectedCategories = ref<number[]>([]);
const localSelectedSubcategories = ref<number[]>([]);
const {filtrosData, loading} = useFiltersData();
const showMobileFilters = ref(false);

const categoriasList = computed(() => {
	const categoriasMap = new Map<number, any>();
	filtrosData.value.forEach(item => {
		if (!categoriasMap.has(item.codigo_categoria)) {
			categoriasMap.set(item.codigo_categoria, item);
		}
	});
	return Array.from(categoriasMap.values());
});

const isSelectedCategory = (categoryId: number): boolean => {
	return localSelectedCategories.value.includes(categoryId);
};

const isSelectedSubcategory = (subcategoryId: number): boolean => {
	return localSelectedSubcategories.value.includes(subcategoryId);
};

const hasSubcategories = (categoryId: number): boolean => {
	return filtrosData.value.some(item =>
		item.codigo_categoria === categoryId &&
		item.codigo_subcategoria !== null
	);
};

const getSubcategoriesByCategory = (categoryId: number) => {
	return filtrosData.value.filter(item =>
		item.codigo_categoria === categoryId &&
		item.codigo_subcategoria !== null
	);
};

const toggleSubcategoryVisibility = (categoryId: number) => {
	const idx = expandedCategories.value.indexOf(categoryId);
	if (idx !== -1) {
		expandedCategories.value.splice(idx, 1);
	} else {
		expandedCategories.value.push(categoryId);
	}
};

const toggleCategory = (categoryId: number) => {
	if (isSelectedCategory(categoryId)) {
		localSelectedCategories.value = localSelectedCategories.value.filter(id => id !== categoryId);
		const subcatsToRemove = getSubcategoriesByCategory(categoryId)
			.map(subcat => subcat.codigo_subcategoria);
		localSelectedSubcategories.value = localSelectedSubcategories.value.filter(
			id => !subcatsToRemove.includes(id)
		);
	} else {
		const previouslySelectedCategories = [...localSelectedCategories.value];
		localSelectedCategories.value = [];
		if (previouslySelectedCategories.length > 0) {
			const allSubcatsToRemove: number[] = [];
			previouslySelectedCategories.forEach(catId => {
				const subcats = getSubcategoriesByCategory(catId)
					.map(subcat => subcat.codigo_subcategoria)
					.filter((id): id is number => id !== null);
				allSubcatsToRemove.push(...subcats);
			});
			localSelectedSubcategories.value = localSelectedSubcategories.value.filter(
				id => !allSubcatsToRemove.includes(id)
			);
		}
		localSelectedCategories.value.push(categoryId);
		if (hasSubcategories(categoryId)) {
			const subcatsToAdd = getSubcategoriesByCategory(categoryId)
				.map(subcat => subcat.codigo_subcategoria);
			subcatsToAdd.forEach(subcatId => {
				if (!localSelectedSubcategories.value.includes(subcatId)) {
					localSelectedSubcategories.value.push(subcatId);
				}
			});
		}
	}
	emit('update:selectedCategories', localSelectedCategories.value);
	emit('update:selectedSubcategories', localSelectedSubcategories.value);
	emit('filter-changed');
	emitter.emit('filter:change', {categoryId});
};

const toggleSubcategory = (subcategoryId: number,
						   categoryId: number) => {
	if (isSelectedSubcategory(subcategoryId)) {
		localSelectedSubcategories.value = localSelectedSubcategories.value.filter(id => id !== subcategoryId);
	} else {
		localSelectedSubcategories.value.push(subcategoryId);
		if (!localSelectedCategories.value.includes(categoryId)) {
			localSelectedCategories.value.push(categoryId);
		}
	}
	emit('update:selectedCategories', localSelectedCategories.value);
	emit('update:selectedSubcategories', localSelectedSubcategories.value);
	emit('filter-changed');
	emitter.emit('filter:change', {categoryId, subcategoryId});
};

const clearAllFilters = () => {
	localSelectedCategories.value = [];
	localSelectedSubcategories.value = [];
	emit('update:selectedCategories', []);
	emit('update:selectedSubcategories', []);
	emit('clear-filters');
	nextTick(() => {
		expandedCategories.value = [];
	});
};
</script>
<style scoped>
.filter-sidebar {
	border: none;
	box-shadow: none;
	padding: 0;
}

.category-list,
.subcategory-list {
	/* max-height: 300px; */
	/* overflow-y: auto; */
}

.category-list > div,
.subcategory-list > div {
	margin-bottom: 0.25rem;
}
</style>
