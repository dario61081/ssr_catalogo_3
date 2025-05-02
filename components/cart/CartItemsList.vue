<template>
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-4 border-b flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900">Productos en tu carrito</h2>
            <button class="text-red-600 hover:text-red-800 text-sm font-medium flex items-center" @click="clearCart">
                <i class="pi pi-trash mr-1"></i>
                Vaciar carrito
            </button>
        </div>

        <div class="divide-y">
            <div v-for="item in items" :key="item.product.codigo" class="p-4 flex flex-col sm:flex-row">
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
                                class="w-12 text-center py-1 border-t border-b border-gray-300" min="1" type="number"
                                @change="updateQuantity(item)" />
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
                                    formatPrice(parseInt(item.product.precio.toString().replace('.', '')) * item.quantity)
                                }}
                            </p>

                            <button aria-label="Eliminar producto" class="text-red-600 hover:text-red-800"
                                @click="removeItem(item.product.codigo)">
                                <i class="pi pi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CartItem } from '~/types';
import emitter from '~/utils/eventBus';

// Props
const props = defineProps<{
    items: CartItem[]
}>();

// Emits
const emit = defineEmits(['clear-cart', 'update-quantity', 'remove-item']);

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
    emit('update-quantity', item);
};

// Eliminar item del carrito
const removeItem = (productId: number) => {
    emit('remove-item', productId);
};

// Vaciar carrito
const clearCart = () => {
    if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
        emit('clear-cart');
    }
};
</script>