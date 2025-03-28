<template>
  <aside class="fixed right-0 top-0 h-full w-80 bg-gray-50 text-black shadow-lg transform transition-transform duration-300 z-50 border-l border-gray-400"
         :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }">
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="p-5 border-b bg-black flex justify-between items-center text-white">
<svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
</svg>
        <h2 class="text-lg font-semibold">Tu Carrito</h2>
        <button @click="cerrarCarrito" class="text-red-500 hover:text-red-500">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-4 ">
        <div v-if="productos.length === 0" class="text-center py-8 text-black">
          Tu carrito está vacío
        </div>
        <div v-else class="space-y-4">
          <div v-for="(producto, index) in productos" :key="index" class="flex border-b pb-4">
            <img :src="producto.imagen" alt="Producto" class="w-20 h-20 object-contain mr-3">
            <div class="flex-1">
              <h3 class="text-sm font-medium">{{ producto.nombre }}</h3>
              <p class="text-sm text-gray-500">Gs. {{ formatPrice(producto.precio) }}</p>
              <div class="flex items-center mt-2">
                <button @click="actualizarCantidad(index, -1)" class="text-gray-500 w-6 h-6 flex items-center justify-center">-</button>
                <span class="mx-2 text-sm">{{ producto.cantidad }}</span>
                <button @click="actualizarCantidad(index, 1)" class="text-gray-500 w-6 h-6 flex items-center justify-center">+</button>
                <button @click="quitarProducto(index)" class="ml-auto text-red-500 text-sm">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer with Total and Checkout -->
      <div class="p-4 border-t">
        <div class="flex justify-between mb-4">
          <span class="font-semibold">Total:</span>
          <span class="font-bold">Gs. {{ formatPrice(totalCarrito) }}</span>
        </div>
        <button class="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
          Proceder al pago
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { Carrito } from '~/models';

export default {
  emits: ['vnode-unmounted','close'],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    /** @type {Carrito} */
    carrito: {
        type: Array,
        required: true,
        default: ()=>new Carrito()
    }
  },
  
  data() {
    return {
      productos: []
    };
  },
  
  computed: {
    totalCarrito() {
      return this.productos.reduce((total, item) => {
        return total + (item.precio * item.cantidad);
      }, 0);
    }
  },
  
  methods: {
    cerrarCarrito() {
      this.$emit('close');
    },
    
    quitarProducto(index) {
      this.productos.splice(index, 1);
    },
    
    actualizarCantidad(index, cambio) {
      const nuevaCantidad = this.productos[index].cantidad + cambio;
      if (nuevaCantidad > 0) {
        this.productos[index].cantidad = nuevaCantidad;
      }
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('es-PY').format(price);
    }
  }
};
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}
</style>
