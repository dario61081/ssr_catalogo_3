<template>
	<section
		class="relative rounded-xl overflow-hidden min-h-[488px] md:min-h-[608px] w-full h-full flex items-center justify-center shadow-lg p-0 m-0 overflow-hidden bg-gray-900"
		@mouseenter="pauseAutoplay"
		@mouseleave="resumeAutoplay">
		<!-- Slide actual -->
		<Transition name="slide">
			<div v-if="banners.length"
				:key="activeIndex"
				class="w-full h-full min-h-[488px] md:min-h-[608px] relative">
				<!-- Imagen de fondo/banner -->
				<img :alt="banners[activeIndex].titulo"
					:src="banners[activeIndex].imagen"
					class="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
					loading="lazy"
					style="z-index:0; left:0; top:0; right:0; bottom:0; margin:0; padding:0;"/>
				<!-- Marca de agua logo -->
				<NuxtImg alt="Marca de agua logo"
					class="absolute left-8 bottom-8 opacity-50 pointer-events-none select-none"
					height="44"
					src="/img/logo.svg"
					style="z-index:1; width:180px; max-width:30vw; min-width:80px; filter: brightness(0) invert(1) drop-shadow(0 2px 8px #fff8);"
					width="180"/>
				<!-- Overlay de color de fondo del banner -->
				<div v-if="showLabels"
					:style="`background: ${banners[activeIndex].fondo_color || 'linear-gradient(to top right, #111827cc, #374151cc)'}; opacity:0.85; z-index:2;`"
					class="absolute inset-0 pointer-events-none">
				</div>
				<!-- Contenido principal -->
				<div :class="banners[activeIndex].posicion_texto === 'left' ? 'justify-start' : banners[activeIndex].posicion_texto === 'right' ? 'justify-end' : 'justify-center'"
					class="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 py-10 gap-8">
					<div v-if="showLabels">
						<h1 :style="`color: ${banners[activeIndex].texto_color || '#fff'};`"
							class="text-3xl md:text-5xl font-bold mb-2">
							{{ banners[activeIndex].titulo }}
							<br>
							<span :style="`color: ${banners[activeIndex].cta_color || '#f59e42'};`">{{
									banners[activeIndex].subtitulo
								}}</span>
						</h1>
						<div :style="`background: ${banners[activeIndex].cta_color || '#f59e42'};`"
							class="w-20 h-1 mb-4"></div>
					</div>
					<div class="flex flex-col items-center md:items-end">
						<a v-if="showVerMas"
							:aria-label="'Ver más sobre ' + banners[activeIndex].titulo"
							:href="banners[activeIndex].cta_url || '#'"
							target="_blank">
							<button :style="`background: ${banners[activeIndex].cta_color || '#f59e42'}; color: ${banners[activeIndex].texto_color || '#222'};`"
								class="font-semibold rounded-full px-6 py-2 mt-2 shadow transition">
								{{ banners[activeIndex].cta_texto }}
							</button>
						</a>
					</div>
				</div>
			</div>
		</Transition>
		<!-- Flechas navegación -->
		<button id="hero-prior-slide"
			aria-label="Anterior slide"
			class="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-gray-800/60 hover:bg-gray-700/80 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition"
			@click="prev">
			<i aria-hidden="true"
				class="pi pi-chevron-left text-xl"></i>
		</button>
		<button id="hero-next-slide"
			aria-label="Siguiente slide"
			class="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-gray-800/60 hover:bg-gray-700/80 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition"
			@click="next">
			<i aria-hidden="true"
				class="pi pi-chevron-right text-xl"></i>
		</button>
		<!-- Paginación de slider -->
		<div :class="{ 'paginador-pausado': isPaused }"
			class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            <span v-for="(banner, i) in banners"
				:key="i"
				:class="[
                    i === activeIndex
                        ? (isPaused ? 'bg-red-500 opacity-90' : 'bg-amber-300 opacity-80')
                        : (isPaused ? 'bg-red-200 opacity-50' : 'bg-white opacity-40')
                ]"
				class="w-2 h-2 rounded-full transition-all duration-300"
				style="cursor:pointer"
				@click="goTo(i)"></span>
		</div>
	</section>
