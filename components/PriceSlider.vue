<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';

// Props tipados con valores por defecto y metadatos para mejor autocompletado
interface Props {
	minPrice?: number;
	maxPrice?: number;
	initialMin?: number;
	initialMax?: number;
	step?: number;
	debounce?: number;
	label?: string;
}

const props = withDefaults(defineProps<Props>(), {
	minPrice: 0,
	maxPrice: 10000,
	initialMin: 0,
	initialMax: 10000,
	step: 1,
	debounce: 150,
	label: 'Rango de Precios'
});

// Modelo tipado para Vue 3
const emit = defineEmits<{
	'update:min': [value: number],
	'update:max': [value: number]
}>();

// Valores internos del slider
const minVal = ref(props.initialMin);
const maxVal = ref(props.initialMax);

// ID único para accesibilidad
const sliderId = ref(`price-slider-${Math.random().toString(36).substring(2, 9)}`);

// Memorizamos el formateador de precios para evitar crear nuevas instancias
const priceFormatter = new Intl.NumberFormat('es-PY', {
	style: 'currency',
	currency: 'PYG',
	maximumFractionDigits: 0
});

// Cálculos para posición de los thumbs, simplificados
const minThumbPosition = computed(() =>
	((minVal.value - props.minPrice) / (props.maxPrice - props.minPrice)) * 100
);

const maxThumbPosition = computed(() =>
	((maxVal.value - props.minPrice) / (props.maxPrice - props.minPrice)) * 100
);

const trackStyle = computed(() => ({
	left: `${minThumbPosition.value}%`,
	width: `${maxThumbPosition.value - minThumbPosition.value}%`
}));

// Función para formatear precio memoizada
const formatPrice = (price: number) => priceFormatter.format(price);

// Timers para debounce
let minUpdateTimer: ReturnType<typeof setTimeout> | null = null;
let maxUpdateTimer: ReturnType<typeof setTimeout> | null = null;

// Emitir con debounce
const emitMinUpdate = (value: number) => {
	if (minUpdateTimer) clearTimeout(minUpdateTimer);
	minUpdateTimer = setTimeout(() => {
		emit('update:min', value);
	}, props.debounce);
};

const emitMaxUpdate = (value: number) => {
	if (maxUpdateTimer) clearTimeout(maxUpdateTimer);
	maxUpdateTimer = setTimeout(() => {
		emit('update:max', value);
	}, props.debounce);
};

// Observe changes and emit events
watch(minVal, (newVal) => {
	emitMinUpdate(newVal);
});

watch(maxVal, (newVal) => {
	emitMaxUpdate(newVal);
});

// Actualizar valores asegurando que mínimo <= máximo
const updateMinValue = (event: Event) => {
	const value = Number((event.target as HTMLInputElement).value);
	minVal.value = Math.min(value, maxVal.value);
};

const updateMaxValue = (event: Event) => {
	const value = Number((event.target as HTMLInputElement).value);
	maxVal.value = Math.max(value, minVal.value);
};

// Actualizar valores cuando cambien las props
watch(() => props.initialMin, (newVal) => {
	if (minVal.value !== newVal) {
		minVal.value = newVal;
	}
});

watch(() => props.initialMax, (newVal) => {
	if (maxVal.value !== newVal) {
		maxVal.value = newVal;
	}
});

onMounted(() => {
	// Asegurar que los valores iniciales son correctos
	if (minVal.value > maxVal.value) {
		minVal.value = maxVal.value;
	}
});
</script>

<template>
	<div class="price-slider" :aria-labelledby="`${sliderId}-label`">
		<div :id="`${sliderId}-label`" class="sr-only">{{ label }}</div>

		<div class="slider-container">
			<input type="range"
				:min="minPrice"
				:max="maxPrice"
				:step="step"
				:value="minVal"
				:aria-label="`Precio mínimo: ${formatPrice(minVal)}`"
				:aria-valuemin="minPrice"
				:aria-valuemax="maxPrice"
				:aria-valuenow="minVal"
				class="thumb thumb--min"
				@input="updateMinValue">
				
			<input type="range"
				:min="minPrice"
				:max="maxPrice"
				:step="step"
				:value="maxVal"
				:aria-label="`Precio máximo: ${formatPrice(maxVal)}`"
				:aria-valuemin="minPrice"
				:aria-valuemax="maxPrice"
				:aria-valuenow="maxVal"
				class="thumb thumb--max"
				@input="updateMaxValue">

			<div class="slider">
				<div class="slider__track"></div>
				<div class="slider__range" :style="trackStyle"></div>
			</div>
		</div>
		
		<!-- Nuevas etiquetas para mostrar los valores seleccionados -->
		<div class="slider-values">
			<div class="slider-value min-value">{{ formatPrice(minVal) }}</div>
			<div class="slider-value max-value">{{ formatPrice(maxVal) }}</div>
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

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}

.slider-container {
	position: relative;
	width: 100%;
	height: 24px;
	margin: 0 8px;
	/* Añadido margen horizontal para evitar que se dibuje fuera del contenedor */
	width: calc(100% - 16px);
	/* Ajustar el ancho considerando el margen */
}

.slider {
	position: relative;
	width: 100%;
	height: 4px;
	top: 50%;
	transform: translateY(-50%);
	border-radius: 2px;
	overflow: hidden;
	/* Evita que el contenido sobresalga */
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
	max-width: 100%;
	/* Asegurar que no exceda el ancho máximo */
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
	margin: 0;
	/* Eliminar margen predeterminado */
	padding: 0;
	/* Eliminar padding predeterminado */
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

.thumb:focus::-webkit-slider-thumb {
	outline: 2px solid var(--color-primary-dark);
	outline-offset: 2px;
}

.thumb:focus::-moz-range-thumb {
	outline: 2px solid var(--color-primary-dark);
	outline-offset: 2px;
}

.thumb--min {
	z-index: 2;
}

.thumb--max {
	z-index: 1;
}

.slider-values {
	display: flex;
	justify-content: space-between;
	margin-top: 1rem;
	color: var(--text-secondary);
	padding: 0 8px;
	/* Alinear con el slider */
}

.slider-value {
	font-size: 0.875rem;
	font-weight: 500;
}

.min-value {
	text-align: left;
}

.max-value {
	text-align: right;
}

@media (prefers-reduced-motion: reduce) {

	.thumb::-webkit-slider-thumb,
	.thumb::-moz-range-thumb {
		transition: none;
	}
}
</style>
