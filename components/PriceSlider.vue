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

// NUEVO: objeto reactivo para v-model del rango
const priceRangeValue = ref({ min: props.selectedPriceMin, max: props.selectedPriceMax });

// Sincroniza priceRangeValue si cambian los props
watch([
  () => props.selectedPriceMin,
  () => props.selectedPriceMax
], ([newMin, newMax]) => {
  priceRangeValue.value = { min: newMin, max: newMax };
});

// Ajusta priceRangeValue si cambian los límites
watch([
  () => props.priceRangeMin,
  () => props.priceRangeMax
], ([newRangeMin, newRangeMax]) => {
  let min = priceRangeValue.value.min;
  let max = priceRangeValue.value.max;
  if (min < newRangeMin) min = newRangeMin;
  if (max > newRangeMax) max = newRangeMax;
  if (min > max) min = max;
  if (max < min) max = min;
  priceRangeValue.value = { min, max };
});

// Emitir cambios al padre
watch(priceRangeValue, (val) => {
  emit('update:min', val.min);
  emit('update:max', val.max);
});

const minThumbPosition = computed(() => {
	return ((priceRangeValue.value.min - props.priceRangeMin) / (props.priceRangeMax - props.priceRangeMin)) * 100;
});

const maxThumbPosition = computed(() => {
	return ((priceRangeValue.value.max - props.priceRangeMin) / (props.priceRangeMax - props.priceRangeMin)) * 100;
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
</script>

<template>
	<div class="price-slider">
		<div class="price-display">
			<div class="price-min">{{ formatPrice(priceRangeValue.min) }}</div>
			<div class="price-separator">-</div>
			<div class="price-max">{{ formatPrice(priceRangeValue.max) }}</div>
		</div>
		<DoubleRangeSlider 
		:min="priceRangeMin" 
		:max="priceRangeMax" 
		:step="10" 
		v-model="priceRangeValue" />
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
