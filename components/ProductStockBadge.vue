<template>
	<div
		:class="[
        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
        'absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-medium'
      ]"
	>
		{{ product.stock > 0 ? 'En Stock' : 'Sin Stock' }}
	</div>
</template>
<script setup>

import {Producto} from "~/models.js";

const props = defineProps({
	product: {
		type: Producto,
		required: true
	}
})


</script>
<style scoped>

</style>
