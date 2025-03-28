<template>
  <div class="bg-white rounded-lg shadow overflow-hidden relative">
    <NuxtLink :to="`/product/${product.id}`" class="block">
      <img :alt="product.nombre" :src="product.imagen" class="w-full h-48 object-cover">
      <div class="p-4">
        <p class="text-sm text-gray-500">{{ product.categoria }}</p>
        <h3 class="text-lg font-semibold text-gray-900">{{ product.nombre }}</h3>
        <p class="text-lg font-medium text-gray-900 mt-2">Gs. {{ product.precio }}</p>
      </div>
    </NuxtLink>
    
    <!-- Action buttons -->
    <div class="absolute right-2 top-2 flex flex-col gap-2">
      <button class="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <button class="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button class="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import {Producto} from "~/models.js";

defineProps({
  /** @type {Producto} */
  product: {
    type: Object,
    required: true
  }
})
</script>