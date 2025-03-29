<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">Precio</h3>
    <div class="flex flex-col">
      <div class="flex justify-between mb-2">
        <span class="text-sm text-gray-600">{{ formatPrice(minPrice) }}</span>
        <span class="text-sm text-gray-600">{{ formatPrice(maxPrice) }}</span>
      </div>
      <input
        type="range"
        :min="minPrice"
        :max="maxPrice"
        :step="step"
        v-model.number="selectedPrice"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        @input="updatePrice"
      />
      <div class="mt-2 text-center">
        <span class="text-sm font-medium">Hasta: {{ formatPrice(selectedPrice) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$bus'],
  props: {
    products: {
      type: Array,
      required: true,
      default: ()=>[]
    }
  },
  data() {
    return {
      minPrice: 0,
      maxPrice: 0,
      selectedPrice: 0,
      step: 2
    }
  },
  watch: {
    products: {
      immediate: true,
      handler() {
        this.calculatePriceRange();
      }
    }
  },
  methods: {
    calculatePriceRange() {
      if (!this.products || this.products.length === 0) return;
      
      // Calcular el precio mínimo y máximo de los productos
      const prices = this.products
        .filter(product => product.precio && !isNaN(parseFloat(product.precio)))
        .map(product => parseFloat(product.precio));
      
      if (prices.length > 0) {
        this.minPrice = Math.floor(Math.min(...prices));
        this.maxPrice = Math.ceil(Math.max(...prices));
        this.selectedPrice = this.maxPrice;
        
        // Calcular un paso adecuado basado en el rango de precios
        const range = this.maxPrice - this.minPrice;
        if (range > 10000) {
          this.step = 1000;
        } else if (range > 1000) {
          this.step = 100;
        } else {
          this.step = 10;
        }
      }
    },
    updatePrice() {
      this.$emit('price-filter-changed', this.selectedPrice);
    },
    formatPrice(price) {
      return `$${price.toLocaleString('es-AR')}`;
    },
    resetFilter() {
      this.selectedPrice = this.maxPrice;
      this.updatePrice();
    }
  },
  mounted() {
    this.calculatePriceRange();
    
    // Escuchar el evento de reset de filtros
    this.$bus.on('clear-filters', () => {
      this.resetFilter();
    });
  },
  beforeUnmount() {
    // Limpiar el listener para evitar memory leaks
    this.$bus.off('clear-filters');
  }
}
</script>

<style scoped>
/* Estilos personalizados para el slider */
input[type=range] {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4a5568;
  cursor: pointer;
}

input[type=range]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4a5568;
  cursor: pointer;
}
</style>
