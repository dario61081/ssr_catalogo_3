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
				:aria-label="isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'"
				class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
				@click.prevent="toggleFavorite"
			>
				<i
					:class="[isFavorite ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-400']"
					class="pi"
				></i>
			</button>
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
				<h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2 hover:text-gray-600">
					{{ product.nombre }}
				</h3>
			</NuxtLink>

			<div class="mt-2">
				<p class="text-lg font-bold text-gray-900">
					Gs. {{ formatPrice(product.precio) }}
				</p>
			</div>


			<!-- Botón de añadir al carrito en la parte inferior -->
			<div class="mt-auto pt-3">
				<button
					v-if="product.stock > 0"
					class="add-to-cart-btn w-full bg-gray-700 hover:bg-gray-800 text-white text-sm py-2 px-3 rounded-md flex items-center justify-center transition-colors duration-200"
					@click="addToCart"
					@mouseenter="showCartHint = true"
					@mouseleave="showCartHint = false"
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

const props = defineProps<{
	product: Producto
}>();

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
		// Crear elemento animado que "vuela" hacia el carrito
		const productCard = document.querySelector('.product-card') as HTMLElement;
		const cartButton = document.querySelector('.pi-shopping-cart') as HTMLElement;

		if (productCard && cartButton) {
			// Crear elemento para la animación
			const flyingCart = document.createElement('div');
			flyingCart.className = 'flying-cart-item';
			flyingCart.innerHTML = '<i class="pi pi-shopping-cart"></i>';
			document.body.appendChild(flyingCart);

			// Posición inicial (desde el botón)
			const buttonRect = productCard.getBoundingClientRect();
			flyingCart.style.top = `${buttonRect.top + window.scrollY}px`;
			flyingCart.style.left = `${buttonRect.left + buttonRect.width / 2}px`;

			// Añadir clase para iniciar la animación
			setTimeout(() => {
				flyingCart.classList.add('flying-animation');

				// Posición final (el carrito en el header)
				const cartRect = cartButton.getBoundingClientRect();
				flyingCart.style.top = `${cartRect.top + window.scrollY}px`;
				flyingCart.style.left = `${cartRect.left + cartRect.width / 2}px`;

				// Eliminar el elemento después de la animación
				setTimeout(() => {
					document.body.removeChild(flyingCart);
				}, 1000);
			}, 10);
		}

		// Añadir al carrito
		cartStore.addToCart(props.product, 1);
		emitter.emit('product:addToCart', {product: props.product, quantity: 1});
		emitter.emit('cart:update', undefined);
	}
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

/* Animación del botón de añadir */
.add-to-cart-btn {
	position: relative;
	overflow: hidden;
	transition: transform 0.3s ease;
}

.add-to-cart-btn:hover {
	transform: scale(1.05);
	animation: wiggle 0.5s ease;
}

.add-to-cart-btn:active {
	transform: scale(0.95);
}

@keyframes wiggle {
	0%, 100% {
		transform: scale(1.05) rotate(0deg);
	}
	25% {
		transform: scale(1.05) rotate(-5deg);
	}
	50% {
		transform: scale(1.05) rotate(0deg);
	}
	75% {
		transform: scale(1.05) rotate(5deg);
	}
}

/* Elemento animado que vuela hacia el carrito */
.flying-cart-item {
	position: fixed;
	z-index: 9999;
	width: 30px;
	height: 30px;
	background-color: #4B5563;
	color: white;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: translate(-50%, -50%) scale(0.5);
	opacity: 0.9;
	pointer-events: none;
}

.flying-animation {
	transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	transform: translate(-50%, -50%) scale(0.2);
	opacity: 0;
}
</style>
