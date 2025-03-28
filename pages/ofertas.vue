<template>
  <div class="min-h-screen bg-gray-50">
    <Header @on-search="abrirBuscador" @open-cart="abrirCarrito"/>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Ofertas Especiales</h1>
      <p class="text-gray-600 mb-8">Aprovecha nuestras mejores ofertas por tiempo limitado.</p>
      
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Dynamic Filters - Collapsible on mobile -->
        <div
            :class="[
            showFilters ? 'block' : 'hidden', 
            'lg:block w-full lg:w-64 flex-shrink-0'
          ]"
        >
          <div class="sticky top-4 bg-white p-4 rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold mb-4"><i class="fa fa-filter text-gray-400"></i> Filtros</h3>
            
            <!-- Category Filters -->
            <div class="mb-4">
              <h4 class="font-medium mb-2">Líneas</h4>
              <div class="space-y-2 max-h-40 overflow-y-auto">
                <label v-for="category in uniqueCategories" :key="category" class="flex items-center">
                  <input
                      v-model="selectedCategories"
                      :value="category"
                      class="rounded border-gray-300 text-orange-500"
                      type="checkbox"
                  >
                  <span class="ml-2 text-gray-700 text-sm">{{ category }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range Filter -->
            <div class="mb-4">
              <h4 class="font-medium mb-2">Precio</h4>
              <div class="px-2">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Gs. {{ formatPrice(minPrice) }}</span>
                  <span>Gs. {{ formatPrice(maxPrice) }}</span>
                </div>
                <input
                    v-model.number="priceFilter"
                    :max="maxPrice"
                    :min="minPrice"
                    class="w-full"
                    step="1000"
                    type="range"
                >
                <div class="text-center text-sm text-gray-800 mt-1">
                  <span>Hasta Gs. {{ formatPrice(priceFilter) }}</span>
                </div>
              </div>
            </div>

            <!-- Stock Filter -->
            <div>
              <h4 class="font-medium mb-2">Disponibilidad</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                      v-model="inStockOnly"
                      class="rounded border-gray-300 text-orange-500"
                      type="checkbox"
                  >
                  <span class="ml-2 text-gray-700 text-sm">Solo en stock</span>
                </label>
              </div>
            </div>

            <!-- Clear Filters Button -->
            <button
                class="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                @click="clearFilters"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        <!-- Products Section -->
        <div class="flex-1">
          <!-- Mobile Filter Toggle Button (visible only on mobile) -->
          <div class="lg:hidden mb-4">
            <button
                class="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                @click="showFilters = !showFilters"
            >
              <span class="font-medium">Filtros</span>
              <svg
                  :class="showFilters ? 'transform rotate-180' : ''"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
            </button>
          </div>
          
          <!-- Products info -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <p class="text-sm text-gray-600 mb-2 sm:mb-0">
              Mostrando {{ paginatedProducts.length }} de {{ filteredProducts.length }} Productos
            </p>
            <select
                v-model="sortOption"
                class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
            >
              <option value="popular">Más Popular</option>
              <option value="newest">Nuevos</option>
              <option value="price-low">Precio: Bajo a Alto</option>
              <option value="price-high">Precio: Alto a Bajo</option>
            </select>
          </div>
          
          <!-- Product Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <ProductCartLoading v-for="row in itemsPerPage" :key="'loading-'+row" v-if="loading"></ProductCartLoading>
            <ProductCard v-for="product in paginatedProducts" v-else :key="product.codigo" :product="product"/>
          </div>
          
          <!-- No Results Message -->
          <div v-if="!loading && filteredProducts.length === 0" class="text-center py-8">
            <p class="text-gray-500 text-lg">No se encontraron productos que coincidan con los filtros seleccionados.</p>
            <button 
              @click="clearFilters" 
              class="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Limpiar filtros
            </button>
          </div>
          
          <!-- Pagination -->
          <div class="mt-8 flex justify-center" v-if="!loading && totalPages > 1">
            <nav aria-label="Pagination" class="flex flex-wrap items-center justify-center gap-2">
              <!-- Previous page button -->
              <button
                  :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                  :disabled="currentPage === 1"
                  class="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  @click="prevPage"
              >
                <span class="sr-only">Anterior</span>
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
                    class="hidden sm:inline-block px-3 py-2 text-gray-500"
                >
                  ...
                </span>
                <button
                    v-else
                    :class="page === currentPage
                  ? 'bg-black text-white border border-gray-500'
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
                <span class="sr-only">Siguiente</span>
                <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        fill-rule="evenodd"/>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
    <CartAsideViewer :isOpen="isCartOpen" @close="cerrarCarrito"/>
    <SearchAsideViewer :isOpen="isSearchOpen" @close="cerrarBuscador"/>
    <Footer></Footer>
  </div>
</template>

<script>
import { Producto } from "~/models";
import 'font-awesome/css/font-awesome.min.css';

export default {
  data() {
    return {
      offerProducts: [],
      loading: true,
      isCartOpen: false,
      isSearchOpen: false,
      currentPage: 1,
      itemsPerPage: 9,
      selectedCategories: [],
      priceFilter: 0,
      inStockOnly: false,
      showFilters: false,
      sortOption: 'popular'
    }
  },
  
  computed: {
    // Get unique categories from products
    uniqueCategories() {
      const categories = this.offerProducts.map(product => product.linea);
      return [...new Set(categories)].filter(Boolean).sort();
    },
    
    // Get minimum price from products
    minPrice() {
      if (this.offerProducts.length === 0) return 0;
      return Math.min(...this.offerProducts.map(product => product.precio));
    },
    
    // Get maximum price from products
    maxPrice() {
      if (this.offerProducts.length === 0) return 1000000;
      return Math.max(...this.offerProducts.map(product => product.precio));
    },
    
    // Apply filters to products
    filteredProducts() {
      // Initialize price filter if not set
      if (this.priceFilter === 0 && this.offerProducts.length > 0) {
        this.priceFilter = this.maxPrice;
      }
      
      // Apply all filters
      return this.offerProducts.filter(product => {
        // Category filter
        if (this.selectedCategories.length > 0 && !this.selectedCategories.includes(product.linea)) {
          return false;
        }
        
        // Price filter
        if (product.precio > this.priceFilter) {
          return false;
        }
        
        // Stock filter
        if (this.inStockOnly && !product.stock) {
          return false;
        }
        
        return true;
      }).sort((a, b) => {
        // Apply sorting
        switch (this.sortOption) {
          case 'price-low':
            return a.precio - b.precio;
          case 'price-high':
            return b.precio - a.precio;
          case 'newest':
            // Assuming newer products have higher IDs or would need a date field
            return b.codigo.localeCompare(a.codigo);
          default: // 'popular'
            return 0; // No specific sorting for popular (would need a popularity field)
        }
      });
    },
    
    // Get products for the current page
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
    
    // Calculate total number of pages
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    
    // Calculate which page numbers to display
    displayedPages() {
      const totalDisplayed = 5; // Max number of page buttons to show
      const pages = [];
      
      if (this.totalPages <= totalDisplayed) {
        // If we have few pages, show all of them
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Always show first page
        pages.push(1);
        
        // Calculate start and end of displayed page range
        let startPage = Math.max(2, this.currentPage - 1);
        let endPage = Math.min(this.totalPages - 1, this.currentPage + 1);
        
        // Adjust if we're at the beginning
        if (this.currentPage <= 2) {
          endPage = 4;
        }
        
        // Adjust if we're at the end
        if (this.currentPage >= this.totalPages - 1) {
          startPage = this.totalPages - 3;
        }
        
        // Add ellipsis if needed
        if (startPage > 2) {
          pages.push('...');
        }
        
        // Add the page numbers
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        // Add ellipsis if needed
        if (endPage < this.totalPages - 1) {
          pages.push('...');
        }
        
        // Always show last page
        pages.push(this.totalPages);
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
  
  async mounted() {
    try {
      const response = await fetch('/api/articulos');
      const data = await response.json();
      
      this.offerProducts = data.slice(0, 10).map(item => new Producto(
        item.ART_COD,
        item.ART_DESCRIPCION,
        item.LINEA,
        item.PRECIO,
        item.ART_DIR_IMAG1,
        item.STOCK
      ));
      
      // Initialize price filter to max price
      if (this.offerProducts.length > 0) {
        this.priceFilter = this.maxPrice;
      }
    } catch (error) {
      console.error('Error fetching offer products:', error);
    } finally {
      this.loading = false;
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
      this.sortOption = 'popular';
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    abrirCarrito() {
      this.isCartOpen = true;
    },
    
    cerrarCarrito() {
      this.isCartOpen = false;
    },
    
    abrirBuscador() {
      this.isSearchOpen = true;
    },
    
    cerrarBuscador() {
      this.isSearchOpen = false;
    }
  }
}
</script>

<style>
/* Styling for range input */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: #e5e7eb;
  border-radius: 5px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #f97316;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #f97316;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
</style>
