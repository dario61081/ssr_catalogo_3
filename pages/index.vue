<template>
  <div>
    <!-- Este contenido no se mostrará debido a la redirección automática -->
  </div>
</template>

<script setup lang="ts">
// Definir redirección automática a catalog usando el middleware
definePageMeta({
  middleware: ['redirect-to-catalog']
});
</script>
