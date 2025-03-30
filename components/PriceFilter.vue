<template>
	<div class="mb-6">
		<h3 class="text-lg font-semibold mb-2">

			Precio
		</h3>
		<label class="flex items-center mb-2">
			<input
				v-model="filtroPrecio"
				class="rounded border-gray-300 text-indigo-600"
				type="checkbox"
			>
			<span class="ml-2 text-gray-700 text-sm">Filtrar por precio</span>
		</label>
		<div class="space-y-2">
			<div class="flex justify-between text-sm text-gray-600 mb-1">
				<span>Gs. {{ formatPrecio(minPrice) }}</span>
				<span>Gs. {{ formatPrecio(maxPrice) }}</span>
			</div>
			<input
				v-model.number="priceFilter"
				:max="maxPrice"
				:min="minPrice"
				class="w-full"
				step="1"
				type="range"
			>
			<div class="text-center text-sm text-gray-800 mt-1">
				<span>Hasta Gs. {{ formatPrecio(priceFilter) }}</span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	inject: ['$bus'],
	setup() {
		return {
			formatPrecio: utils().formatPrecio
		}
	},
	props: {
		products: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	data() {
		return {
			priceFilter: 0,
		}
	},
	computed: {
		listPrices() {
			return this.products.map(product => product.precio)
		},
		minPrice() {
			return this.listPrices.length > 0 ? Math.min(...this.listPrices) : 0;
		},
		maxPrice() {
			return this.listPrices.length > 0 ? Math.max(...this.listPrices) : 0;
		}
	}


}
</script>

<style scoped>

</style>
