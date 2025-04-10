import {defineStore} from 'pinia';
import type {Categoria, CategoriaResponse, Subcategoria} from '~/types';

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
		}
	},

	actions: {
		async fetchCategorias() {
			this.loading = true;
			this.error = null;

			try {
				const {data} = await useFetch<CategoriaResponse[]>(
					'https://panel.colchonesparana.com.py/articulos/divisiones/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC/TODOS'
				);

				if (data.value) {
					// Transformar los datos de la API al formato que necesitamos
					this.categorias = data.value.map(cat => ({
						codigo: cat.DIV_CODIGO,
						nombre: cat.DIV_DESC,
						imagen: cat.DIV_DIR_IMAGEN || '',
						estado: cat.DIV_ESTADO,
						orden: cat.DIV_ORDEN
					}));

					// Ordenar categorías por orden
					this.categorias.sort((a,
										  b) => a.orden - b.orden);

					// Extraer subcategorías (en este caso, se simula ya que no tenemos endpoint específico)
					// En una implementación real, esto podría ser otro endpoint o venir incluido en la respuesta
					this.subcategorias = this.extractSubcategoriasFromProductos();
				}
			} catch (err) {
				console.error('Error al cargar categorías:', err);
				this.error = 'Error al cargar las categorías. Por favor, intente nuevamente.';
			} finally {
				this.loading = false;
			}
		},

		// Método auxiliar para extraer subcategorías de los productos
		// En un caso real, esto podría ser reemplazado por una llamada a la API
		extractSubcategoriasFromProductos() {
			// Este es un método temporal hasta que tengamos una API real de subcategorías
			// Por ahora, usaremos datos simulados
			return [
				{codigo: 101, nombre: 'Colchones de Resortes', codigoCategoria: 1},
				{codigo: 102, nombre: 'Colchones de Espuma', codigoCategoria: 1},
				{codigo: 201, nombre: 'Sillas de Oficina', codigoCategoria: 2},
				{codigo: 202, nombre: 'Sillas de Comedor', codigoCategoria: 2},
				{codigo: 301, nombre: 'Mesas de Centro', codigoCategoria: 3},
				{codigo: 302, nombre: 'Mesas de Comedor', codigoCategoria: 3}
			];
		}
	}
});
