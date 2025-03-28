<template>
	<header class="bg-black text-white shadow-sm">
		<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center justify-between">
			<div class="flex items-center justify-between py-2 sm:py-0">
				<!-- Logo -->
				<NuxtLink to="/">
					<img alt="Parana Hogar"
						 src="/img/logo_white.svg"
						 style="width: 140px; height: auto;">
				</NuxtLink>
				<!-- Volver -->
				<NuxtLink to="/" class="ml-5 flex items-center text-white hover:text-gray-300 transition">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
					</svg>
					Volver
				</NuxtLink>
				<!-- Mobile Menu Button -->
				<!--        <button-->
				<!--            class="sm:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"-->
				<!--            @click="mobileMenuOpen = !mobileMenuOpen"-->
				<!--        >-->
				<!--          <svg-->
				<!--              class="h-6 w-6"-->
				<!--              fill="none"-->
				<!--              stroke="currentColor"-->
				<!--              viewBox="0 0 24 24"-->
				<!--              xmlns="http://www.w3.org/2000/svg"-->
				<!--          >-->
				<!--            <path-->
				<!--                v-if="!mobileMenuOpen"-->
				<!--                d="M4 6h16M4 12h16M4 18h16"-->
				<!--                stroke-linecap="round"-->
				<!--                stroke-linejoin="round"-->
				<!--                stroke-width="2"-->
				<!--            />-->
				<!--            <path-->
				<!--                v-else-->
				<!--                d="M6 18L18 6M6 6l12 12"-->
				<!--                stroke-linecap="round"-->
				<!--                stroke-linejoin="round"-->
				<!--                stroke-width="2"-->
				<!--            />-->
				<!--          </svg>-->
				<!--        </button>-->
			</div>

			<!-- Mobile Menu (Collapsible) -->
			<!--      <div-->
			<!--          v-show="mobileMenuOpen"-->
			<!--          class="sm:hidden py-3 border-t border-gray-200"-->
			<!--      >-->
			<!--        <div class="flex flex-col space-y-3">-->
			<!--          <NuxtLink class="text-gray-500 hover:text-gray-900 py-1" to="/">Inicio</NuxtLink>-->
			<!--          <NuxtLink class="text-gray-500 hover:text-gray-900 py-1" to="/productos">Productos</NuxtLink>-->
			<!--          <NuxtLink class="text-gray-500 hover:text-gray-900 py-1" to="/categorias">Categorías</NuxtLink>-->
			<!--          <NuxtLink class="text-gray-500 hover:text-gray-900 py-1" to="/ofertas">Ofertas</NuxtLink>-->
			<!--        </div>-->
			<!--      </div>-->
		</nav>
	</header>
</template>

<script>
export default {
	data() {
		return {
			mobileMenuOpen: false
		}
	}
}
</script>
