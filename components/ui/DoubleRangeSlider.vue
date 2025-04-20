<script setup>
/**
 * DoubleRangeSlider
 * Componente de control deslizante doble para seleccionar un rango de valores numéricos.
 * Permite ajustar valores mínimo y máximo dentro de un rango definido.
 *
 * Props:
 * - minValue: Valor mínimo seleccionado inicialmente (Number, default: 0)
 * - maxValue: Valor máximo seleccionado inicialmente (Number, default: 100)
 * - min: Valor mínimo permitido en el slider (Number, default: 0)
 * - max: Valor máximo permitido en el slider (Number, default: 1000)
 * - step: Incremento de cada paso (Number, default: 1)
 *
 * Variables internas:
 * - sliderProps: Props del componente.
 * - selectedMin: Valor mínimo actualmente seleccionado.
 * - selectedMax: Valor máximo actualmente seleccionado.
 * - rangeStyle: Estilos calculados para la barra de rango seleccionada.
 * - showLabels: Indica si se deben mostrar los labels.
 *
 * Métodos internos:
 * - handleMinInput: Maneja el cambio del valor mínimo.
 * - handleMaxInput: Maneja el cambio del valor máximo.
 *
 * Emits:
 * - update:minValue: Se emite cuando cambia el valor mínimo seleccionado
 * - update:maxValue: Se emite cuando cambia el valor máximo seleccionado
 *
 * Uso:
 * <DoubleRangeSlider :min-value="10" :max-value="500" :min="0" :max="1000" :step="5" />
 */
import {computed, ref, watch} from 'vue';
import DoubleRangeSliderLabel from "~/components/ui/DoubleRangeSliderLabel.vue";

const sliderProps = defineProps({
	minValue: {type: Number, default: 0},
	maxValue: {type: Number, default: 100},
	min: {type: Number, default: 0},
	max: {type: Number, default: 1000},
	step: {type: Number, default: 1}
});

const emit = defineEmits(['update:minValue',
	'update:maxValue']);

const selectedMin = ref(sliderProps.minValue);
const selectedMax = ref(sliderProps.maxValue);
const showLabels = ref(false);

watch(() => sliderProps.minValue, (newVal) => {
	selectedMin.value = newVal;
});

watch(() => sliderProps.maxValue, (newVal) => {
	selectedMax.value = newVal;
});

watch([selectedMin,
	selectedMax], ([newMin, newMax]) => {
	emit('update:minValue', newMin);
	emit('update:maxValue', newMax);
});

const rangeStyle = computed(() => {
	const left = ((selectedMin.value - sliderProps.min) / (sliderProps.max - sliderProps.min)) * 100;
	const width = ((selectedMax.value - selectedMin.value) / (sliderProps.max - sliderProps.min)) * 100;
	return {left: `${left}%`, width: `${width}%`};
});

const labelMinStyle = computed(() => {
	const percent = ((selectedMin.value - sliderProps.min) / (sliderProps.max - sliderProps.min)) * 100;
	return {
		left: `calc(${percent}% - 16px)` // Ajuste para centrar sobre el knob
	};
});
const labelMaxStyle = computed(() => {
	const percent = ((selectedMax.value - sliderProps.min) / (sliderProps.max - sliderProps.min)) * 100;
	return {
		left: `calc(${percent}% - 16px)`
	};
});

function handleMinInput(e) {
	const value = Number(e.target.value);
	if (value > selectedMax.value) return;
	selectedMin.value = value;
}

function handleMaxInput(e) {
	const value = Number(e.target.value);
	if (value < selectedMin.value) return;
	selectedMax.value = value;
}
</script>

<template>
	<div class="double-range-slider">
		<div class="slider-container"
			@mouseenter="showLabels = true" @mouseleave="showLabels = false">
			<div class="slider-labels">
				<Transition name="fade">
					<DoubleRangeSliderLabel v-if="showLabels" :style="labelMinStyle" labelClass="slider-label--min" :value="selectedMin" />
				</Transition>
				<Transition name="fade">
					<DoubleRangeSliderLabel v-if="showLabels" :style="labelMaxStyle" labelClass="slider-label--max" :value="selectedMax" />
				</Transition>
			</div>
			<input :max="sliderProps.max"
				:min="sliderProps.min"
				:step="sliderProps.step"
				:value="selectedMin"
				class="thumb thumb--min"
				type="range"
				@input="handleMinInput">
			<input :max="sliderProps.max"
				:min="sliderProps.min"
				:step="sliderProps.step"
				:value="selectedMax"
				class="thumb thumb--max"
				type="range"
				@input="handleMaxInput">

			<div class="slider">
				<div class="slider__track"></div>
				<div :style="rangeStyle"
					class="slider__range"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.double-range-slider {
	width: 100%;
	padding: 1rem 0;
}

.price-display {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 1rem;
	font-size: 0.9rem;
	gap: 0.5rem;
}

.slider-container {
	position: relative;
	height: 6px;
	width: 100%;
}

.slider {
	position: relative;
	width: 100%;
	height: 6px;
	overflow: hidden;
}

.slider__track {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 3px;
	background-color: var(--border-color);
}

.slider__range {
	position: absolute;
	height: 100%;
	border-radius: 3px;
	background-color: var(--color-primary);
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
	z-index: 10;
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

.thumb:hover::-webkit-slider-thumb {
	background-color: var(--color-primary-dark);
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
