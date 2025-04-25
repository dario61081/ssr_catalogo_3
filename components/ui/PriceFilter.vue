<script lang="ts"
	setup>
import {computed} from 'vue';

const props = defineProps({
	minValue: {type: Number, default: 0},
	maxValue: {type: Number, default: 100000},
	minSelected: {type: Number, default: 0},
	maxSelected: {type: Number, default: 100000}
});

defineEmits([
	'vnode-unmounted',
	'update:minSelected',
	'update:maxSelected'
]);

// Calcula el estilo de la barra de rango seleccionado
const rangeStyle = computed(() => {
	const min = Math.min(props.minSelected, props.maxSelected);
	const max = Math.max(props.minSelected, props.maxSelected);
	const left = ((min - props.minValue) / (props.maxValue - props.minValue)) * 100;
	const width = ((max - min) / (props.maxValue - props.minValue)) * 100;
	return {
		left: `${left}%`,
		width: `${width}%`
	};
});
</script>

<template>
	<div class="price-slider-group w-full max-w-md mx-auto">
		<b>Filtro de precios</b>
		<div class="flex justify-between mb-1">
			<span class="text-sm font-medium text-gray-900">Gs. {{ minSelected }}</span>
			<span class="text-sm font-medium text-gray-900">Gs. {{ maxSelected }}</span>
		</div>
		<div class="relative w-full h-6 flex items-center">
			<!-- Barra de fondo -->
			<div class="absolute w-full h-1 bg-gray-200 rounded"></div>
			<!-- Barra de rango seleccionado -->
			<div
				:style="rangeStyle"
				class="absolute h-1 bg-gray-600 rounded"
			>
				<!-- Ambos sliders superpuestos -->
				<input
					:max="props.maxValue"
					:min="props.minValue"
					:value="minSelected"
					class="range-thumb absolute w-full h-6 bg-transparent appearance-none pointer-events-auto"
					style="z-index: 2"
					type="range"
					@input="$emit('update:minSelected', Number($event.target.value))"
				/>
				<input
					:max="props.maxValue"
					:min="props.minValue"
					:value="maxSelected"
					class="range-thumb absolute w-full h-6 bg-transparent appearance-none pointer-events-auto"
					style="z-index: 3"
					type="range"
					@input="$emit('update:maxSelected', Number($event.target.value))"
				/>
			</div>

		</div>
	</div>
</template>

<style scoped>
.range-thumb::-webkit-slider-thumb {
	appearance: none;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: #374151;
	border: 2px solid #fff;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: background 0.2s;
}

.range-thumb::-moz-range-thumb {
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: #374151;
	border: 2px solid #fff;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: background 0.2s;
}

.range-thumb::-ms-thumb {
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: #374151;
	border: 2px solid #fff;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: background 0.2s;
}

.range-thumb {
	-webkit-appearance: none;
	appearance: none;
	background: transparent;
	pointer-events: auto;
}

.range-thumb:focus {
	outline: none;
}
</style>
