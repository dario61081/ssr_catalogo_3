<template>
  <div class="w-64 flex-shrink-0">
    <div class="space-y-8">
      <!-- Categories -->
      <Lineas @on-selected="(categorias)=>{}"></Lineas>

      <!-- Price Range -->
      <Precio :precio_maximo="precio_maximo" :precio_minimo="precio_minimo" @on-selected="(precio)=>{}"></Precio>

      <!-- Brands -->
      <!--      <Marcas></Marcas>-->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">DISPONIBILIDAD</h3>
        <div class="space-y-2">
          <label class="flex items-center">
            <input class="rounded border-gray-300 text-indigo-600" type="checkbox">
            <span class="ml-2 text-gray-700">En Stock</span>
          </label>
        </div>
        <div class="space-y-2">
          <label class="flex items-center">
            <input class="rounded border-gray-300 text-indigo-600" type="checkbox">
            <span class="ml-2 text-gray-700">Sin Stock</span>
          </label>
        </div>

      </div>


    </div>
  </div>

</template>
<script>
export default {
  props: {
    precio_minimo: {type: Number, required: true},
    precio_maximo: {type: Number, required: true}
  }
}
</script>