/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Add CSS optimization settings
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './app.vue',
    ],
    options: {
      safelist: [
        /^p-/,      // PrimeVue classes
        /^pi-/,     // PrimeIcons classes
        /^leaflet/, // Leaflet map classes
        /^nuxt-/,   // Nuxt-generated classes
        'dark-mode',
        'light-mode'
      ],
    }
  }
}
