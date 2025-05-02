<template>
	<div class="cart-page">
		<div class="container mx-auto max-w-6xl px-4 py-6">
			<!-- Breadcrumb -->
			<BreadCrumb :items="[{ text: 'Carrito de Compras' }]" class="mb-6" />

			<h1 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
				<i class="pi pi-shopping-cart text-gray-500 mr-2"></i>
				Mi Carrito
			</h1>

			<div v-if="loading" class="flex justify-center py-16">
				<LoadingSpinner />
			</div>

			<div v-else-if="cartItems.length === 0" class="text-center py-16 bg-gray-50 rounded-lg">
				<div class="text-gray-400 mb-4">
					<i class="pi pi-shopping-cart text-4xl"></i>
				</div>
				<h2 class="text-xl font-semibold text-gray-800 mb-2">Tu carrito está vacío</h2>
				<p class="text-gray-600 mb-4">Explora nuestro catálogo y agrega productos a tu carrito</p>
				<NuxtLink class="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
					to="/catalog">
					Explorar catálogo
				</NuxtLink>
			</div>

			<div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Lista de productos en el carrito -->
				<div class="lg:col-span-2">
					<CartItemsList :items="cartItems" @update-quantity="updateQuantity" @remove-item="removeItem"
						@clear-cart="clearCart" />
				</div>

				<!-- Resumen del pedido -->
				<div class="lg:col-span-1">
					<OrderSummary :subtotal="subtotal" :shipping="shipping" :discount="discount" :total="total"
						:orderId="orderId" :discountCode="discountCode" :discountError="discountError"
						:discountSuccess="discountSuccess" v-model:discountCode="discountCode"
						@apply-discount="applyDiscount" @show-checkout="showCheckoutModal = true" />
				</div>
			</div>
		</div>
	</div>

	<!-- Checkout Modal -->
	<CheckoutModal v-model:show="showCheckoutModal" :items="cartItems" :subtotal="subtotal" :discount="discount"
		:total="total" :orderId="orderId" @confirm-order="confirmOrder" />

	<!-- Order History -->
	<OrderHistory v-if="cartStore.purchaseHistory.length > 0" :orders="cartStore.purchaseHistory" />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useCartStore } from '~/stores/cartStore';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import CartItemsList from '~/components/cart/CartItemsList.vue';
import OrderSummary from '~/components/cart/OrderSummary.vue';
import OrderHistory from '~/components/cart/OrderHistory.vue';
import CheckoutModal from '~/components/cart/CheckoutModal.vue';
import { CartItem } from '~/types';
import { IFormaPago } from '~/types/payments';
import emitter from '~/utils/eventBus';
import { useGenerators } from '~/composables/useGenerators';
import { createConfirmedOrder } from '~/utils/orderUtils';

// Definir título y meta tags para SEO
useHead({
	title: 'Carrito de Compras - Paraná Hogar',
	meta: [
		{
			name: 'description',
			content: 'Revisa los productos en tu carrito de compras, modifica cantidades y procede al pago.'
		}
	]
});

// Store
const cartStore = useCartStore();
const { generateUUID4 } = useGenerators(); // Importar la función generateUUID4 desde utils

// Estado
const loading = ref(true);
const discountCode = ref('');
const discountError = ref('');
const discountSuccess = ref('');
const appliedDiscount = ref(0);
const shipping = ref(0); // El envío siempre será 0
const shippingText = ref('A cotizar'); // Texto de envío a mostrar
const orderId = ref(generateUUID4()); // Example order ID
const showCheckoutModal = ref(false);

// Obtener items del carrito
const cartItems = computed(() => {
	return cartStore.items;
});

// Calcular subtotal
const subtotal = computed(() => {
	return cartStore.totalPrice;
});

// Calcular descuento
const discount = computed(() => {
	return appliedDiscount.value;
});

// Calcular total
const total = computed(() => {
	return subtotal.value + shipping.value - discount.value;
});

// Formatear precio con separadores de miles
const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('es-PY').format(price);
};

// Actualizar cantidad
const updateQuantity = (item: CartItem) => {
	cartStore.updateItemQuantity(item.product.codigo, item.quantity);
	emitter.emit('cart:update', undefined);
};

// Eliminar item del carrito
const removeItem = (productId: number) => {
	cartStore.removeItem(productId);
	emitter.emit('cart:update', undefined);
};

// Vaciar carrito
const clearCart = () => {
	cartStore.clearCart();
	emitter.emit('cart:update', undefined);
};

// Aplicar código de descuento
const applyDiscount = () => {
	discountError.value = '';
	discountSuccess.value = '';

	if (!discountCode.value) {
		discountError.value = 'Por favor, ingresa un código de descuento.';
		return;
	}

	// Simulación de códigos de descuento
	if (discountCode.value.toUpperCase() === 'PARANA10') {
		appliedDiscount.value = subtotal.value * 0.1; // 10% de descuento
		discountSuccess.value = '¡Código aplicado! 10% de descuento.';
	} else if (discountCode.value.toUpperCase() === 'WELCOME20') {
		appliedDiscount.value = subtotal.value * 0.2; // 20% de descuento
		discountSuccess.value = '¡Código aplicado! 20% de descuento.';
	} else {
		discountError.value = 'Código de descuento inválido o expirado.';
	}
};

// Confirmar orden
const confirmOrder = (orderData: any) => {
	// Usar la función de utilidad para crear la orden confirmada con el objeto de método de pago
	const confirmedOrder = createConfirmedOrder({
		...orderData,
		items: cartItems.value,
		paymentMethodObject: orderData.paymentMethodObject || null
	});

	// Guardar la orden confirmada
	cartStore.saveConfirmedOrder(confirmedOrder);

	// Mostrar confirmación
	alert(`Orden #${confirmedOrder.orderId.substring(0, 8)} confirmada. ¡Gracias por tu compra!`);

	// Generar nuevo ID para la próxima orden
	orderId.value = generateUUID4();

	// Limpiar carrito
	clearCart();
};

// Cargar datos al montar el componente
onMounted(() => {
	// Cargar carrito desde localStorage
	cartStore.loadCart();
	loading.value = false;

	// Escuchar eventos de actualización del carrito
	emitter.on('cart:update', () => {
		cartStore.loadCart();
	});

	// El envío siempre es "A cotizar" (valor 0)
	shipping.value = 0;
});
</script>
