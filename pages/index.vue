<template>
	<div>
		<div class="container mx-auto max-w-6xl px-4 py-6">
			<LazyIndexHero/>
			<LazyIndexCategoriesGrid/>
			<LazyIndexTop20Products/>

		</div>
	</div>
	<LazyProductModalPreview :isOpen="showProductPreview"
		:productId="selectedProductId"
		@close="showProductPreview = false"/>
</template>

<script lang="ts"
	setup>
import {onMounted, onUnmounted, ref} from 'vue';
import emitter from '~/utils/eventBus';

// Definir título y meta tags para SEO
useHead({
	title: 'Bienvenidos a Paraná Hogar',
	meta: [
		{
			name: 'description',
			content: 'Tienda online de muebles, electrodomésticos y artículos para el hogar con los mejores precios y calidad.'
		}
	]
});


const showProductPreview = ref(false);
const selectedProductId = ref(null);

onMounted(() => {
	emitter.on('product:preview', (codigo) => {
		selectedProductId.value = codigo;
		showProductPreview.value = true;
	});
});
onUnmounted(() => {
	emitter.off('product:preview');
});


</script>
