<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    minValue: { type: Number, default: 0 },
    maxValue: { type: Number, default: 100 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 1000 },
    step: { type: Number, default: 1 }
});

const emit = defineEmits(['update:minValue', 'update:maxValue']);

const minVal = ref(props.minValue);
const maxVal = ref(props.maxValue);

watch(() => props.minValue, (newVal) => {
    minVal.value = newVal;
});

watch(() => props.maxValue, (newVal) => {
    maxVal.value = newVal;
});

watch([minVal, maxVal], ([newMin, newMax]) => {
    emit('update:minValue', newMin);
    emit('update:maxValue', newMax);
});

const trackStyle = computed(() => {
    const left = ((minVal.value - props.min) / (props.max - props.min)) * 100;
    const width = ((maxVal.value - minVal.value) / (props.max - props.min)) * 100;
    return { left: `${left}%`, width: `${width}%` };
});

function updateMinValue(e) {
    const value = Number(e.target.value);
    if (value > maxVal.value) return;
    minVal.value = value;
}

function updateMaxValue(e) {
    const value = Number(e.target.value);
    if (value < minVal.value) return;
    maxVal.value = value;
}
</script>

<template>
    <div class="double-range-slider">
        <!-- <div class="price-display">
            <div class="price-min">{{ minVal }}</div>
            <div class="price-separator">-</div>
            <div class="price-max">{{ maxVal }}</div>
        </div> -->

        <div class="slider-container">
            <input type="range" :min="min" :max="max" :step="step" :value="minVal" class="thumb thumb--min"
                @input="updateMinValue">
            <input type="range" :min="min" :max="max" :step="step" :value="maxVal" class="thumb thumb--max"
                @input="updateMaxValue">

            <div class="slider">
                <div class="slider__track"></div>
                <div class="slider__range" :style="trackStyle"></div>
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
    background-color: #e5e7eb;
}

.slider__range {
    position: absolute;
    height: 100%;
    border-radius: 3px;
    background-color: #3b82f6;
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
    background-color: #3b82f6;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.thumb::-moz-range-thumb {
    pointer-events: auto;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #3b82f6;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
</style>
