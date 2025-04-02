<script lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from 'vue';
import {useNuxtApp} from '#app';
import {type Producto} from "~/models";

// Interface for a subcategory with its parent category
interface SubCategoriaWithParent {
	codigo: number;
	nombre: string;
	categoria: number;
}

export default {
	emits: ["on-selected"],

	props: {
		productos: {
			type: Array as PropType<Producto[]>,
			default: () => []
		},
		allProducts: {
			type: Array as PropType<Producto[]>,
			default: () => []
		},
		activeCategories: {
			type: Array as PropType<number[]>,
			default: () => []
		}
	},

	setup(props,
		  {emit}) {
		const {$bus} = useNuxtApp();
		const selectedSubcategorias = ref([]);

		// Compute unique subcategories from all products that match the selected categories
		const subcategorias = computed(() => {
			// Create a Map to ensure unique subcategories by ID
			const subcategoriasMap = new Map<string, SubCategoriaWithParent>();

			// Use allProducts instead of productos to get all available subcategories
			const productsToUse = props.allProducts.length > 0 ?
				props.allProducts :
				props.productos;

			// Filter products by selected categories first
			const filteredProducts = props.activeCategories.length > 0
				?
				productsToUse.filter(p => props.activeCategories.includes(p.codigo_categoria))
				:
				productsToUse;

			// Extract unique subcategories from the filtered products
			filteredProducts.forEach(producto => {
				if (producto.codigo_division && producto.desc_division) {
					const key = `${producto.codigo_categoria}-${producto.codigo_division}`;
					subcategoriasMap.set(key, {
						codigo: producto.codigo_division,
						nombre: producto.desc_division,
						categoria: producto.codigo_categoria
					});
				}
			});

			return Array.from(subcategoriasMap.values());
		});

		// Watch for changes in selected subcategories
		watch(selectedSubcategorias, () => {
			emit('on-selected', selectedSubcategorias.value);
		}, {deep: true});

		// Clear selection method
		const clearSelection = () => {
			selectedSubcategorias.value = [];
		};

		// Setup event listeners
		onMounted(() => {
			$bus.on('clear-filters', clearSelection);
			$bus.on('reset-subcategories', clearSelection);
		});

		onUnmounted(() => {
			$bus.off('clear-filters', clearSelection);
			$bus.off('reset-subcategories', clearSelection);
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
				:key="`${subCategoria.categoria}-${subCategoria.codigo}`"
				class="flex items-center"
			>
				<input
					v-model="selectedSubcategorias"
					:value="{ categoria: subCategoria.categoria, subcategoria: subCategoria.codigo }"
					class="rounded border-gray-300 text-gray-500 text-sm"
					type="checkbox"
				>
				<span class="ml-2 text-gray-700 text-sm">
					{{ subCategoria.nombre }}
				</span>
			</label>

			<div v-if="subcategorias.length === 0"
				class="text-sm text-gray-500 italic">
				No hay subcategorías disponibles
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
