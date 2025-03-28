<script lang="ts" setup>
// Componente de registro de usuario
definePageMeta({
  layout: 'default'
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
      
      <div v-if="success" class="mb-4 p-4 bg-green-100 text-green-700 rounded">
        Registro exitoso. Ahora puede iniciar sesión con sus credenciales.
      </div>
      
      <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
        {{ error }}
      </div>
      
      <form @submit.prevent="registrarUsuario" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input 
              id="nombre" 
              v-model="nombre" 
              type="text" 
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
          </div>
          
          <div>
            <label for="apellido" class="block text-sm font-medium text-gray-700">Apellido</label>
            <input 
              id="apellido" 
              v-model="apellido" 
              type="text" 
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
          </div>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
        </div>
        
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <input 
            id="confirmPassword" 
            v-model="confirmPassword" 
            type="password" 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
        </div>
        
        <div class="flex items-center">
          <input 
            id="terms" 
            type="checkbox" 
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          >
          <label for="terms" class="ml-2 block text-sm text-gray-700">
            Acepto los <NuxtLink to="/terminos-uso" class="text-blue-600 hover:underline">términos y condiciones</NuxtLink>
          </label>
        </div>
        
        <div>
          <button 
            type="submit" 
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="loading"
          >
            <span v-if="loading" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </div>
        
        <div class="text-center mt-4">
          <p class="text-sm text-gray-600">
            ¿Ya tienes una cuenta? 
            <NuxtLink to="/cuenta/login" class="text-blue-600 hover:underline">Iniciar sesión</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
