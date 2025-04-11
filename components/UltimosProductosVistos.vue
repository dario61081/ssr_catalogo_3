<template>
	<div class="ultimos-productos-vistos">
		<h2>Últimos Productos Vistos</h2>
		<ul>
			<li v-for="producto in productos"
				:key="producto.id">
				<h3>{{ producto.nombre }}</h3>
				<p>Precio: {{ producto.precio }}</p>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useProductoStore} from '~/stores/productoStore';

export default defineComponent({
	name: 'UltimosProductosVistos',
	setup() {
		const productoStore = useProductoStore();
		const productos = productoStore.getUltimosProductosVistos();

		return {productos};
	},
});
</script>

<style scoped>
.ultimos-productos-vistos {
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.ultimos-productos-vistos h2 {
	margin-bottom: 10px;
}

.ultimos-productos-vistos ul {
	list-style-type: none;
	padding: 0;
}

.ultimos-productos-vistos li {
	margin-bottom: 15px;
}
</style>
