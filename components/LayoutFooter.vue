<template>
	<footer class="bg-black text-white py-4">

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Mobile Footer with Collapsible Sections - Hidden on Desktop -->
			<div class="lg:hidden space-y-1">

				<!-- Company Info Section -->
				<div class="border-b border-gray-800 pb-2 mb-2">
					<div class="flex items-center justify-between" @click="toggleSection('company')">
						<!--            <h3 class="text-base font-semibold">Paraná Hogar</h3>-->


						<svg :class="openSections.company ? 'rotate-180' : ''"
							class="h-5 w-5 transform transition-transform duration-200" fill="none"
							stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
						</svg>
					</div>
					<div v-show="openSections.company" class="mt-2 space-y-2 text-gray-400 text-sm">
						<p>Encuentra todo lo que necesitas para tu hogar en un solo lugar.</p>
						<div class="flex space-x-3 mt-2">
							<a class="text-gray-400 hover:text-white" href="/">
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
								</svg>
							</a>
							<a class="text-gray-400 hover:text-white" href="#">
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M24 4.572C24 4.572 19.04 0 12 0C4.96 0 0 4.572 0 4.572C0 9.938 4.96 16 12 16C19.04 16 24 9.938 24 4.572ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2Z" />
								</svg>
							</a>
						</div>
					</div>


				</div>

				<!-- Quick Links Section -->
				<div class="border-b border-gray-800 py-2 mb-2">
					<div class="flex items-center justify-between" @click="toggleSection('links')">
						<h3 class="text-base font-semibold">Enlaces Rápidos</h3>
						<svg :class="openSections.links ? 'rotate-180' : ''"
							class="h-5 w-5 transform transition-transform duration-200" fill="none"
							stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
						</svg>
					</div>
					<div v-show="openSections.links" class="mt-4 space-y-3 text-gray-400">
						<div>
							<a class="hover:text-white" href="/">Inicio
							</a>
						</div>
						<div>
							<a class="hover:text-white" href="/catalog">Catálogo
							</a>
						</div>
					</div>
				</div>

				<!-- Customer Service Section -->
				<div class="border-b border-gray-800 py-2 mb-2">
					<div class="flex items-center justify-between" @click="toggleSection('service')">
						<h3 class="text-base font-semibold">Atención al Cliente</h3>
						<svg :class="openSections.service ? 'rotate-180' : ''"
							class="h-5 w-5 transform transition-transform duration-200" fill="none"
							stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
						</svg>
					</div>
					<div v-show="openSections.service" class="mt-4 space-y-3 text-gray-400">
						<div>
							<a class="hover:text-white" href="/info/contacto">Contacto
							</a>
						</div>
						<div>
							<a class="hover:text-white" href="/info/faq">Preguntas Frecuentes
							</a>
						</div>
						<!-- <div><a class="hover:text-white" href="/envios">Envíos</a></div>
						<div><a class="hover:text-white" href="/devoluciones">Devoluciones</a></div> -->
						<div>
							<a class="hover:text-white" href="/info/terminos">Términos y Condiciones
							</a>
						</div>
					</div>
				</div>

				<!-- Contact Sections (Split into Branches and Contact Info) -->
				<div class="border-b border-gray-800 py-2 mb-2">
					<!-- Branches Section -->
					<div class="flex items-center justify-between" @click="toggleSection('branches')">
						<h3 class="text-base font-semibold">Nuestras Sucursales</h3>
						<svg :class="openSections.branches ? 'rotate-180' : ''"
							class="h-5 w-5 transform transition-transform duration-200" fill="none"
							stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
						</svg>
					</div>
					<div v-show="openSections.branches" class="mt-2 space-y-2 text-gray-400 text-sm">
						<div class="flex items-start text-sm">
							<svg class="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
								<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round"
									stroke-linejoin="round" stroke-width="2" />
							</svg>
							<div>
								<b>Showroom Encarnación</b>
								<br>
								Padre Kreusser c/Gral. Artigas
								<br>
								+595 71 202 145
							</div>
						</div>
						<div class="flex items-start text-sm">
							<svg class="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
								<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round"
									stroke-linejoin="round" stroke-width="2" />
							</svg>
							<div>
								<b>Showroom Asunción</b>
								<br>
								Avda. República Argentina & Dr. Hassler
								<br>
								+595 21 326 0656
							</div>
						</div>
					</div>
				</div>

				<!-- Contact Info Section -->
				<div class="border-b border-gray-800 py-2 mb-2">
					<div class="flex items-center justify-between" @click="toggleSection('contact')">
						<h3 class="text-base font-semibold">Contacto</h3>
						<svg :class="openSections.contact ? 'rotate-180' : ''"
							class="h-5 w-5 transform transition-transform duration-200" fill="none"
							stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
						</svg>
					</div>
					<div v-show="openSections.contact" class="mt-2 space-y-2 text-gray-400 text-sm">
						<div class="flex items-start text-sm">
							<svg class="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
							</svg>
							<span>info@paranahogar.com.py</span>
						</div>
						<div class="flex items-start text-sm">
							<svg class="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
									stroke-linejoin="round" stroke-width="2" />
							</svg>
							<span>Lun-Vie: 9:00 - 18:00<br>Sáb: 9:00 - 13:00</span>
						</div>
					</div>
				</div>

				<!-- Newsletter Section -->
				<!-- <div class="py-2 mb-2">
					<h3 class="text-base font-semibold mb-2">Suscríbete</h3>
					<p class="text-gray-400 mb-2 text-sm">Recibe nuestras ofertas y novedades</p>
					<form class="flex flex-col space-y-2">
						<input
							class="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
							placeholder="Tu correo electrónico"
							type="email"
						>
						<button
							class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors duration-200"
							type="submit"
						>
							Suscribirse
						</button>
					</form>
				</div> -->
			</div>

			<!-- Desktop Footer - 4 Column Layout -->
			<div class="hidden lg:grid lg:grid-cols-4 lg:gap-6"> <!-- Column 1: Company Info -->
				<div>
					<NuxtImg alt="Logo de Paraná Hogar" src="/img/logo.svg" width="180" height="44" />
					<p class="text-gray-400 mb-2 text-sm">Encuentra todo lo que necesitas para tu hogar en un solo
						lugar.</p>
					<div class="flex space-x-3">
						<a class="text-gray-400 hover:text-white" href="/">
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
							</svg>
						</a>
						<a class="text-gray-400 hover:text-white" href="#">
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
							</svg>
						</a>
						<a class="text-gray-400 hover:text-white" href="#">
							<i class="pi pi-twitter"></i>
						</a>
						<a class="text-gray-400 hover:text-white" href="#">
							<i class="pi pi-tiktok"></i>
						</a>

					</div>
				</div>

				<!-- Column 2: Quick Links -->
				<div>
					<h3 class="text-base font-semibold mb-2">Enlaces Rápidos</h3>
					<ul class="space-y-2 text-gray-400 text-sm">
						<li>
							<a class="hover:text-white" href="/">Inicio
							</a>
						</li>
						<li>
							<a class="hover:text-white" href="/catalog">Catálogo
							</a>
						</li>
						<li>
							<a class="hover:text-white" href="/info/contacto">Contacto
							</a>
						</li>
						<li>
							<a class="hover:text-white" href="/info/faq">Preguntas Frecuentes
							</a>
						</li>
					</ul>
				</div>

				<!-- Column 3: Branches -->
				<div>
					<h3 class="text-base font-semibold mb-2">Nuestras Sucursales</h3>
					<ul class="space-y-2 text-gray-400 text-sm">
						<li class="flex items-start">
							<svg class="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
								<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round"
									stroke-linejoin="round" stroke-width="2" />
							</svg>
							<div>
								<b>Showroom Encarnación</b>
								<br>
								Padre Kreusser c/Gral. Artigas
								<br>
								+595 71 202 145
							</div>
						</li>
						<li class="flex items-start mt-3">
							<svg class="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
								<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round"
									stroke-linejoin="round" stroke-width="2" />
							</svg>
							<div>
								<b>Showroom Asunción</b>
								<br>
								Avda. República Argentina & Dr. Hassler
								<br>
								+595 21 326 0656
							</div>
						</li>
					</ul>
				</div>

				<!-- Column 4: Contact -->
				<div>
					<h3 class="text-base font-semibold mb-2">Contacto</h3>
					<ul class="space-y-2 text-gray-400 text-sm mb-4">
						<li class="flex items-start">
							<svg class="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
							</svg>
							<span>info@paranahogar.com.py</span>
						</li>
						<li class="flex items-start">
							<svg class="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
									stroke-linejoin="round" stroke-width="2" />
							</svg>
							<span>Lun-Vie: 9:00 - 18:00<br>Sáb: 9:00 - 13:00</span>
						</li>
						<li class="flex items-start">
							<svg class="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
							</svg>
							<span>+595 71 202 145</span>
						</li>
					</ul>
				</div>
			</div>


			<!-- Copyright Section -->
			<div class="mt-4 pt-4 border-t border-gray-800">
				<div class="flex flex-col md:flex-row md:justify-between md:items-center">
					<p class="text-gray-400 text-xs mb-2 md:mb-0">
						&copy; {{ new Date().getFullYear() }} Paraná Hogar. Todos los derechos reservados.
					</p>
					<div class="flex flex-wrap gap-3 text-xs text-gray-400">
						<a class="hover:text-white" href="/info/privacidad">Política de Privacidad
						</a>
						<a class="hover:text-white" href="/info/terminos">Términos de Uso
						</a>
						<a class="hover:text-white" href="/info/cookies">Política de Cookies
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			openSections: {
				company: false,
				links: false,
				service: false,
				contact: false,
				branches: false
			}
		}
	},
	methods: {
		toggleSection(section) {
			this.openSections[section] = !this.openSections[section];
		}
	}
}
</script>
