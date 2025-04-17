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
					<div class="bg-white rounded-lg shadow-sm overflow-hidden">
						<div class="p-4 border-b flex justify-between items-center">
							<h2 class="text-lg font-semibold text-gray-900">Productos en tu carrito</h2>
							<button class="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
								@click="clearCart">
								<i class="pi pi-trash mr-1"></i>
								Vaciar carrito
							</button>
						</div>

						<div class="divide-y">
							<div v-for="item in cartItems" :key="item.product.codigo"
								class="p-4 flex flex-col sm:flex-row">
								<!-- Imagen del producto -->
								<div class="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
									<NuxtLink :to="`/product/${item.product.codigo}`">
										<img :alt="item.product.nombre" :src="item.product.imagen"
											class="w-full h-full object-contain" />
									</NuxtLink>
								</div>

								<!-- Información del producto -->
								<div class="sm:ml-4 flex-grow">
									<div class="flex flex-col sm:flex-row justify-between">
										<div>
											<NuxtLink :to="`/product/${item.product.codigo}`"
												class="text-sm font-medium text-gray-900 hover:text-gray-600">
												{{ item.product.nombre }}
											</NuxtLink>
											<p class="text-xs text-gray-500 mt-1">{{ item.product.desc_division }}</p>
										</div>

										<div class="mt-2 sm:mt-0 text-right">
											<p class="text-sm font-medium text-gray-900">
												Gs. {{ formatPrice(item.product.precio) }}
											</p>
										</div>
									</div>

									<div class="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
										<!-- Control de cantidad -->
										<div class="flex items-center">
											<button :disabled="item.quantity <= 1"
												class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-l-md border border-gray-300"
												@click="decrementQuantity(item)">
												<i class="pi pi-minus"></i>
											</button>
											<input v-model="item.quantity" :max="item.product.stock"
												class="w-12 text-center py-1 border-t border-b border-gray-300" min="1"
												type="number" @change="updateQuantity(item)" />
											<button :disabled="item.product.stock <= item.quantity"
												class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-r-md border border-gray-300"
												@click="incrementQuantity(item)">
												<i class="pi pi-plus"></i>
											</button>
										</div>

										<!-- Subtotal y acciones -->
										<div class="mt-2 sm:mt-0 flex items-center">
											<p class="text-sm font-medium text-gray-900 mr-4">
												Subtotal: Gs. {{
													formatPrice(parseInt(item.product.precio.toString()
														.replace('.', '')) * item.quantity)
												}}
											</p>

											<button aria-label="Eliminar producto"
												class="text-red-600 hover:text-red-800"
												@click="removeItem(item.product.codigo)">
												<i class="pi pi-trash"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Resumen del pedido -->
				<div class="lg:col-span-1">
					<div class="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
						<div class="p-4 border-b">
							<h2 class="text-lg font-semibold text-gray-900">Resumen del pedido</h2>
						</div>

						<div class="p-4">
							<!-- Order ID -->
							<div class="flex justify-between mb-4 pb-4 border-b">
								<span class="text-gray-600">Orden ID</span>
								<span class="font-medium font-mono text-gray-800">{{ orderId }}</span>
							</div>

							<div class="flex justify-between mb-2">
								<span class="text-gray-600">Subtotal</span>
								<span class="font-medium">Gs. {{ formatPrice(subtotal) }}</span>
							</div>

							<div class="flex justify-between mb-2">
								<span class="text-gray-600">Envío</span>
								<span class="font-medium">{{
									shipping > 0 ?
										`Gs. ${formatPrice(shipping)}` :
										'Gratis'
								}}</span>
							</div>

							<div class="flex justify-between mb-4 pb-4 border-b">
								<span class="text-gray-600">Descuento</span>
								<span class="font-medium text-green-600">- Gs. {{ formatPrice(discount) }}</span>
							</div>

							<div class="flex justify-between mb-4">
								<span class="text-lg font-bold text-gray-900">Total</span>
								<span class="text-lg font-bold text-gray-900">Gs. {{ formatPrice(total) }}</span>
							</div>

							<!-- Código de descuento -->
							<div class="mb-4">
								<div class="flex">
									<input v-model="discountCode"
										class="flex-grow p-2 border rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
										placeholder="Código de descuento" type="text" />
									<button
										class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-r-md border border-gray-300 text-sm"
										@click="applyDiscount">
										Aplicar
									</button>
								</div>
								<p v-if="discountError" class="text-red-500 text-xs mt-1">{{ discountError }}</p>
								<p v-if="discountSuccess" class="text-green-500 text-xs mt-1">{{ discountSuccess }}</p>
							</div>

							<!-- Botón de checkout -->
							<button
								class="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-md flex items-center justify-center transition-colors"
								@click="showCheckoutModal = true">
								<i class="pi pi-check-circle mr-2"></i>
								Finalizar compra
							</button>

							<div class="mt-4 text-center">
								<NuxtLink class="text-gray-700 hover:text-gray-800 text-sm font-medium" to="/catalog">
									Continuar comprando
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Checkout Modal -->
	<div v-if="showCheckoutModal"
		class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
		<div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
			<div class="p-4 border-b flex justify-between items-center">
				<h3 class="text-lg font-semibold">Finalizar Compra</h3>
				<button @click="showCheckoutModal = false" class="text-gray-500 hover:text-gray-700">
					<i class="pi pi-times"></i>
				</button>
			</div>

			<div class="p-6">
				<form @submit.prevent="confirmOrder" class="space-y-6">
					<!-- Customer Information -->
					<div class="space-y-4">
						<h4 class="font-medium text-gray-900">Información del Cliente</h4>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">CI o RUC</label>
							<input v-model="customerInfo.ruc" type="text" required
								class="w-full p-2 border rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
							<input v-model="customerInfo.name" type="text" required
								class="w-full p-2 border rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
							<input v-model="customerInfo.telefono" type="text" required
								class="w-full p-2 border rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
							<input v-model="customerInfo.email" type="email" required
								class="w-full p-2 border rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Dirección de envío</label>
							<textarea v-model="customerInfo.address" required rows="3"
								class="w-full p-2 border rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500"></textarea>

							<!-- Geolocation checkbox -->
							<div class="mt-2">
								<label class="flex items-center space-x-2 text-sm text-gray-600">
									<input v-model="useGeolocation" type="checkbox"
										class="rounded border-gray-300 text-gray-700 focus:ring-gray-500">
									<span>Georeferenciar mi ubicación</span>
								</label>
							</div>

							<!-- Map container -->
							<div v-if="useGeolocation" class="mt-3">
								<div id="map" class="h-64 rounded-lg border"></div>
								<p class="text-sm text-gray-500 mt-1">
									Mueve el pin para ajustar tu ubicación exacta
								</p>
								<div v-if="customerInfo.coordinates" class="text-xs text-gray-500 mt-1">
									Coordenadas: {{ customerInfo.coordinates.lat.toFixed(6) }}, {{
										customerInfo.coordinates.lng.toFixed(6) }}
								</div>
							</div>
						</div>
					</div>

					<!-- Payment Methods -->
					<div class="space-y-4">
						<h4 class="font-medium text-gray-900">Método de Pago</h4>
						
						<div class="space-y-2">
							<label class="flex items-center space-x-3">
								<input v-model="customerInfo.paymentMethod" type="radio" value="efectivo contraentrega"
									name="payment">
								<span>Efectivo contraentrega</span>
							</label>
							<label class="flex items-center space-x-3">
								<input v-model="customerInfo.paymentMethod" type="radio" value="tarjeta" name="payment">
								<span>Tarjeta de crédito/débito</span>
							</label>
							<label class="flex items-center space-x-3">
								<input v-model="customerInfo.paymentMethod" type="radio" value="qr" name="payment">
								<span>Pago con QR</span>
							</label>
						</div>
						

						<!-- QR Payment Panel -->
						<div v-if="customerInfo.paymentMethod === 'qr'" class="mt-4 p-4 border rounded-lg">
							<h5 class="font-medium text-gray-900 mb-3">Código QR para pago</h5>
							<div class="flex flex-col items-center">
								<div class="bg-white p-4 rounded-lg shadow-sm border mb-3">
									<!-- Simulated QR code - In production, replace with actual QR generation -->
									<img :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generateQRData())}`"
										alt="QR Code para pago" class="w-48 h-48" />
								</div>
								<p class="text-sm text-gray-600 text-center">
									Escanea este código QR con tu aplicación de pago preferida
								</p>
								<p class="text-sm font-medium text-gray-900 mt-2">
									Monto a pagar: Gs. {{ formatPrice(total) }}
								</p>
								<p v-if="isProcessingPayment" class="text-sm text-gray-600 mt-2">{{ paymentStatus }}</p>
							</div>
						</div>

						<!-- Credit Card Payment Panel -->
						<div v-if="customerInfo.paymentMethod === 'tarjeta'" class="mt-4 p-4 border rounded-lg">
							<h5 class="font-medium text-gray-900 mb-3">Datos de la Tarjeta</h5>
							<div class="space-y-4">
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1">
										Número de Tarjeta
									</label>
									<input v-model="cardInfo.number" type="text" maxlength="19"
										placeholder="1234 5678 9012 3456"
										class="w-full p-2 border rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
										@input="formatCardNumber" />
								</div>
								<div class="grid grid-cols-2 gap-4">
									<div>
										<label class="block text-sm font-medium text-gray-700 mb-1">
											Fecha de Vencimiento
										</label>
										<input v-model="cardInfo.expiry" type="text" maxlength="5" placeholder="MM/YY"
											class="w-full p-2 border rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
											@input="formatExpiryDate" />
									</div>
									<div>
										<label class="block text-sm font-medium text-gray-700 mb-1">
											CVV
										</label>
										<input v-model="cardInfo.cvv" type="password" maxlength="4" placeholder="123"
											class="w-full p-2 border rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500" />
									</div>
								</div>
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1">
										Nombre en la Tarjeta
									</label>
									<input v-model="cardInfo.name" type="text" placeholder="Como aparece en la tarjeta"
										class="w-full p-2 border rounded focus:ring-2 focus:ring-gray-500 focus:border-gray-500" />
								</div>
							</div>
							<p v-if="isProcessingPayment" class="text-sm text-gray-600 mt-2">{{ paymentStatus }}</p>
						</div>
					</div>

					<!-- Order Summary -->
					<div class="border-t pt-4">
						<h4 class="font-medium text-gray-900 mb-2">Resumen</h4>
						<div class="text-sm space-y-1">
							<div class="flex justify-between">
								<span>Subtotal:</span>
								<span>Gs. {{ formatPrice(subtotal) }}</span>
							</div>
							<div class="flex justify-between">
								<span>Envío:</span>
								<span>{{ shipping > 0 ? `Gs. ${formatPrice(shipping)}` : 'Gratis' }}</span>
							</div>
							<div class="flex justify-between">
								<span>Descuento:</span>
								<span class="text-green-600">- Gs. {{ formatPrice(discount) }}</span>
							</div>
							<div class="flex justify-between font-bold mt-2 pt-2 border-t">
								<span>Total:</span>
								<span>Gs. {{ formatPrice(total) }}</span>
							</div>
						</div>
					</div>

					<div class="flex justify-end space-x-3">
						<button type="button" @click="showCheckoutModal = false"
							class="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">
							Cancelar
						</button>
						<button type="submit" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
							Enviar pedido
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- Order History -->
	<div v-if="cartStore.purchaseHistory.length > 0" class="container mx-auto max-w-6xl px-4 mt-8">
		<h2 class="text-xl font-bold text-gray-900 mb-4">Historial de Órdenes</h2>
		<div class="grid gap-4">
			<div v-for="order in cartStore.purchaseHistory" :key="order.orderId"
				class="bg-white rounded-lg shadow-sm p-4">
				<div class="flex justify-between items-start">
					<div>
						<p class="font-medium text-gray-900">Orden #{{ order.orderId }}</p>
						<p class="text-sm text-gray-500">{{ order.date }}</p>
						<p class="text-sm text-gray-600 mt-1">{{ order.customerName }}</p>
						<p class="text-sm text-gray-600">Método de pago: {{ order.paymentMethod }}</p>
					</div>
					<p class="font-medium text-gray-900">Gs. {{ formatPrice(order.total) }}</p>
				</div>
				<div class="mt-4 space-y-2">
					<p class="text-sm font-medium text-gray-700">Productos:</p>
					<div v-for="item in order.items" :key="item.product.codigo"
						class="text-sm text-gray-600 flex justify-between">
						<span>{{ item.product.nombre }} x{{ item.quantity }}</span>
						<span>Gs. {{ formatPrice(item.product.precio * item.quantity) }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch, onBeforeUnmount, nextTick } from 'vue';
import { useCartStore } from '~/stores/cartStore';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import { CartItem } from '~/types';
import emitter from '~/utils/eventBus';
import L from 'leaflet';

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

// Estado
const loading = ref(true);
const discountCode = ref('');
const discountError = ref('');
const discountSuccess = ref('');
const appliedDiscount = ref(0);
const shipping = ref(0);
const orderId = ref('ORD123456'); // Example order ID
const showCheckoutModal = ref(false);
const customerInfo = ref({
	name: '',
	ruc: '',
	telefono: '',
	email: '',
	address: '',
	paymentMethod: 'efectivo contraentrega',
	coordinates: null
});
const cardInfo = ref({
	number: '',
	expiry: '',
	cvv: '',
	name: ''
});
const useGeolocation = ref(false);
const map = ref(null);
const marker = ref(null);

// Payment processing states
const isProcessingPayment = ref(false);
const paymentStatus = ref('');
const qrPaymentCheckInterval = ref<NodeJS.Timeout | null>(null);

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

// Incrementar cantidad
const incrementQuantity = (item: CartItem) => {
	if (item.quantity < item.product.stock) {
		item.quantity++;
		updateQuantity(item);
	}
};

// Decrementar cantidad
const decrementQuantity = (item: CartItem) => {
	if (item.quantity > 1) {
		item.quantity--;
		updateQuantity(item);
	}
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
	if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
		cartStore.clearCart();
		emitter.emit('cart:update', undefined);
	}
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

// Proceder al pago
const checkout = () => {
	showCheckoutModal.value = true;
};

// Confirmar orden
const confirmOrder = async () => {
	if (customerInfo.value.paymentMethod === 'tarjeta') {
		const cardError = validateCard();
		if (cardError) {
			alert(cardError);
			return;
		}
		isProcessingPayment.value = true;
		paymentStatus.value = 'Procesando pago...';

		// Simulate card processing
		await new Promise(resolve => setTimeout(resolve, 2000));

		isProcessingPayment.value = false;
		paymentStatus.value = 'Pago completado';
	}

	const confirmedOrder = {
		orderId: orderId.value,
		date: new Date().toLocaleDateString(),
		customerName: customerInfo.value.name,
		customerInfo: {
			email: customerInfo.value.email,
			address: customerInfo.value.address,
			coordinates: customerInfo.value.coordinates
		},
		total: total.value,
		subtotal: subtotal.value,
		shipping: shipping.value,
		discount: discount.value,
		paymentMethod: customerInfo.value.paymentMethod,
		items: [...cartItems.value],
	};

	cartStore.saveConfirmedOrder(confirmedOrder);

	// Mostrar resumen de la compra
	const lastOrder = cartStore.getLastOrder();
	if (lastOrder) {
		const resumen = `Orden #${lastOrder.orderId} confirmada!\n\nProductos:\n${lastOrder.selectedProducts
			.map(p => `- ${p.nombre} x${p.quantity} = Gs. ${formatPrice(p.total)}`)
			.join('\n')}\n\nTotal: Gs. ${formatPrice(lastOrder.total)}`;
		alert(resumen);
	}

	showCheckoutModal.value = false;
	clearCart();
};

// Formatear número de tarjeta
const formatCardNumber = () => {
	cardInfo.value.number = cardInfo.value.number.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
};

// Formatear fecha de vencimiento
const formatExpiryDate = () => {
	cardInfo.value.expiry = cardInfo.value.expiry.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/');
};

// Validar tarjeta
const validateCard = () => {
	const card = cardInfo.value;
	if (!card.number.replace(/\s/g, '').match(/^\d{16}$/)) {
		return 'Número de tarjeta inválido';
	}
	if (!card.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
		return 'Fecha de vencimiento inválida';
	}
	if (!card.cvv.match(/^\d{3,4}$/)) {
		return 'CVV inválido';
	}
	if (!card.name.trim()) {
		return 'Nombre en la tarjeta requerido';
	}
	return '';
};

// QR payment handling
const startQrPaymentCheck = () => {
	isProcessingPayment.value = true;
	paymentStatus.value = 'Esperando pago...';

	// Simulate QR payment check
	qrPaymentCheckInterval.value = setInterval(() => {
		// In a real implementation, this would check with your payment provider
		if (Math.random() > 0.7) { // Simulate random success
			clearInterval(qrPaymentCheckInterval.value!);
			paymentStatus.value = 'Pago recibido';
			isProcessingPayment.value = false;
			confirmOrder();
		}
	}, 3000);
};

// Stop QR payment check on modal close or component unmount
watch(() => showCheckoutModal.value, (newVal) => {
	if (!newVal && qrPaymentCheckInterval.value) {
		clearInterval(qrPaymentCheckInterval.value);
		isProcessingPayment.value = false;
		paymentStatus.value = '';
	}
});

// Generar datos para QR
const generateQRData = () => {
	return JSON.stringify({
		amount: total.value,
		currency: 'PYG',
		orderId: orderId.value,
		merchant: 'Paraná Hogar',
		concept: `Orden ${orderId.value}`
	});
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

	// Calcular envío (gratis si el subtotal es mayor a 500,000 Gs.)
	if (subtotal.value < 500000) {
		shipping.value = 30000; // Costo de envío fijo
	}

	// Initialize map if geolocation is enabled
	watch(useGeolocation, (newVal) => {
		if (newVal) {
			initMap();
		}
	});
});

onBeforeUnmount(() => {
	if (qrPaymentCheckInterval.value) {
		clearInterval(qrPaymentCheckInterval.value);
	}
	if (map.value) {
		map.value.remove();
		map.value = null;
	}
});

// Initialize map
const initMap = async () => {
	if (typeof window === 'undefined') return;

	await nextTick();
	const mapContainer = document.getElementById('map');
	if (!mapContainer || map.value) return;

	// Asunción coordinates
	const defaultPosition = {
		lat: -25.2867,
		lng: -57.3333
	};

	map.value = L.map('map').setView([defaultPosition.lat, defaultPosition.lng], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map.value);

	// Custom icon for the marker
	const icon = L.icon({
		iconUrl: '/images/marker-icon.png',
		shadowUrl: '/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41]
	});

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				map.value.setView([latitude, longitude], 15);

				marker.value = L.marker([latitude, longitude], {
					draggable: true,
					icon
				}).addTo(map.value);

				customerInfo.value.coordinates = { lat: latitude, lng: longitude };

				marker.value.on('dragend', () => {
					const pos = marker.value.getLatLng();
					customerInfo.value.coordinates = {
						lat: pos.lat,
						lng: pos.lng
					};
				});
			},
			() => {
				// If geolocation fails, use default position (Asunción)
				marker.value = L.marker([defaultPosition.lat, defaultPosition.lng], {
					draggable: true,
					icon
				}).addTo(map.value);

				customerInfo.value.coordinates = defaultPosition;

				marker.value.on('dragend', () => {
					const pos = marker.value.getLatLng();
					customerInfo.value.coordinates = {
						lat: pos.lat,
						lng: pos.lng
					};
				});
			}
		);
	} else {
		alert('Geolocalización no soportada por tu navegador.');
	}
};
</script>
