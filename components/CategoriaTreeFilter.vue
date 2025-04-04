<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useTree } from '~/composables/useTree';
import { useNuxtApp } from '#app';

// Importar las interfaces necesarias
interface Articulo {
  COD_ALFANUM: string;
  ART_COD: number;
  ART_DESCRIPCION: string;
  LINEA: string;
  PRECIO: string;
  STOCK: number;
  ART_DIR_IMAG1: string | null;
  ART_DIR_IMAG2: string | null;
  ART_DIR_IMAG3: string | null;
  ART_DIR_IMAG4: string | null;
  ART_DIR_IMAG5: string | null;
  ART_DIR_IMAG6: string | null;
  ART_IND_IMP: string;
  DIVISION: number;
  DIV_DESC: string;
  DIV_CLAS: number;
  DIV_CLAS_DESC: string;
  MOSTRAR_ECOM: string;
  MOSTRAR_CAT: string;
  TIENE_DOCUMENTOS: string;
}

interface Categoria {
  DIV_CODIGO: number;
  DIV_DESC: string;
  DIV_ESTADO: string;
  DIV_ORDEN: number;
  DIV_DIR_IMAGEN: string | null;
  articulos: Articulo[];
  conteo?: number;
}

const props = defineProps({
  title: {
    type: String,
    default: 'FILTRAR POR'
  }
});

const emit = defineEmits(['filter-changed']);

// Use the tree composable
const { categorias, loading, selectedCategories, toggleCategory, selectedProducts, toggleProduct, isProductSelected, toggleClassProducts, areAllClassProductsSelected, areSomeClassProductsSelected } = useTree();

// Track expanded categories and classes
const expandedCategories = ref<number[]>([]);
const expandedClasses = ref<{[key: number]: number[]}>({});

// Toggle category expansion
const toggleExpand = (categoryId: number) => {
  const index = expandedCategories.value.indexOf(categoryId);
  if (index === -1) {
    expandedCategories.value.push(categoryId);
  } else {
    expandedCategories.value.splice(index, 1);
    // When collapsing a category, also collapse all its classes
    if (expandedClasses.value[categoryId]) {
      delete expandedClasses.value[categoryId];
    }
  }
};

// Check if a category is expanded
const isExpanded = (categoryId: number) => {
  return expandedCategories.value.includes(categoryId);
};

// Toggle class expansion within a category
const toggleClassExpand = (categoryId: number, classId: number) => {
  if (!expandedClasses.value[categoryId]) {
    expandedClasses.value[categoryId] = [];
  }
  
  const classIndex = expandedClasses.value[categoryId].indexOf(classId);
  if (classIndex === -1) {
    expandedClasses.value[categoryId].push(classId);
  } else {
    expandedClasses.value[categoryId].splice(classIndex, 1);
  }
};

// Check if a class is expanded
const isClassExpanded = (categoryId: number, classId: number) => {
  return expandedClasses.value[categoryId] && expandedClasses.value[categoryId].includes(classId);
};

// Define interfaces for our grouped articles structure
interface ClassGroup {
  id: number;
  description: string;
  articles: Articulo[];
}

// Group articles by DIV_CLAS for a given category
const getGroupedArticlesByClass = (categoria: Categoria): ClassGroup[] => {
  if (!categoria.articulos || categoria.articulos.length === 0) {
    return [];
  }
  
  const groupedArticles: Record<number, ClassGroup> = {};
  
  categoria.articulos.forEach((articulo: Articulo) => {
    const classId = articulo.DIV_CLAS;
    if (!groupedArticles[classId]) {
      groupedArticles[classId] = {
        id: classId,
        description: articulo.DIV_CLAS_DESC || 'Sin clasificación',
        articles: []
      };
    }
    groupedArticles[classId].articles.push(articulo);
  });
  
  return Object.values(groupedArticles);
};

// Check if a category is selected
const isSelected = (categoryId: number) => {
  return selectedCategories.value.length === 1 && selectedCategories.value[0] === categoryId;
};

// Apply filters when selection changes
const applyFilters = () => {
  emit('filter-changed', {
    categories: selectedCategories.value,
    products: selectedProducts.value
  });
};

// Watch for changes in selected categories or products
watch([selectedCategories, selectedProducts], () => {
  applyFilters();
}, { deep: true });

