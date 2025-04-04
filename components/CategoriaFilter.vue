<template>
	<div class="mb-4 bg-white p-3 ">
		<h4 class="text-base font-semibold mb-2 text-gray-800">Categorías</h4>
		<div v-if="loading" class="text-xs text-gray-500 py-1 flex items-center">
			<i class="fa fa-spinner fa-spin mr-1"></i>Cargando...
		</div>
		<div v-else class="space-y-1">
			<!-- Todas las categorías -->
			<label class="flex items-center hover:bg-gray-50 px-2 py-1 rounded cursor-pointer transition-colors text-sm">
				<input v-model="selectedCategory" :value="null" class="form-radio h-3 w-3" type="radio" name="categoria">
				<span class="ml-2 text-gray-700 font-medium">Todas</span>
			</label>

			<!-- Lista de categorías -->
			<div class="pr-1">
				<label v-for="categoria in categoriasList" :key="categoria.codigo"
					class="flex items-center hover:bg-gray-50 px-2 py-1 rounded cursor-pointer transition-colors text-sm">
					<input v-model="selectedCategory" :value="categoria.codigo" class="form-radio h-3 w-3" type="radio" name="categoria">
					<span class="ml-2 text-gray-700 truncate">{{ categoria.nombre }}</span>
				</label>
			</div>

			<!-- Estados de error y vacío -->
			<div v-if="categoriasList.length === 0 && !loading && !hasError" class="text-xs text-gray-500 italic px-2 py-1">
				<i class="fa fa-info-circle mr-1"></i>No hay categorías disponibles
			</div>

			<div v-if="hasError" class="text-xs text-red-500 italic px-2 py-1 bg-red-50 rounded">
				<i class="fa fa-exclamation-circle mr-1"></i>{{ hasError }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useNuxtApp } from '#app';
import { useCategorias } from '~/composables/useCategorias';

// Definir emits
const emit = defineEmits(['on-selected']);

// Obtener bus de eventos
const { $bus } = useNuxtApp();

// Usar el composable de categorías
const { categorias, loading, hasError, refresh } = useCategorias();

// Estado local - usando null para representar "todas las categorías"
const selectedCategory = ref(null);

// Computar lista de categorías ordenadas
const categoriasList = computed(() => {
  // Ordenar categorías por orden o por nombre si no tienen orden
  return [...categorias.value].sort((a, b) => {
    if (a.orden !== b.orden) {
      return a.orden - b.orden;
    }
    return a.nombre.localeCompare(b.nombre);
  });
});

// Observar cambios en la categoría seleccionada
watch(selectedCategory, (newValue) => {
  if (newValue === null) {
    // Si se selecciona "Todas las categorías", emitir un array vacío
    emit('on-selected', []);
  } else {
    // Si se selecciona una categoría, emitir un array con solo esa categoría
    // Asegurar que el valor sea numérico para que coincida con lo que espera filterByCategoria
    const categoryId = typeof newValue === 'string' ? parseInt(newValue, 10) : newValue;
    
    // Verificar que sea un número válido antes de emitir
    if (!isNaN(categoryId)) {
      emit('on-selected', [categoryId]);
    } else {
      console.error('Valor de categoría inválido:', newValue);
      emit('on-selected', []);
    }
  }
});

// Función para limpiar selección
function clearSelection() {
  selectedCategory.value = null;
}

// Cargar categorías al montar el componente
onMounted(() => {
  // Intentar cargar las categorías
  refresh().then(() => {
    console.log('Categorías cargadas:', categorias.value.length);
  }).catch(error => {
    console.error('Error al cargar categorías:', error);
  });
  
  // Escuchar evento de limpiar filtros
  $bus.on('clear-filters', clearSelection);
  
  // Por defecto, seleccionar "todas las categorías"
  selectedCategory.value = null;
});

// Limpiar listeners al desmontar
onUnmounted(() => {
  $bus.off('clear-filters', clearSelection);
});
</script>

<style scoped>
.form-radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    user-select: none;
    flex-shrink: 0;
    border-radius: 100%;
    border-width: 1px;
    border-color: #cbd5e0;
    background-color: #fff;
}

.form-radio:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
}

.form-radio:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Estilo para la barra de desplazamiento */
.scrollbar-thin::-webkit-scrollbar {
    width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>
