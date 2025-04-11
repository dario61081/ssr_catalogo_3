<template>
	<div class="product-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
		<!-- Imagen del producto -->
		<div class="relative pt-[100%] overflow-hidden">
			<NuxtLink :to="`/product/${product.codigo}`"
				class="block">
				<img
					:alt="product.nombre"
					:src="product.imagen"
					class="absolute inset-0 w-full h-full object-contain p-4"
					loading="lazy"
				/>
			</NuxtLink>

			<!-- Etiqueta de stock -->
			<div
				v-if="product.stock > 0"
				class="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full"
			>
				En stock
			</div>
			<div
				v-else
				class="absolute top-2 left-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full"
			>
				Sin stock
			</div>

			<!-- Botón de favoritos -->
			<button
				v-if="showActions"
				:aria-label="isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'"
				class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
				@click.prevent="toggleFavorite"
			>
				<i
					:class="[isFavorite ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-400']"
					class="pi"
				></i>
			</button>
			<!-- Botón de vista previa -->
			<button
				v-if="showActions"
				aria-label="Vista previa rápida"
				class="absolute top-14 right-2 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
				@click.prevent="openPreview"
			>
				<i class="pi pi-eye text-gray-400"></i>
			</button>
			<!--			<button-->
			<!--				v-if="showActions"-->
			<!--				:title="JSON.stringify(product)"-->
			<!--				aria-label="Debug"-->
			<!--				class="absolute top-28 right-2 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"-->
			<!--				@click.prevent="openPreview"-->
			<!--			>-->
			<!--				<i class="pi pi-search text-gray-400"></i>-->

			<!--			</button>-->

		</div>

		<!-- Información del producto -->
		<div class="p-4 flex flex-col h-full">
			<div class="mt-1">

				<ProductRating :rating="Math.floor(Math.random() * (5 - 3 + 1) + 3)"></ProductRating>
			</div>
			<div class="mb-2">
				<p class="text-xs text-gray-500">{{ product.desc_division }}</p>
			</div>

			<NuxtLink :to="`/product/${product.codigo}`"
				class="block">
				<h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2 min-h-[40px] overflow-hidden hover:text-gray-600">
					{{ product.nombre }}
				</h3>
			</NuxtLink>

			<div class="mt-2">
				<p class="text-lg font-bold text-gray-900">
					Gs. {{ formatPrice(product.precio) }}
				</p>
			</div>


			<!-- Botón de añadir al carrito en la parte inferior -->
			<div class="mt-auto pt-1 flex flex-row">
				<button
					v-if="product.stock > 0"
					class="add-to-cart-btn w-full bg-gray-700 hover:bg-gray-800 text-white text-sm py-2 px-3 rounded-md flex items-center justify-center"
					@click="addToCart"
				>
					<i class="pi pi-shopping-cart mr-1"></i>
					<span>Añadir</span>
				</button>
				<button
					v-else
					class="w-full bg-gray-300 text-gray-600 text-sm py-2 px-3 rounded-md flex items-center justify-center cursor-not-allowed"
					disabled
				>
					<i class="pi pi-shopping-cart mr-1"></i>
					<span>Agotado</span>
				</button>
				<!--				<ActionButtonWhatsapp :product="product"></ActionButtonWhatsapp>-->
			</div>
		</div>
	</div>
</template>

<script lang="ts"
	setup>
import {computed, ref} from 'vue';
import {Producto} from '~/types';
import {useFavoritesStore} from '~/stores/favoritesStore';
import {useCartStore} from '~/stores/cartStore';
import emitter from '~/utils/eventBus';
import ProductRating from "~/components/ProductRating.vue";

const props = withDefaults(defineProps<{
	product: Producto;
	showActions?: boolean;
}>(), {
	showActions: true
});

const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
const showCartHint = ref(false);

// Comprobar si el producto está en favoritos
const isFavorite = computed(() => {
	return favoritesStore.isFavorite(props.product.codigo);
});

// Formatear precio con separadores de miles
const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('es-PY').format(price);
};

// Añadir o quitar de favoritos
const toggleFavorite = () => {
	if (isFavorite.value) {
		favoritesStore.removeFavorite(props.product.codigo);
		emitter.emit('product:removeFromFavorites', {productId: props.product.codigo});
	} else {
		favoritesStore.addFavorite(props.product);
		emitter.emit('product:addToFavorites', {productId: props.product.codigo});
	}

	// Notificar actualización de favoritos
	emitter.emit('favorites:update', undefined);
};

// Añadir al carrito
const addToCart = () => {
	if (props.product.stock > 0) {
		// Añadir al carrito
		cartStore.addToCart(props.product, 1);
		emitter.emit('product:addToCart', {product: props.product, quantity: 1});
		emitter.emit('cart:update', undefined);
	}
};

const openPreview = () => {
	emitter.emit('product:preview', props.product.codigo);
};
</script>

<style scoped>
.product-card {
	height: 100%;
	display: flex;
	flex-direction: column;
	width: 100%;
}

.product-card img {
	transition: transform 0.3s ease;
}

.product-card:hover img {
	transform: scale(1.05);
}
</style>
