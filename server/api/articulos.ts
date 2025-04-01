export default defineEventHandler(async (event) => {
	try {
		const apiUrl = "https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC"
		return await $fetch(apiUrl)
	} catch (error) {
		console.error(error)
		return {error: 'Error al buscar artículos'}
	}
})
