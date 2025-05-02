<template>
    <div class="catalog-header mb-6">
        <!-- Breadcrumb -->
        <BreadCrumb :items="[{ text: 'Catálogo' }]" class="mb-6" />
        <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ title }}</h1>
    </div>
</template>

<script lang="ts" setup>
import BreadCrumb from '~/components/BreadCrumb.vue';

defineProps({
    title: {
        type: String,
        default: 'Catálogo de Productos'
    }
});
</script>