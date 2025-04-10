import {defineStore} from 'pinia';
import type {Categoria, CategoriaResponse, ProductoResponse, Subcategoria} from '~/types';
import {mapToCategoria} from "~/utils/transforms";

export const useCategoriaStore = defineStore('categoria', {
	state: () => ({
		categorias: [] as Categoria[],
		subcategorias: [] as Subcategoria[],
		loading: false,
		error: null as string | null,
	}),

	getters: {
		getCategoriaById: (state) => (id: number) => {
			return state.categorias.find(cat => cat.codigo === id);
		},
		getSubcategoriasByCategoriaId: (state) => (categoriaId: number) => {
			return state.subcategorias.filter(subcat => subcat.codigoCategoria === categoriaId);
		},
		getCategoriasImages: state => {
			return state.categorias.map(cat => cat.imagen);
		}


	},

	actions: {
		async fetchCategorias() {
			this.loading = true;
			this.error = null;

			try {
				const {data} = await useFetch<CategoriaResponse[]>(
					'https://panel.colchonesparana.com.py/api/v2/divisiones/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC'
				);

				if (data.value) {
					// Transformar los datos de la API al formato que necesitamos
					this.categorias = data.value.map(cat => mapToCategoria(cat));

					// Ordenar categorías por orden
					this.categorias.sort((a, b) => a.orden - b.orden);

					// Extraer subcategorías (en este caso, se simula ya que no tenemos endpoint específico)
					// En una implementación real, esto podría ser otro endpoint o venir incluido en la respuesta
					this.subcategorias = await this.extractSubcategoriasFromProductos();
				}
			} catch (err) {
				console.error('Error al cargar categorías:', err);
				this.error = 'Error al cargar las categorías. Por favor, intente nuevamente.';
			} finally {
				this.loading = false;
			}
		},

		// Método auxiliar para extraer subcategorías de los productos
		async extractSubcategoriasFromProductos() {
			try {
				// Fetch productos
				const { data } = await useFetch<ProductoResponse[]>(
					'https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC',
					{ key: 'productos' }
				);

				if (!data.value) {
					return [];
				}

				// Extraer subcategorías únicas de los productos
				const subcategoriasMap = new Map<string, Subcategoria>();
				
				data.value.forEach(prod => {
					const key = `${prod.DIV_CLAS}-${prod.DIVISION}`;
					if (!subcategoriasMap.has(key)) {
						subcategoriasMap.set(key, {
							codigo: prod.DIV_CLAS,
							nombre: prod.DIV_CLAS_DESC,
							codigoCategoria: prod.DIVISION
						});
					}
				});
				
				// Convertir el Map a un array de subcategorías
				return Array.from(subcategoriasMap.values());
			} catch (error) {
				console.error('Error al extraer subcategorías:', error);
				return [];
			}
		}
	}
});
