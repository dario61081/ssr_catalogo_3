export default defineEventHandler(async (event) => {
	try {
		// URL con token de autenticación codificado para evitar problemas con caracteres especiales
		const token = encodeURIComponent('$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC');
		const urlApi = `https://panel.colchonesparana.com.py/articulos/divisiones/${token}/TODOS`;
		
		const response = await $fetch(urlApi, {
			retry: 3,
			timeout: 10000,
			onResponseError(error) {
				console.error('Error en respuesta de API de categorías:', error);
				throw new Error('Error al obtener categorías del servidor');
			}
		});
		
		// Verificar si la respuesta es un array válido
		if (!Array.isArray(response)) {
			throw new Error('Formato de respuesta inválido');
		}
		
		return response;
	} catch (error) {
		console.error('Error al buscar categorías:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Error al buscar categorías',
			message: error instanceof Error ? error.message : 'Error desconocido'
		});
	}
});
