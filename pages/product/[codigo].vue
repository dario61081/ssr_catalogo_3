<template>
	<div class="product-page">

		<div class="container mx-auto max-w-6xl px-4 py-6">
			<!-- Breadcrumb -->
			<BreadCrumb :items="breadcrumbItems"
				class="mb-6"/>

			<ProductDetail
				v-if="productId"
				:productId="productId"
				:relatedProducts="relatedProducts"
			/>

			<div v-else
				class="text-center py-16">
				<div class="text-red-500 mb-4">
					<i class="pi pi-exclamation-triangle text-4xl"></i>
				</div>
				<h2 class="text-xl font-semibold text-gray-800 mb-2">Producto no encontrado</h2>
				<p class="text-gray-600 mb-4">El producto que estás buscando no existe o ha sido eliminado.</p>
				<NuxtLink
					class="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
					to="/catalog"
				>
					Volver al catálogo
				</NuxtLink>

				
			</div>
		</div>
	</div>
</template>

<script lang="ts"
	setup>
import {computed, onMounted, ref, watch} from 'vue';
// import {useRoute} from 'vue-router';
import {useProductoStore} from '~/stores/productoStore';
import type {Producto} from '~/types';

const route = useRoute();
const productoStore = useProductoStore();

// Estado
const product = ref<Producto | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const relatedProducts = ref<Producto[]>([]);

// ID del producto desde la URL
const productId = computed(() => {
	const codigo = useRoute().params.codigo;
	if (!codigo) return null;

	const id = parseInt(codigo as string);
	console.log('ID del producto extraído de la URL:', id);

	// Verificar que sea un número válido
	if (isNaN(id)) {
		console.error('ID de producto no válido:', codigo);
		return null;
	}

	return id;
});

// Items para el breadcrumb
const breadcrumbItems = computed(() => {
	const items = [
		{text: 'Catálogo', link: '/catalog'}
	];

	if (product.value) {
		// Añadir categoría
		items.push({
			text: product.value.desc_division,
			link: `/catalog?cat=${product.value.codigo_division}`
		});

		// Añadir subcategoría
		items.push({
			text: product.value.desc_categoria,
			link: `/catalog?cat=${product.value.codigo_division}&subcat=${product.value.codigo_categoria}`
		});

		// Añadir nombre del producto
		// items.push({
		// 	text: product.value.nombre
		// });
	}

	return items;
});

// Cargar datos del producto
const loadProduct = async () => {
	if (!productId.value) {
		console.error('No se puede cargar el producto: ID no válido');
		return;
	}

	try {
		loading.value = true;
		error.value = null;

		console.log(`Cargando producto con ID: ${productId.value}`);

		// Cargar producto
		console.log('Producto cargado:', product.value);
		product.value = await productoStore.fetchProductoById(productId.value);


		if (product.value) {
			// Actualizar título y meta tags para SEO
			useHead({
				title: `${product.value.nombre} - Paraná Hogar`,
				meta: [
					{
						name: 'description',
						content: `${product.value.nombre} - ${product.value.desc_division} - ${product.value.desc_categoria}`
					},
					{
						property: 'og:type',
						content: 'product'
					},
					{
						property: 'og:title',
						content: product.value.nombre
					},
					{
						property: 'og:description',
						content: `${product.value.nombre} - ${product.value.desc_division} - ${product.value.desc_categoria}`
					},
					{
						property: 'og:image',
						content: product.value.imagen
					},
					{
						property: 'og:url',
						content: `https://www.casa-parana.com/product/${product.value.codigo}`
					},
					{
						property: 'og:site_name',
						content: 'Casa Paraná'
					}
				]
			});

			// Cargar productos relacionados (misma categoría)
			// await loadRelatedProducts();
		} else {
			console.error(`No se encontró el producto con ID: ${productId.value}`);
		}
	} catch (err) {
		console.error('Error al cargar producto:', err);
		error.value = 'Error al cargar el producto. Por favor, intente nuevamente.';
	} finally {
		loading.value = false;
	}
};

// Cargar productos relacionados
const loadRelatedProducts = async () => {
	if (!product.value) {
		console.error('No se pueden cargar productos relacionados: producto principal no disponible');
		return;
	}

	try {
		console.log('Cargando productos relacionados para la categoría:', product.value.codigo_division);

		// Asegurarse de que los productos estén cargados
		if (productoStore.productos.length === 0) {
			console.log('No hay productos en el store, cargando todos los productos...');
			await productoStore.fetchProductos();
		}

		// Obtener productos de la misma categoría
		const sameCategoryProducts = productoStore.productos.filter(p =>
			p.codigo_division === product.value?.codigo_division &&
			p.codigo !== product.value?.codigo
		);

		console.log(`Encontrados ${sameCategoryProducts.length} productos relacionados`);

		// Limitar a 4 productos relacionados
		relatedProducts.value = sameCategoryProducts.slice(0, 4);
	} catch (err) {
		console.error('Error al cargar productos relacionados:', err);
		// No establecemos error.value aquí para no afectar la visualización del producto principal
	}
};

// Observar cambios en el ID del producto para recargar datos
watch(() => route.params.codigo, () => {
	loadProduct();
});

// Cargar datos al montar el componente
onMounted(() => {
	loadProduct();
});
</script>
