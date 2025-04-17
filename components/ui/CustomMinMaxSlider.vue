<script setup>
// Usar solo el componente v-range-slider de Vuetify
import { ref, watch } from 'vue';

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  minValue: { type: Number, default: 0 },
  maxValue: { type: Number, default: 100 },
});

const emit = defineEmits(['update:minValue', 'update:maxValue']);

const range = ref([props.minValue, props.maxValue]);

watch(() => [props.minValue, props.maxValue], ([newMin, newMax]) => {
  range.value = [newMin, newMax];
});

watch(range, ([newMin, newMax]) => {
  emit('update:minValue', newMin);
  emit('update:maxValue', newMax);
});
</script>
<template>
  <div>
    <v-range-slider
      v-model="range"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      hide-details
      thumb-label
      class="mt-4"
    />
    <div class="minmax-values">
      <span class="min">{{ range[0] }}</span>
      <span class="separator">-</span>
      <span class="max">{{ range[1] }}</span>
    </div>
  </div>
</template>
<style scoped>
.minmax-values {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}
.min {
  color: #2563eb;
  font-weight: bold;
}
.max {
  color: #2563eb;
  font-weight: bold;
}
.separator {
  color: #888;
}
</style>