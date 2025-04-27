<template>
	<div
		class="product-card-small bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden scale-90">
		<!-- Imagen del producto -->
		<div class="relative pt-[100%] overflow-hidden">
			<NuxtLink :to="`/product/${product.codigo}`"
				class="block"
				@click.right.prevent="openPreview"
				@click.ctrl.prevent="openPreview"
				@click.meta.prevent="openPreview">
				<img :alt="product.nombre"
					:src="product.imagen"
					class="absolute inset-0 w-full h-full object-contain p-3"
					loading="lazy"/>
			</NuxtLink>

			<!-- Etiqueta de stock -->
			<div v-if="product.stock > 0"
				class="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
				En stock
			</div>
			<div v-else
				class="absolute top-2 left-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
				Sin stock
			</div>

			<!-- Botón de favoritos funcional -->
			<button :aria-label="isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'"
				class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
				@click.prevent="toggleFavorite">
				<i :class="[isFavorite ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-400']"
					class="pi"></i>
			</button>
			<!-- Botón de vista previa funcional -->
			<button aria-label="Vista previa rápida"
				class="absolute top-14 right-2 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
				@click.prevent="openPreview">
				<i class="pi pi-eye text-gray-400"></i>
			</button>
		</div>

		<!-- Información del producto -->
		<div class="p-3 flex flex-col h-full">
			<div class="mt-1">
				<ProductRating :rating="Math.floor(Math.random() * (5 - 3 + 1) + 3)"></ProductRating>
			</div>
			<div class="mb-2">
				<p class="text-xs text-gray-500">{{ product.desc_division }}</p>
			</div>

			<NuxtLink :to="`/product/${product.codigo}`"
				class="block"
				@click.right.prevent="openPreview"
				@click.ctrl.prevent="openPreview"
				@click.meta.prevent="openPreview">
				<h3
					class="text-xs font-medium text-gray-900 mb-1 line-clamp-2 min-h-[36px] overflow-hidden hover:text-gray-600">
					{{ product.nombre }}
				</h3>
			</NuxtLink>

			<div class="mt-2">
				<p class="text-base font-bold text-gray-900">
					{{ formatPrice(product.precio) }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts"
	setup>
import {computed} from 'vue';
import {Producto} from '~/types';
import {useFavoritesStore} from '~/stores/favoritesStore';
import emitter from '~/utils/eventBus';
import ProductRating from "~/components/ProductRating.vue";

const props = defineProps<{ product: Producto }>();
const favoritesStore = useFavoritesStore();

// Computed para saber si es favorito
const isFavorite = computed(() => favoritesStore.isFavorite(props.product.codigo));

// Acción para añadir/quitar de favoritos
const toggleFavorite = () => {
	if (isFavorite.value) {
		favoritesStore.removeFavorite(props.product.codigo);
		emitter.emit('product:removeFromFavorites', {productId: props.product.codigo});
	} else {
		favoritesStore.addFavorite(props.product);
		emitter.emit('product:addToFavorites', {productId: props.product.codigo});
	}
	emitter.emit('favorites:update', undefined);
};

// Acción para abrir detalles (vista previa)
const openPreview = () => {
	emitter.emit('product:preview', props.product.codigo);
};

// Formatear precio con separadores de miles y símbolo de moneda
const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('es-PY', {style: 'currency', currency: 'PYG', minimumFractionDigits: 0}).format(price);
};
</script>

<style scoped>
.product-card-small {
	height: 90%;
	width: 90%;
	display: flex;
	flex-direction: column;
	font-size: 90%;
}

.product-card-small img {
	transition: transform 0.3s ease;
}

.product-card-small:hover img {
	transform: scale(1.05);
}
</style>
