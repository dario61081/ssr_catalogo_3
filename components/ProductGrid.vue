<template>
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
					<path d="M19 9l-7 7-7-7"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"/>
				</svg>
			</button>
		</div>

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
					<Loading v-if="loading"></Loading>

					<CategoriaFilter
						:categorias="categorias"
						@on-selected="filterByCategoriaAndResetSub"
					/>

					<!-- Only show subcategory filter when categories are selected -->
					<SubDivisionFilter
						v-if="activeFilters.categorias && activeFilters.categorias.length > 0"
						:productos="productos"
						:allProducts="cacheProductos"
						:activeCategories="activeFilters.categorias"
						@on-selected="filterBySubcategoria"
					></SubDivisionFilter>
					<PriceFilter
						:products="productos"
						@on-selected="filterByPrecio"
					/>

					<!-- Favorites Filter -->
					<div v-if="favoritesStore.hasFavorites"
						class="mb-4">
						<div class="flex items-center justify-between">
							<label class="text-sm font-medium text-gray-700"
								for="favorites-filter">
								Solo favoritos
							</label>
							<button
								:class="showFavoritesOnly ? 'bg-red-500' : 'bg-gray-200'"
								class="flex items-center justify-center w-10 h-6 rounded-full"
								@click="toggleFavoritesFilter"
							>
								<span
									:class="showFavoritesOnly ? 'translate-x-2' : '-translate-x-2'"
									class="w-4 h-4 rounded-full transform transition-transform duration-200 bg-white"
								></span>
							</button>
						</div>
						<p class="text-xs text-gray-500 mt-1">
							{{
								showFavoritesOnly ? 'Mostrando solo productos favoritos' : 'Mostrando todos los productos'
							}}
						</p>
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
				<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
					<ProductCounterBadge
						:filtered-products="productos"
						:paginated-products="paginatedProducts"
					/>

					<select
						class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
						@change="(event) => ordenarPor(event.target.value)"
					>
						<option class="text-gray-300"
							selected>-- Sin Ordenar --
						</option>
						<option value="precio_asc">Precio: Bajo al alto</option>
						<option value="precio_desc">Precio: Alto al bajo</option>
					</select>
				</div>

				<!-- Product Grid - Responsive columns -->
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					<ProductCartLoading v-for="row in 9"
						v-if="loading"
						:key="'loading-'+row"/>
					<ProductCard
						v-for="product in paginatedProducts"
						v-else
						:product="product"
						:key="product.codigo"
					/>
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
import {useProductos} from "~/composables/useProductos.js";
import {useFavoritesStore} from "~/stores/favorites.js";

export default {
	components: {ProductCounterBadge},

	setup() {
		const {
			productos,
			categorias,
			loading,
			filterByCategoria,
			filterByPrecio,
			filterByFavoritos,
			filterBySubcategoria,
			ordenarPor,
			activeFilters,
			cacheProductos
		} = useProductos();

		const favoritesStore = useFavoritesStore();
		const {$bus} = useNuxtApp();

		return {
			productos,
			categorias,
			loading,
			filterByCategoria,
			filterByPrecio,
			filterByFavoritos,
			filterBySubcategoria,
			ordenarPor,
			favoritesStore,
			bus: $bus,
			activeFilters,
			cacheProductos
		};
	},

	data() {
		return {
			currentPage: 1,
			itemsPerPage: 9,
			showFavoritesOnly: false,
			showFilters: false, // For mobile filter toggle
			previousCategories: [], // Track previous category selection
		};
	},

	computed: {
		// Get products for the current page from filtered products
		paginatedProducts() {
			const startIndex = (this.currentPage - 1) * this.itemsPerPage;
			const endIndex = startIndex + this.itemsPerPage;
			return this.productos.slice(startIndex, endIndex);
		},

		// Calculate total number of pages based on filtered products
		totalPages() {
			return Math.ceil(this.productos.length / this.itemsPerPage);
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
		// Reset to page 1 when products change
		'productos.length'() {
			this.currentPage = 1;
		}
	},

	methods: {
		// Filter by category and reset subcategory filter only when categories change
		filterByCategoriaAndResetSub(categorias) {
			// Check if the category selection has actually changed
			const hasChanged = this.haveCategoriesChanged(this.previousCategories, categorias);
			
			// Apply category filter
			this.filterByCategoria(categorias);
			
			// If categories have changed, reset subcategories
			if (hasChanged) {
				this.filterBySubcategoria([]);
				this.bus.emit('reset-subcategories');
			}
			
			// Update previous categories for next comparison
			this.previousCategories = [...categorias];
		},
		
		// Helper to check if category selections have changed
		haveCategoriesChanged(previous, current) {
			// Different lengths means the selection has changed
			if (previous.length !== current.length) return true;
			
			// Check if any category is in one array but not the other
			for (const category of previous) {
				if (!current.includes(category)) return true;
			}
			
			for (const category of current) {
				if (!previous.includes(category)) return true;
			}
			
			// If we get here, the selections are the same
			return false;
		},

		// Toggle favorites filter
		toggleFavoritesFilter() {
			this.showFavoritesOnly = !this.showFavoritesOnly;

			if (this.showFavoritesOnly) {
				// Get array of favorited product IDs
				const favoriteIds = this.favoritesStore.favorites.map(item => item.codigo.toString());
				this.filterByFavoritos(favoriteIds);
			} else {
				this.filterByFavoritos([]);
			}
		},

		// Clear all filters
		clearFilters() {
			this.showFavoritesOnly = false;
			this.bus.emit('clear-filters');
			this.filterByCategoria([]);
			this.filterBySubcategoria([]);
			this.filterByPrecio(0);
			this.filterByFavoritos([]);
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

	mounted() {
		// Load favorites on component mount
		this.favoritesStore.loadFavorites();
	}
}
</script>
