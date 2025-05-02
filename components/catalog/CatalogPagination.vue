<template>
    <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <div class="flex space-x-1">
            <button
                :class="currentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
                :disabled="currentPage === 1" class="px-3 py-1 rounded border"
                @click="$emit('page-change', currentPage - 1)">
                <i class="pi pi-chevron-left"></i>
            </button>

            <button v-for="page in paginationItems" :key="`page-${page.value}`" :class="[
                page.type === 'ellipsis' ? 'text-gray-400 border-gray-200 cursor-default' : '',
                page.type === 'page' && page.value === currentPage ? 'bg-gray-700 text-white border-gray-700' : '',
                page.type === 'page' && page.value !== currentPage ? 'text-gray-700 border-gray-300 hover:bg-gray-50' : ''
            ]" class="px-3 py-1 rounded border" @click="page.type === 'page' && $emit('page-change', page.value)">
                {{ page.type === 'ellipsis' ? '...' : page.value }}
            </button>

            <button
                :class="currentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'"
                :disabled="currentPage === totalPages" class="px-3 py-1 rounded border"
                @click="$emit('page-change', currentPage + 1)">
                <i class="pi pi-chevron-right"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
});

defineEmits(['page-change']);

// Elementos de paginación
const paginationItems = computed(() => {
    const items: Array<{ type: 'page' | 'ellipsis'; value: number }> = [];
    const maxVisiblePages = 5;

    if (props.totalPages <= maxVisiblePages) {
        for (let i = 1; i <= props.totalPages; i++) {
            items.push({ type: 'page', value: i });
        }
    } else {
        items.push({ type: 'page', value: 1 });

        let startPage = Math.max(2, props.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(props.totalPages - 1, startPage + maxVisiblePages - 3);

        if (startPage > 2) {
            items.push({ type: 'ellipsis', value: Math.floor((1 + startPage) / 2) });
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push({ type: 'page', value: i });
        }

        if (endPage < props.totalPages - 1) {
            items.push({ type: 'ellipsis', value: Math.floor((endPage + props.totalPages) / 2) });
        }

        items.push({ type: 'page', value: props.totalPages });
    }

    return items;
});
</script>