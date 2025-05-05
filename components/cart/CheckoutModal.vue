<template>
    <div v-if="show"
        class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto sm:overflow-auto shadow-2xl">
            <div
                class="p-5 border-b relative bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 flex justify-center items-center h-24 overflow-hidden">
                <!-- Imagen de fondo con efecto de perspectiva -->
                <div class="absolute inset-0 opacity-15 flex justify-center items-center overflow-hidden">
                    <img src="/images/cart.png" alt="Carrito de compra"
                        style="transform: translateX(40%) translateY(10%) scale(0.4);" />
                </div>

                <!-- Título centrado -->
                <div class="relative z-10 flex flex-col items-center justify-center">
                    <div class="bg-white bg-opacity-80 px-5 py-2 rounded-full shadow-sm flex items-center">
                        <h3 class="text-xl font-semibold text-gray-800">Finalizar Compra</h3>

                    </div>
                </div>

                <!-- Botón cerrar -->
                <button @click="close"
                    class="absolute top-3 right-3 text-white hover:text-gray-100 bg-gray-800 bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 transition-colors">
                    <i class="pi pi-times"></i>
                </button>
            </div>

            <div class="p-6">
                <!-- Progress Bar -->
                <div class="mb-8 relative">
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div :style="`width: ${(checkoutStep / 3) * 100}%`"
                            class="transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-800">
                        </div>
                    </div>
                    <div class="flex justify-between mt-2">
                        <div class="flex flex-col items-center">
                            <div :class="[
                                'w-8 h-8 rounded-full flex items-center justify-center text-xs',
                                checkoutStep >= 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
                            ]">
                                1
                            </div>
                            <span class="text-xs mt-1 font-medium text-gray-700">Información</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div :class="[
                                'w-8 h-8 rounded-full flex items-center justify-center text-xs',
                                checkoutStep >= 2 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
                            ]">
                                2
                            </div>
                            <span class="text-xs mt-1 font-medium text-gray-700">Pago</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div :class="[
                                'w-8 h-8 rounded-full flex items-center justify-center text-xs',
                                checkoutStep === 3 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
                            ]">
                                3
                            </div>
                            <span class="text-xs mt-1 font-medium text-gray-700">Confirmar</span>
                        </div>
                    </div>
                </div>

                <form @submit.prevent="confirmOrder" class="space-y-6">
                    <!-- Paso 1: Información del cliente -->
                    <CustomerInfoStep v-if="checkoutStep === 1" v-model:customerInfo="customerInfo"
                        v-model:useGeolocation="useGeolocation" :errors="customerErrors"
                        :showLocationMsg="showLocationMsg" @detect-location="detectCurrentLocation" />

                    <!-- Paso 2: Forma de pago -->
                    <PaymentMethodStep v-if="checkoutStep === 2" v-model:customerInfo="customerInfo"
                        v-model:cardInfo="cardInfo" :total="total" :isProcessingPayment="isProcessingPayment"
                        :paymentStatus="paymentStatus" />

                    <!-- Paso 3: Resumen -->
                    <OrderSummaryStep v-if="checkoutStep === 3" :customerInfo="customerInfo" :items="items"
                        :subtotal="subtotal" :discount="discount" :total="total" />

                    <div class="flex justify-end space-x-3 pt-5 border-t">
                        <button type="button" @click="close"
                            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button v-if="checkoutStep > 1" type="button"
                            class="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            @click="checkoutStep--">
                            <i class="pi pi-arrow-left mr-1"></i> Atrás
                        </button>
                        <button v-if="checkoutStep < 3" type="button"
                            class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                            @click="nextCheckoutStep">
                            Siguiente <i class="pi pi-arrow-right ml-1"></i>
                        </button>
                        <button v-if="checkoutStep === 3" type="submit"
                            class="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all transform hover:scale-[1.02]">
                            <i class="pi pi-check mr-1"></i> Confirmar pedido
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import { CartItem } from '~/types';
import { IFormaPago } from '~/types/payments';
import CustomerInfoStep from './checkout/CustomerInfoStep.vue';
import PaymentMethodStep from './checkout/PaymentMethodStep.vue';
import OrderSummaryStep from './checkout/OrderSummaryStep.vue';

