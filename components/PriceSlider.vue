<script setup lang="ts">
import { ref, watch, computed } from 'vue';

interface Props {
	minPrice?: number;
	maxPrice?: number;
	initialMin?: number;
	initialMax?: number;
}

const props = withDefaults(defineProps<Props>(), {
	minPrice: 0,
	maxPrice: 10000,
	initialMin: 0,
	initialMax: 10000
});

const emit = defineEmits<{
	(e: 'update:min', value: number): void;
	(e: 'update:max', value: number): void;
}>();

const minVal = ref(props.initialMin);
const maxVal = ref(props.initialMax);

const minThumbPosition = computed(() => {
	return ((minVal.value - props.minPrice) / (props.maxPrice - props.minPrice)) * 100;
});

const maxThumbPosition = computed(() => {
	return ((maxVal.value - props.minPrice) / (props.maxPrice - props.minPrice)) * 100;
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

const updateMinValue = (event: Event) => {
	const value = Number((event.target as HTMLInputElement).value);
	minVal.value = Math.min(value, maxVal.value);
};

const updateMaxValue = (event: Event) => {
	const value = Number((event.target as HTMLInputElement).value);
	maxVal.value = Math.max(value, minVal.value);
};
</script>

<template>
	<div class="price-slider">
		<div class="price-display">
			<div class="price-min">{{ formatPrice(minVal) }}</div>
			<div class="price-separator">-</div>
			<div class="price-max">{{ formatPrice(maxVal) }}</div>
		</div>

		<div class="slider-container">
			<input type="range" :min="minPrice" :max="maxPrice" :value="minVal" class="thumb thumb--min"
				@input="updateMinValue">
			<input type="range" :min="minPrice" :max="maxPrice" :value="maxVal" class="thumb thumb--max"
				@input="updateMaxValue">

			<div class="slider">
				<div class="slider__track"></div>
				<div class="slider__range" :style="trackStyle"></div>
			</div>
		</div>
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
