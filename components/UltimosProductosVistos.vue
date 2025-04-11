<template>

<div v-if="productos.length > 0" class="ultimos-productos-vistos">
		<div class="container mx-auto px-4">
			<h2 class="text-2xl font-semibold text-gray-800 mb-6">Últimos Productos Vistos</h2>
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
				<div v-for="producto in productos" :key="producto.codigo" class="h-full">
					<ProductCard :product="producto" :showActions="true"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductoStore } from '~/stores/productoStore';

const productoStore = useProductoStore();
const productos = computed(() => {
	const recentProducts = productoStore.getUltimosProductosVistos;
	return recentProducts.slice(0, 3); // Limitamos a 3 productos
});
</script>

<style scoped>
.ultimos-productos-vistos {
	padding: 2rem 0;
	background-color: #f9fafb;
}
</style>
