<template>
    <div class="text-center py-16 bg-gray-50 rounded-lg">
        <div v-if="error">
            <div class="text-red-500 mb-4">
                <i class="pi pi-exclamation-triangle text-4xl"></i>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Error al cargar el catálogo</h2>
            <p class="text-gray-600">{{ error }}</p>
            <button class="mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
                @click="$emit('retry')">
                Reintentar
            </button>
        </div>
        <div v-else>
            <div class="text-gray-400 mb-4">
                <i class="pi pi-search text-4xl"></i>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">No se encontraron productos</h2>
            <p class="text-gray-600 mb-4">Intenta con otros filtros o categorías</p>
            <button class="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
                @click="$emit('clear-filters')">
                Limpiar filtros
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    error: {
        type: String,
        default: null
    }
});

defineEmits(['retry', 'clear-filters']);
</script>