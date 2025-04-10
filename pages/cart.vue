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
        <NuxtLink 
          to="/catalog" 
          class="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
        >
          Explorar catálogo
        </NuxtLink>
      </div>
      
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Lista de productos en el carrito -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="p-4 border-b flex justify-between items-center">
              <h2 class="text-lg font-semibold text-gray-900">Productos en tu carrito</h2>
              <button 
                @click="clearCart" 
                class="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
              >
                <i class="pi pi-trash mr-1"></i>
                Vaciar carrito
              </button>
            </div>
            
            <div class="divide-y">
              <div 
                v-for="item in cartItems" 
                :key="item.product.codigo"
                class="p-4 flex flex-col sm:flex-row"
              >
                <!-- Imagen del producto -->
                <div class="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                  <NuxtLink :to="`/product/${item.product.codigo}`">
                    <img 
                      :src="item.product.imagen" 
                      :alt="item.product.nombre" 
                      class="w-full h-full object-contain"
                    />
                  </NuxtLink>
                </div>
                
                <!-- Información del producto -->
                <div class="sm:ml-4 flex-grow">
                  <div class="flex flex-col sm:flex-row justify-between">
                    <div>
                      <NuxtLink 
                        :to="`/product/${item.product.codigo}`"
                        class="text-sm font-medium text-gray-900 hover:text-gray-600"
                      >
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
                      <button 
                        @click="decrementQuantity(item)"
                        class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-l-md border border-gray-300"
                        :disabled="item.quantity <= 1"
                      >
                        <i class="pi pi-minus"></i>
                      </button>
                      <input 
                        type="number" 
                        v-model="item.quantity"
                        min="1"
                        :max="item.product.stock"
                        class="w-12 text-center py-1 border-t border-b border-gray-300"
                        @change="updateQuantity(item)"
                      />
                      <button 
                        @click="incrementQuantity(item)"
                        class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-r-md border border-gray-300"
                        :disabled="item.product.stock <= item.quantity"
                      >
                        <i class="pi pi-plus"></i>
                      </button>
                    </div>
                    
                    <!-- Subtotal y acciones -->
                    <div class="mt-2 sm:mt-0 flex items-center">
                      <p class="text-sm font-medium text-gray-900 mr-4">
                        Subtotal: Gs. {{ formatPrice(item.product.precio * item.quantity) }}
                      </p>
                      
                      <button 
                        @click="removeItem(item.product.codigo)"
                        class="text-red-600 hover:text-red-800"
                        aria-label="Eliminar producto"
                      >
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
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">Gs. {{ formatPrice(subtotal) }}</span>
              </div>
              
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Envío</span>
                <span class="font-medium">{{ shipping > 0 ? `Gs. ${formatPrice(shipping)}` : 'Gratis' }}</span>
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
                  <input 
                    type="text" 
                    v-model="discountCode"
                    placeholder="Código de descuento"
                    class="flex-grow p-2 border rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                  <button 
                    @click="applyDiscount"
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-r-md border border-gray-300 text-sm"
                  >
                    Aplicar
                  </button>
                </div>
                <p v-if="discountError" class="text-red-500 text-xs mt-1">{{ discountError }}</p>
                <p v-if="discountSuccess" class="text-green-500 text-xs mt-1">{{ discountSuccess }}</p>
              </div>
              
              <!-- Botón de checkout -->
              <button 
                @click="checkout"
                class="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-md flex items-center justify-center transition-colors"
              >
                <i class="pi pi-check-circle mr-2"></i>
                Proceder al pago
              </button>
              
              <div class="mt-4 text-center">
                <NuxtLink 
                  to="/catalog" 
                  class="text-gray-700 hover:text-gray-800 text-sm font-medium"
                >
                  Continuar comprando
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useCartStore } from '~/stores/cartStore';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import { CartItem } from '~/types';
import emitter from '~/utils/eventBus';

// Definir título y meta tags para SEO
useHead({
  title: 'Carrito de Compras - Paraná Hogar',
  meta: [
    { name: 'description', content: 'Revisa los productos en tu carrito de compras, modifica cantidades y procede al pago.' }
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
  // En una implementación real, aquí redirigirías a la página de pago
  // o integrarías con un gateway de pago
  alert('Esta funcionalidad estará disponible próximamente.');
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
});
</script>
