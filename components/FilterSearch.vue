<script lang="ts"
	setup>
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);
</script>
<template>
	<div class="filter-search">
		<div class="relative">
			<input
				:value="props.modelValue"
				autocomplete="off"
				class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400"
				placeholder="Buscar productos..."
				type="text"
				@input="e => emit('update:modelValue', e.target.value)"
				@keyup.esc.prevent="()=>{emit('update:modelValue', '')}"
			/>
			<span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <i class="pi pi-search"></i>
      </span>
		</div>
	</div>
</template>
<style scoped>
.filter-search {
	margin-bottom: 1.5rem;
}
</style>
