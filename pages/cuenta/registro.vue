<script lang="ts"
		setup>
// Componente de registro de usuario
definePageMeta({
	layout: 'simple-layout'
})

const nombre = ref('')
const apellido = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)
const success = ref(false)

const registrarUsuario = async () => {
	// Validaciones básicas
	if (!nombre.value || !apellido.value || !email.value || !password.value) {
		error.value = 'Por favor complete todos los campos'
		return
	}

	if (password.value !== confirmPassword.value) {
		error.value = 'Las contraseñas no coinciden'
		return
	}

	try {
		loading.value = true
		// Aquí iría la lógica para enviar los datos al backend
		// const response = await fetch('/api/registro', {
		//   method: 'POST',
		//   headers: { 'Content-Type': 'application/json' },
		//   body: JSON.stringify({ nombre: nombre.value, apellido: apellido.value, email: email.value, password: password.value })
		// })

		// Simulamos respuesta exitosa
		await new Promise(resolve => setTimeout(resolve, 1000))
		success.value = true
		error.value = ''
	} catch (err) {
		error.value = 'Error al registrar usuario. Intente nuevamente.'
		console.error(err)
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
			<h2 class="text-2xl font-bold text-center mb-6">Crear una cuenta</h2>

			<div v-if="success"
				 class="mb-4 p-4 bg-green-100 text-green-700 rounded">
				Registro exitoso. Ahora puede iniciar sesión con sus credenciales.
			</div>

			<div v-if="error"
				 class="mb-4 p-4 bg-red-100 text-red-700 rounded">
				{{ error }}
			</div>

			<form class="space-y-4"
				  @submit.prevent="registrarUsuario">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700"
							   for="nombre">Nombre
						</label>
						<input
							id="nombre"
							v-model="nombre"
							class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							required
							type="text"
						>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700"
							   for="apellido">Apellido
						</label>
						<input
							id="apellido"
							v-model="apellido"
							class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							required
							type="text"
						>
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700"
						   for="email">Correo electrónico
					</label>
					<input
						id="email"
						v-model="email"
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						required
						type="email"
					>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700"
						   for="password">Contraseña
					</label>
					<input
						id="password"
						v-model="password"
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						required
						type="password"
					>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700"
						   for="confirmPassword">Confirmar contraseña
					</label>
					<input
						id="confirmPassword"
						v-model="confirmPassword"
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						required
						type="password"
					>
				</div>

				<div class="flex items-center">
					<input
						id="terms"
						class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						required
						type="checkbox"
					>
					<label class="ml-2 block text-sm text-gray-700"
						   for="terms">
						Acepto los
						<NuxtLink class="text-blue-600 hover:underline"
								  to="/terminos-uso">términos y condiciones
						</NuxtLink>
					</label>
				</div>

				<div>
					<button
						:disabled="loading"
						class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						type="submit"
					>
            <span v-if="loading"
				  class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white"
				   fill="none"
				   viewBox="0 0 24 24"
				   xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"></circle>
                <path class="opacity-75"
					  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					  fill="currentColor"></path>
              </svg>
            </span>
						{{ loading ? 'Registrando...' : 'Registrarse' }}
					</button>
				</div>

				<div class="text-center mt-4">
					<p class="text-sm text-gray-600">
						¿Ya tienes una cuenta?
						<NuxtLink class="text-blue-600 hover:underline"
								  to="/cuenta/login">Iniciar sesión
						</NuxtLink>
					</p>
				</div>
			</form>
			
			<!-- Separador -->
			<div class="mt-8 relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="px-2 bg-white text-gray-500">O regístrate con</span>
				</div>
			</div>
			
			<!-- Botones de redes sociales -->
			<div class="mt-6 grid grid-cols-2 gap-3">
				<div>
					<button 
						type="button"
						class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<svg class="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
						</svg>
						Facebook
					</button>
				</div>
				<div>
					<button 
						type="button"
						class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						<svg class="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
						</svg>
						Google
					</button>
				</div>
			</div>
			
			<!-- Nota legal -->
			<p class="mt-4 text-xs text-center text-gray-500">
				Al registrarte, aceptas nuestra <a href="/politica-privacidad" class="text-blue-600 hover:underline">Política de Privacidad</a> 
				<br/>
				y los <a href="/terminos-uso" class="text-blue-600 hover:underline">Términos de Uso</a>.
			</p>
		</div>
	</div>
</template>
