<template>
    <div class="w-full overflow-hidden h-[400px]">
        <div v-if="loading" class="flex justify-center items-center py-10 overflow-hidden">
            <i class="pi pi-spin pi-spinner text-2xl text-gray-400"></i>
            <span class="ml-2 text-gray-500">Cargando productos...</span>
        </div>
        <div v-else-if="error" class="flex justify-center items-center py-10 text-red-500">
            <i class="pi pi-exclamation-triangle mr-2"></i>{{ error }}
        </div>
        <div v-else>
            <div class="relative overflow-hidden">
                <!-- Botón Izquierda -->
                <button @click="scrollLeft" class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/70 hover:bg-gray-700/90 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition">
                    <i class="pi pi-chevron-left text-xl"></i>
                </button>
                <!-- Carrusel horizontal -->
                <div ref="scrollContainer" class="flex flex-row gap-3 px-2 w-full overflow-x-auto hide-scrollbar">
                    <ProductCardSmall v-for="prod in productos" :key="prod.codigo" :product="prod" v-lazy-src class="min-w-[217px] max-w-[217px] w-[217px]" />
                </div>
                <!-- Botón Derecha -->
                <button @click="scrollRight" class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/70 hover:bg-gray-700/90 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition">
                    <i class="pi pi-chevron-right text-xl"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductCardSmall from '../ProductCardSmall.vue';
import { ProductoResponse } from '~/types';

const loading = ref(false);
const error = ref<string | null>(null);
const productos = ref<Producto[]>([]);

const scrollContainer = ref<HTMLElement | null>(null);

function scrollLeft() {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: -220, behavior: 'smooth' });
    }
}
function scrollRight() {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: 220, behavior: 'smooth' });
    }
}

onMounted(async () => {
    loading.value = true;
    try {
        const response = await $fetch<ProductoResponse[]>('https://panel.colchonesparana.com.py/api/v2/articulos/top/20/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC');
        productos.value = response.map((item: ProductoResponse) => mapToProducto(item));
    } catch (err) {
        error.value = 'No se pudieron cargar los productos.';
    } finally {
        loading.value = false;
    }
});

import { Producto } from '~/types';
import { mapToProducto } from '~/utils/transforms';
</script>

<style scoped>
.fade-enter-active {
    transition: opacity 0.5s;
    z-index: 2;
}

.fade-leave-active {
    transition: opacity 0.5s;
    z-index: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

/* Ocultar scrollbar para todos los navegadores */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
}
</style>
