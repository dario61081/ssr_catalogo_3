// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: {enabled: false},
	modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
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
	}
})
