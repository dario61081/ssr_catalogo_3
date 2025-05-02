<template>
    <div class="mb-5">
        <h4 class="font-medium text-gray-700 mb-1 text-sm">Rango de precio</h4>
        <PriceSlider :initial-max="localPriceMax || maxPrice" :initial-min="localPriceMin || minPrice"
            :max-price="maxPrice" :min-price="minPrice" @update:min="handleMinPriceChange"
            @update:max="handleMaxPriceChange" />
        <button
            class="mt-3 w-full bg-gray-700 hover:bg-gray-800 text-white h-[38px] px-3 rounded text-xs transition-colors flex items-center justify-center"
            @click="applyPriceFilter">
            <i class="pi pi-check-circle mr-2"></i>
            Aplicar
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import PriceSlider from '~/components/PriceSlider.vue';

const props = defineProps({
    priceMin: {
        type: Number,
        default: null
    },
    priceMax: {
        type: Number,
        default: null
    },
    minPrice: {
        type: Number,
        default: 0
    },
    maxPrice: {
        type: Number,
        default: 1000000
    }
});

const emit = defineEmits([
    'update:priceMin',
    'update:priceMax',
    'price-changed'
]);

// Estado local
const localPriceMin = ref<number | null>(props.priceMin);
const localPriceMax = ref<number | null>(props.priceMax);

// Sincronizar props con estado local
watch(() => props.priceMin, (newVal) => {
    localPriceMin.value = newVal;
});

watch(() => props.priceMax, (newVal) => {
    localPriceMax.value = newVal;
});

// Manejadores para el slider de precio
const handleMinPriceChange = (value: number) => {
    localPriceMin.value = value;
};

const handleMaxPriceChange = (value: number) => {
    localPriceMax.value = value;
};

// Aplicar filtro de precio
const applyPriceFilter = () => {
    emit('update:priceMin', localPriceMin.value);
    emit('update:priceMax', localPriceMax.value);
    emit('price-changed');
};
</script>