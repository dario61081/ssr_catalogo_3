<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-900 mb-4">PRECIO</h3>
    <div class="space-y-2">
      <input v-model="precio" :max="precio_maximo" :min="precio_minimo" class="w-full" step="10" type="range">
      <div class="flex justify-between text-sm text-gray-600">
        <span>Gs {{ precio_minimo }}</span>
        <span>Gs {{ precio_maximo }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    precio_minimo: {type: Number, default: 0},
    precio_maximo: {type: Number, default: 100}
  },
  data() {
    return {
      precio: 0
    }
  }
}

</script>

<style scoped>

</style>