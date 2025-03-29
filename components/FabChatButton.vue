<template>
  <div>
    <!-- Botón flotante de chat -->
    <button 
      @click="chatStore.toggleChat"
      class="fixed bottom-6 right-6 bg-black hover:bg-gray-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
      aria-label="Abrir chat"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>

    <!-- Diálogo de chat -->
    <div 
      v-if="chatStore.isChatOpen" 
      class="fixed bottom-20 right-6 bg-white rounded-lg shadow-xl z-50 w-80 sm:w-96 max-h-[70vh] flex flex-col transition-all duration-300"
    >
      <div class="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 class="font-medium">Chat con nosotros</h3>
        <button @click="chatStore.toggleChat" class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-4 overflow-y-auto flex-grow" ref="chatContainer">
        <!-- Mensajes del chat -->
        <div 
          v-for="(msg, index) in chatStore.messages" 
          :key="index" 
          :class="[
            'p-3 rounded-lg mb-3 max-w-[80%]', 
            msg.isUser ? 'bg-gray-200 ml-auto' : 'bg-gray-100'
          ]"
        >
          <p class="text-sm">{{ msg.text }}</p>
          <span class="text-xs text-gray-500">{{ msg.timestamp }}</span>
        </div>
      </div>
      
      <div class="border-t p-3">
        <div class="flex items-center">
          <input 
            type="text" 
            v-model="message" 
            placeholder="Escribe un mensaje..." 
            class="flex-grow p-2 border rounded-l-lg focus:outline-none"
            @keyup.enter="sendMessage"
          />
          <button 
            @click="sendMessage" 
            class="bg-black text-white p-2 rounded-r-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useChatStore } from '~/stores/chat';

const chatStore = useChatStore();
const message = ref('');
const chatContainer = ref(null);

// Función para enviar mensaje
function sendMessage() {
  if (message.value.trim()) {
    // Agregar mensaje del usuario
    chatStore.addMessage({
      text: message.value,
      isUser: true
    });
    
    // Simular respuesta automática después de un breve retraso
    setTimeout(() => {
      chatStore.addMessage({
        text: "Gracias por tu mensaje. Pronto un representante se pondrá en contacto contigo.",
        isUser: false
      });
    }, 1000);
    
    message.value = '';
  }
}

// Desplazar al final del chat cuando se agregan nuevos mensajes
watch(() => chatStore.messages.length, async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
});
</script>
