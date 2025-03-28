<script setup>
import { useAuthStore } from '~/stores/auth'
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const login = async () => {
  // Validaciones básicas
  if (!email.value || !password.value) {
    error.value = 'Por favor ingrese su correo y contraseña'
    return
  }
  
  try {
    loading.value = true
    // Simulamos una llamada al backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // En un caso real, aquí se validarían las credenciales contra el backend
    // Por ahora, simulamos un login exitoso con datos de prueba
    authStore.login({
      nombre: 'Usuario',
      apellido: 'Demo',
      email: email.value
    })
    
    // Redirigir a la página de mi cuenta
    router.push('/cuenta/mi-cuenta')
  } catch (err) {
    error.value = 'Credenciales inválidas. Intente nuevamente.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
      
      <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
        {{ error }}
      </div>
      
      <form @submit.prevent="login" class="space-y-4">
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
        
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              id="remember_me" 
              type="checkbox" 
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label for="remember_me" class="ml-2 block text-sm text-gray-700">
              Recordarme
            </label>
          </div>
          
          <div class="text-sm">
            <NuxtLink to="/cuenta/recuperar-password" class="text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </NuxtLink>
          </div>
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
            {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>
        </div>
        
        <div class="text-center mt-4">
          <p class="text-sm text-gray-600">
            ¿No tienes una cuenta? 
            <NuxtLink to="/cuenta/registro" class="text-blue-600 hover:underline">Regístrate</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
