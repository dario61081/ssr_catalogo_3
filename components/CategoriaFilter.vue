<template>
	<h4 class="font-medium mb-2">Categorias</h4>
	<div class="mb-4">
		<!--    <div class="space-y-2 max-h-40 overflow-y-auto">-->
		<div class="space-y-2 ">
			<template v-for="row in 10"
					  v-if="loading">
				<CheckboxLoading></CheckboxLoading>
			</template>
			<label v-for="categoria in categorias"
				   v-else
				   class="flex items-center">
				<input
					v-model="categoria._checked"
					class="rounded border-gray-300 text-gray-500 text-sm"
					type="checkbox"
					@change="$emit('on-selected', seleccionados)"
				>
				<span class="ml-2 text-gray-700 text-sm"
					  style="text-overflow: ellipsis; white-space: nowrap;">
     				{{ categoria.nombre }}
        		</span>
			</label>
		</div>
	</div>

</template>
<script>
import {Linea} from "~/models.js";

export default {
	inject: ['bus'],
	emits: ['vnode-unmounted', "on-selected"],
	data() {
		return {
			/** @type {Linea[]} */
			categorias: [],
			loading: false
		}
	},
	methods: {

// {
// 	"DIV_CODIGO": 8,
// 	"DIV_DESC": "LIVING ROOM",
// 	"DIV_ESTADO": "A",
// 	"DIV_ORDEN": 1,
// 	"DIV_DIR_IMAGEN": null
// }
		get_data() {
			this.loading = true
			fetch('/api/categorias')
				.then(res => res.json())
				.then(res => {
					console.log('res', res)
					this.categorias = res.map(item => {
						const row = new Linea()
						row.codigo = item.DIV_CODIGO
						row.nombre = item.DIV_DESC
						return row
					})
				})
				.finally(() => {
					console.log(this.categorias)
					this.loading = false
				})
		},
		get_seleccionados() {
			return this.categorias.filter(item => item._checked).map(item => item.codigo)
		}
	},
	computed: {
		seleccionados() {
			return this.get_seleccionados()
		}
	},
	mounted() {
		this.get_data()
		this.$bus.on('clear-filters', () => {
			this.categorias.forEach(item => item._checked = false)
			this.$emit('on-selected', this.get_seleccionados())
		})
	}
}
</script>


<style scoped>

</style>
