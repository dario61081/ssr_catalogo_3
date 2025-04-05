<script lang="ts"
	setup>
import {Producto} from '~/models';
import {useRoute} from 'vue-router';

const codigo = parseInt(useRoute().params.codigo)
// SEO metadata
// useHead({
// 	title: () => producto.value?.nombre || 'Producto',
// 	meta: [
// 		{name: 'description', content: () => producto.value?.nombre || 'Detalles del producto'},
// 		{property: 'og:title', content: () => producto.value?.nombre || 'Producto'},
// 		{property: 'og:description', content: () => `${producto.value?.nombre} - ${producto.value?.categoria}`},
// 		{property: 'og:image', content: () => producto.value?.imagen || ''},
// 		{property: 'og:type', content: 'product'},
// 		{name: 'twitter:card', content: 'summary_large_image'},
// 	]
// });


const product = ref<Producto | null>(null);
// const cantidad = ref(1);
// const loading = ref(true);
// const productImages = ref<string[]>([]);
const formatPrecio = utilidades().formatPrecio;
const {productos} = useProductos()

// buscar el producto por el codigo
onMounted(() => {
	product.value = productos.value.find((item: Producto) => item.codigo === codigo)
})


// Fetch product data
// onMounted(async () => {
// 	const {codigo} = useRoute().params
// 	loading.value = true;
//
// 	try {
// 		const {data, error} = useFetch('/api/articulos')
//
// 		if (!data.value) {
// 			throw new Error('Producto no encontrado');
// 		}
//
// 		const item: Producto = data.find((item: ArticuloResponse) => item.ART_COD === Number(codigo))
//
//
// 		if (item) {
// 			producto.value = new Producto(
// 				item.ART_COD,
// 				item.ART_DESCRIPCION,
// 				data.DIVISION,
// 				data.DIV_DESC,
// 				parseInt(data.PRECIO.toString()
// 					.replace('.', ''), 10),
// 				data.ART_DIR_IMAG1,
// 				data.STOCK,
// 				data.DIV_CLAS,
// 				data.DIV_CLAS_DESC
// 			);
//
// 			// Initialize product images array
// 			// In a real scenario, you would get all images from the API
// 			productImages.value = [
// 				data.imagen, // Main image
// 				// Add additional images if available
// 				// data.ART_DIR_IMAG2 || data.ART_DIR_IMAG1,
// 				//data.ART_DIR_IMAG3 || data.ART_DIR_IMAG1
// 			].filter(Boolean); // Remove any undefined/null values
// 		} else {
// 			console.error('Product data not found');
// 		}
// 	} catch (error) {
// 		console.error('Error fetching product:', error);
// 	} finally {
// 		loading.value = false;
// 	}
// });

// Methods
// const incrementQuantity = () => {
// 	if (producto.value && cantidad.value < producto.value.stock) {
// 		cantidad.value++;
// 	}
// };
//
// const decrementQuantity = () => {
// 	if (cantidad.value > 1) {
// 		cantidad.value--;
// 	}
// };

// const addToCart = () => {
// 	// Implement cart functionality
// 	console.log('Adding to cart:', producto.value, 'Quantity:', cantidad.value);
// };
//
// const buyNow = () => {
// 	// Implement buy now functionality
// 	console.log('Buying now:', producto.value, 'Quantity:', cantidad.value);
// };
</script>

