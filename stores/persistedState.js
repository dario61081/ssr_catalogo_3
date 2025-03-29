// stores/persistedState.js
export const persistedState = {
  localStorage: {
    getItem: (key) => {
      if (process.client) {
        return localStorage.getItem(key)
      }
      return null
    },
    setItem: (key, value) => {
      if (process.client) {
        localStorage.setItem(key, value)
      }
    }
  }
}
