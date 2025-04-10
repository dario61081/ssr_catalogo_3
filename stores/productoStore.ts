import {defineStore} from 'pinia';
import type {Producto, ProductoResponse} from '~/types';
import {mapToProducto} from "~/utils/transforms";


export const useProductoStore = defineStore('producto', {
	state: () => ({
		productos: [] as Producto[],
		loading: false,
		error: null as string | null,
	}),
	persist: true,
	getters: {
		getProductoById: (state) => (id: number) => {
			return state.productos.find(prod => prod.codigo === id);
		},
		getProductosByCategoria: (state) => (categoriaId: number) => {
			return state.productos.filter(prod => prod.codigo_division === categoriaId);
		},
		getProductosBySubcategoria: (state) => (subcategoriaId: number) => {
			return state.productos.filter(prod => prod.codigo_categoria === subcategoriaId);
		}
	},

	actions: {
		async fetchProductos() {
			this.loading = true;
			this.error = null;

			try {
				const {data, error} = await useFetch<ProductoResponse[]>(
					'https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC',
					{
						key: 'productos',
						server: true,
						onResponseError(ctx) {
							console.error('Error en la respuesta de la API:', ctx.error);
							return ctx;
						}
					}
				);


				if (error.value) {
					console.error('Error de la API:', error.value);
					throw new Error(`Error al cargar productos: ${error.value.message}`);
				}


				// Verificar si data.value existe
				if (!data.value) {
					console.error('La respuesta de la API es nula o indefinida');
					throw new Error('No se recibieron datos de la API');
				}

				// Imprimir la respuesta para depuración
				console.log('Respuesta de la API:', typeof data.value, data.value);

				// // Verificar si es un array o si podemos convertirlo en uno
				// let productosArray = data.value;
				// if (!Array.isArray(productosArray)) {
				// 	// Intentar convertir a array si es un objeto
				// 	if (typeof productosArray === 'object' && productosArray !== null) {
				// 		console.warn('La respuesta no es un array, intentando convertir');
				// 		// Si es un objeto con una propiedad que contiene el array
				// 		const possibleArrayProperties = Object.values(productosArray);
				// 		if (possibleArrayProperties.length > 0 && Array.isArray(possibleArrayProperties[0])) {
				// 			productosArray = possibleArrayProperties[0];
				// 		} else {
				// 			// Si es un objeto que debería tratarse como un array de un solo elemento
				// 			productosArray = [productosArray];
				// 		}
				// 	} else {
				// 		console.error('La respuesta no es un array ni un objeto:', productosArray);
				// 		throw new Error('Formato de respuesta inválido: no es un array ni un objeto');
				// 	}
				// }

				// Transformar los datosw
				// @ts-ignore
				this.productos = data.value.map(prod => mapToProducto(prod));
				console.log(`Productos cargados: ${this.productos.length}`);

				// Si no hay productos después de procesar, podría ser un problema con la transformación
				if (this.productos.length === 0) {
					console.warn('No se encontraron productos después de procesar la respuesta');
				}
			} catch (err) {
				console.error('Error al cargar productos:', err);
				this.error = 'Error al cargar los productos. Por favor, intente nuevamente.';
			} finally {
				this.loading = false;
			}
		},

		async fetchProductoById(id: number) {
			try {
				const {data, error} = await useFetch<ProductoResponse[]>(
					`https://panel.colchonesparana.com.py/api/v2/articulos/detalle/${id}/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC`,
					{
						key: `producto-${id}`,
						onResponseError(ctx) {
							console.error(`Error en la respuesta de la API para producto ${id}:`, ctx.error);
							return ctx;
						}
					}
				);
				if (!data.value) {
					console.error(`No se encontraron datos para el producto ${id}`);
					return null;
				}
				if (error.value) {
					console.error(`Error al cargar producto ${id}:`, error.value);
					throw new Error(`Error al cargar el producto: ${error.value.message}`);
				}

				// Transformar y devolver el producto
				const producto = mapToProducto(data.value[0]);
				console.log(`Producto ${id} cargado:`, producto);
				return producto;
			} catch (err) {
				console.error(`Error al cargar producto con ID ${id}:`, err);
				throw new Error('Error al cargar el producto. Por favor, intente nuevamente.');
			}
		}
	}

});
