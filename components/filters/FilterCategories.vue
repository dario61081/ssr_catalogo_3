<template>
    <div class="mb-5">
        <h4 class="font-medium text-gray-700 mb-1 text-sm">Categorías</h4>
        <div v-if="loading" class="py-1 text-center text-gray-500">
            <i class="pi pi-spin pi-spinner mr-2"></i>
            Cargando...
        </div>
        <div v-else class="max-h-120 overflow-y-auto pr-1 category-list">
            <div v-for="categoria in categoriasList" :key="categoria.codigo_categoria" class="mb-1">
                <div :class="{ 'bg-gray-100': isSelectedCategory(categoria.codigo_categoria) }"
                    class="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-gray-50"
                    @click="toggleCategory(categoria.codigo_categoria)">
                    <div class="flex items-center">
                        <input :id="`cat-${categoria.codigo_categoria}`"
                            :checked="isSelectedCategory(categoria.codigo_categoria)"
                            class="mr-2 h-4 w-4 text-gray-700 rounded" type="checkbox"
                            @change="toggleCategory(categoria.codigo_categoria)" @click.stop />
                        <label :for="`cat-${categoria.codigo_categoria}`" class="cursor-pointer text-sm" @click.stop>
                            {{ categoria.desc_categoria }}
                            <span class="text-xs text-gray-500 ml-1">({{ categoria.total_categoria }})</span>
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
                        :key="subcategoria.codigo_subcategoria" class="mb-1">
                        <div class="flex items-center p-1 rounded hover:bg-gray-50">
                            <input :id="`subcat-${subcategoria.codigo_subcategoria}`"
                                :checked="isSelectedSubcategory(subcategoria.codigo_subcategoria)"
                                class="mr-2 h-4 w-4 text-gray-700 rounded" type="checkbox"
                                @change="toggleSubcategory(subcategoria.codigo_subcategoria, categoria.codigo_categoria)" />
                            <label :for="`subcat-${subcategoria.codigo_subcategoria}`" class="cursor-pointer text-xs">
                                {{ subcategoria.desc_subcategoria }}
                                <span class="text-xs text-gray-500 ml-1">({{ subcategoria.total_subcategoria }})</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { FilterData } from '~/types';
import { useFiltersData } from '~/composables/useFiltersData';
import emitter from '~/utils/eventBus';

const props = defineProps({
    selectedCategories: {
        type: Array as () => number[],
        default: () => []
    },
    selectedSubcategories: {
        type: Array as () => number[],
        default: () => []
    }
});

const emit = defineEmits([
    'update:selectedCategories',
    'update:selectedSubcategories',
    'filter-changed'
]);

// Estado local
const expandedCategories = ref<number[]>([]);
const localSelectedCategories = ref<number[]>([...props.selectedCategories]);
const localSelectedSubcategories = ref<number[]>([...props.selectedSubcategories]);

// Obtener datos de filtros
const { filtrosData, loading } = useFiltersData();

// Sincronizar props con estado local
watch(() => props.selectedCategories, (newVal) => {
    localSelectedCategories.value = [...newVal];
});

watch(() => props.selectedSubcategories, (newVal) => {
    localSelectedSubcategories.value = [...newVal];
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
            const allSubcatsToRemove: number[] = [];

            // Recopilar todas las subcategorías a eliminar
            previouslySelectedCategories.forEach(catId => {
                const subcats = getSubcategoriesByCategory(catId)
                    .map(subcat => subcat.codigo_subcategoria)
                    .filter((id): id is number => id !== null);
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
};

// Seleccionar/deseleccionar subcategoría
const toggleSubcategory = (subcategoryId: number, categoryId: number) => {
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
};
</script>

<style scoped>
.category-list,
.subcategory-list {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e0 #f7fafc;
}

.category-list::-webkit-scrollbar,
.subcategory-list::-webkit-scrollbar {
    width: 6px;
}

.category-list::-webkit-scrollbar-track,
.subcategory-list::-webkit-scrollbar-track {
    background: #f7fafc;
}

.category-list::-webkit-scrollbar-thumb,
.subcategory-list::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 20px;
}

/* checkbox debe ser un cuadrado interno pequeño color negro */
input[type="checkbox"] {
    width: 16px !important;
    height: 16px !important;
}
</style>