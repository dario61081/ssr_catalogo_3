import {ProductoResponse} from "~/types";

export const useProducts = async () => {

	const url = 'https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC'

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Error al cargar productos');
		}

		const data: ProductoResponse[] = await response.json();

		if (process.dev) {
			console.log('Productos cargados: ', data);
		}
		return {
			productos: data,
			error: null
		}

	} catch (error) {
		console.error('Error al cargar productos:', error);
		return {
			productos: [],
			error: 'Error al cargar los productos. Por favor, intente nuevamente.'
		}
	}

}
