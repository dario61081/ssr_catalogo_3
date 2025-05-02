<template>
    <div>
        <div class="border-t pt-4">
            <h4 class="font-semibold text-gray-900 text-lg pb-3 mb-4 border-b flex items-center">
                <i class="pi pi-check-circle mr-2 text-green-500"></i> Resumen de tu Pedido
            </h4>

            <div class="bg-gray-50 p-4 rounded-lg mb-4">
                <h5 class="font-medium text-gray-700 mb-2">Información Personal</h5>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <p class="text-gray-500">Cliente:</p>
                        <p class="font-medium">{{ customerInfo.name }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">CI/RUC:</p>
                        <p class="font-medium">{{ customerInfo.ruc }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Email:</p>
                        <p class="font-medium">{{ customerInfo.email }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Teléfono:</p>
                        <p class="font-medium">{{ customerInfo.telefono }}</p>
                    </div>
                    <div class="col-span-2">
                        <p class="text-gray-500">Dirección:</p>
                        <p class="font-medium">{{ customerInfo.address }}</p>
                    </div>
                    <div class="col-span-2">
                        <p class="text-gray-500">Método de pago:</p>
                        <p class="font-medium capitalize">{{ customerInfo.paymentMethod }}</p>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <h5 class="font-medium text-gray-700 mb-2">Productos</h5>
                <div class="max-h-40 overflow-y-auto border rounded-lg divide-y">
                    <div v-for="item in items" :key="item.product.codigo"
                        class="flex justify-between items-center p-3 text-sm">
                        <div class="flex items-center">
                            <img :src="item.product.imagen" :alt="item.product.nombre"
                                class="w-10 h-10 object-contain mr-3" />
                            <div>
                                <p class="font-medium">{{ item.product.nombre }}</p>
                                <p class="text-gray-500">Cantidad: {{ item.quantity }}</p>
                            </div>
                        </div>
                        <p class="font-medium">Gs. {{ formatPrice(item.product.precio * item.quantity) }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-gray-100 p-4 rounded-lg border border-gray-200">
                <div class="text-sm space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-700">Subtotal:</span>
                        <span class="font-medium">Gs. {{ formatPrice(subtotal) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-700">Envío:</span>
                        <span class="font-medium">A cotizar</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-700">Descuento:</span>
                        <span class="text-green-600 font-medium">- Gs. {{ formatPrice(discount) }}</span>
                    </div>
                    <div class="flex justify-between font-bold mt-3 pt-3 border-t border-gray-300">
                        <span>Total a pagar:</span>
                        <span class="text-gray-800">Gs. {{ formatPrice(total) }}</span>
                    </div>
                </div>
            </div>

            <!-- Mensaje de privacidad -->
            <div class="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div class="flex items-start">
                    <i class="pi pi-shield text-blue-600 mr-3 mt-0.5"></i>
                    <div>
                        <h5 class="text-sm font-medium text-blue-800">Protección de datos personales</h5>
                        <p class="text-xs text-blue-700 mt-1">
                            Los datos proporcionados no serán almacenados de forma permanente ni compartidos con
                            terceros.
                            Nuestra política de privacidad cumple con los estándares internacionales ISO 27001 sobre
                            seguridad de la información. Solo utilizamos la información necesaria para procesar tu
                            pedido.
                        </p>
                        <p class="text-xs text-blue-700 mt-2">
                            <NuxtLink to="/info/privacidad" class="underline hover:text-blue-800">
                                Consulta nuestra política de privacidad
                            </NuxtLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CartItem } from '~/types';

// Props
const props = defineProps<{
    customerInfo: {
        ruc: string;
        name: string;
        telefono: string;
        email: string;
        address: string;
        paymentMethod: string;
    };
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
}>();

// Formatear precio con separadores de miles
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-PY').format(price);
};
</script>