<template>
	<NuxtLayout name="layout-inlogin">
		<!--		{{ item }}-->
		<div class="bg-white content-center w-[100dvw]  max-h-[90vh] overflow-auto">
			<!-- Close button -->
			<!--			<button-->
			<!--				class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors"-->
			<!--				@click="close"-->
			<!--			>-->
			<!--				<svg class="h-5 w-5 text-gray-700"-->
			<!--					fill="none"-->
			<!--					stroke="currentColor"-->
			<!--					viewBox="0 0 24 24"-->
			<!--					xmlns="http://www.w3.org/2000/svg">-->
			<!--					<path d="M6 18L18 6M6 6l12 12"-->
			<!--						stroke-linecap="round"-->
			<!--						stroke-linejoin="round"-->
			<!--						stroke-width="2"></path>-->
			<!--				</svg>-->
			<!--			</button>-->

			<div class="flex flex-col md:flex-row">
				<!-- Product image section -->
				<div class="w-full md:w-1/2 p-6 flex flex-col">
					<!-- Main image -->
					<div class="flex-1 flex items-center justify-center bg-white"
						style="aspect-ratio: 4/3;">
						<img
							v-if="product"
							:alt="product.nombre"
							:src="product.imagen"
							class="max-w-full max-h-full object-contain"
						/>
					</div>

					<!-- Thumbnail gallery -->
					<div class="mt-4 flex space-x-2 justify-center">
						<button class="border-2 border-gray-300 rounded-md p-1 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
							<img
								v-if="product"
								:alt="product.nombre"
								:src="product.imagen"
								class="h-16 w-16 object-contain"
							/>
						</button>
						<!--            <button class="border-2 border-gray-300 rounded-md p-1 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">-->
						<!--              <img -->
						<!--                v-if="product" -->
						<!--                :src="product.imagen" -->
						<!--                :alt="product.nombre" -->
						<!--                class="h-16 w-16 object-contain"-->
						<!--              />-->
						<!--            </button>-->
						<!--            <button class="border-2 border-gray-300 rounded-md p-1 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">-->
						<!--              <img -->
						<!--                v-if="product" -->
						<!--                :src="product.imagen" -->
						<!--                :alt="product.nombre" -->
						<!--                class="h-16 w-16 object-contain"-->
						<!--              />-->
						<!--            </button>-->
					</div>

					<p class="text-center text-sm text-gray-500 mt-4">Imagen ilustrativa</p>
				</div>

				<!-- Product info section -->
				<div class="w-full md:w-1/2 p-6 flex flex-col">
					<!-- Product title and details -->
					<h1 class="text-2xl font-bold text-gray-900 mt-2">{{ product?.nombre }}</h1>
					<p class="text-sm text-gray-500 mt-1">Art. {{ codigo }}</p>

					<!-- Price and stock -->
					<div class="mt-6">
						<p class="text-2xl font-bold text-gray-900">Gs. {{ product?.precio }}</p>
						<div class="mt-1">
              <span
				  :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  product?.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]"
			  >
                {{
					  product?.stock > 0 ?
						  'En stock' :
						  'Sin stock'
				  }}
              </span>
						</div>
					</div>

					<!-- Product description -->
					<div class="mt-6">
						<p class="text-gray-700">
							{{
								product?.descripcion || 'Potente y versátil, con pantalla de alta resolución. Conéctate con WiFi y Bluetooth. Batería de larga duración y acceso a miles de apps. ¡Compra online al mejor precio!'
							}}
						</p>
					</div>

					<!-- Brand logo -->
					<div class="mt-6 flex">
						<img
							v-if="product?.marca"
							:alt="product.marca"
							:src="`/images/brands/${product.marca.toLowerCase()}.png`"
							class="h-8 object-contain"
							onerror="this.style.display='none'"
						/>
						<span v-else
							class="text-xl font-bold text-gray-500">{{ product?.marca || 'MARCA' }}</span>
					</div>

					<!-- Quantity selector -->
					<div class="mt-6 flex items-center">
						<label class="mr-3 text-sm font-medium text-gray-700"
							for="quantity">Cant.:
						</label>
						<select
							id="quantity"
							v-model="quantity"
							class="rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>

					<!-- Add to cart button -->
					<button
						v-if="product"
						:class="[
              'mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
              product.stock > 0
                ? 'bg-blue-900 hover:bg-blue-800 focus:ring-blue-500'
                : 'bg-gray-300 cursor-not-allowed'
            ]"
						:disabled="product.stock <= 0"
						:title="product.stock <= 0 ? 'Producto sin stock' : ''"
						@click="addToCart"
					>
						<svg class="h-5 w-5 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
							/>
						</svg>
						{{
							product.stock > 0 ?
								'AGREGAR AL CARRITO' :
								'SIN STOCK'
						}}
					</button>

					<!-- Payment options -->
					<div class="mt-6 flex flex-wrap gap-2">
						<div class="flex items-center">
							<span class="text-sm text-gray-700 mr-2">18 x Gs. {{
									Math.round(product?.precio / 18)
								}}</span>
							<svg class="h-4 w-4 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path d="M19 9l-7 7-7-7"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"></path>
							</svg>
						</div>

						<button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium">
							FINANCIAR
						</button>

						<button class="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium flex items-center">
							<svg class="h-4 w-4 mr-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"></path>
							</svg>
							CONSULTAR
						</button>
					</div>


				</div>
			</div>
		</div>
		<ProductComments :is-logged-in="true"
			:product-id="codigo"></ProductComments>
	</NuxtLayout>
</template>

<style scoped>
/* Add any additional styles here */
</style>
