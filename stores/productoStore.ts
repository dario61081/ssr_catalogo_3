// export const useProductoStore = defineStore('producto', {
// 	state: () => ({
// 		productos: [] as Producto[],
// 		loading: false,
// 		error: null as string | null,
// 	}),
// 	persist: true,
// 	getters: {
// 		getProductoById: (state) => (id: number) => {
// 			return state.productos.find(prod => prod.codigo === id);
// 		},
// 		getProductosByCategoria: (state) => (categoriaId: number) => {
// 			return state.productos.filter(prod => prod.codigo_division === categoriaId);
// 		},
// 		getProductosBySubcategoria: (state) => (subcategoriaId: number) => {
// 			return state.productos.filter(prod => prod.codigo_categoria === subcategoriaId);
// 		}
// 	},
//
// 	actions: {
// 		async fetchProductos() {
// 			this.loading = true;
// 			this.error = null;
//
// 			try {
// 				const {data, error} = await useFetch<ProductoResponse[]>(
// 					'https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC',
// { key: 'productos', server: true, onResponseError(ctx) { console.error('Error en la respuesta de la API:',
// ctx.error); return ctx; } } );   if (error.value) { console.error('Error de la API:', error.value); throw new
// Error(`Error al cargar productos: ${error.value.message}`); }   // Verificar si data.value existe if (!data.value) {
// console.error('La respuesta de la API es nula o indefinida'); throw new Error('No se recibieron datos de la API'); }
// // Imprimir la respuesta para depuración console.log('Respuesta de la API:', typeof data.value, data.value);  // //
// Verificar si es un array o si podemos convertirlo en uno // let productosArray = data.value; // if
// (!Array.isArray(productosArray)) { // 	// Intentar convertir a array si es un objeto // 	if (typeof
// productosArray === 'object' && productosArray !== null) { // 		console.warn('La respuesta no es un array,
// intentando convertir'); // 		// Si es un objeto con una propiedad que contiene el array // 		const
// possibleArrayProperties = Object.values(productosArray); // 		if (possibleArrayProperties.length > 0 && Array.isArray(possibleArrayProperties[0])) { // 			productosArray = possibleArrayProperties[0]; // 		} else { // 			// Si es un objeto que debería tratarse como un array de un solo elemento // 			productosArray = [productosArray]; // 		} // 	} else { // 		console.error('La respuesta no es un array ni un objeto:', productosArray); // 		throw new Error('Formato de respuesta inválido: no es un array ni un objeto'); // 	} // }  // Transformar los datosw // @ts-ignore this.productos = data.value.map(prod => mapToProducto(prod)); console.log(`Productos cargados: ${this.productos.length}`);  // Si no hay productos después de procesar, podría ser un problema con la transformación if (this.productos.length === 0) { console.warn('No se encontraron productos después de procesar la respuesta'); } } catch (err) { console.error('Error al cargar productos:', err); this.error = 'Error al cargar los productos. Por favor, intente nuevamente.'; } finally { this.loading = false; } },  async fetchProductoById(id: number) { try { const {data, error} = await useFetch<ProductoResponse[]>( `https://panel.colchonesparana.com.py/api/v2/articulos/detalle/${id}/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC`, { key: `producto-${id}`, onResponseError(ctx) { console.error(`Error en la respuesta de la API para producto ${id}:`, ctx.error); return ctx; } } ); if (!data.value) { console.error(`No se encontraron datos para el producto ${id}`); return null; } if (error.value) { console.error(`Error al cargar producto ${id}:`, error.value); throw new Error(`Error al cargar el producto: ${error.value.message}`); }  // Transformar y devolver el producto const producto = mapToProducto(data.value[0]); console.log(`Producto ${id} cargado:`, producto); return producto; } catch (err) { console.error(`Error al cargar producto con ID ${id}:`, err); throw new Error('Error al cargar el producto. Por favor, intente nuevamente.'); } } }  });
import {defineStore} from 'pinia';
import type {Producto, ProductoResponse} from '~/types';
import {mapToProducto} from "~/utils/transforms";


