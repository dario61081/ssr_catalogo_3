<template>
  <div class="sort-options">
    <div class="flex items-center">
      <label for="sort-select" class="text-sm font-medium text-gray-700 mr-2">
        <i class="pi pi-sort text-gray-500 mr-1"></i>
        Ordenar por:
      </label>
      <select id="sort-select" v-model="selectedSort"
        class="bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        @change="updateSort">

        <option value="nombre_asc">Nombre (A-Z)</option>
        <option value="nombre_desc">Nombre (Z-A)</option>
        <option value="precio_asc">Precio (menor a mayor)</option>
        <option value="precio_desc">Precio (mayor a menor)</option>
        <option value="recientes">Más recientes</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { SortCriteria } from '~/types';
import emitter from '~/utils/eventBus';

const props = defineProps({
  sortBy: {
    type: String as () => SortCriteria,
    default: 'recientes'
  }
});

const emit = defineEmits(['update:sortBy', 'sort-changed']);

const router = useRouter();
const selectedSort = ref<SortCriteria>(props.sortBy);

// Sincronizar props con estado local
watch(() => props.sortBy, (newVal) => {
  selectedSort.value = newVal;
});

const updateSort = () => {
  emit('update:sortBy', selectedSort.value);
  emit('sort-changed');

  // Notificar a través del event bus
  emitter.emit('sort:change', { sortBy: selectedSort.value });

  // Actualizar URL con el parámetro de ordenamiento
  const query = { ...router.currentRoute.value.query, sort: selectedSort.value };
  router.push({ query });
};
</script>
