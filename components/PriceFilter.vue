<template>
	<div class="mb-6">
		<h3 class="text-lg font-semibold mb-2"> Precio </h3>
		<!--		<label class="flex items-center mb-2">-->
		<!--			<input-->
		<!--				v-model="filtroPrecio"-->
		<!--				class="rounded border-gray-300 text-indigo-600"-->
		<!--				type="checkbox"-->
		<!--			>-->
		<!--			<span class="ml-2 text-gray-700 text-sm">Filtrar por precio</span>-->
		<!--		</label>-->
		<div class="space-y-2">
			<div class="flex justify-between text-sm text-gray-600 mb-1">
				<span>Gs. {{ formatPrecio(minPrice) }}</span>
				<span>Gs. {{ formatPrecio(maxPrice) }}</span>
			</div>
			<input
				v-model.number="priceFilter"
				:max="maxPrice"
				:min="minPrice"
				:step="priceStep"
				class="w-full"
				type="range"
				@input="emitPriceChange"
			>
			<div class="text-center text-sm text-gray-800 mt-1">
				<span>Hasta Gs. {{ formatPrecio(priceFilter) }}</span>
			</div>
		</div>
	</div>
</template>

<script>


export default {
	emits: ['on-selected'],

	setup() {
		const {$bus} = useNuxtApp();

		return {
			bus: $bus,

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
		},

		priceStep() {
			// Calculate a reasonable step size based on price range
			const range = this.maxPrice - this.minPrice;
			if (range <= 0) return 1;

			// For large ranges, use larger steps
			if (range > 1000000) return 10000;
			if (range > 100000) return 1000;
			if (range > 10000) return 100;
			return 10;
		}
	},

	watch: {
		products: {
			immediate: true,
			handler() {
				// Initialize the price filter to the maximum when products change
				if (this.maxPrice > 0) {
					this.priceFilter = this.maxPrice;
				}
			}
		}
	},

	methods: {
		emitPriceChange() {
			this.$emit('on-selected', this.priceFilter);
		},
		formatPrecio(precio) {
			return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	},

	mounted() {
		// Initialize the price filter to the maximum on mount
		if (this.maxPrice > 0) {
			this.priceFilter = this.maxPrice;
			this.emitPriceChange();
		}

		// Listen for clear-filters event
		this.bus.on('clear-filters', () => {
			this.priceFilter = this.maxPrice;
			this.emitPriceChange();
		});
	},

	unmounted() {
		this.bus.off('clear-filters');
	}
}
</script>

<style scoped>

</style>
