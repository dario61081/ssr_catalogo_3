<template>
    <div class="space-y-5">
        <h4 class="font-semibold text-gray-900 text-lg pb-2 border-b">Método de Pago</h4>

        <!-- Usar el componente ListPaymentMethods con IFormaPago -->
        <ListPaymentMethods v-model="selectedPaymentMethod" />

        <!-- QR Payment Panel -->
        <div v-if="selectedPaymentMethod.tipo_codigo === 5" class="mt-4 p-5 border rounded-xl bg-gray-50">
            <h5 class="font-medium text-gray-900 mb-4 flex items-center">
                <i class="pi pi-qrcode mr-2 text-orange-500"></i> Código QR para pago
            </h5>
            <div class="flex flex-col items-center">
                <!-- Simulated QR code -->
                <div class="bg-white p-3 rounded-lg shadow-sm">
                    <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generateQRData(total))}`"
                        alt="QR Code para pago" class="w-48 h-48" />
                </div>
                <p class="text-sm text-gray-600 text-center mt-3">
                    Escanea este código QR con tu aplicación de pago preferida
                </p>
                <p class="text-sm font-medium text-gray-900 mt-2">
                    Monto a pagar: Gs. {{ formatPrice(total) }}
                </p>
                <p v-if="isProcessingPayment" class="text-sm flex items-center justify-center mt-3 text-orange-600">
                    <i class="pi pi-spin pi-spinner mr-2"></i> {{ paymentStatus }}
                </p>
            </div>
        </div>

        <!-- Credit Card Payment Panel -->
        <div v-if="selectedPaymentMethod.tipo_codigo === 3 || selectedPaymentMethod.tipo_codigo === 4"
            class="mt-4 p-5 border rounded-xl bg-gray-50">
            <h5 class="font-medium text-gray-900 mb-4 flex items-center">
                <i class="pi pi-credit-card mr-2 text-orange-500"></i> Datos de la Tarjeta
            </h5>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Número de Tarjeta
                    </label>
                    <input v-model="cardInfo.number" type="text" maxlength="19" placeholder="1234 5678 9012 3456"
                        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                        @input="formatCardNumber" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Vencimiento
                        </label>
                        <input v-model="cardInfo.expiry" type="text" maxlength="5" placeholder="MM/YY"
                            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                            @input="formatExpiryDate" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                        </label>
                        <input v-model="cardInfo.cvv" type="password" maxlength="4" placeholder="123"
                            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Nombre en la Tarjeta
                    </label>
                    <input v-model="cardInfo.name" type="text" placeholder="Como aparece en la tarjeta"
                        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400" />
                </div>
                <p v-if="isProcessingPayment" class="text-sm flex items-center justify-center mt-3 text-orange-600">
                    <i class="pi pi-spin pi-spinner mr-2"></i> {{ paymentStatus }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import ListPaymentMethods from './ListPaymentMethods.vue';
import { IFormaPago, ListPaymentMethods as PaymentMethodsList } from '~/types/payments';

// Props
const props = defineProps<{
    customerInfo: {
        paymentMethod: string; // Mantenemos como string para compatibilidad
    };
    cardInfo: {
        number: string;
        expiry: string;
        cvv: string;
        name: string;
    };
    total: number;
    isProcessingPayment: boolean;
    paymentStatus: string;
}>();

// Emits
const emit = defineEmits(['update:customerInfo', 'update:cardInfo', 'update:paymentMethodObject']);

// Método de pago seleccionado (IFormaPago)
const selectedPaymentMethod = ref<IFormaPago>(PaymentMethodsList.value[0]);

// Inicializar el método de pago basado en el string existente
onMounted(() => {
    // Mapeo de nombres de string a IDs de métodos
    const methodMapping = {
        'efectivo contraentrega': 1,
        'transferencia': 2,
        'tarjeta': 3,
        'qr': 5
    };

    const methodId = methodMapping[props.customerInfo.paymentMethod.toLowerCase()] || 1;
    const foundMethod = PaymentMethodsList.value.find(m => m.tipo_codigo === methodId);

    if (foundMethod) {
        selectedPaymentMethod.value = foundMethod;
    }
});

// Actualizar paymentMethod en customerInfo cuando cambie selectedPaymentMethod
watch(selectedPaymentMethod, (newMethod) => {
    let methodString = '';

    // Convertir de IFormaPago a string para compatibilidad
    switch (newMethod.tipo_codigo) {
        case 1:
            methodString = 'efectivo contraentrega';
            break;
        case 2:
            methodString = 'transferencia';
            break;
        case 3:
        case 4:
            methodString = 'tarjeta';
            break;
        case 5:
            methodString = 'qr';
            break;
        default:
            methodString = 'efectivo contraentrega';
    }

    // Actualizar el string por compatibilidad con código existente
    emit('update:customerInfo', {
        ...props.customerInfo,
        paymentMethod: methodString
    });

    // También emitir el objeto completo IFormaPago
    emit('update:paymentMethodObject', newMethod);
});

// Formatear precio con separadores de miles
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-PY').format(price);
};

// Formatear número de tarjeta
const formatCardNumber = () => {
    emit('update:cardInfo', {
        ...props.cardInfo,
        number: props.cardInfo.number.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
    });
};

// Formatear fecha de vencimiento
const formatExpiryDate = () => {
    emit('update:cardInfo', {
        ...props.cardInfo,
        expiry: props.cardInfo.expiry.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/')
    });
};

// Generar datos para QR
const generateQRData = (total: number) => {
    return JSON.stringify({
        amount: total,
        currency: 'PYG',
        merchant: 'Paraná Hogar',
        concept: `Orden de compra`
    });
};
</script>