<template>
    <div>
        <!-- Opciones de ordenamiento y vista -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div class="flex items-center">
                <p class="text-gray-700 mr-2">
                    <span class="font-medium">{{ totalProducts }}</span>
                    productos encontrados
                </p>
            </div>

            <SortOptions v-model:sortBy="localSortBy" @sort-changed="$emit('sort-changed', localSortBy)" />
        </div>

        <!-- Loading de productos -->
        <div v-if="loading" class="mb-6">
            <ProductGridLoading />
        </div>

        <!-- Productos -->
        <div v-if="!loading && products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="product in products" :key="product.codigo" class="h-full">
                <ProductCard :product="product" :showActions="true" />
            </div>
        </div>

        <CatalogEmpty v-else-if="!loading && products.length === 0" @clear-filters="$emit('clear-filters')" />

        <!-- Paginación -->
        <CatalogPagination :currentPage="currentPage" :totalPages="totalPages"
            @page-change="$emit('page-change', $event)" />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { Product } from '~/types';
import SortOptions from '~/components/SortOptions.vue';
import ProductCard from '~/components/ProductCard.vue';
import ProductGridLoading from '~/components/ProductGridLoading.vue';
import CatalogEmpty from './CatalogEmpty.vue';
import CatalogPagination from './CatalogPagination.vue';

const props = defineProps({
    products: {
        type: Array as () => Product[],
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    totalProducts: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    sortBy: {
        type: String,
        default: 'recientes'
    }
});

const localSortBy = ref(props.sortBy);

// Mantener sincronizado con la prop externa
watch(() => props.sortBy, (newValue) => {
    localSortBy.value = newValue;
});

defineEmits(['sort-changed', 'page-change', 'clear-filters']);
</script>