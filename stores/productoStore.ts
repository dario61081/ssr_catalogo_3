import {defineStore} from 'pinia';
import type {Producto, ProductoResponse} from '~/types';

export const useProductoStore = defineStore('producto', {
	state: () => ({
		productos: [] as Producto[],
		loading: false,
		error: null as string | null,
	}),

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
				const {data} = await useFetch<ProductoResponse[]>(
					'https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC'
				);

				if (data.value) {
					// Transformar los datos de la API al formato que necesitamos
					this.productos = data.value.map(prod => ({
						codigo: prod.ART_COD,
						nombre: prod.ART_DESCRIPCION,
						codigo_categoria: prod.DIV_CLAS,
						desc_categoria: prod.DIV_CLAS_DESC,
						precio: parseFloat(prod.PRECIO),
						imagen: prod.ART_DIR_IMAG1 || '',
						imagen_2: prod.ART_DIR_IMAG2 || '',
						imagen_3: prod.ART_DIR_IMAG3 || '',
						stock: prod.STOCK,
						codigo_division: prod.DIVISION,
						desc_division: prod.DIV_DESC
					}));
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
				const {data} = await useFetch<ProductoResponse>(
					`https://panel.colchonesparana.com.py/api/v2/articulos/detalle/${id}/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC`
				);

				if (data.value) {
					const prod = data.value;
					return {
						codigo: prod.ART_COD,
						nombre: prod.ART_DESCRIPCION,
						codigo_categoria: prod.DIV_CLAS,
						desc_categoria: prod.DIV_CLAS_DESC,
						precio: parseFloat(prod.PRECIO),
						imagen: prod.ART_DIR_IMAG1 || '',
						imagen_2: prod.ART_DIR_IMAG2 || '',
						imagen_3: prod.ART_DIR_IMAG3 || '',
						stock: prod.STOCK,
						codigo_division: prod.DIVISION,
						desc_division: prod.DIV_DESC
					} as Producto;
				}
				return null;
			} catch (err) {
				console.error(`Error al cargar producto con ID ${id}:`, err);
				throw new Error('Error al cargar el producto. Por favor, intente nuevamente.');
			}
		}
	}
});
