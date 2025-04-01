export default defineEventHandler(async (event) => {
	try {
		const urlApi = "https://panel.colchonesparana.com.py/articulos/divisiones/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC/TODOS"
		return await $fetch(urlApi)

	} catch (error) {
		console.error(error)
		return {error: 'Error al buscar categorias'}
	}
})
