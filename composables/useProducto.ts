export const useProducto = async (codigo_producto: Number) => {

	const producto = await $fetch('/api/articulo/' + codigo_producto);

	return {
		producto
	}

};
