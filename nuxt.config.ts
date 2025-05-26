// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
	// Specify correct dependency resolution to help with h3 module resolution
	vite: {
		resolve: {
			dedupe: ['h3', 'vue']
		},
		optimizeDeps: {
			include: ['h3']
		},
		build: {
			cssCodeSplit: true,
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ['vue', 'vue-router'],
					}
				}
			}
		}
	},
	alias: {
		'h3': require.resolve('h3'),
	},
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	app: {
		head: {
			htmlAttrs: {
				lang: 'es' // Specify Spanish language for the entire page
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
				{ rel: 'stylesheet', href: '/styles/critical.css' },
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
				{ src: 'https://unpkg.com/primeicons/primeicons.js', defer: true }
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
		'~/assets/css/main.css',
		'leaflet/dist/leaflet.css'
	],
	pinia: {
		autoImports: ['defineStore',
			'acceptHMRUpdate']
	},
	imports: {
		dirs: ['stores']
	},
	// Optimize imports to reduce bundle size
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
		compressPublicAssets: true, // Enable compression for all public assets
		compressPublicAssetsWith: {
			brotli: true, // Enable Brotli compression (highest compression)
			gzip: true,   // Enable gzip as fallback
		},
		// Improve minification and tree-shaking
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
			},
			'/assets/**': { headers: { 'cache-control': 'public,max-age=31536000,immutable' } },
			'/api/**': { headers: { 'cache-control': 'public,max-age=60,stale-while-revalidate=30' } },
		}
	},
	image: {
		quality: 80,
		screens: {
			xs: 320,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			xxl: 1536,
		},
		format: ['webp', 'jpg', 'png']
	},
})
