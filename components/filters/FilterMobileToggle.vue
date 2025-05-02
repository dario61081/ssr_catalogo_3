<template>
    <div>
        <!-- Botón para mostrar filtros en móvil -->
        <button
            class="lg:hidden fixed bottom-4 left-4 z-50 bg-gray-700 text-white rounded-full p-3 shadow-lg flex items-center"
            @click="$emit('toggle-mobile')">
            <i class="pi pi-filter mr-2"></i>
            Filtros
        </button>

        <!-- Overlay para móvil -->
        <div v-if="showMobileFilters" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            @click="$emit('toggle-mobile')">
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    showMobileFilters: {
        type: Boolean,
        default: false
    }
});

defineEmits(['toggle-mobile']);
</script>