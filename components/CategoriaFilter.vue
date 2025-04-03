<template>
	<div class="mb-6">
		<h4 class="font-medium mb-2">Categorías</h4>
		<div v-if="loading" class="text-sm text-gray-500 py-2">
			Cargando categorías...
		</div>
		<div v-else class="space-y-2">
			<!-- Lista de categorías con radio buttons -->
			<label class="flex items-center">
				<input
					v-model="selectedCategory"
					:value="null"
					class="text-primary-500 text-sm"
					type="radio"
					name="categoria"
				>
				<span class="ml-2 text-gray-700 text-sm font-medium">
					Todas las categorías
				</span>
			</label>

			<label
				v-for="categoria in categoriasList"
				:key="categoria.codigo"
				class="flex items-center"
			>
				<input
					v-model="selectedCategory"
					:value="categoria.codigo"
					class="text-primary-500 text-sm"
					type="radio"
					name="categoria"
				>
				<span class="ml-2 text-gray-700 text-sm">
					{{ categoria.nombre }}
				</span>
			</label>

			<div v-if="categoriasList.length === 0 && !loading && !hasError"
				class="text-sm text-gray-500 italic">
				No hay categorías disponibles
			</div>

			<div v-if="hasError" class="text-sm text-red-500 italic">
				{{ hasError }}
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
  return categorias.value;
});

// Observar cambios en la categoría seleccionada
watch(selectedCategory, (newValue) => {
  if (newValue === null) {
    // Si se selecciona "Todas las categorías", emitir un array vacío
    emit('on-selected', []);
  } else {
    // Si se selecciona una categoría, emitir un array con solo esa categoría
    // Asegurar que el valor sea numérico para que coincida con lo que espera filterByCategoria
    emit('on-selected', [parseInt(newValue, 10)]);
  }
});

// Función para limpiar selección
function clearSelection() {
  selectedCategory.value = null;
}

// Cargar categorías al montar el componente
onMounted(() => {
  refresh();
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
/* Add any custom styles here */
</style>
