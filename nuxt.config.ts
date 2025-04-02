// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: {enabled: false},
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxt/image',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'@nuxtjs/robots',
	],
	app: {
		head: {
			title: 'Paraná Hogar',
			meta: [
				{charset: 'utf-8'},
				{name: 'viewport', content: 'width=device-width, initial-scale=1'}
			],
			link: [
				{rel: 'stylesheet', href: '/styles/general.css'}
			]
		}
	},
	alias: {
		'@': '<rootDir>/'
	},
	debug: false,
	build: {
		postcss: {
			postcssOptions: {
				plugins: {
					tailwindcss: {},
					autoprefixer: {
						// Configuración específica para Safari
						overrideBrowserslist: [
							'last 3 Safari versions',
							'last 3 iOS versions',
							'last 3 Chrome versions',
							'last 3 Firefox versions',
							'last 3 Edge versions'
						],
						grid: 'autoplace' // Para compatibilidad con grid en Safari
					},
				},
			},
		},
	},
})
