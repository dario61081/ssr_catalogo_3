<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div v-for="method in paymentMethods" :key="method.tipo_codigo" @click="selectMethod(method)" :class="[
            'p-4 border rounded-lg cursor-pointer transition-all',
            selectedMethodId === method.tipo_codigo ?
                'border-gray-800 bg-gray-50 shadow-sm' :
                'hover:border-gray-500 hover:bg-gray-50'
        ]">
            <div class="flex items-center">
                <div :class="[
                    'w-5 h-5 rounded-full border flex items-center justify-center',
                    selectedMethodId === method.tipo_codigo ? 'border-gray-800' : 'border-gray-300'
                ]">
                    <div v-if="selectedMethodId === method.tipo_codigo" class="w-3 h-3 rounded-full bg-gray-800">
                    </div>
                </div>
                <span class="ml-2 font-medium">{{ getDisplayName(method.tipo_descripcion) }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-2 pl-7">{{ getMethodDescription(method.tipo_codigo) }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { IFormaPago, ListPaymentMethods as PaymentMethodsList } from '~/types/payments';

// Props
const props = defineProps<{
    modelValue: IFormaPago; // Para v-model del método seleccionado
}>();

// Emits
const emit = defineEmits(['update:modelValue']);

// Estado local para el método seleccionado
const selectedMethodId = ref<Number>(props.modelValue?.tipo_codigo || 1);

// Lista de métodos de pago disponibles
const paymentMethods = ref<IFormaPago[]>(PaymentMethodsList.value);

// Mapeo de descripciones amigables para los métodos de pago
const methodDescriptions = {
    1: 'Pago al recibir tu producto',
    2: 'Transferencia a nuestra cuenta',
    3: 'Pago seguro con tarjeta de crédito',
    4: 'Pago seguro con tarjeta de débito',
    5: 'Paga escaneando nuestro QR'
};

// Seleccionar un método de pago
const selectMethod = (method: IFormaPago) => {
    selectedMethodId.value = method.tipo_codigo;
    emit('update:modelValue', method);
};

// Obtener descripción amigable para el método
const getMethodDescription = (methodId: Number): string => {
    return methodDescriptions[methodId] || 'Método de pago';
};

// Convertir nombre del método a formato más amigable
const getDisplayName = (description: String): string => {
    return description.toString().charAt(0) + description.toString().slice(1).toLowerCase();
};

// Sincronizar el valor inicial
onMounted(() => {
    if (props.modelValue?.tipo_codigo) {
        selectedMethodId.value = props.modelValue.tipo_codigo;
    }
});

// Observar cambios en el modelValue (por si cambia desde afuera)
watch(() => props.modelValue, (newValue) => {
    if (newValue?.tipo_codigo) {
        selectedMethodId.value = newValue.tipo_codigo;
    }
});
</script>