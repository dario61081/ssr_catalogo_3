// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  
  actions: {
    login(userData) {
      this.isAuthenticated = true
      this.user = userData
      
      // Guardar en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
    },
    
    logout() {
      this.isAuthenticated = false
      this.user = null
      
      // Limpiar localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },
    
    initAuth() {
      // Recuperar estado de autenticación al iniciar la aplicación
      if (process.client) {
        const user = localStorage.getItem('user')
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        
        if (user && isAuthenticated === 'true') {
          this.isAuthenticated = true
          this.user = JSON.parse(user)
        }
      }
    }
  }
})
