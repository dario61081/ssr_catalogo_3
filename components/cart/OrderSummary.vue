<template>
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
                <span class="font-medium">{{ shipping > 0 ? `Gs. ${formatPrice(shipping)}` : 'A cotizar' }}</span>
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
                    <input v-model="discountCodeModel"
                        class="flex-grow p-2 border rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                        placeholder="Código de descuento" type="text" />
                    <button
                        class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-r-md border border-gray-300 text-sm transition-colors"
                        @click="applyDiscount">
                        Aplicar
                    </button>
                </div>
                <p v-if="discountError" class="text-red-500 text-xs mt-1">{{ discountError }}</p>
                <p v-if="discountSuccess" class="text-green-500 text-xs mt-1">{{ discountSuccess }}</p>
            </div>

            <!-- Botón de checkout -->
            <button
                class="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                @click="$emit('show-checkout')">
                <i class="pi pi-shopping-cart mr-2"></i>
                Finalizar compra
            </button>

            <div class="mt-4 text-center">
                <NuxtLink class="text-gray-700 hover:text-orange-600 text-sm font-medium transition-colors"
                    to="/catalog">
                    <i class="pi pi-arrow-left mr-1 text-xs"></i> Continuar comprando
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Props
const props = defineProps<{
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    orderId: string;
    discountCode: string;
    discountError: string;
    discountSuccess: string;
}>();

// Emits
const emit = defineEmits(['update:discountCode', 'apply-discount', 'show-checkout']);

// Modelo para el código de descuento (two-way binding)
const discountCodeModel = ref(props.discountCode);

// Observar cambios en el código de descuento
watch(discountCodeModel, (newValue) => {
    emit('update:discountCode', newValue);
});

// Formatear precio con separadores de miles
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-PY').format(price);
};

// Aplicar código de descuento
const applyDiscount = () => {
    emit('apply-discount');
};
</script>