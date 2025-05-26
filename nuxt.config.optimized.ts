// Optimized nuxt.config.ts with CSS optimizations

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    app: {
        head: {
            htmlAttrs: {
                lang: 'es' // Spanish language for the entire page
            },
            title: 'Paraná Hogar - Catálogo de Productos',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    name: 'description',
                    content: 'Catálogo de productos de Paraná Hogar. Encuentra muebles, colchones y más para tu hogar.'
                }
            ],
            link: [
                // Critical CSS loaded immediately
                { rel: 'stylesheet', href: '/styles/critical.css' },
                // Non-critical CSS loaded asynchronously
                {
                    rel: 'preload',
                    href: '/styles/general.css',
                    as: 'style',
                    onload: "this.onload=null;this.rel='stylesheet'"
                },
                {
                    rel: 'preload',
                    href: 'https://unpkg.com/primeicons/primeicons.css',
                    as: 'style',
                    onload: "this.onload=null;this.rel='stylesheet'"
                },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                {
                    rel: 'preload',
                    href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
                    as: 'style',
                    onload: "this.onload=null;this.rel='stylesheet'"
                }
            ],
            script: [
                // Add script attribute to defer non-critical scripts
                { src: 'https://unpkg.com/primeicons/primeicons.js', defer: true },
                // Load non-critical CSS fallback for browsers that don't support preload
                {
                    innerHTML: `
            /* Fallback for browsers that don't support preload */
            (function() {
              var links = document.getElementsByTagName('link');
              for (var i = 0; i < links.length; i++) {
                if (links[i].rel === 'preload' && links[i].getAttribute('as') === 'style') {
                  // Force load after a short delay if onload doesn't work
                  setTimeout(function(link) {
                    if (link.rel !== 'stylesheet') {
                      link.rel = 'stylesheet';
                    }
                  }, 2000, links[i]);
                }
              }
            })();
          `,
                    type: 'text/javascript'
                }
            ]
        }
    },
    routeRules: {
        "/product/**": { prerender: true, ssr: true },
    },
    alias: {
        '@': '~/'
    },
    debug: false,
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/robots',
    ],
    build: {
        transpile: ['mitt']
    },
    css: [
        // Moved from main CSS to critical.css for above-the-fold content
        // '~/assets/css/main.css', // Comment this out if you don't need all the styles
        'leaflet/dist/leaflet.css'
    ],
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate']
    },
    imports: {
        dirs: ['stores']
    },
    experimental: {
        treeshakeClientOnly: true,
        payloadExtraction: true
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NODE_ENV === 'production'
                ? process.env.API_BASE
                : process.env.DEV_API_BASE,
        }
    },
    nitro: {
        development: {
            dotenv: '.env.dev'
        },
        production: {
            dotenv: '.env'
        },
        compressPublicAssets: true,
        compressPublicAssetsWith: {
            brotli: true,
            gzip: true,
        },
        minify: true,
        routeRules: {
            '/img/**': {
                cache: {
                    maxAge: 60 * 60 * 24 * 365 // 1 year cache for images
                }
            },
            '/styles/**': {
                cache: {
                    maxAge: 60 * 60 * 24 * 30 // 30 days cache for styles
                },
                headers: {
                    // Add aggressive caching for CSS files
                    'cache-control': 'public, max-age=2592000'
                }
            },
            '/_nuxt/**': {
                headers: {
                    'cache-control': 'public, max-age=31536000, immutable'
                }
            },
            '/**': {
                headers: {
                    'x-content-type-options': 'nosniff'
                }
            }
        }
    }
})
