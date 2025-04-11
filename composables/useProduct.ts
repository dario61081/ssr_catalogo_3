import {ProductoResponse} from "~/types";

export const useProduct = (codigo_producto: number) => {
	const {
		data,
		error
	} = useFetch<ProductoResponse[]>(`/api/v2/articulos/detalle/${codigo_producto}/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC`, {key: `producto-${codigo_producto}`});

	if (error.value) {
		throw new Error(`Error al cargar producto: ${error.value.message}`);
	}

	if (!data.value || !Array.isArray(data.value) || data.value.length === 0) {
		throw new Error(`No se encontró el producto con ID ${codigo_producto}`);
	}

	// Transformar el producto
	return {producto: mapToProducto(data.value[0])}

}
