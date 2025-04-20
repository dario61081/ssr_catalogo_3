<template>
	<div class="p-8">
		<h1 class="text-2xl font-bold mb-4">Página de Test de Componentes</h1>
		<div class="space-y-6">
			<!-- Agrega aquí los componentes que quieras testear -->
			<!-- Ejemplo: <DoubleRangeSlider v-model="range" /> -->
			<div>
				min: {{ min_price }} - max: {{ max_price }} - conteo {{ conteo }}
				<br>
				minSelected: {{ minSelected }} - maxSelected: {{ maxSelected }}
			</div>
			<div class="flex items-center space-x-2">
				<label class="sr-only"
					for="search-input">Buscar:
				</label>
				<input id="search-input"
					v-model="searchText"
					class="p-2 border rounded-md flex-1"
					placeholder="Buscar productos por nombre o código"
					type="search">
				<button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md"
					type="submit">Buscar
				</button>
			</div>
			<DoubleRangeSlider v-model:max="max_price"
				v-model:max-value="maxSelected"
				v-model:min="min_price"
				v-model:min-value="minSelected"

			/>
			<ol>
				<li v-for="(item, index) in filteredProductos"
					:key="item.codigo"
				>
					{{ index }} : {{ item.nombre }} | {{ item.precio }}
				</li>
			</ol>


			<slot/>
		</div>
	</div>
</template>

<script lang="ts"
	setup>
// Importa aquí los componentes que quieras probar
// import DoubleRangeSlider from '~/components/ui/DoubleRangeSlider.vue'
// const range = ref([0, 100])
import DoubleRangeSlider from "~/components/ui/DoubleRangeSlider.vue";
import {ProductoResponse} from "~/types";

const productos = ref([])
const searchText = ref('');

/**
 * Convierte cualquier string a un número entero largo (bigint).
 * Elimina todos los caracteres que no sean dígitos.
 * Si no hay dígitos, retorna 0n.
 * Ejemplo:
 *   toInt('12.345,67') => 1234567n
 *   toInt('abc123xyz') => 123n
 *   toInt('texto') => 0n
 * @param str Texto a convertir
 * @returns bigint
 */
const toBigInt = (str: string | number): bigint => BigInt((str || '').replace(/\D+/g, '') || 0);

const min_price = computed(() => {
	return Math.min(...productos.value.map(p => Number(BigInt(p.precio)))) | 0
})

const max_price = computed(() => {
	return Math.max(...productos.value.map(p => Number(BigInt(p.precio)))) | 0
})

const conteo = computed(() => {
	return filteredProductos.value.length | 0
})

const minSelected = ref(0)
const maxSelected = ref(100)

let response: ProductoResponse[];

onMounted(async () => {
	response = await $fetch<ProductoResponse[]>('https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC');
	productos.value = response.map((item: ProductoResponse) => mapToProducto(item));
	maxSelected.value = max_price.value
})
const filteredProductos = computed(() => {
	return productos.value.filter(p => {
		return (
			p.precio >= BigInt(minSelected.value) &&
			p.precio <= BigInt(maxSelected.value)
		);
	});
})

</script>

<style scoped>
/* Puedes agregar estilos personalizados para la página de test aquí */
</style>
