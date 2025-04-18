<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import DoubleRangeSlider from './ui/DoubleRangeSlider.vue';

interface Props {
	priceRangeMin?: number;
	priceRangeMax?: number;
	selectedPriceMin?: number;
	selectedPriceMax?: number;
} 

const props = withDefaults(defineProps<Props>(), {
	priceRangeMin: 0,
	priceRangeMax: 10000,
	selectedPriceMin: 0,
	selectedPriceMax: 10000
});

const emit = defineEmits<{
	(e: 'update:min', value: number): void;
	(e: 'update:max', value: number): void;
}>();

const minVal = ref(props.selectedPriceMin);
const maxVal = ref(props.selectedPriceMax);

// Solo resetea los valores seleccionados si el padre cambia explícitamente initialMin o initialMax
watch(
	[() => props.selectedPriceMin, () => props.selectedPriceMax],
	([newSelectedMin, newSelectedMax], [oldSelectedMin, oldSelectedMax]) => {
		if (newSelectedMin !== oldSelectedMin) minVal.value = newSelectedMin ?? props.priceRangeMin;
		if (newSelectedMax !== oldSelectedMax) maxVal.value = newSelectedMax ?? props.priceRangeMax;
	}
);

// Al cambiar los límites, solo ajusta si la selección del usuario queda fuera del nuevo rango
watch(
	[() => props.priceRangeMin, () => props.priceRangeMax],
	([newRangeMin, newRangeMax]) => {
		if (minVal.value < newRangeMin) minVal.value = newRangeMin;
		if (maxVal.value > newRangeMax) maxVal.value = newRangeMax;
		// Mantiene la selección del usuario si sigue siendo válida
		if (minVal.value > maxVal.value) minVal.value = maxVal.value;
		if (maxVal.value < minVal.value) maxVal.value = minVal.value;
	}
);

const minThumbPosition = computed(() => {
	return ((minVal.value - props.priceRangeMin) / (props.priceRangeMax - props.priceRangeMin)) * 100;
});

const maxThumbPosition = computed(() => {
	return ((maxVal.value - props.priceRangeMin) / (props.priceRangeMax - props.priceRangeMin)) * 100;
});

const trackStyle = computed(() => {
	return {
		left: `${minThumbPosition.value}%`,
		width: `${maxThumbPosition.value - minThumbPosition.value}%`
	};
});

const formatPrice = (price: number) => {
	return new Intl.NumberFormat('es-PY', {
		style: 'currency',
		currency: 'PYG',
		maximumFractionDigits: 0
	}).format(price);
};

watch([minVal, maxVal], ([newMin, newMax]) => {
	emit('update:min', newMin);
	emit('update:max', newMax);
});

const onMinValueChange = (val: number) => {
	minVal.value = Math.min(val, maxVal.value);
};

const onMaxValueChange = (val: number) => {
	maxVal.value = Math.max(val, minVal.value);
};
</script>

<template>
	<div class="price-slider">
		<div class="price-display">
			<div class="price-min">{{ formatPrice(minVal) }}</div>
			<div class="price-separator">-</div>
			<div class="price-max">{{ formatPrice(maxVal) }}</div>
		</div>
		<DoubleRangeSlider 
		:min="priceRangeMin" 
		:max="priceRangeMax" 
		:step="10" 
		:minValue="minVal" 
		:maxValue="maxVal"
			@update:minValue="onMinValueChange" @update:maxValue="onMaxValueChange" />
	</div>

</template>

<style scoped>
.price-slider {

	width: 100%;
	padding: 1rem 0;
}

.price-display {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 1rem;
	color: var(--text-primary);
}

.slider-container {
	outline: blue thin solid;
	position: relative;
	width: 100%;
	height: 24px;
}

.slider {
	position: relative;
	width: 100%;
	height: 4px;
	top: 50%;
	transform: translateY(-50%);
	overflow: hidden;
}

.slider__track {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 2px;
	background-color: var(--border-color);
}

.slider__range {
	position: absolute;
	height: 100%;
	background-color: var(--color-primary);
	border-radius: 2px;
}

.thumb {
	position: absolute;
	width: 100%;
	height: 0;
	pointer-events: none;
	appearance: none;
	-webkit-appearance: none;
	background: none;
	top: 50%;
	transform: translateY(-50%);
}

.thumb::-webkit-slider-thumb {
	appearance: none;
	-webkit-appearance: none;
	pointer-events: auto;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: var(--color-primary);
	border: 2px solid white;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: background-color 0.2s;
}

.thumb::-moz-range-thumb {
	pointer-events: auto;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: var(--color-primary);
	border: 2px solid white;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: background-color 0.2s;
}

.thumb:hover::-webkit-slider-thumb {
	background-color: var(--color-primary-dark);
}

.thumb:hover::-moz-range-thumb {
	background-color: var(--color-primary-dark);
}

.thumb--min {
	z-index: 2;
}

.thumb--max {
	z-index: 1;
}
</style>
