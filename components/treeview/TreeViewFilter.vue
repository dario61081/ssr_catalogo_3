<script lang="ts">
import {defineComponent, computed, ref} from 'vue'
import {useCategorias} from "~/composables/useCategorias";
import CategoryItem from "~/components/treeview/CategoryItem.vue";
import {useProductos} from "~/composables/useProductos";

interface Producto {
  codigo: number;
  codigo_categoria: number;
  codigo_division: number;
  desc_division: string;
  nombre: string;
  // Add other product properties as needed
}

interface Division {
  desc_division: string;
  productos: Producto[];
}

interface CategoriaProductos {
  codigo: number;
  divisiones: Record<number, Division>;
}

export default defineComponent({
	components: {CategoryItem},
	setup() {
		const {categorias} = useCategorias()
		const {productos} = useProductos()
		
		// Estados para expandir/colapsar categorías y divisiones
		const expandedCategories = ref<number[]>([]);
		const expandedDivisions = ref<string[]>([]);
		
		// Función para alternar la expansión de categorías
		const toggleCategory = (categoryId: number) => {
			const index = expandedCategories.value.indexOf(categoryId);
			if (index === -1) {
				expandedCategories.value.push(categoryId);
			} else {
				expandedCategories.value.splice(index, 1);
			}
		};
		
		// Función para alternar la expansión de divisiones
		const toggleDivision = (divisionKey: string) => {
			const index = expandedDivisions.value.indexOf(divisionKey);
			if (index === -1) {
				expandedDivisions.value.push(divisionKey);
			} else {
				expandedDivisions.value.splice(index, 1);
			}
		};
		
		// Verificar si una categoría está expandida
		const isCategoryExpanded = (categoryId: number) => {
			return expandedCategories.value.includes(categoryId);
		};
		
		// Verificar si una división está expandida
		const isDivisionExpanded = (divisionKey: string) => {
			return expandedDivisions.value.includes(divisionKey);
		};

		// Agrupar productos por categoría y división
		const productosPorCategoria = computed<CategoriaProductos[]>(() => {
			const grouped: Record<number, CategoriaProductos> = {}
			
			productos.value.forEach((producto: Producto) => {
				if (!grouped[producto.codigo_categoria]) {
					grouped[producto.codigo_categoria] = {
						codigo: producto.codigo_categoria,
						divisiones: {}
					}
				}

				if (!grouped[producto.codigo_categoria].divisiones[producto.codigo_division]) {
					grouped[producto.codigo_categoria].divisiones[producto.codigo_division] = {
						desc_division: producto.desc_division,
						productos: []
					}
				}

				grouped[producto.codigo_categoria].divisiones[producto.codigo_division].productos.push(producto)
			})
			
			// Convertir a array para v-for
			return Object.entries(grouped).map(([key, value]) => value)
		})

		return {
			categorias,
			productosPorCategoria,
			toggleCategory,
			toggleDivision,
			isCategoryExpanded,
			isDivisionExpanded
		}
	}
})

/**
 * Jerarquia
 * 1. categoria
 * 2. division
 * 3. productos
 */


</script>

<template>
	<div class="tree-view">
		<h3 class="mb-4">Categorías</h3>
		<ul class="tree-list">
			<li v-for="categoria in categorias" :key="categoria.codigo" class="tree-item">
				<div @click="toggleCategory(categoria.codigo)" class="tree-item-header">
					<span class="toggle-icon">
						{{ isCategoryExpanded(categoria.codigo) ? '▼' : '▶' }}
					</span>
					<input 
						type="checkbox" 
						:id="`cat-${categoria.codigo}`" 
						:value="categoria.codigo"
						@click.stop
					>
					<label :for="`cat-${categoria.codigo}`">{{ categoria.nombre }}</label>
				</div>
				
				<div v-if="isCategoryExpanded(categoria.codigo) && productosPorCategoria.find((p: CategoriaProductos) => p.codigo === categoria.codigo)?.divisiones" class="tree-children">
					<ul>
						<li 
							v-for="(division, codigoDivision) in productosPorCategoria.find((p: CategoriaProductos) => p.codigo === categoria.codigo)?.divisiones" 
							:key="codigoDivision"
							class="tree-item"
						>
							<div @click="toggleDivision(`${categoria.codigo}-${codigoDivision}`)" class="tree-item-header">
								<span class="toggle-icon">
									{{ isDivisionExpanded(`${categoria.codigo}-${codigoDivision}`) ? '▼' : '▶' }}
								</span>
								<input 
									type="checkbox" 
									:id="`div-${categoria.codigo}-${codigoDivision}`" 
									:value="codigoDivision"
									@click.stop
								>
								<label :for="`div-${categoria.codigo}-${codigoDivision}`">{{ division.desc_division }}</label>
							</div>
							
							<div v-if="isDivisionExpanded(`${categoria.codigo}-${codigoDivision}`)" class="tree-children">
								<ul>
									<li v-for="producto in division.productos" :key="producto.codigo" class="tree-item">
										<div class="tree-item-header product-item">
											<input 
												type="checkbox" 
												:id="`prod-${producto.codigo}`" 
												:value="producto.codigo"
											>
											<label :for="`prod-${producto.codigo}`">{{ producto.nombre }}</label>
										</div>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.tree-view {
	margin: 20px;
}

.tree-list {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.tree-item {
	margin-bottom: 5px;
}

.tree-item-header {
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 3px 0;
}

.toggle-icon {
	margin-right: 5px;
	font-size: 10px;
	width: 15px;
	display: inline-block;
}

.tree-children {
	padding-left: 20px;
	margin-top: 3px;
}

.tree-children ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

input[type="checkbox"] {
	margin-right: 5px;
}

label {
	cursor: pointer;
}

.product-item {
	padding-left: 15px;
}
</style>
