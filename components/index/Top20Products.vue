<template>
    <div class="w-full">
        <div v-if="loading" class="flex justify-center items-center py-10 overflow-hidden">
            <i class="pi pi-spin pi-spinner text-2xl text-gray-400"></i>
            <span class="ml-2 text-gray-500">Cargando productos...</span>
        </div>
        <div v-else-if="error" class="flex justify-center items-center py-10 text-red-500">
            <i class="pi pi-exclamation-triangle mr-2"></i>{{ error }}
        </div>
        <div v-else>
            <div class="relative">
                <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 px-2 sm:px-0 justify-center text-center">
                    <ProductCardSmall v-for="prod in currentSlide" :key="prod.codigo" :product="prod" v-lazy-src />
                </div>
                <!-- Navegación -->
                <button v-if="slides.length > 1" @click="prev"
                    class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/60 hover:bg-gray-700/80 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition">
                    <i class="pi pi-chevron-left text-xl"></i>
                </button>
                <button v-if="slides.length > 1" @click="next"
                    class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/60 hover:bg-gray-700/80 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition">
                    <i class="pi pi-chevron-right text-xl"></i>
                </button>
                <!-- Paginación -->
                <div v-if="slides.length > 1" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    <span v-for="(s, i) in slides" :key="i" class="w-2 h-2 rounded-full"
                        :class="i === activeIndex ? 'bg-amber-300 opacity-80' : 'bg-white opacity-40'" @click="goTo(i)"
                        style="cursor:pointer"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProductoStore } from '~/stores/productoStore';
import ProductCardSmall from '../ProductCardSmall.vue';
import { useRouter } from 'vue-router';

const productoStore = useProductoStore();
const activeIndex = ref(0);
const loading = ref(false);
const error = ref<string | null>(null);
let autoSlideTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(async () => {
    if (!productoStore.productos.length) {
        try {
            loading.value = true;
            await productoStore.fetchProductos();
        } catch (e) {
            error.value = 'No se pudieron cargar los productos.';
        } finally {
            loading.value = false;
        }
    }
    startAutoSlide();
});

const top20 = computed(() => productoStore.productos.slice(0, 20));

const CARDS_PER_SLIDE = 4; // Cambia a 5 si prefieres

const slides = computed(() => {
    const prods = top20.value;
    const result = [];
    for (let i = 0; i < prods.length; i += CARDS_PER_SLIDE) {
        result.push(prods.slice(i, i + CARDS_PER_SLIDE));
    }
    return result;
});
const currentSlide = computed(() => slides.value[activeIndex.value] || []);


function next() {
    activeIndex.value = (activeIndex.value + 1) % slides.value.length;
    resetAutoSlide();
}
function prev() {
    activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length;
    resetAutoSlide();
}
function goTo(i: number) {
    activeIndex.value = i;
    resetAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setTimeout(() => {
        // Al avanzar automáticamente, no reiniciamos el timer para evitar bucles infinitos de reset
        activeIndex.value = (activeIndex.value + 1) % slides.value.length;
        startAutoSlide();
    }, 3000);
}
function resetAutoSlide() {
    startAutoSlide();
}
function stopAutoSlide() {
    if (autoSlideTimer) {
        clearTimeout(autoSlideTimer);
        autoSlideTimer = null;
    }
}

import { onUnmounted } from 'vue';
onUnmounted(() => {
    stopAutoSlide();
});

</script>
