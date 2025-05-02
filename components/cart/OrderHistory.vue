<template>
    <div class="container mx-auto max-w-6xl px-4 mt-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Historial de Órdenes</h2>
        <div class="grid gap-4">
            <div v-for="order in orders" :key="order.orderId" class="bg-white rounded-lg shadow-sm p-4">
                <div class="flex justify-between items-start">
                    <div>
                        <div class="flex items-center gap-2">
                            <p class="font-medium text-gray-900">Orden #{{ order.orderId }}</p>
                            <span :class="getStatusClass(order.orderStatus)"
                                class="px-2 py-0.5 text-xs font-medium rounded-full">
                                {{ getStatusLabel(order.orderStatus) }}
                            </span>
                        </div>
                        <p class="text-sm text-gray-500">{{ order.date }}</p>
                        <p class="text-sm text-gray-600 mt-1">{{ order.customerName }}</p>
                        <p class="text-sm text-gray-600">Método de pago: {{ order.paymentMethod.tipo_descripcion }}</p>
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

<script setup lang="ts">
import { OrderStatus, OrderStatusEnum } from '~/types/orders_status';

// const useCheckOrderStatus = () => {

//     const orderStatus = ref<OrderStatus[]>([]);

//     const fetchOrderStatus = async () => {
//         try {
//             const response = await fetch('/api/order-status');
//             if (!response.ok) {
//                 throw new Error('Error fetching order status');
//             }
//             orderStatus.value = await response.json();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return { orderStatus, fetchOrderStatus };

// }



// Props
const props = defineProps<{
    orders: any[]
}>();

// Formatear precio con separadores de miles
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-PY').format(price);
};

// Get status label based on status code
const getStatusLabel = (status: OrderStatus): string => {
    switch (status) {
        case OrderStatusEnum.Finalizado:
            return 'Finalizado';
        case OrderStatusEnum.Anulado:
            return 'Anulado';
        default:
            return 'Pendiente';
    }
};

// Get CSS class based on status
const getStatusClass = (status: OrderStatus): string => {
    switch (status) {
        case OrderStatusEnum.Pendiente:
            return 'bg-yellow-100 text-yellow-800';
        case OrderStatusEnum.Cancelado:
            return 'bg-red-100 text-red-800';
        case OrderStatusEnum.Anulado:
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
</script>