<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
import ProductCard from './ProductCard.vue'
import {Producto} from '~/types'
import {useProductoStore} from '~/stores/productoStore'

export default defineComponent({
	name: "ProductModalPreview",
	components: {
		ProductCard
	},
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		productId: {
			type: String,
			default: ''
		}
	},
	emits: ['close'],
	setup(props,
		  {emit}) {
		const product = ref<Producto | null>(null);
		const isLoading = ref(false);
		const error = ref<string | null>(null);

		// Función para cargar los datos del producto
		const loadProduct = async (id: string) => {
			if (!id) return;

			isLoading.value = true;
			error.value = null;

			try {
				// Aquí deberíamos obtener el producto desde la API o el store
				// Por ejemplo:
				// const response = await fetch(`/api/products/${id}`);
				// product.value = await response.json();

				// Como alternativa, si tenemos un store de productos:
				const productoStore = useProductoStore();
				product.value = await productoStore.getProductoById(id);
			} catch (err) {
				console.error('Error al cargar el producto:', err);
				error.value = 'No se pudo cargar el producto';
			} finally {
				isLoading.value = false;
			}
		};

		// Observar cambios en el ID del producto para cargar los datos
		watch(() => props.productId, (newId) => {
			if (newId) {
				loadProduct(newId);
			} else {
				product.value = null;
			}
		}, {immediate: true});

		// Observar el estado del modal
		watch(() => props.isOpen, (isOpen) => {
			if (isOpen && props.productId) {
				loadProduct(props.productId);
			}
		});

		// Función para cerrar el modal
		const closeModal = () => {
			emit('close');
		};

		// Escuchar eventos de teclas para cerrar con ESC
		if (process.client) {
			window.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' && props.isOpen) {
					closeModal();
				}
			});
		}

		return {
			product,
			isLoading,
			error,
			closeModal
		};
	}
});
</script>

<template>
	<div v-if="isOpen"
		class="product-modal-overlay"
		@click.self="closeModal">
		<div class="product-modal-container">
			<div class="product-modal-header">
				<h2 class="product-modal-title">Vista previa del producto</h2>
				<button class="product-modal-close"
					@click="closeModal">
					<i class="pi pi-times"></i>
				</button>
			</div>
			<div class="product-modal-body">
				<ProductCard v-if="product"
					:product="product"/>
				<div v-else
					class="product-modal-loading">
					<p>Cargando producto...</p>
				</div>
			</div>
			<div class="product-modal-footer">
				<button class="product-modal-button secondary"
					@click="closeModal">Cerrar
				</button>
				<NuxtLink v-if="product"
					:to="`/product/${product.codigo}`"
					class="product-modal-button primary">
					Ver detalles completos
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
.product-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	padding: 1rem;
}

.product-modal-container {
	background-color: white;
	border-radius: 0.5rem;
	width: 100%;
	max-width: 500px;
	max-height: 90vh;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	border-bottom: 1px solid #e5e7eb;
}

.product-modal-title {
	font-size: 1.25rem;
	font-weight: 600;
	color: #111827;
	margin: 0;
}

.product-modal-close {
	background: none;
	border: none;
	cursor: pointer;
	color: #6b7280;
	font-size: 1.25rem;
	padding: 0.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.25rem;
}

.product-modal-close:hover {
	background-color: #f3f4f6;
	color: #111827;
}

.product-modal-body {
	padding: 1rem;
	flex-grow: 1;
}

.product-modal-loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	color: #6b7280;
}

.product-modal-footer {
	display: flex;
	justify-content: flex-end;
	gap: 0.5rem;
	padding: 1rem;
	border-top: 1px solid #e5e7eb;
}

.product-modal-button {
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	font-weight: 500;
	cursor: pointer;
	text-decoration: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.product-modal-button.primary {
	background-color: #4b5563;
	color: white;
	border: none;
}

.product-modal-button.primary:hover {
	background-color: #374151;
}

.product-modal-button.secondary {
	background-color: white;
	color: #4b5563;
	border: 1px solid #d1d5db;
}

.product-modal-button.secondary:hover {
	background-color: #f9fafb;
}
</style>
