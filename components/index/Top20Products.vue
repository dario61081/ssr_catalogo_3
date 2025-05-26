<template>
	<div class="w-full overflow-hidden h-[400px]"
		@mouseenter="pauseAutoScroll"
		@mouseleave="resumeAutoScroll">
		<h2 class="text-2xl font-bold mb-4 text-gray-800 px-0 pt-2">Productos Destacados</h2>
		<div v-if="loading"
			class="flex justify-center items-center py-10 overflow-hidden">
			<i class="pi pi-spin pi-spinner text-2xl text-gray-400"></i>
			<span class="ml-2 text-gray-500">Cargando productos...</span>
		</div>
		<div v-else-if="error"
			class="flex justify-center items-center py-10 text-red-500">
			<i class="pi pi-exclamation-triangle mr-2"></i>
			{{ error }}
		</div>
		<div v-else>
			<div class="relative overflow-hidden">
				<!-- Botón Izquierda -->
				<button
					id="btn-left"
					:class="[
					'absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition',
					isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800/70 hover:bg-gray-700/90'
				]"
					@click="scrollLeft">
					<i class="pi pi-chevron-left text-xl"></i>
				</button>
				<!-- Carrusel horizontal -->
				<div ref="scrollContainer"
					class="flex flex-row gap-3 px-2 w-full overflow-x-auto hide-scrollbar">
					<ProductCardSmall v-for="prod in productos"
						:key="prod.codigo"
						v-lazy-src
						:product="prod"
						class="min-w-[217px] max-w-[217px] w-[217px]"/>
				</div>
				<!-- Botón Derecha -->
				<button
					id="btn-right"
					:class="[
					'absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition',
					isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800/70 hover:bg-gray-700/90'
				]"
					@click="scrollRight">
					<i class="pi pi-chevron-right text-xl"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts"
	setup>
import {onMounted, onUnmounted, ref} from 'vue';
import ProductCardSmall from '../ProductCardSmall.vue';
import {Producto, ProductoResponse} from '~/types';
import {mapToProducto} from '~/utils/transforms';

const loading = ref(false);
const error = ref<string | null>(null);
const productos = ref<Producto[]>([]);

const scrollContainer = ref<HTMLElement | null>(null);
const isPaused = ref(false);
let autoScrollInterval: any = null;
const SCROLL_STEP = 220;
const SCROLL_INTERVAL = 5000; // 5 segundos entre scroll

function scrollLeft() {
	if (scrollContainer.value) {
		scrollContainer.value.scrollBy({left: -SCROLL_STEP, behavior: 'smooth'});
	}
}

function scrollRight() {
	if (scrollContainer.value) {
		scrollContainer.value.scrollBy({left: SCROLL_STEP, behavior: 'smooth'});
	}
}

function startAutoScroll() {
	clearInterval(autoScrollInterval);
	autoScrollInterval = setInterval(() => {
		if (!isPaused.value && scrollContainer.value) {
			// Si estamos cerca del final, volvemos al principio
			const isNearEnd = scrollContainer.value.scrollLeft + scrollContainer.value.clientWidth >=
				scrollContainer.value.scrollWidth - SCROLL_STEP;

			if (isNearEnd) {
				scrollContainer.value.scrollTo({left: 0, behavior: 'smooth'});
			} else {
				scrollRight();
			}
		}
	}, SCROLL_INTERVAL);
}

function pauseAutoScroll() {
	isPaused.value = true;
}

function resumeAutoScroll() {
	isPaused.value = false;
}

onMounted(async () => {
	loading.value = true;
	try {
		const response = await $fetch<ProductoResponse[]>('https://panel.colchonesparana.com.py/api/v2/articulos/top/20/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC');
		productos.value = response.map((item: ProductoResponse) => mapToProducto(item));
		// Iniciamos el autoScroll después de cargar los productos
		setTimeout(startAutoScroll, 1000);
	} catch (err) {
		error.value = 'No se pudieron cargar los productos.';
	} finally {
		loading.value = false;
	}
});

onUnmounted(() => {
	clearInterval(autoScrollInterval);
});
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
	scrollbar-width: none;
	/* Firefox */
	-ms-overflow-style: none;
	/* IE 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
	display: none;
	/* Chrome/Safari/Webkit */
}
</style>
