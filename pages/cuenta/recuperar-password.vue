<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'simple-layout'
})

const email = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

// Captcha variables
const num1 = ref(0)
const num2 = ref(0)
const operation = ref('')
const operationSymbol = ref('')
const userAnswer = ref('')
const correctAnswer = ref(0)
const captchaError = ref('')

// Función para generar un número aleatorio entre min y max
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Función para generar un nuevo captcha
const generateCaptcha = () => {
  num1.value = getRandomNumber(1, 10)
  num2.value = getRandomNumber(1, 10)
  
  // Decidir aleatoriamente entre suma o resta
  const operations = ['add', 'subtract']
  operation.value = operations[Math.floor(Math.random() * operations.length)]
  
  if (operation.value === 'add') {
    operationSymbol.value = '+'
    correctAnswer.value = num1.value + num2.value
  } else {
    // Para resta, asegurarse que el resultado sea positivo
    if (num1.value < num2.value) {
      const temp = num1.value
      num1.value = num2.value
      num2.value = temp
    }
    operationSymbol.value = '-'
    correctAnswer.value = num1.value - num2.value
  }
  
  userAnswer.value = ''
  captchaError.value = ''
}

// Función para verificar el captcha
const verifyCaptcha = () => {
  if (userAnswer.value === '') {
    captchaError.value = 'Por favor, responde el captcha'
    return false
  }
  
  const parsedAnswer = parseInt(userAnswer.value)
  if (isNaN(parsedAnswer)) {
    captchaError.value = 'Por favor, ingresa un número válido'
    return false
  }
  
  if (parsedAnswer !== correctAnswer.value) {
    captchaError.value = 'Respuesta incorrecta, intenta nuevamente'
    generateCaptcha()
    return false
  }
  
  captchaError.value = ''
  return true
}

// Función para enviar solicitud de recuperación de contraseña
const recuperarPassword = async () => {
  if (!verifyCaptcha()) {
    return
  }
  
  if (!email.value) {
    error.value = 'Por favor, ingresa tu correo electrónico'
    return
  }
  
  try {
    loading.value = true
    error.value = ''
    
    // Aquí iría la lógica para enviar el correo de recuperación
    // Por ejemplo: await authStore.sendPasswordResetEmail(email.value)
    
    // Simulamos un tiempo de espera para demostración
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    success.value = true
    loading.value = false
  } catch (e) {
    loading.value = false
    error.value = 'Ocurrió un error al enviar el correo de recuperación'
    console.error(e)
  }
}

// Generar captcha al cargar el componente
onMounted(() => {
  generateCaptcha()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-2xl font-bold text-center mb-6">Recuperar contraseña</h2>
      
      <div v-if="!success">
        <p class="text-gray-600 mb-6 text-center">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        
        <form @submit.prevent="recuperarPassword" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="tu@email.com"
            />
          </div>
          
          <!-- Captcha matemático simple -->
          <div class="bg-gray-50 p-4 rounded-md border border-gray-200">
            <label class="block text-sm font-medium text-gray-700 mb-2">Verificación de seguridad</label>
            <div class="flex items-center space-x-2 mb-2">
              <span class="text-lg font-medium">{{ num1 }} {{ operationSymbol }} {{ num2 }} = </span>
              <input
                v-model="userAnswer"
                type="text"
                inputmode="numeric"
                class="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="?"
              />
              <button 
                type="button" 
                @click="generateCaptcha"
                class="p-2 text-gray-500 hover:text-gray-700"
                title="Generar nuevo captcha"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
            <p v-if="captchaError" class="text-sm text-red-600">{{ captchaError }}</p>
            <p class="text-xs text-gray-500">Resuelve esta operación matemática para verificar que eres humano.</p>
          </div>
          
          <div v-if="error" class="text-sm text-red-600">
            {{ error }}
          </div>
          
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Enviando...' : 'Enviar enlace de recuperación' }}
            </button>
          </div>
          
          <div class="text-center">
            <a href="/cuenta/login" class="text-sm text-indigo-600 hover:text-indigo-500">
              Volver al inicio de sesión
            </a>
          </div>
        </form>
      </div>
      
      <div v-else class="text-center">
        <div class="bg-green-50 text-green-800 p-4 rounded-md mb-6">
          <svg class="h-6 w-6 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <p class="font-medium">¡Correo enviado!</p>
        </div>
        <p class="text-gray-600 mb-6">
          Hemos enviado un enlace de recuperación a <strong>{{ email }}</strong>. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
        </p>
        <a href="/cuenta/login" class="text-indigo-600 hover:text-indigo-500 font-medium">
          Volver al inicio de sesión
        </a>
      </div>
    </div>
  </div>
</template>
