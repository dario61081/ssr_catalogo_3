<template>
	<div class="min-h-screen bg-gray-50">
		<Header @on-search="(filter)=>abrirBuscador()"
				@open-cart="abrirCarrito"/>
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="flex gap-8">
				<!--        <Sidebar :precio_maximo="precio_maximo" :precio_minimo="precio_minimo" @on-filters="(filters)=>{}"/>-->
				<ProductGrid :loading="loading"
							 :products="productos"/>
			</div>
		</main>
		<CartAsideViewer :isOpen="isCartOpen"
						 @close="cerrarCarrito"/>
		<SearchAsideViewer :isOpen="isSearchOpen"
						   @close="cerrarBuscador"/>
               <!-- <FabButton></FabButton> -->
               <FabChatButton > </FabChatButton>
                		<Footer></Footer>
	</div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import 'animate.css/animate.compat.css'
import {Producto} from "~/models";

export default {

	data() {
		return {
			productos: [],
			filtros: [],
			isCartOpen: false,
			isSearchOpen: false,
			loading: true
		}
	},
	methods: {
		get_data() {
			this.loading = true
			fetch('/api/articulos')
				.then(res => res.json())
				.then(res => {
					this.productos = res.map(item => {
						return new Producto(item.ART_COD, item.ART_DESCRIPCION, item.LINEA, item.PRECIO, item.ART_DIR_IMAG1, item.STOCK)
					})
				}).finally(() => {
				this.loading = false
			})
		},
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
		}
	},
	mounted() {
		this.get_data()
	},
}


</script>
