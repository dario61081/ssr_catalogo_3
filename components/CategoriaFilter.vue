<template>
  <h4 class="font-medium mb-2">Categorias</h4>
  <div class="mb-4">
    <!--    <div class="space-y-2 max-h-40 overflow-y-auto">-->
    <div class="space-y-2 ">
      <template v-for="row in 10" v-if="loading">
        <CheckboxLoading></CheckboxLoading>
      </template>
      <label v-for="categoria in categorias" v-else class="flex items-center">
        <input
            :value="categoria._checked"
            class="rounded border-gray-300 text-gray-500 text-sm"
            type="checkbox"
        >
        <span class="ml-2 text-gray-700 text-sm"
              style="text-overflow: ellipsis; white-space: nowrap;">{{
            categoria.nombre
          }} </span> <span class="text-grey-100">(0)</span>
      </label>
    </div>
  </div>
</template>
<script>
import {Linea} from "~/models.js";

export default {
  emits: ['vnode-unmounted', "on-selected"],
  data() {
    return {
      /** @type {Linea[]} */
      categorias: [],
      loading: false
    }
  },
  methods: {
    get_data() {
      this.loading = true
      fetch('/api/categorias')
          .then(res => res.json())
          .then(res => {
            console.log('res', res)
            this.categorias = res.map(item => {
              const row = new Linea()
              row.codigo = item.DIV_CODIGO
              row.nombre = item.DIV_DESC
              return row
            })
          })
          .finally(() => {
            console.log(this.categorias)
            this.loading = false
          })
    }
  },
  mounted() {
    this.get_data()
  },
  watch: {
    categorias() {
      this.$emit('on-selected', this.selected)
    }
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