// Props
const props = defineProps<{
    show: boolean;
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
    orderId: string;
}>();

// Shipping siempre es 0 (A cotizar)
const shipping = computed(() => {
    return 0;
});

// Emits
const emit = defineEmits(['update:show', 'confirm-order']);

// Wizard step control
const checkoutStep = ref(1);

// Customer info
const customerInfo = ref({
    ruc: '',
    name: '',
    telefono: '',
    email: '',
    address: '',
    paymentMethod: 'efectivo contraentrega',
    coordinates: null as { lat: number; lng: number } | null
});

// Payment method object (IFormaPago)
const paymentMethodObject = ref<IFormaPago | null>(null);

// Card info
const cardInfo = ref({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
});

// Estado de errores para validación de cliente
const customerErrors = ref({
    ruc: '',
    name: '',
    telefono: '',
    email: '',
    address: ''
});

// Geolocation state
const useGeolocation = ref(false);
const showLocationMsg = ref(false);
const map = ref(null);
const marker = ref(null);

// Payment states
const isProcessingPayment = ref(false);
const paymentStatus = ref('');
const qrPaymentCheckInterval = ref<NodeJS.Timeout | null>(null);

// Cerrar modal
const close = () => {
    // Confirmar si desea salir
    if (checkoutStep.value > 1 && !confirm('¿Estás seguro de que deseas cancelar el proceso de compra?')) {
        return;
    }
    emit('update:show', false);

    // Limpiar intervalos si existen
    if (qrPaymentCheckInterval.value) {
        clearInterval(qrPaymentCheckInterval.value);
    }

    // Resetear estado
    checkoutStep.value = 1;
    customerErrors.value = {
        ruc: '',
        name: '',
        telefono: '',
        email: '',
        address: ''
    };
};

// Avanzar al siguiente paso
const nextCheckoutStep = () => {
    // Validar campos requeridos
    if (checkoutStep.value === 1) {
        let valid = true;
        customerErrors.value.ruc = customerInfo.value.ruc.trim() ? '' : 'El CI o RUC es requerido';
        customerErrors.value.name = customerInfo.value.name.trim() ? '' : 'El nombre es requerido';
        customerErrors.value.telefono = customerInfo.value.telefono.trim() ? '' : 'El teléfono es requerido';
        customerErrors.value.email = customerInfo.value.email.trim() ? '' : 'El email es requerido';
        customerErrors.value.address = customerInfo.value.address.trim() ? '' : 'La dirección es requerida';

        // Validación básica de email
        if (customerInfo.value.email && !/^\S+@\S+\.\S+$/.test(customerInfo.value.email)) {
            customerErrors.value.email = 'El email no es válido';
        }

        // Si hay algún error, no avanzar
        for (const key in customerErrors.value) {
            if (customerErrors.value[key]) valid = false;
        }
        if (!valid) return;
    }

    if (checkoutStep.value === 2) {
        if (!customerInfo.value.paymentMethod) {
            alert('Selecciona una forma de pago.');
            return;
        }
        if (customerInfo.value.paymentMethod === 'tarjeta') {
            const cardValidation = validateCard();
            if (cardValidation) {
                alert(cardValidation);
                return;
            }
        }

        // Si es método QR, iniciar verificación de pago
        if (customerInfo.value.paymentMethod === 'qr') {
            startQrPaymentCheck();
        }
    }

    if (checkoutStep.value < 3) {
        checkoutStep.value++;
    }
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
        }
    }, 3000);
};

