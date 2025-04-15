<template>
    <section
        class="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 min-h-[300px] md:min-h-[400px] flex items-center justify-center shadow-lg">
        <!-- Slide actual -->
        <Transition name="fade" mode="out-in">
            <div v-if="slides.length" :key="activeIndex" class="w-full h-full">
                <!-- Imagen del producto -->
                <img :src="slides[activeIndex].image" :alt="slides[activeIndex].title"
                    class="absolute right-8 bottom-0 w-40 md:w-64 drop-shadow-xl select-none pointer-events-none"
                    style="z-index:2;" loading="lazy" />
                <!-- Fondo decorativo opcional -->
                <div
                    class="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-900/70 to-transparent pointer-events-none">
                </div>
                <!-- Contenido principal -->
                <div
                    class="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 py-10 gap-8">
                    <div>
                        <h1 class="text-3xl md:text-5xl font-bold text-white mb-2">
                            {{ slides[activeIndex].title }}<br>
                            <span class="text-amber-400">{{ slides[activeIndex].subtitle }}</span>
                        </h1>
                        <div class="w-20 h-1 bg-amber-400 mb-4"></div>
                    </div>
                    <div class="flex flex-col items-center md:items-end">
                        <span class="text-white text-2xl md:text-4xl font-bold mb-2"
                            v-html="slides[activeIndex].offer"></span>
                        <a :href="slides[activeIndex].buttonLink || '#'" target="_blank">
                            <button
                                class="bg-amber-300 hover:bg-amber-400 text-gray-900 font-semibold rounded-full px-6 py-2 mt-2 shadow transition">
                                {{ slides[activeIndex].buttonText }}
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
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            <span v-for="(slide, i) in slides" :key="i" class="w-2 h-2 rounded-full"
                :class="i === activeIndex ? 'bg-amber-300 opacity-80' : 'bg-white opacity-40'" @click="goTo(i)"
                style="cursor:pointer"></span>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { onMounted, onUnmounted } from 'vue';

interface Slide {
    image: string;
    title: string;
    subtitle?: string;
    offer?: string;
    buttonText?: string;
    buttonLink?: string;
}



const props = defineProps<{ slides: Slide[] }>();
const activeIndex = ref(0);
let interval: any = null;

function next() {
    activeIndex.value = (activeIndex.value + 1) % props.slides.length;
}
function prev() {
    activeIndex.value = (activeIndex.value - 1 + props.slides.length) % props.slides.length;
}
function goTo(i: number) {
    activeIndex.value = i;
}

// Autoplay opcional
onMounted(() => {
    interval = setInterval(() => {
        next();
    }, 6000);
});
onUnmounted(() => {
    clearInterval(interval);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
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
</style>
