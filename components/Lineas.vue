<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-900 mb-4">LINEAS</h3>
    <div class="space-y-2">
      <label class="flex items-center" v-for="item in lineas">
        <input type="checkbox" class="rounded border-gray-300 text-indigo-600">
        <span class="ml-2 text-gray-700">{{ item.DIV_DESC }}</span>
      </label>
    </div>
  </div>
</template>
<script>

export default {
  emits: ['vnode-unmounted','on-selected'],
  data(){
    return {
      lineas: []
    }
  },
  methods: {
    updateLineas(){
      this.$emit('on-selected', this.lineas)
    },
    get_data(){
     fetch('/api/lineas')
         .then(res => res.json())
         .then(res => {
           this.lineas = res
         })
    }
  },
  mounted(){
    this.get_data()
  }
}

</script>