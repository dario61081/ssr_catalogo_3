<script lang="ts">
import {defineComponent} from 'vue'
import {useCategorias} from "~/composables/useCategorias";
import CategoryItem from "~/components/treeview/CategoryItem.vue";
import {useProductos} from "~/composables/useProductos";

export default defineComponent({
	components: {CategoryItem},
	setup() {

		const {categorias} = useCategorias()
		const {productos} = useProductos()

		const getProductsByDivision = (codigo: number) => {
			const temp_productos = ref([])
			temp_productos.value = [...productos.value]

			return [...temp_productos.value.filter(item => item.codigo_categoria === codigo)]
		}

		return {
			categorias,
			productos,
			getProductsByDivision
		}
	}
})
</script>

<template>
	<h3 class="mb-3">Categorias</h3>
	<div v-for="item in categorias">
		<CategoryItem :item="item"
			@click="()=>{}"></CategoryItem>
	</div>
	{{ categorias }}
</template>

<style scoped>

</style>
