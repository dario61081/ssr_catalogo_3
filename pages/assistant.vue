<script lang="ts" setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'simple-layout'
})

const message = ref('')
const messages = ref([
  { 
    text: 'Hola, soy tu asistente virtual. ¿En qué puedo ayudarte hoy?', 
    isUser: false, 
    timestamp: new Date().toLocaleTimeString() 
  }
])
const loading = ref(false)
const chatContainer = ref(null)

const sendMessage = () => {
  if (!message.value.trim()) return

  // Agregar mensaje del usuario
  messages.value.push({
    text: message.value,
    isUser: true,
    timestamp: new Date().toLocaleTimeString()
  })

  // Simular respuesta del asistente
  loading.value = true
  setTimeout(() => {
    messages.value.push({
      text: 'Estoy procesando tu consulta. En breve te responderé.',
      isUser: false,
      timestamp: new Date().toLocaleTimeString()
    })
    loading.value = false
    message.value = ''
    scrollToBottom()
  }, 1000)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-64px)]">
    <h1 class="text-2xl font-bold mb-6">Asistente Virtual</h1>
    
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-gray-800 text-white p-4">
        <h2 class="text-lg font-medium">Chat con el Asistente IA</h2>
      </div>
      
      <div class="h-96 overflow-y-auto p-4" ref="chatContainer">
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          :class="[
            'p-3 rounded-lg mb-3 max-w-[80%]', 
            msg.isUser ? 'bg-gray-200 ml-auto' : 'bg-blue-100'
          ]"
        >
          <p class="text-sm">{{ msg.text }}</p>
          <span class="text-xs text-gray-500">{{ msg.timestamp }}</span>
        </div>
        
        <div v-if="loading" class="flex justify-center py-2">
          <div class="dot-flashing"></div>
        </div>
      </div>
      
      <div class="p-4 border-t">
        <form @submit.prevent="sendMessage" class="flex">
          <input
            v-model="message"
            type="text"
            placeholder="Escribe tu mensaje..."
            class="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
    background-color: #9880ff;
  }
  50%, 100% {
    background-color: rgba(152, 128, 255, 0.2);
  }
}
</style>
