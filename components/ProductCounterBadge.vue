<template>
	<p class="text-sm text-gray-600 mb-2 sm:mb-0">Mostrando {{ paginatedProducts.length }} de
		{{ filteredProducts.length }} Productos</p>
</template>

<script>
export default defineComponent({
	props: {
		paginatedProducts: {
			type: Array,
			required: true,
		},
		filteredProducts: {
			type: Array,
			required: true,
		},
	}
})
</script>
<style scoped>

</style>