</template>

<script lang="ts"
	setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';

const props = defineProps<{ showLabels?: boolean, showVerMas?: boolean }>();
const showLabels = computed(() => props.showLabels !== false);
const showVerMas = computed(() => props.showVerMas !== false);

const activeIndex = ref(0);
let interval: any = null;
const banners = ref<Banner[]>([]);
const isPaused = ref(false);

function next() {
	activeIndex.value = (activeIndex.value + 1) % banners.value.length;
}

function prev() {
	activeIndex.value = (activeIndex.value - 1 + banners.value.length) % banners.value.length;
}

function goTo(i: number) {
	activeIndex.value = i;
}

function startAutoplay() {
	clearInterval(interval);
	interval = setInterval(() => {
		if (!isPaused.value) {
			next();
		}
	}, 6000);
}

function pauseAutoplay() {
	isPaused.value = true;
}

function resumeAutoplay() {
	isPaused.value = false;
}

// Autoplay y carga de banners
onMounted(async () => {
	try {
		const response = await $fetch('https://panel.colchonesparana.com.py/api/v2/banners/QrZ45aBhidW1v1uaARbOGYtTpnP74Qa7MnS74wbhm0esFSXK5adk1kP6HeGakIa2PU5vdTDd9ojNlTXQEg37zyFZKwHkRxWBC8eT3uJgfxTOjOSBpYv6eZaa9Biist5V');
		banners.value = response.map((item: BannerResponse) => mapToBanner(item));
	} catch (e) {
		banners.value = [];
	}
	startAutoplay();
});
onUnmounted(() => {
	clearInterval(interval);
});


interface BannerResponse {
	ID: number,
	TITULO: string,
	SUBTITULO: string,
	IMAGEN: string,
	CTA_TEXTO: string,
	CTA_URL: string,
	FONDO_COLOR: string,
	TEXTO_COLOR: string,
	CTA_COLOR: string,
	POSICION_TEXTO: string
}

interface Banner {
	id: number,
	titulo: string,
	subtitulo: string,
	imagen: string,
	cta_texto: string,
	cta_url: string,
	fondo_color: string,
	texto_color: string,
	cta_color: string,
	posicion_texto: string
}

function mapToBanner(item: BannerResponse): Banner {
	return {
		id: item.ID,
		titulo: item.TITULO,
		subtitulo: item.SUBTITULO,
		imagen: item.IMAGEN,
		cta_texto: item.CTA_TEXTO,
		cta_url: item.CTA_URL,
		fondo_color: item.FONDO_COLOR,
		texto_color: item.TEXTO_COLOR,
		cta_color: item.CTA_COLOR,
		posicion_texto: item.POSICION_TEXTO
	}
}


</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
	transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
	position: absolute;
	width: 100%;
}

.slide-enter-from {
	transform: translateX(100%);
	opacity: 0;
}

.slide-enter-to {
	transform: translateX(0);
	opacity: 1;
}

.slide-leave-from {
	transform: translateX(0);
	opacity: 1;
}

.slide-leave-to {
	transform: translateX(-100%);
	opacity: 0;
}

.material-icons {
	font-family: 'Material Icons';
	font-style: normal;
	font-weight: normal;
	font-size: 24px;
	line-height: 1;
	letter-spacing: normal;
	text-transform: none;
	display: inline-block;
	direction: ltr;
	-webkit-font-feature-settings: 'liga';
	-webkit-font-smoothing: antialiased;
}

.paginador-pausado {
	padding: 4px 8px;
	background-color: rgba(239, 68, 68, 0.2);
	border-radius: 12px;
	transition: all 0.3s ease;
}
</style>
