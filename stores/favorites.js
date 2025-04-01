// stores/favorites.js
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: []
  }),
  
  getters: {
    hasFavorites: (state) => state.favorites.length > 0,
    isFavorite: (state) => (productId) => {
      return state.favorites.some(item => item.codigo === productId)
    },
    favoritesCount: (state) => state.favorites.length
  },
  
  actions: {
    addFavorite(product) {
      // Verificar si el producto ya está en favoritos
      if (!this.favorites.some(item => item.codigo === product.codigo)) {
        this.favorites.push(product)
        this.saveFavorites()
      }
    },
    
    removeFavorite(productId) {
      this.favorites = this.favorites.filter(item => item.codigo !== productId)
      this.saveFavorites()
    },
    
    toggleFavorite(product) {
      const existingIndex = this.favorites.findIndex(item => item.codigo === product.codigo)
      
      if (existingIndex >= 0) {
        // Si ya existe, lo eliminamos
        this.favorites.splice(existingIndex, 1)
      } else {
        // Si no existe, lo agregamos
        this.favorites.push(product)
      }
      
      this.saveFavorites()
      return existingIndex < 0 // Retorna true si se agregó, false si se eliminó
    },
    
    clearFavorites() {
      this.favorites = []
      this.saveFavorites()
    },
    
    saveFavorites() {
      if (process.client) {
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
    },
    
    loadFavorites() {
      if (process.client) {
        const saved = localStorage.getItem('favorites')
        if (saved) {
          this.favorites = JSON.parse(saved)
        }
      }
    }
  }
})