// Detect current location for map
const detectCurrentLocation = async () => {
    if (typeof window === 'undefined') return;

    const L = await importLeaflet();

    if (!navigator.geolocation) {
        alert('Geolocalización no soportada por tu navegador.');
        return;
    }

    showLocationMsg.value = true;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            showLocationMsg.value = false;
            const { latitude, longitude } = position.coords;

            if (map.value) {
                map.value.setView([latitude, longitude], 15);
            } else {
                initMap([latitude, longitude]);
            }

            if (marker.value) {
                marker.value.setLatLng([latitude, longitude]);
            } else if (map.value) {
                // Si no existe el marker aún, crearlo
                const icon = window._leafletMarkerIcon || L.icon({
                    iconUrl: '/images/marker-icon.png',
                    shadowUrl: '/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41]
                });

                marker.value = L.marker([latitude, longitude], {
                    draggable: true,
                    icon
                }).addTo(map.value);
            }

            customerInfo.value.coordinates = { lat: latitude, lng: longitude };
        },
        () => {
            showLocationMsg.value = false;
            alert('No se pudo obtener tu ubicación actual.');
        }
    );
};

// Initialize map
const initMap = async (coords = [-25.2867, -57.3333]) => {
    if (typeof window === 'undefined') return;

    const L = await importLeaflet();

    await nextTick();
    const mapContainer = document.getElementById('map');
    if (!mapContainer || map.value) return;

    map.value = L.map('map').setView(coords, 13);

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

    // Guardar icon global para usar en el botón
    window._leafletMarkerIcon = icon;

    marker.value = L.marker(coords, {
        draggable: true,
        icon
    }).addTo(map.value);

    customerInfo.value.coordinates = { lat: coords[0], lng: coords[1] };

    marker.value.on('dragend', () => {
        const pos = marker.value.getLatLng();
        customerInfo.value.coordinates = {
            lat: pos.lat,
            lng: pos.lng
        };
    });
};

// Helper function to import Leaflet dynamically
const importLeaflet = async () => {
    return (await import('leaflet')).default;
};

// Confirm order
const confirmOrder = async () => {
    if (customerInfo.value.paymentMethod === 'tarjeta' && !isProcessingPayment.value) {
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

    // Emit event to parent component with paymentMethodObject if available
    emit('confirm-order', {
        orderId: props.orderId,
        customerInfo: { ...customerInfo.value },
        items: props.items,
        subtotal: props.subtotal,
        discount: props.discount,
        total: props.total,
        shipping: 0, // Envío siempre es 0 (A cotizar)
        paymentMethod: customerInfo.value.paymentMethod,
        paymentMethodObject: paymentMethodObject.value
    });

    // Close modal
    close();
};

// Watch for geolocation changes
watch(useGeolocation, async (newVal) => {
    if (newVal) {
        await nextTick();
        initMap();
    }
});

// Watch for modal visibility changes and toggle body scroll lock
watch(() => props.show, (newVal) => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        if (newVal) {
            // Bloquear scroll de la página cuando el modal está abierto
            document.body.classList.add('modal-open');
        } else {
            // Restaurar scroll de la página cuando el modal se cierra
            document.body.classList.remove('modal-open');

            // Limpiar timers y estados
            if (qrPaymentCheckInterval.value) {
                clearInterval(qrPaymentCheckInterval.value);
                isProcessingPayment.value = false;
                paymentStatus.value = '';
            }
        }
    }
});

// Stop QR payment check on modal close
watch(() => props.show, (newVal) => {
    if (!newVal && qrPaymentCheckInterval.value) {
        clearInterval(qrPaymentCheckInterval.value);
        isProcessingPayment.value = false;
        paymentStatus.value = '';
    }
});

// Clean up on unmount
onBeforeUnmount(() => {
    if (qrPaymentCheckInterval.value) {
        clearInterval(qrPaymentCheckInterval.value);
    }

    if (map.value) {
        map.value.remove();
        map.value = null;
    }

    // Asegurarse de que se elimine la clase modal-open cuando se desmonte el componente
    if (typeof document !== 'undefined') {
        document.body.classList.remove('modal-open');
    }
});

// Add Leaflet type to window object
declare global {
    interface Window {
        _leafletMarkerIcon: any;
    }
}
</script>