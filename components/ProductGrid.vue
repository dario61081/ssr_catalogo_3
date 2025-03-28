<template>
  <div class="flex-1">
    <!-- Dynamic Filters -->
    <!--    <div class="mb-6 bg-white p-4 rounded-lg shadow">-->
    <!--      <h3 class="text-lg font-semibold mb-4">Filtros</h3>-->
    <!--      -->
    <!--      &lt;!&ndash; Category Filters &ndash;&gt;-->
    <!--      <div class="mb-4">-->
    <!--        <h4 class="font-medium mb-2">Categorías</h4>-->
    <!--        <div class="space-y-2 max-h-40 overflow-y-auto">-->
    <!--          <label v-for="category in uniqueCategories" :key="category" class="flex items-center">-->
    <!--            <input -->
    <!--              type="checkbox" -->
    <!--              :value="category" -->
    <!--              v-model="selectedCategories"-->
    <!--              class="rounded border-gray-300 text-orange-500"-->
    <!--            >-->
    <!--            <span class="ml-2 text-gray-700">{{ category }}</span>-->
    <!--          </label>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      -->
    <!--      &lt;!&ndash; Price Range Filter &ndash;&gt;-->
    <!--      <div class="mb-4">-->
    <!--        <h4 class="font-medium mb-2">Precio (Gs. {{ formatPrice(minPrice) }} - Gs. {{ formatPrice(maxPrice) }})</h4>-->
    <!--        <div class="px-2">-->
    <!--          <input -->
    <!--            type="range" -->
    <!--            v-model.number="priceFilter" -->
    <!--            :min="minPrice" -->
    <!--            :max="maxPrice" -->
    <!--            step="1000" -->
    <!--            class="w-full"-->
    <!--          >-->
    <!--          <div class="flex justify-between text-sm text-gray-600 mt-1">-->
    <!--            <span>Gs. {{ formatPrice(minPrice) }}</span>-->
    <!--            <span>Gs. {{ formatPrice(priceFilter) }}</span>-->
    <!--            <span>Gs. {{ formatPrice(maxPrice) }}</span>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      -->
    <!--      &lt;!&ndash; Stock Filter &ndash;&gt;-->
    <!--      <div>-->
    <!--        <h4 class="font-medium mb-2">Disponibilidad</h4>-->
    <!--        <div class="space-y-2">-->
    <!--          <label class="flex items-center">-->
    <!--            <input -->
    <!--              type="checkbox" -->
    <!--              v-model="inStockOnly" -->
    <!--              class="rounded border-gray-300 text-orange-500"-->
    <!--            >-->
    <!--            <span class="ml-2 text-gray-700">Solo en stock</span>-->
    <!--          </label>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      -->
    <!--      &lt;!&ndash; Clear Filters Button &ndash;&gt;-->
    <!--      <button -->
    <!--        @click="clearFilters" -->
    <!--        class="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"-->
    <!--      >-->
    <!--        Limpiar filtros-->
    <!--      </button>-->
    <!--    </div>-->

    <div class="flex justify-between items-center mb-6">
      <p class="text-sm text-gray-600">Mostrando {{ paginatedProducts.length }} de {{ filteredProducts.length }}
        Productos</p>
      <select
          class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option>Mas Popular</option>
        <option>Nuevos</option>
        <option>Precio: Bajo</option>
        <option>Precio: Alto</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in paginatedProducts" :key="product.codigo" :product="product"/>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <nav aria-label="Pagination" class="flex items-center space-x-2">
        <!-- Previous page button -->
        <button
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            :disabled="currentPage === 1"
            class="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="prevPage"
        >
          <span class="sr-only">Previous</span>
          <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  fill-rule="evenodd"/>
          </svg>
        </button>

        <!-- Page numbers -->
        <template v-for="page in displayedPages" :key="page">
          <span
              v-if="page === '...'"
              class="px-3 py-2 text-gray-500"
          >
            ...
          </span>
          <button
              v-else
              :class="page === currentPage
              ? 'bg-orange-500 text-white border border-orange-500'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'"
              class="px-3 py-2 rounded-md text-sm font-medium"
              @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </template>

        <!-- Next page button -->
        <button
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="nextPage"
        >
          <span class="sr-only">Next</span>
          <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  fill-rule="evenodd"/>
          </svg>
        </button>
      </nav>
    </div>
    <Space></Space>
    <ProductosCarrouselSmall :images="images"></ProductosCarrouselSmall>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      currentPage: 1,
      itemsPerPage: 9,
      selectedCategories: [],
      priceFilter: 0,
      inStockOnly: false
    };
  },

  computed: {
    // Dynamic filter values
    uniqueCategories() {
      return [...new Set(this.products.map(product => product.categoria))].filter(Boolean).sort();
    },

    minPrice() {
      if (this.products.length === 0) return 0;
      return Math.floor(Math.min(...this.products.map(product => Number(product.precio) || 0)));
    },

    maxPrice() {
      if (this.products.length === 0) return 0;
      return Math.ceil(Math.max(...this.products.map(product => Number(product.precio) || 0)));
    },

    // Apply filters to products
    filteredProducts() {
      return this.products.filter(product => {
        // Category filter
        if (this.selectedCategories.length > 0 && !this.selectedCategories.includes(product.categoria)) {
          return false;
        }

        // Price filter
        if (Number(product.precio) > this.priceFilter) {
          return false;
        }

        // Stock filter
        if (this.inStockOnly && (!product.stock || product.stock <= 0)) {
          return false;
        }

        return true;
      });
    },

    // Get products for the current page from filtered products
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },

    // Calculate total number of pages based on filtered products
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },

    images() {
      return this.products.filter(item => item.imagen).map(item => item.imagen).slice(0, 10);
    },

    // Calculate which page numbers to display
    displayedPages() {
      const pages = [];
      const totalPages = this.totalPages;

      if (totalPages <= 7) {
        // If 7 or fewer pages, show all page numbers
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Always include first page
        pages.push(1);

        // Add ellipsis if current page is more than 3
        if (this.currentPage > 3) {
          pages.push('...');
        }

        // Add page numbers around current page
        const startPage = Math.max(2, this.currentPage - 1);
        const endPage = Math.min(totalPages - 1, this.currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        // Add ellipsis if current page is less than totalPages - 2
        if (this.currentPage < totalPages - 2) {
          pages.push('...');
        }

        // Always include last page
        if (totalPages > 1) {
          pages.push(totalPages);
        }
      }

      return pages;
    }
  },

  watch: {
    // Reset to page 1 when filters change
    filteredProducts() {
      this.currentPage = 1;
    }
  },

  methods: {
    // Format price with thousands separator
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    // Clear all filters
    clearFilters() {
      this.selectedCategories = [];
      this.priceFilter = this.maxPrice;
      this.inStockOnly = false;
    },

    // Go to specific page
    goToPage(page) {
      this.currentPage = page;
      this.scrollToTop();
    },

    // Go to previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
      }
    },

    // Go to next page
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
      }
    },

    // Scroll to top of grid after page change
    scrollToTop() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  },

  created() {
    // Initialize price filter to max price
    this.$nextTick(() => {
      this.priceFilter = this.maxPrice;
    });
  }
}
</script>