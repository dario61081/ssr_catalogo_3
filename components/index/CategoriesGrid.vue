<template>
  <div class="container mx-auto max-w-6xl px-4 py-6">
    <div v-if="loading" class="text-center py-8 text-gray-500">Cargando categorías...</div>
    <div v-else-if="error" class="text-center py-8 text-red-500">{{ error }}</div>
    <div v-else class="categories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="cat in categorias"
        class="category-card bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
        <NuxtLink :to="`/catalog?cat=${cat.codigo}`" class="block h-full">
          <div class="relative w-full h-40">
            <img :src="cat.imagen" :alt="cat.nombre" class="w-full h-40 object-cover" loading="lazy" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="absolute inset-0 bg-black bg-opacity-40"></div>
              <h3 class="relative z-10 text-base font-semibold text-white text-center">{{ cat.nombre }}</h3>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoriaStore } from '~/stores/categoriaStore';
const loading = ref(false)

loading.value = true
const response = await $fetch('https://panel.colchonesparana.com.py/articulos/divisiones/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC/TODOS')
const categorias = response.map((item: any) => mapToCategoria(item)).filter(item => item.imagen)

loading.value = false

</script>

<style scoped>
.categories-grid {
  margin-top: 2rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #f3f4f6;
  transition: box-shadow 0.2s;
}

.category-card img {
  transition: transform 0.3s;
}

.category-card:hover img {
  transform: scale(1.05);
}
</style>