// Listen for clear filters event
onMounted(() => {
  const { $bus } = useNuxtApp();
  $bus.on('clear-filters', () => {
    selectedCategories.value = [];
    selectedProducts.value = [];
  });
});
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
    
    <div class="mb-2">
      <h4 class="font-medium mb-2">CATEGORÍA</h4>
      
      <div class=" pr-2">
        <div v-if="loading" class="py-2 text-gray-500">
          Cargando categorías...
        </div>
        
        <div v-else-if="categorias.length === 0" class="py-2 text-gray-500">
          No hay categorías disponibles
        </div>
        
        <div v-else class="space-y-2">
          <!-- Category items -->
          <div v-for="categoria in categorias" :key="categoria.DIV_CODIGO" class="category-item">
            <!-- Main category -->
            <div class="flex items-center">
              <button 
                @click="toggleExpand(categoria.DIV_CODIGO)" 
                class="w-5 h-5 flex items-center justify-center mr-1 text-gray-500"
              >
                <svg 
                  class="w-4 h-4 transition-transform duration-200" 
                  :class="{ 'transform rotate-90': isExpanded(categoria.DIV_CODIGO) }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              
              <div class="flex items-center flex-1">
                <input 
                  type="radio" 
                  :id="`cat-${categoria.DIV_CODIGO}`" 
                  :checked="isSelected(categoria.DIV_CODIGO)" 
                  @change="toggleCategory(categoria.DIV_CODIGO)" 
                  :name="'categoria-filter'" 
                  class="mr-2 accent-primary"
                />
                <label :for="`cat-${categoria.DIV_CODIGO}`" class="flex-1 cursor-pointer">
                  {{ categoria.DIV_DESC }} ({{ categoria.conteo }})
                </label>
              </div>
            </div>
            
            <!-- Classes and articles when category is expanded -->
            <div v-if="isExpanded(categoria.DIV_CODIGO)" class="ml-6 mt-2 space-y-2">
              <div v-if="categoria.articulos && categoria.articulos.length > 0">
                <!-- Group articles by class -->
                <div v-for="classGroup in getGroupedArticlesByClass(categoria)" :key="classGroup.id" class="mb-2">
                  <!-- Class header with checkbox for selecting all products -->
                  <div class="flex items-center py-1">
                    <button 
                      @click="toggleClassExpand(categoria.DIV_CODIGO, classGroup.id)" 
                      class="w-5 h-5 flex items-center justify-center mr-1 text-gray-500"
                    >
                      <svg 
                        class="w-3 h-3 transition-transform duration-200" 
                        :class="{ 'transform rotate-90': isClassExpanded(categoria.DIV_CODIGO, classGroup.id) }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </button>
                    <div class="flex items-center flex-1">
                      <!-- Checkbox for selecting all products in this class -->
                      <input 
                        type="checkbox" 
                        :id="`class-${classGroup.id}`" 
                        :checked="areAllClassProductsSelected(classGroup.id)" 
                        :indeterminate.prop="areSomeClassProductsSelected(classGroup.id)" 
                        @change="toggleClassProducts(classGroup.id, !areAllClassProductsSelected(classGroup.id))" 
                        class="mr-2"
                      />
                      <label :for="`class-${classGroup.id}`" class="text-sm font-medium cursor-pointer flex-1">
                        {{ classGroup.description }} ({{ classGroup.articles.length }})
                      </label>
                    </div>
                  </div>
                  
                  <!-- Articles in this class with checkboxes for multiple selection -->
                  <div v-if="isClassExpanded(categoria.DIV_CODIGO, classGroup.id)" class="ml-6 mt-1 space-y-1">
                    <div v-for="articulo in classGroup.articles" :key="articulo.ART_COD" class="flex items-center py-1 ml-3">
                      <input 
                        type="checkbox" 
                        :id="`prod-${articulo.ART_COD}`" 
                        :checked="isProductSelected(articulo.ART_COD)" 
                        @change="toggleProduct(articulo.ART_COD)" 
                        class="mr-2 h-3 w-3"
                      />
                      <label :for="`prod-${articulo.ART_COD}`" class="text-xs text-gray-600 truncate cursor-pointer flex-1">
                        {{ articulo.ART_DESCRIPCION }}
                        <span v-if="articulo.STOCK <= 0" class="text-red-500 ml-1">(Sin stock)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-sm text-gray-500">
                No hay productos en esta categoría
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-item {
  padding: 0.25rem 0;
}

/* Add smooth transition for expand/collapse */
.category-item > div:last-child {
  transition: all 0.2s ease;
}

/* Scrollbar styling */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f7fafc;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}
</style>