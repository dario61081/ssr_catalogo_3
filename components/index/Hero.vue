<template>
    <section
        class="relative rounded-xl overflow-hidden min-h-[488px] md:min-h-[608px] w-full h-full flex items-center justify-center shadow-lg p-0 m-0 overflow-hidden bg-gray-900"
        @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
        <!-- Slide actual -->
        <Transition name="slide">
            <div v-if="banners.length" :key="activeIndex" class="w-full h-full min-h-[488px] md:min-h-[608px] relative">
                <!-- Imagen de fondo/banner -->
                <img :src="banners[activeIndex].imagen" :alt="banners[activeIndex].titulo"
                    class="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                    style="z-index:0; left:0; top:0; right:0; bottom:0; margin:0; padding:0;" loading="lazy" />
                <!-- Marca de agua logo -->
                <img src="/img/logo.svg" alt="Marca de agua logo"
                    class="absolute left-8 bottom-8 opacity-50 pointer-events-none select-none"
                    style="z-index:1; width:180px; max-width:30vw; min-width:80px; filter: brightness(0) invert(1) drop-shadow(0 2px 8px #fff8);" />
                <!-- Overlay de color de fondo del banner -->
                <div v-if="showLabels" class="absolute inset-0 pointer-events-none"
                    :style="`background: ${banners[activeIndex].fondo_color || 'linear-gradient(to top right, #111827cc, #374151cc)'}; opacity:0.85; z-index:2;`">
                </div>
                <!-- Contenido principal -->
                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 py-10 gap-8"
                    :class="banners[activeIndex].posicion_texto === 'left' ? 'justify-start' : banners[activeIndex].posicion_texto === 'right' ? 'justify-end' : 'justify-center'">
                    <div v-if="showLabels">
                        <h1 class="text-3xl md:text-5xl font-bold mb-2"
                            :style="`color: ${banners[activeIndex].texto_color || '#fff'};`">
                            {{ banners[activeIndex].titulo }}<br>
                            <span :style="`color: ${banners[activeIndex].cta_color || '#f59e42'};`">{{
                                banners[activeIndex].subtitulo }}</span>
                        </h1>
                        <div class="w-20 h-1 mb-4"
                            :style="`background: ${banners[activeIndex].cta_color || '#f59e42'};`"></div>
                    </div>
                    <div class="flex flex-col items-center md:items-end">
                        <a v-if="showVerMas" :href="banners[activeIndex].cta_url || '#'" target="_blank">
                            <button class="font-semibold rounded-full px-6 py-2 mt-2 shadow transition"
                                :style="`background: ${banners[activeIndex].cta_color || '#f59e42'}; color: ${banners[activeIndex].texto_color || '#222'};`">
                                {{ banners[activeIndex].cta_texto }}
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </Transition>
        <!-- Flechas navegación -->
        <button @click="prev"
            class="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-gray-800/60 hover:bg-gray-700/80 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition">
            <i class="pi pi-chevron-left text-xl"></i>
        </button>
        <button @click="next"
            class="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-gray-800/60 hover:bg-gray-700/80 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition">
            <i class="pi pi-chevron-right text-xl"></i>
        </button>
        <!-- Paginación de slider -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20"
            :class="{ 'paginador-pausado': isPaused }">
            <span v-for="(banner, i) in banners" :key="i" class="w-2 h-2 rounded-full transition-all duration-300"
                :class="[
                    i === activeIndex
                        ? (isPaused ? 'bg-red-500 opacity-90' : 'bg-amber-300 opacity-80')
                        : (isPaused ? 'bg-red-200 opacity-50' : 'bg-white opacity-40')
                ]" @click="goTo(i)" style="cursor:pointer"></span>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { onMounted, onUnmounted } from 'vue';

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