// @ts-ignore
export const useProductoStore = defineStore('producto', {
	state: () => ({
		productos: [] as Producto[],
		loading: false,
		error: null as string | null,
		lastFetched: null as Date | null, // Para implementar caché con tiempo de expiración
	}),

	// Configuración de persistencia mejorada
	persist: {
		paths: ['productos',
			'lastFetched'], // Solo persistir los datos necesarios, no el estado loading
		storage: piniaPluginPersistedstate.localStorage()
	},

	getters: {
		getProductoById: (state) => (id: number) => {
			return state.productos.find(prod => prod.codigo === id);
		},
		getProductosByCategoria: (state) => (categoriaId: number) => {
			return state.productos.filter(prod => prod.codigo_division === categoriaId);
		},
		getProductosBySubcategoria: (state) => (subcategoriaId: number) => {
			return state.productos.filter(prod => prod.codigo_categoria === subcategoriaId);
		},
		// Nuevo getter para verificar si los datos están desactualizados
		isDataStale: (state) => {
			if (!state.lastFetched) return true;
			// Caducidad de caché de 1 hora
			const cacheExpiry = 60 * 60 * 500;
			return (Date.now() - new Date(state.lastFetched).getTime()) > cacheExpiry;
		}
	},

	actions: {
		// Método para limpiar el store completamente
		clearStore() {
			this.productos = [];
			this.error = null;
			this.lastFetched = null;
		},

		async fetchProductos(forceRefresh = false) {
			// Verificar si ya tenemos datos y no están desactualizados
			if (!forceRefresh && this.productos.length > 0 && !this.isDataStale) {
				console.log('Usando productos en caché:', this.productos.length);
				return this.productos;
			}

			this.loading = true;
			this.error = null;

			try {
				const apiUrl = 'https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC';

				const {data, error} = await useFetch<ProductoResponse[]>(apiUrl, {});

				if (error.value) {
					throw new Error(`Error al cargar productos: ${error.value.message}`);
				}

				if (!data.value || !Array.isArray(data.value)) {
					throw new Error('Formato de respuesta inválido: no se recibió un array');
				}

				// Transformar los datos
				this.productos = data.value.map(prod => mapToProducto(prod));
				this.lastFetched = new Date();

				console.log(`Productos cargados: ${this.productos.length}`);
				return this.productos;
			} catch (err) {
				console.error('Error al cargar productos:', err);
				this.error = err instanceof Error ?
					err.message :
					'Error al cargar los productos';
				throw err;
			} finally {
				this.loading = false;
			}
		},

		async fetchProductoById(id: number) {
			// Primero verificar si ya está en caché
			const cachedProducto = this.getProductoById(id);
			if (cachedProducto && !this.isDataStale) {
				return cachedProducto;
			}

			try {
				const apiUrl = `https://panel.colchonesparana.com.py/api/v2/articulos/detalle/${id}/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC`;

				const {data, error} = await useFetch<ProductoResponse[]>(apiUrl, {
					key: `producto-${id}-${Date.now()}`,
					retry: 1,
					timeout: 5000,
				});

				if (error.value) {
					throw new Error(`Error al cargar producto: ${error.value.message}`);
				}

				if (!data.value || !Array.isArray(data.value) || data.value.length === 0) {
					throw new Error(`No se encontró el producto con ID ${id}`);
				}

				// Transformar el producto
				const producto = mapToProducto(data.value[0]);

				// Actualizar el producto en el array si ya existe
				const index = this.productos.findIndex(p => p.codigo === id);
				if (index !== -1) {
					this.productos[index] = producto;
				} else {
					// Agregar el producto al array si no existe
					this.productos.push(producto);
				}

				return producto;
			} catch (err) {
				console.error(`Error al cargar producto con ID ${id}:`, err);
				this.error = err instanceof Error ?
					err.message :
					`Error al cargar el producto con ID ${id}`;
				throw err;
			}
		},

		// Nuevo método para actualizar un producto específico
		updateProducto(id: number,
					   updatedData: Partial<Producto>) {
			const index = this.productos.findIndex(p => p.codigo === id);
			if (index !== -1) {
				this.productos[index] = {...this.productos[index], ...updatedData};
				return this.productos[index];
			}
			return null;
		}
	}
});
