<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
	props: {
		product: {
			type: Object,
			required: true
		},
		isAdded: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const isAdded = ref(false);

		return {
			isAdded
		}
	}
})
</script>

<template>
	<button v-if="product.stock > 0"
		:class="{
					'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500': !isAdded,
					'bg-green-600 hover:bg-green-700 focus:ring-green-500': isAdded
				}"
		class="add-to-cart-btn w-full bg-gray-700 hover:bg-gray-800 text-white text-sm py-2 px-3 rounded-md flex items-center justify-center transition-all duration-300"
	>
		<i v-if="!isAdded"
			class="pi pi-shopping-cart mr-1"></i>
		<i v-else
			class="pi pi-check animate-bounce"></i>
		<span v-if="!isAdded">Añadir</span>
	</button>
</template>

<style scoped>

</style>
