<template>
	<div class="product-detail">
		<div v-if="loading"
			class="flex justify-center items-center py-16">
			<LoadingSpinner/>
		</div>

		<div v-else-if="error"
			class="text-center py-16">
			<div class="text-red-500 mb-4">
				<i class="pi pi-exclamation-triangle text-4xl"></i>
			</div>
			<h2 class="text-xl font-semibold text-gray-800 mb-2">Error al cargar el producto</h2>
			<p class="text-gray-600">{{ error }}</p>
			<NuxtLink class="mt-4 inline-block bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
				to="/catalog">
				Volver al catálogo
			</NuxtLink>
		</div>

		<div v-else-if="product"
			class="bg-white rounded-lg shadow-sm overflow-hidden">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
				<!-- Galería de imágenes -->
				<div class="product-gallery">
					<div class="main-image-container mb-4 border rounded-lg overflow-hidden">
						<img
							:alt="product.nombre"
							:src="currentImage"
							class="w-full h-auto object-contain"
							style="min-height: 300px; max-height: 500px;"
						/>
					</div>

					<div class="thumbnails-container flex space-x-2 overflow-x-auto pb-2">
						<button
							v-for="(image, index) in productImages"
							:key="index"
							:class="{ 'border-gray-500 border-2': currentImageIndex === index }"
							class="thumbnail-item min-w-[80px] h-20 border rounded-md overflow-hidden cursor-pointer"
							@click="setCurrentImage(index)"
						>
							<img
								:alt="`${product.nombre} - Imagen ${index + 1}`"
								:src="image"
								class="w-full h-full object-contain"
							/>
						</button>
					</div>
				</div>

				<!-- Información del producto -->
				<div class="product-info">
					<div class="mb-4">
						<p class="text-sm text-gray-500 mb-1">{{ product.desc_division }} > {{
								product.desc_categoria
							}}</p>
						<h1 class="text-2xl font-bold text-gray-900 mb-2">{{ product.nombre }}</h1>

						<ProductRating :rating="Math.floor(Math.random() * (5 - 3 + 1) + 3)"></ProductRating>
						<div class="flex items-center mb-4">
							<p class="text-3xl font-bold text-gray-900">
								Gs. {{ formatPrice(product.precio) }}
							</p>
						</div>

						<div class="stock-info mb-4">
							<p v-if="product.stock > 0"
								class="text-green-600 flex items-center">
								<i class="pi pi-check-circle mr-1"></i>
								En stock ({{ product.stock }} disponibles)
							</p>
							<p v-else
								class="text-red-600 flex items-center">
								<i class="pi pi-times-circle mr-1"></i>
								Sin stock
							</p>
						</div>

						<!-- Cantidad y botones de acción -->
						<div class="mt-6">
							<div class="mb-4">
								<label class="block text-sm font-medium text-gray-700 mb-1"
									for="quantity">Cantidad
								</label>
								<div class="flex items-center">
									<button
										:disabled="quantity <= 1"
										class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-l-md border border-gray-300"
										@click="decrementQuantity"
									>
										<i class="pi pi-minus"></i>
									</button>
									<input
										id="quantity"
										v-model="quantity"
										:max="product.stock"
										class="w-16 text-center py-2 border-t border-b border-gray-300"
										min="1"
										type="number"
									/>
									<button
										:disabled="product.stock <= quantity"
										class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-r-md border border-gray-300"
										@click="incrementQuantity"
									>
										<i class="pi pi-plus"></i>
									</button>
								</div>
							</div>

							<div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
								<button
									:class="{ 'opacity-50 cursor-not-allowed': product.stock <= 0 }"
									:disabled="product.stock <= 0"
									class="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-md flex items-center justify-center transition-colors"
									@click="addToCart"
								>
									<i class="pi pi-shopping-cart mr-2"></i>
									Añadir al carrito
								</button>

								<button
									class="flex-1 sm:flex-none border border-gray-300 text-gray-700 py-3 px-4 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
									@click="toggleFavorite"
								>
									<i
										:class="[isFavorite ? 'pi-heart-fill text-red-500' : 'pi-heart']"
										class="pi mr-2"
									></i>
									{{
										isFavorite ?
											'Quitar de favoritos' :
											'Añadir a favoritos'
									}}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Descripción y detalles -->
			<div class="border-t border-gray-200 p-6">
				<div class="mb-8">
					<h2 class="text-xl font-semibold text-gray-900 mb-4">Descripción</h2>
					<h1 class="text-gray-700">
						{{ product.nombre }}
					</h1>
				</div>

				<div>
					<h2 class="text-xl font-semibold text-gray-900 mb-4">Detalles del producto</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="flex">
							<div class="w-1/3 font-medium text-gray-700">Código:</div>
							<div class="w-2/3 text-gray-600">{{ product.codigo_alfanum }}</div>
						</div>
						<div class="flex">
							<div class="w-1/3 font-medium text-gray-700">Categoría:</div>
							<div class="w-2/3 text-gray-600">{{ product.desc_division }}</div>
						</div>
						<div class="flex">
							<div class="w-1/3 font-medium text-gray-700">Subcategoría:</div>
							<div class="w-2/3 text-gray-600">{{ product.desc_categoria }}</div>
						</div>
						<div class="flex">
							<div class="w-1/3 font-medium text-gray-700">Disponibilidad:</div>
							<div class="w-2/3 text-gray-600">{{
									product.stock > 0 ?
										'En stock' :
										'Sin stock'
								}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Productos relacionados -->
		<div v-if="relatedProducts && relatedProducts.length > 0" class="mt-12">
			<h2 class="text-xl font-semibold text-gray-900 mb-6">Productos relacionados</h2>
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				<ProductCard
					v-for="relatedProduct in relatedProducts"
					:key="relatedProduct.codigo"
					:product="relatedProduct"
					:showActions="true"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts"
	setup>
import {computed, onMounted, ref} from 'vue';
import {Producto} from '~/types';
import {useProductoStore} from '~/stores/productoStore';
import {useFavoritesStore} from '~/stores/favoritesStore';
import {useCartStore} from '~/stores/cartStore';
import emitter from '~/utils/eventBus';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import ProductRating from "~/components/ProductRating.vue";

const props = withDefaults(defineProps<{
	productId: number;
	relatedProducts?: Producto[];
}>(), {
	relatedProducts: () => []
});

const productoStore = useProductoStore();
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

const product = ref<Producto | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const quantity = ref(1);
const currentImageIndex = ref(0);

// Cargar el producto
onMounted(async () => {
	try {
		loading.value = true;
		error.value = null;

		console.log(`Intentando cargar producto con ID: ${props.productId}`);

		if (!props.productId) {
			error.value = 'ID de producto no válido';
			console.error('ID de producto no válido:', props.productId);
			return;
		}

		const productData = await productoStore.fetchProductoById(props.productId);
		console.log('Datos del producto recibidos:', productData);

		if (productData) {
			product.value = productData;
			// Registrar el producto como visto
			productoStore.agregarProductoVisto(productData);

			// Inicializar la cantidad a 1
			quantity.value = 1;

			// Resetear el índice de imagen actual
			currentImageIndex.value = 0;

			// Notificar a través del event bus
			emitter.emit('product:view', {productId: props.productId});
		} else {
			error.value = 'No se encontró el producto solicitado.';
			console.error('Producto no encontrado con ID:', props.productId);
		}
	} catch (err) {
		console.error('Error al cargar producto:', err);
		error.value = 'Error al cargar el producto. Por favor, intente nuevamente.';
	} finally {
		loading.value = false;
	}
});

// Comprobar si el producto está en favoritos
const isFavorite = computed(() => {
	if (!product.value) return false;
	return favoritesStore.isFavorite(product.value.codigo);
});

// Formatear precio con separadores de miles
const formatPrice = (price: number | string): string => {
	const numericPrice = typeof price === 'string' ? parseInt(price.replace(/\./g, '')) : price;
	return new Intl.NumberFormat('es-PY').format(numericPrice);
};

// Obtener imágenes del producto
const productImages = computed(() => {
	if (!product.value) return [];

	const images = [product.value.imagen];

	if (product.value.imagen_2) {
		images.push(product.value.imagen_2);
	}

	if (product.value.imagen_3) {
		images.push(product.value.imagen_3);
	}

	return images.filter(img => img && img.trim() !== '');
});

// Imagen actual
const currentImage = computed(() => {
	if (productImages.value.length === 0) return '';
	return productImages.value[currentImageIndex.value];
});

// Cambiar imagen actual
const setCurrentImage = (index: number) => {
	currentImageIndex.value = index;
};

// Incrementar cantidad
const incrementQuantity = () => {
	if (product.value && quantity.value < product.value.stock) {
		quantity.value++;
	}
};

// Decrementar cantidad
const decrementQuantity = () => {
	if (quantity.value > 1) {
		quantity.value--;
	}
};

// Añadir o quitar de favoritos
const toggleFavorite = () => {
	if (!product.value) return;

	if (isFavorite.value) {
		favoritesStore.removeFavorite(product.value.codigo);
		emitter.emit('product:removeFromFavorites', {productId: product.value.codigo});
	} else {
		favoritesStore.addFavorite(product.value);
		emitter.emit('product:addToFavorites', {productId: product.value.codigo});
	}

	// Notificar actualización de favoritos
	emitter.emit('favorites:update', undefined);
};

// Añadir al carrito
const addToCart = () => {
	if (!product.value || product.value.stock <= 0) return;

	cartStore.addToCart(product.value, quantity.value);
	emitter.emit('product:addToCart', {product: product.value, quantity: quantity.value});
	emitter.emit('cart:update', undefined);
};
</script>
