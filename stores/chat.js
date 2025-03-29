// stores/chat.js
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    isChatOpen: false
  }),
  
  actions: {
    addMessage(message) {
      this.messages.push({
        ...message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })
    },
    
    toggleChat() {
      this.isChatOpen = !this.isChatOpen
    },
    
    clearChat() {
      this.messages = []
    },
    
    initChat() {
      // Agregar mensaje de bienvenida si no hay mensajes guardados
      if (this.messages.length === 0) {
        this.addMessage({
          text: '¡Hola! ¿En qué podemos ayudarte?',
          isUser: false
        })
      }
    }
  },
  
  persist: {
    storage: process.client ? localStorage : null,
    paths: ['messages']
  }
})
