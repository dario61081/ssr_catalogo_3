import {CategoriaResponse, ProductoResponse} from "~/types";

export const mapToProducto = (data: ProductoResponse) => {
	// Asegurarse de que el precio se procese correctamente
	// let precio;
	// try {
	// 	// Eliminar todos los puntos y convertir a número
	// 	precio = parseInt(data.PRECIO.replace(/\./g, ''));
	// 	if (isNaN(precio)) {
	// 		precio = 0;
	// 	}
	// } catch (error) {
	// 	console.error('Error al procesar el precio:', error);
	// 	precio = 0;
	// }
	//
	console.table(data)

	return {
		codigo: data.ART_COD,
		nombre: data.ART_DESCRIPCION,
		codigo_categoria: data.DIV_CLAS,
		desc_categoria: data.DIV_CLAS_DESC,
		precio: parseInt(data.PRECIO.replace('.', '')),
		imagen: data.ART_DIR_IMAG1 || '',
		imagen_2: data.ART_DIR_IMAG2 || '',
		imagen_3: data.ART_DIR_IMAG3 || '',
		stock: data.STOCK,
		codigo_division: data.DIVISION,
		desc_division: data.DIV_DESC
	}
}

export const mapToCategoria = (data: CategoriaResponse) => {
	return {
		codigo: data.DIV_CODIGO,
		nombre: data.DIV_DESC,
		imagen: data.DIV_DIR_IMAGEN || '',
		estado: data.DIV_ESTADO,
		orden: data.DIV_ORDEN
	}
}
