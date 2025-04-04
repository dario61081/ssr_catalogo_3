<template>
	<div class="min-h-screen bg-gray-50">
		<Header @on-search="(filter)=>abrirBuscador()"
			@open-cart="abrirCarrito"
			@open-history="abrirHistorial"/>
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="flex gap-8">
				<ProductGrid/>
			</div>
		</main>
		<!--		<CartAsideViewer :carrito="[]"-->
		<!--			:isOpen="isCartOpen"-->
		<!--			@close="cerrarCarrito"/>-->
		<SearchAsideViewer :isOpen="isSearchOpen"
			@close="cerrarBuscador"/>
		<ProductViewHistory :isOpen="isHistoryOpen"
			@close="cerrarHistorial"/>
		<FabChatButton></FabChatButton>
		<Footer></Footer>
	</div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import 'animate.css/animate.compat.css'

export default {

	data() {
		return {
			filtros: [],
			isCartOpen: false,
			isSearchOpen: false,
			isHistoryOpen: false,
		}
	},
	methods: {

		cerrarCarrito() {
			this.isCartOpen = false
		},
		abrirCarrito() {
			this.isCartOpen = true
		},
		cerrarBuscador() {
			this.isSearchOpen = false
		},
		abrirBuscador() {
			this.isSearchOpen = true
		},
		cerrarHistorial() {
			this.isHistoryOpen = false
		},
		abrirHistorial() {
			this.isHistoryOpen = true
		}
	},

}


</script>
