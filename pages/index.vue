<template>
  <div class="min-h-screen bg-gray-50">
    <Header @on-search="(filter)=>{}"/>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-8">
        <Sidebar :precio_maximo="precio_maximo" :precio_minimo="precio_minimo" @on-filters="(filters)=>{}"/>
        <ProductGrid :products="productos"/>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>

import {Producto} from "~/models";

export default {

  data() {
    return {
      productos: [],
      filtros: []
    }
  },
  methods: {
    get_data() {
      fetch('/api/articulos')
          .then(res => res.json())
          .then(res => {
            this.productos = res.map(item => {
              return new Producto(item.ART_COD, item.ART_DESCRIPCION, item.LINEA, item.PRECIO, item.ART_DIR_IMAG1, item.STOCK)
            })
          })
    },
    actualizar_filtros(filtros) {

    }
  },
  mounted() {
    this.get_data()
  },
  computed: {
    precio_minimo() {
      return 0
    },
    precio_maximo() {
      return this.productos.reduce((a, b) => a.precio < b.precio ? a : b, {precio: 0}).precio
    },

  }
}


</script>