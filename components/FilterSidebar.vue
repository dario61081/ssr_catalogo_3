<template>
  <div class="filter-sidebar bg-white rounded-lg shadow-sm p-4">
    <h3 class="text-lg font-semibold mb-4 flex items-center">
      <i class="pi pi-filter text-gray-500 mr-2"></i>
      Filtros
    </h3>
    
    <!-- Categorías -->
    <div class="mb-6">
      <h4 class="font-medium text-gray-700 mb-2">Categorías</h4>
      <div class="max-h-60 overflow-y-auto pr-2 category-list">
        <div 
          v-for="categoria in categorias" 
          :key="categoria.codigo"
          class="mb-2"
        >
          <div 
            class="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-50"
            :class="{ 'bg-gray-100': isSelectedCategory(categoria.codigo) }"
            @click="toggleCategory(categoria.codigo)"
          >
            <div class="flex items-center">
              <input 
                type="checkbox" 
                :id="`cat-${categoria.codigo}`"
                :checked="isSelectedCategory(categoria.codigo)"
                class="mr-2 h-4 w-4 text-gray-700 rounded"
                @click.stop
                @change="toggleCategory(categoria.codigo)"
              />
              <label :for="`cat-${categoria.codigo}`" class="cursor-pointer">
                {{ categoria.nombre }}
              </label>
            </div>
            <button 
              v-if="hasSubcategories(categoria.codigo)"
              @click.stop="toggleSubcategoryVisibility(categoria.codigo)"
              class="text-gray-500 hover:text-gray-700"
            >
              <i 
                class="pi" 
                :class="expandedCategories.includes(categoria.codigo) ? 'pi-chevron-down' : 'pi-chevron-right'"
              ></i>
            </button>
          </div>
          
          <!-- Subcategorías -->
          <div 
            v-if="expandedCategories.includes(categoria.codigo) && hasSubcategories(categoria.codigo)"
            class="ml-6 mt-2 subcategory-list"
          >
            <div 
              v-for="subcategoria in getSubcategoriesByCategory(categoria.codigo)" 
              :key="subcategoria.codigo"
              class="mb-1"
            >
              <div class="flex items-center p-1 rounded hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  :id="`subcat-${subcategoria.codigo}`"
                  :checked="isSelectedSubcategory(subcategoria.codigo)"
                  class="mr-2 h-4 w-4 text-gray-700 rounded"
                  @change="toggleSubcategory(subcategoria.codigo)"
                />
                <label :for="`subcat-${subcategoria.codigo}`" class="cursor-pointer text-sm">
                  {{ subcategoria.nombre }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Rango de precio -->
    <div class="mb-6">
      <h4 class="font-medium text-gray-700 mb-2">Rango de precio</h4>
      <div class="flex items-center space-x-2">
        <input 
          type="number" 
          v-model="localPriceMin"
          placeholder="Mín"
          class="w-full p-2 border rounded text-sm"
          min="0"
        />
        <span class="text-gray-500">-</span>
        <input 
          type="number" 
          v-model="localPriceMax"
          placeholder="Máx"
          class="w-full p-2 border rounded text-sm"
          min="0"
        />
      </div>
      <button 
        @click="applyPriceFilter"
        class="mt-2 w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded text-sm transition-colors"
      >
        Aplicar
      </button>
    </div>
    
    <!-- Botón para limpiar filtros -->
    <button 
      @click="clearAllFilters"
      class="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-50 transition-colors flex items-center justify-center"
    >
      <i class="pi pi-filter-slash mr-1"></i>
      Limpiar filtros
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Categoria, Subcategoria } from '~/types';
import emitter from '~/utils/eventBus';

const props = defineProps({
  categorias: {
    type: Array as () => Categoria[],
    default: () => []
  },
  subcategorias: {
    type: Array as () => Subcategoria[],
    default: () => []
  },
  selectedCategories: {
    type: Array as () => number[],
    default: () => []
  },
  selectedSubcategories: {
    type: Array as () => number[],
    default: () => []
  },
  priceMin: {
    type: Number,
    default: null
  },
  priceMax: {
    type: Number,
    default: null
  }
});

const emit = defineEmits([
  'update:selectedCategories', 
  'update:selectedSubcategories', 
  'update:priceMin', 
  'update:priceMax', 
  'filter-changed', 
  'clear-filters'
]);

