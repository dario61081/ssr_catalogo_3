// CSS optimization script
// Save as purgecss-config.js

module.exports = {
  content: [
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './app.vue'
  ],
  css: [
    './assets/css/main.css'
  ],
  output: './public/styles/general.css',
  safelist: [
    // Add classes that are dynamically created and should not be purged
    /^p-/,        // PrimeVue classes
    /^pi-/,       // PrimeIcons classes
    /^leaflet-/,  // Leaflet map classes
    /^nuxt-/,     // Nuxt-generated classes
    'dark-mode',
    'light-mode',
    /^bg-/,       // Common Tailwind background classes
    /^text-/,     // Common Tailwind text classes
    /^border-/,   // Common Tailwind border classes
    /^grid-/,     // Grid classes
    /^flex-/,     // Flex classes
    /^w-/,        // Width classes
    /^h-/,        // Height classes
    /^m-/,        // Margin classes
    /^p-/,        // Padding classes
    /^rounded/    // Border radius classes
  ]
}
