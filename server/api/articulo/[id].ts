import {readFile} from 'fs/promises'
import {join} from 'path'

export default defineEventHandler(async (event) => {
	try {
		// @ts-ignore
		const {id} = event.context.params // Obtenemos el ID de la URL
		const filePath = join(process.cwd(), 'public/api/articulos.json')
		const content = await readFile(filePath, 'utf-8')
		const data = JSON.parse(content)

		// Convertir el ID a número para comparar
		const filtered = data.find((item: any) => item.ART_COD === Number(id))

		return filtered ?? {error: 'Artículo no encontrado'}
	} catch (error) {
		console.error(error)
		return {error: 'Error al leer artículos'}
	}
})
