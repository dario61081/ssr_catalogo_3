<template>
	<div class="flex-1">
		<!-- Mobile Filter Toggle Button (visible only on mobile) -->
		<!--    <div class="lg:hidden mb-4">-->
		<!--      <button-->
		<!--          class="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"-->
		<!--          @click="showFilters = !showFilters"-->
		<!--      >-->
		<!--        <span class="font-medium">Filtros</span>-->
		<!--        <svg-->
		<!--            :class="showFilters ? 'transform rotate-180' : ''"-->
		<!--            class="h-5 w-5"-->
		<!--            fill="none"-->
		<!--            stroke="currentColor"-->
		<!--            viewBox="0 0 24 24"-->
		<!--            xmlns="http://www.w3.org/2000/svg"-->
		<!--        >-->
		<!--          <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>-->
		<!--        </svg>-->
		<!--      </button>-->
		<!--    </div>-->

		<div class="flex flex-col lg:flex-row gap-3">

			<!-- Dynamic Filters - Collapsible on mobile -->

			<div
				:class="[
          showFilters ? 'block' : 'hidden', 
          'lg:block w-full lg:w-64 flex-shrink-0'
        ]"
			>
				<div class="sticky top-4 bg-white p-3 rounded-lg shadow-sm">
					<h3 class="text-lg font-semibold mb-4">
						<i class="fa fa-filter text-gray-400"></i>
						Filtros
					</h3>
					<!--          <Loading></Loading>-->
					<CategoriaFilter :productos="productos"
						@on-selected="(value)=>{codigoCategorias=value}"/>
					<!--					<LineaFilter :productos="filteredProducts"-->
					<!--						@on-selected="(value)=>{codigoLineas=value}"/>-->
					<!--					<PriceFilter :products="filteredProducts"-->
					<!--						@on-selected="(value)=>{precioSeleccionado=value}"/>-->
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
				<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
					<ProductCounterBadge :filtered-products="filteredProducts"
						:paginated-products="paginatedProducts"/>
					<select
						class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
					>
						<option>Mas Popular</option>
						<option>Nuevos</option>
						<option>Precio: Bajo</option>
						<option>Precio: Alto</option>
					</select>


				</div>

				<!-- Product Grid - Responsive columns -->
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					<!--					<ProductCartLoading></ProductCartLoading>-->
					<ProductCartLoading v-for="row in 9"
						v-if="loading"/>
					<ProductCard v-for="product in paginatedProducts"
						v-else
						:key="product.codigo"
						:product="product"/>
				</div>

				<!-- Pagination -->
				<div class="mt-8 flex justify-center">
					<nav aria-label="Pagination"
						class="flex flex-wrap items-center justify-center gap-2">
						<!-- Previous page button -->
						<button
							:class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
							:disabled="currentPage === 1"
							class="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
							@click="prevPage"
						>
							<span class="sr-only">Previous</span>
							<svg aria-hidden="true"
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path clip-rule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									fill-rule="evenodd"/>
							</svg>
						</button>

						<!-- Page numbers - Hide some on small screens -->
						<template v-for="page in displayedPages"
							:key="page">
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
							<span class="sr-only">Next</span>
							<svg aria-hidden="true"
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 20 20"
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
	</div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css';
import ProductCounterBadge from "~/components/ProductCounterBadge.vue";
import {Producto} from "~/models.js";
import {useProductos} from "~/composables/useProductos.js";

export default {
	components: {ProductCounterBadge},
	inject: ['bus'],
	setup() {
		const {productos, loading} = useProductos()
		return {
			/** @type {Producto[]} */
			productos,
			loading
		}
	},
	data() {
		return {
			currentPage: 1,
			itemsPerPage: 9,
			selectedCategories: [],
			priceFilter: 0,
			inStockOnly: false,
			showFilters: false, // For mobile filter toggle
			categorias: [],
			codigoCategorias: [], // codigo de las categorias
			codigoLineas: [], //codigo de lineas
			precioSeleccionado: 0,
		};
	},

	computed: {
		// Dynamic filter values
		uniqueCategories() {
			return [...new Set(this.productos.map(product => product.codigo_categoria))].filter(Boolean).sort();
		},

		minPrice() {
			if (this.productos.length === 0) return 0;
			return Math.floor(Math.min(...this.productos.map(product => Number(product.precio) || 0)));
		},

		maxPrice() {
			if (this.productos.length === 0) return 0;
			return Math.ceil(Math.max(...this.productos.map(product => Number(product.precio) || 0)));
		},

		// Apply filters to products
		filteredProducts() {


			/**
			 *
			 * @param item {Producto}
			 * @param filter {Array[Number]}
			 * @returns {boolean}
			 */
			function filter_by_categoria(item, filter) {
				return filter.includes(item.categoria);
			}

			/**
			 *
			 * @param item {Producto}
			 * @param filter {Array[Number]}
			 * @returns {boolean}
			 */
			function filter_by_linea(item, filter) {
				return filter.includes(item.codigo_division);
			}

			function filter_by_price(item, filter) {
				return item.precio <= filter
			}

			if (this.codigoCategorias.length === 0) {
				return this.productos
			}

			return this.productos.filter(item => filter_by_categoria(item, this.codigoCategorias))


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

		// Calculate which page numbers to display
		displayedPages() {
			const pages = [];
			const totalPages = this.totalPages;

			if (totalPages <= 5) {
				// If 5 or fewer pages, show all page numbers
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
		// formatPrice(price) {
		// 	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		// },

		// Clear all filters
		clearFilters() {
			this.selectedCategories = [];
			this.priceFilter = this.maxPrice;
			this.inStockOnly = false;
			this.$bus.emit('clear-filters')
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
		},
	},


}
</script>
