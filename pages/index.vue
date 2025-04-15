<template>
  <div>
    <div class="container mx-auto max-w-6xl px-4 py-6">
      <IndexHero :slides="slides" />
      <IndexTop20Products />
      <!-- <IndexCategoriesGrid /> -->
    </div>
  </div>
  <ProductModalPreview :isOpen="showProductPreview" :productId="selectedProductId"
    @close="showProductPreview = false" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ProductModalPreview from '~/components/ProductModalPreview.vue';
import emitter from '~/utils/eventBus';

const showProductPreview = ref(false);
const selectedProductId = ref(null);

onMounted(() => {
  emitter.on('product:preview', (codigo) => {
    selectedProductId.value = codigo;
    showProductPreview.value = true;
  });
});
onUnmounted(() => {
  emitter.off('product:preview');
});

// definePageMeta({
//   middleware: ['redirect-to-catalog']
// });

const slides = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0566/9244/7237/files/sonoff-mini-r2-hero.png?v=1669914173',
    title: 'SONOFF',
    subtitle: 'MINI R2',
    offer: '10%<br>OFF',
    buttonText: 'Compre Agora',
    buttonLink: '#'
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    title: 'Nueva Colección',
    subtitle: 'Smart Home',
    offer: '20%<br>OFF',
    buttonText: 'Ver Productos',
    buttonLink: '#'
  },
  {
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80',
    title: 'Ofertas Exclusivas',
    subtitle: 'En Electrodomésticos',
    offer: 'Hasta<br>30% OFF',
    buttonText: 'Descubrir',
    buttonLink: '#'
  }
];
</script>
