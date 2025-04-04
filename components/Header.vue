<template>
	<header class="bg-black text-white shadow-sm">
		<nav
			class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center justify-between">
			<div class="flex items-center justify-between py-2 sm:py-0">
				<!-- Logo and Title -->
				<div class="flex items-center">
					<NuxtLink to="/" class="flex items-center">
						<img alt="Parana Hogar"
							 src="/img/logo_white.svg"
							 style="width: 140px; height: auto;">
						<span class="hidden md:block text-white font-medium ml-4 text-lg border-l border-gray-600 pl-4">Catálogo de productos</span>
					</NuxtLink>
				</div>

				<!-- Mobile Menu Button -->
				<button
					class="sm:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
					@click="mobileMenuOpen = !mobileMenuOpen"
				>
					<svg
						class="h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							v-if="!mobileMenuOpen"
							d="M4 6h16M4 12h16M4 18h16"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
						/>
						<path
							v-else
							d="M6 18L18 6M6 6l12 12"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
						/>
					</svg>
				</button>
			</div>

			<!-- Desktop Navigation Links -->
			<!--      <div class="hidden sm:flex space-x-8 ml-10">-->
			<!--        <NuxtLink to="/" class="text-gray-500 hover:text-gray-900">Inicio</NuxtLink>-->
			<!--        <NuxtLink to="/productos" class="text-gray-500 hover:text-gray-900">Productos</NuxtLink>-->
			<!--        <NuxtLink to="/categorias" class="text-gray-500 hover:text-gray-900">Categorías</NuxtLink>-->
			<!--        <NuxtLink to="/ofertas" class="text-gray-500 hover:text-gray-900">Ofertas</NuxtLink>-->
			<!--      </div>-->

			<!-- Desktop Action Icons -->
			<div class="hidden sm:flex items-center space-x-4">
				<button class="text-gray-500 hover:text-gray-900"
						@click="$emit('on-search')">
					<svg class="h-6 w-6"
						 fill="none"
						 stroke="currentColor"
						 viewBox="0 0 24 24"
						 xmlns="http://www.w3.org/2000/svg">
						<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							  stroke-linecap="round"
							  stroke-linejoin="round"
							  stroke-width="2"/>
					</svg>
				</button>
				<NuxtLink :to="{name: 'favoritos'}"
						  class="text-gray-500 hover:text-gray-900"
						  to="/favoritos">
					<svg class="h-6 w-6"
						 fill="none"
						 stroke="currentColor"
						 viewBox="0 0 24 24"
						 xmlns="http://www.w3.org/2000/svg">
						<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							  stroke-linecap="round"
							  stroke-linejoin="round"
							  stroke-width="2"/>
					</svg>
				</NuxtLink>
				<NuxtLink :to="userDestination"
						  class="text-gray-500 hover:text-gray-900">
					<svg class="h-6 w-6"
						 fill="none"
						 stroke="currentColor"
						 viewBox="0 0 24 24"
						 xmlns="http://www.w3.org/2000/svg">
						<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							  stroke-linecap="round"
							  stroke-linejoin="round"
							  stroke-width="2"/>
					</svg>
				</NuxtLink>
				<button class="text-gray-500 hover:text-gray-900 relative"
						@click="$emit('open-cart')">
					<svg class="h-6 w-6"
						 fill="none"
						 stroke="currentColor"
						 viewBox="0 0 24 24"
						 xmlns="http://www.w3.org/2000/svg">
						<path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
							  stroke-linecap="round"
							  stroke-linejoin="round"
							  stroke-width="2"/>
					</svg>
					<span
						class="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
				</button>
				<button class="text-gray-500 hover:text-gray-900 relative"
						@click="$emit('open-history')"
				>
					<svg class="h-6 w-6"
						 fill="none"
						 stroke="currentColor"
						 viewBox="0 0 24 24"
						 xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"/>
					</svg>
				</button>
			</div>

			<!-- Mobile Menu (Collapsible) -->
			<div
				v-show="mobileMenuOpen"
				class="sm:hidden py-3 border-t border-gray-200"
			>
				<div class="flex flex-col space-y-3">
					<NuxtLink class="text-gray-500 hover:text-gray-900 py-1"
							  to="/">Inicio
					</NuxtLink>
					<NuxtLink class="text-gray-500 hover:text-gray-900 py-1"
							  to="/productos">Productos
					</NuxtLink>
					<NuxtLink class="text-gray-500 hover:text-gray-900 py-1"
							  to="/categorias">Categorías
					</NuxtLink>
					<NuxtLink class="text-gray-500 hover:text-gray-900 py-1"
							  to="/ofertas">Ofertas
					</NuxtLink>
				</div>

				<!-- Mobile Action Icons -->
				<div class="flex justify-between mt-4 pt-3 border-t border-gray-100">
					<button class="text-gray-500 hover:text-gray-900 p-1"
							@click="$emit('on-search')">
						<svg class="h-6 w-6"
							 fill="none"
							 stroke="currentColor"
							 viewBox="0 0 24 24"
							 xmlns="http://www.w3.org/2000/svg">
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								  stroke-linecap="round"
								  stroke-linejoin="round"
								  stroke-width="2"/>
						</svg>
					</button>
					<NuxtLink class="text-gray-500 hover:text-gray-900 p-1"
							  to="/favoritos">
						<svg class="h-6 w-6"
							 fill="none"
							 stroke="currentColor"
							 viewBox="0 0 24 24"
							 xmlns="http://www.w3.org/2000/svg">
							<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								  stroke-linecap="round"
								  stroke-linejoin="round"
								  stroke-width="2"/>
						</svg>
					</NuxtLink>
					<NuxtLink :to="userDestination"
							  class="text-gray-500 hover:text-gray-900 p-1">
						<svg class="h-6 w-6"
							 fill="none"
							 stroke="currentColor"
							 viewBox="0 0 24 24"
							 xmlns="http://www.w3.org/2000/svg">
							<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								  stroke-linecap="round"
								  stroke-linejoin="round"
								  stroke-width="2"/>
						</svg>
					</NuxtLink>
					<button class="text-gray-500 hover:text-gray-900 p-1 relative"
							@click="$emit('open-cart')">
						<svg class="h-6 w-6"
							 fill="none"
							 stroke="currentColor"
							 viewBox="0 0 24 24"
							 xmlns="http://www.w3.org/2000/svg">
							<path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								  stroke-linecap="round"
								  stroke-linejoin="round"
								  stroke-width="2"/>
						</svg>
						<span
							class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
					</button>
					<button class="text-gray-500 hover:text-gray-900 p-1 relative"
							@click="$emit('open-history')"
					>
						<svg class="h-6 w-6"
							 fill="none"
							 stroke="currentColor"
							 viewBox="0 0 24 24"
							 xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"/>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import {useAuthStore} from '~/stores/auth'
import {computed, onMounted} from 'vue'
import {useRoute} from 'vue-router'

export default {
	emits: ['on-search', 'open-cart', 'open-history'],
	setup() {
		const authStore = useAuthStore()
		const route = useRoute()

		// Inicializar el estado de autenticación al cargar el componente
		onMounted(() => {
			authStore.initAuth()
		})

		// Determinar la página de destino según el estado de autenticación
		const userDestination = computed(() => {
			return authStore.isAuthenticated ? '/cuenta/mi-cuenta' : '/cuenta/registro'
		})

		return {
			route,
			userDestination
		}
	},
	data() {
		return {
			mobileMenuOpen: false
		}
	}
}
</script>
