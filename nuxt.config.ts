// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: false },
	app: {
		head: {
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
				{ rel: 'stylesheet', href: '/styles/general.css' },
				{ rel: 'stylesheet', href: 'https://unpkg.com/primeicons/primeicons.css' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap'
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
		'~/assets/css/main.css'
	],
	pinia: {
		autoImports: ['defineStore',
			'acceptHMRUpdate']
	},
	imports: {
		dirs: ['stores']
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
		}
	}
})
