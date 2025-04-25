<template>
  <button
    class="w-full border border-gray-300 text-gray-700 py-1 px-3 rounded text-xs hover:bg-gray-50 transition-colors flex items-center justify-center mt-3"
    @click="$emit('clear')"
  >
    <i class="pi pi-filter-slash mr-2"></i>
    Limpiar filtros
  </button>
</template>
<script setup lang="ts">
defineEmits(['clear']);
</script>
