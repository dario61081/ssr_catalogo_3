<script lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import { type Producto, SubCategoria } from "~/models";

export default {
	emits: ["on-selected"],
	
	props: {
		productos: {
			type: Array as PropType<Producto[]>,
			default: () => []
		}
	},
	
	setup(props, { emit }) {
		const { $bus } = useNuxtApp();
		const selectedSubcategorias = ref([]);
		
		// Compute unique subcategories from products
		const subcategorias = computed(() => {
			// Create a Map to ensure unique subcategories by ID
			const subcategoriasMap = new Map();
			
			props.productos.forEach(producto => {
				if (producto.codigo_division && producto.desc_division) {
					subcategoriasMap.set(
						producto.codigo_division,
						new SubCategoria(producto.codigo_division, producto.desc_division)
					);
				}
			});
			
			return Array.from(subcategoriasMap.values());
		});
		
		// Watch for changes in selected subcategories
		watch(selectedSubcategorias, () => {
			emit('on-selected', selectedSubcategorias.value);
		}, { deep: true });
		
		// Clear selection method
		const clearSelection = () => {
			selectedSubcategorias.value = [];
		};
		
		// Setup event listeners
		onMounted(() => {
			$bus.on('clear-filters', clearSelection);
		});
		
		onUnmounted(() => {
			$bus.off('clear-filters', clearSelection);
		});
		
		return {
			subcategorias,
			selectedSubcategorias
		};
	}
};
</script>

<template>
	<div class="mb-6">
		<h4 class="font-medium mb-2">Sub Categoría</h4>

		<div class="space-y-2">
			<label
				v-for="subCategoria in subcategorias"
				:key="subCategoria.codigo"
				class="flex items-center"
			>
				<input
					v-model="selectedSubcategorias"
					:value="subCategoria.codigo"
					class="rounded border-gray-300 text-gray-500 text-sm"
					type="checkbox"
				>
				<span class="ml-2 text-gray-700 text-sm">
					{{ subCategoria.nombre }}
				</span>
			</label>
			
			<div v-if="subcategorias.length === 0" class="text-sm text-gray-500 italic">
				No hay subcategorías disponibles
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
