<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useTree } from '~/composables/useTree';
import { useNuxtApp } from '#app';

const props = defineProps({
  title: {
    type: String,
    default: 'FILTRAR POR'
  }
});

const emit = defineEmits(['filter-changed']);

// Use the tree composable
const { categorias, loading, selectedCategories, toggleCategory } = useTree();

// Track expanded categories
const expandedCategories = ref<number[]>([]);

// Toggle category expansion
const toggleExpand = (categoryId: number) => {
  const index = expandedCategories.value.indexOf(categoryId);
  if (index === -1) {
    expandedCategories.value.push(categoryId);
  } else {
    expandedCategories.value.splice(index, 1);
  }
};

// Check if a category is expanded
const isExpanded = (categoryId: number) => {
  return expandedCategories.value.includes(categoryId);
};

// Check if a category is selected
const isSelected = (categoryId: number) => {
  return selectedCategories.value.includes(categoryId);
};

// Apply filters when selection changes
const applyFilters = () => {
  emit('filter-changed', selectedCategories.value);
};

// Watch for changes in selected categories
watch(selectedCategories, () => {
  applyFilters();
}, { deep: true });

// Listen for clear filters event
onMounted(() => {
  const { $bus } = useNuxtApp();
  $bus.on('clear-filters', () => {
    selectedCategories.value = [];
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
                  type="checkbox" 
                  :id="`cat-${categoria.DIV_CODIGO}`" 
                  :checked="isSelected(categoria.DIV_CODIGO)" 
                  @change="toggleCategory(categoria.DIV_CODIGO)" 
                  class="mr-2"
                />
                <label :for="`cat-${categoria.DIV_CODIGO}`" class="flex-1 cursor-pointer">
                  {{ categoria.DIV_DESC }} ({{ categoria.conteo }})
                </label>
              </div>
            </div>
            
            <!-- Subcategories (if we had them) -->
            <div v-if="isExpanded(categoria.DIV_CODIGO)" class="ml-6 mt-2 space-y-1">
              <!-- For now, we don't have subcategories in the data structure, but we could add them here -->
              <!-- This is a placeholder for future subcategory implementation -->
              <div v-if="categoria.articulos && categoria.articulos.length > 0" class="text-sm text-gray-500">
                Esta categoría tiene {{ categoria.conteo }} productos
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