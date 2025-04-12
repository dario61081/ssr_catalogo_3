import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false
  }),
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      // Update document class for theme switching
      if (process.client) {
        document.documentElement.classList.toggle('dark-mode', this.isDarkMode);
      }
    },
    initTheme() {
      if (process.client) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          this.isDarkMode = true;
          document.documentElement.classList.add('dark-mode');
        }
      }
    }
  },
  persist: true
});