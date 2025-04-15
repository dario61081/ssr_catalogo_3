<template>
  <div>
    <div class="container mx-auto max-w-6xl px-4 py-6">
      <IndexHero />
      <IndexCategoriesGrid />
      <IndexTop20Products />

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




</script>
