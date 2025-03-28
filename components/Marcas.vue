<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-900 mb-4">MARCAS</h3>
    <div class="space-y-2">
      <label class="flex items-center">
        <input class="rounded border-gray-300 text-indigo-600" type="checkbox">
        <span class="ml-2 text-gray-700">Poliform</span>
      </label>
      <label class="flex items-center">
        <input class="rounded border-gray-300 text-indigo-600" type="checkbox">
        <span class="ml-2 text-gray-700">Roche Bobois</span>
      </label>
      <label class="flex items-center">
        <input class="rounded border-gray-300 text-indigo-600" type="checkbox">
        <span class="ml-2 text-gray-700">Kartell</span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      marcas: []
    }
  }
}
</script>
<style scoped>

</style>