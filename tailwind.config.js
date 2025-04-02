module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./app.vue'
	],
	theme: {
		extend: {},
	},
	plugins: [],
	// Configuración importante para Safari
	corePlugins: {
		// Asegura que los estilos de flexbox funcionen en Safari
		flex: true,
		// Habilita transformaciones 3D para mejor rendimiento
		transform: true,
		// Asegura la compatibilidad con prefijos de WebKit
		backfaceVisibility: true,
	}
}
