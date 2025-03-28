<template>
  <div class="flex-1">
    <ProductosCarrouselSmall :images="images"></ProductosCarrouselSmall>
    <div class="flex justify-between items-center mb-6">
      <p class="text-sm text-gray-600">Mostrando {{ paginatedProducts.length }} de {{ products.length }} Productos</p>
      <select
          class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option>Mas Popular</option>
        <option>Nuevos</option>
        <option>Precio: Bajo</option>
        <option>Precio: Alto</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product"/>
    </div>
    
    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <nav class="flex items-center space-x-2" aria-label="Pagination">
        <!-- Previous page button -->
        <button 
          @click="prevPage" 
          class="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          :disabled="currentPage === 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
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
            @click="goToPage(page)" 
            class="px-3 py-2 rounded-md text-sm font-medium"
            :class="page === currentPage 
              ? 'bg-orange-500 text-white border border-orange-500' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'"
          >
            {{ page }}
          </button>
        </template>
        
        <!-- Next page button -->
        <button 
          @click="nextPage" 
          class="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          :disabled="currentPage === totalPages"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        >
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
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
      itemsPerPage: 9
    };
  },
  
  computed: {
    images() {
      return this.products.filter(item => item.imagen).map(item => item.imagen).slice(0, 10);
    },
    
    // Calculate total number of pages
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    
    // Get products for the current page
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.products.slice(startIndex, endIndex);
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
  
  methods: {
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
      // You can customize this to target a specific element if needed
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>