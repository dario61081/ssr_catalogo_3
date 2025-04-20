<template>
  <span :class="labelClass"
	  :style="style"
	  class="slider-label">
    <slot>{{ formatNumber(value) }}</slot>
  </span>
</template>

<script lang="ts"
	setup>
/**
 * DoubleRangeSliderLabel
 * Label visual para el knob del slider, centrado y con "punta" inferior.
 * Props:
 * - value: Valor a mostrar (string|number)
 * - style: Estilo CSS para posicionamiento
 * - labelClass: Clase CSS adicional para customización
 */
defineProps<{
	value?: string | number,
	style?: Record<string, string>,
	labelClass?: string
}>();

const formatNumber = (value: number) => {
	return value.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

</script>

<style scoped>
.slider-label {
	position: absolute;
	top: 0;
	left: 50%;
	min-width: 38px;
	text-align: center;
	background: #fefefe;
	color: #222;
	border-radius: 4px 4px 6px 6px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
	font-size: 0.85rem;
	padding: 2px 8px 6px 8px;
	pointer-events: none;
	border: 1px solid #eee;
	z-index: 20;
	transform: translate(-25%, -120%);
	transition: left 0.1s;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.slider-label::after {
	content: '';
	display: block;
	width: 0;
	height: 0;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-top: 8px solid #000;
	margin-top: -1px;
	filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.07));
}
</style>