const router = useRouter();
const expandedCategories = ref<number[]>([]);
const localSelectedCategories = ref<number[]>([...props.selectedCategories]);
const localSelectedSubcategories = ref<number[]>([...props.selectedSubcategories]);
const localPriceMin = ref<number | null>(props.priceMin);
const localPriceMax = ref<number | null>(props.priceMax);

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

const isSelectedCategory = (categoryId: number): boolean => {
  return localSelectedCategories.value.includes(categoryId);
};

const isSelectedSubcategory = (subcategoryId: number): boolean => {
  return localSelectedSubcategories.value.includes(subcategoryId);
};

const hasSubcategories = (categoryId: number): boolean => {
  return props.subcategorias.some(subcat => subcat.codigoCategoria === categoryId);
};

const getSubcategoriesByCategory = (categoryId: number): Subcategoria[] => {
  return props.subcategorias.filter(subcat => subcat.codigoCategoria === categoryId);
};

const toggleSubcategoryVisibility = (categoryId: number) => {
  if (expandedCategories.value.includes(categoryId)) {
    expandedCategories.value = expandedCategories.value.filter(id => id !== categoryId);
  } else {
    expandedCategories.value.push(categoryId);
  }
};

const toggleCategory = (categoryId: number) => {
  if (isSelectedCategory(categoryId)) {
    // Si la categoría está seleccionada, la quitamos
    localSelectedCategories.value = localSelectedCategories.value.filter(id => id !== categoryId);
    
    // También quitamos las subcategorías asociadas
    const subcatsToRemove = props.subcategorias
      .filter(subcat => subcat.codigoCategoria === categoryId)
      .map(subcat => subcat.codigo);
    
    localSelectedSubcategories.value = localSelectedSubcategories.value.filter(
      id => !subcatsToRemove.includes(id)
    );
  } else {
    // Si la categoría no está seleccionada, la añadimos
    localSelectedCategories.value.push(categoryId);
    
    // Expandimos la categoría para mostrar subcategorías
    if (hasSubcategories(categoryId) && !expandedCategories.value.includes(categoryId)) {
      expandedCategories.value.push(categoryId);
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

const toggleSubcategory = (subcategoryId: number) => {
  if (isSelectedSubcategory(subcategoryId)) {
    // Si la subcategoría está seleccionada, la quitamos
    localSelectedSubcategories.value = localSelectedSubcategories.value.filter(id => id !== subcategoryId);
  } else {
    // Si la subcategoría no está seleccionada, la añadimos
    localSelectedSubcategories.value.push(subcategoryId);
    
    // Aseguramos que la categoría padre esté seleccionada
    const subcategoria = props.subcategorias.find(subcat => subcat.codigo === subcategoryId);
    if (subcategoria && !localSelectedCategories.value.includes(subcategoria.codigoCategoria)) {
      localSelectedCategories.value.push(subcategoria.codigoCategoria);
    }
  }
  
  // Emitir eventos
  emit('update:selectedCategories', localSelectedCategories.value);
  emit('update:selectedSubcategories', localSelectedSubcategories.value);
  emit('filter-changed');
  
  // Notificar a través del event bus
  const subcategoria = props.subcategorias.find(subcat => subcat.codigo === subcategoryId);
  emitter.emit('filter:change', { 
    categoryId: subcategoria?.codigoCategoria,
    subcategoryId: subcategoryId
  });
  
  // Actualizar URL con los parámetros de filtro
  updateUrlParams();
};

const applyPriceFilter = () => {
  emit('update:priceMin', localPriceMin.value);
  emit('update:priceMax', localPriceMax.value);
  emit('filter-changed');
  
  // Actualizar URL con los parámetros de filtro
  updateUrlParams();
};

const clearAllFilters = () => {
  localSelectedCategories.value = [];
  localSelectedSubcategories.value = [];
  localPriceMin.value = null;
  localPriceMax.value = null;
  
  emit('update:selectedCategories', []);
  emit('update:selectedSubcategories', []);
  emit('update:priceMin', null);
  emit('update:priceMax', null);
  emit('clear-filters');
  
  // Limpiar parámetros de filtro en la URL
  router.push({ query: {} });
};

const updateUrlParams = () => {
  const query = { ...router.currentRoute.value.query };
  
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
  
  router.push({ query });
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
</style>
