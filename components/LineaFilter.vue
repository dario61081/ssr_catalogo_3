<template>
	<div class="mb-4">
		<h4 class="font-medium mb-2">Lineas</h4>
		<div class="space-y-2 max-h-40 overflow-y-auto ">
			
			<label v-for="linea in uniqueLineas"
				   class="flex items-center">
				<input class="rounded border-gray-300 text-indigo-600"
					   type="checkbox">
				<span class="ml-2 text-gray-700 text-sm">{{ linea }} ({{ countItems(linea) }})</span>
			</label>
		</div>
	</div>
</template>
<script>


export default {
	inject: ['bus'],
	props: {
		/** @type {Producto[]} */
		productos: {type: Array, required: true}
	},
	data() {
		return {
			/** type {Seleccion[]} */
			seleccionados: []
		}
	},
	methods: {
		countItems(descripcion) {
			return this.productos.filter(producto => producto.desc_division === descripcion).length
		},

	},
	computed: {
		uniqueLineas() {
			return new Set(this.productos.map(producto => producto.desc_division));
		}
	},
	mounted() {
		this.$bus.on('clear-filters', () => {
			this.categorias.forEach(item => item._checked = false)
			this.$emit('on-selected', this.get_seleccionados())
		})
	},
	unmounted() {
		this.$bus.off('clear-filters')
	}
}


</script>
<style scoped>

</style>
