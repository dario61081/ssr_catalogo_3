<template>
    <div class="mb-5">
        <h4 class="font-medium text-gray-700 mb-1 text-sm">Buscar productos</h4>
        <div class="flex flex-col space-y-2">
            <input v-model="localSearchQuery" class="w-full p-2 border rounded text-sm"
                placeholder="Nombre del producto..." type="text" @keydown.enter.prevent="applySearchFilter"
                @keydown.esc.prevent="localSearchQuery = ''" />
            <button
                class="w-full bg-gray-700 hover:bg-gray-800 text-white h-[38px] px-3 rounded text-xs transition-colors flex items-center justify-center"
                @click="applySearchFilter">
                <i class="pi pi-search mr-2"></i>
                Buscar
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
    searchQuery: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:searchQuery', 'search-changed']);

const localSearchQuery = ref<string>(props.searchQuery);

// Mantener sincronizado el estado local con props
watch(() => props.searchQuery, (newVal) => {
    localSearchQuery.value = newVal;
});

// Aplicar filtro de búsqueda
const applySearchFilter = () => {
    emit('update:searchQuery', localSearchQuery.value);
    emit('search-changed');
};
</script>