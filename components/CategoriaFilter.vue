<template>
  <h4 class="font-medium mb-2">Categorias</h4>
  <div class="mb-4">
    <!--    <div class="space-y-2 max-h-40 overflow-y-auto">-->
    <div class="space-y-2 ">
      <label v-for="categoria in categorias" class="flex items-center">
        <input
            class="rounded border-gray-300 text-gray-500 text-sm"
            type="checkbox"
        >
        <span class="ml-2 text-gray-700 text-sm">{{ categoria.nombre }}</span>
      </label>
    </div>
  </div>
</template>
<script>
import {Linea} from "~/models.js";

export default {
  data() {
    return {
      /** @type {Linea[]} */
      categorias: []
    }
  },
  methods: {
    get_data() {
      fetch('/api/categorias')
          .then(res => res.json())
          .then(res => {

            console.log('res', res)
            this.categorias = res.map(item => {
              const row = new Linea()

              // {
              //   "DIV_CODIGO": 10,
              //     "DIV_DESC": "MUEBLES",
              //     "DIV_ESTADO": "A",
              //     "DIV_ORDEN": 3,
              //     "DIV_DIR_IMAGEN": null
              // }
              row.codigo = item.DIV_CODIGO
              row.nombre = item.DIV_DESC
              return row
            })
          })
          .finally(() => {
            console.log(this.categorias)
          })
    }
  },
  mounted() {
    this.get_data()
  },
  computed: {
    selected() {
      return this.categorias.filter(item => item._checked)
    }
  }
}
</script>


<style scoped>

</style>