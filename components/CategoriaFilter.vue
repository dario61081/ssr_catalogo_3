<template>
	<div class="mb-6">
		<h4 class="font-medium mb-2">Categorías</h4>
		<div class="space-y-2">
			<label
				v-for="categoria in categorias"
				:key="categoria.codigo"
				class="flex items-center"
			>
				<input
					v-model="selectedCategories"
					:value="categoria.codigo"
					class="rounded border-gray-300 text-gray-500 text-sm"
					type="checkbox"
				>
				<span class="ml-2 text-gray-700 text-sm">
					{{ categoria.nombre }}
				</span>
			</label>

			<div v-if="categorias.length === 0"
				class="text-sm text-gray-500 italic">
				No hay categorías disponibles
			</div>
		</div>
	</div>
</template>

<script>

export default {
	emits: ["on-selected"],

	props: {
		categorias: {
			type: Array,
			required: true,
			default: () => []
		}
	},

	setup() {
		const {$bus} = useNuxtApp();
		return {bus: $bus};
	},

	data() {
		return {
			selectedCategories: []
		};
	},

	watch: {
		selectedCategories: {
			handler() {
				this.$emit('on-selected', this.selectedCategories);
			},
			deep: true
		}
	},

	mounted() {
		// Listen for clear-filters event
		this.bus.on('clear-filters', this.clearSelection);
	},

	unmounted() {
		// Clean up event listener
		this.bus.off('clear-filters', this.clearSelection);
	},

	methods: {
		clearSelection() {
			this.selectedCategories = [];
		}
	}
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
