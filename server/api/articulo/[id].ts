import {useMaps} from "~/composables/useMaps"
import {ArticuloResponse} from "~/types/types";

export default defineEventHandler(async (event) => {

	const codigo = event.context.params.id

	try {
		const apiUrl = `https://panel.colchonesparana.com.py/api/v2/articulos/detalle/${codigo}/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC`
		const data = await $fetch<ArticuloResponse[]>(apiUrl)

		// convertir a objeto Producto
		return useMaps()
			.mapToProducto(data[0])

	} catch (error) {
		console.error(error)
		return {error: 'Error al buscar artículos'}
	}
})



