import { defineStore } from 'pinia';
import type { Producto, ProductoResponse } from '~/types';
import { mapToProducto } from "~/utils/transforms";

interface ProductoState {
	productos: Producto[];
	loading: boolean;
	error: string | null;
	lastFetched: Date | null;
	ultimosVistos: number[];
}

export const useProductoStore = defineStore('producto', {
	state: (): ProductoState => ({
		productos: [],
		loading: false,
		error: null,
		lastFetched: null,
		ultimosVistos: []
	}),

	getters: {
		getProductoById: (state: ProductoState) => (id: number): Producto | undefined => {
			return state.productos.find((prod: Producto) => prod.codigo === id);
		},
		getProductosByCategoria: (state: ProductoState) => (categoriaId: number): Producto[] => {
			return state.productos.filter((prod: Producto) => prod.codigo_division === categoriaId);
		},
		getProductosBySubcategoria: (state: ProductoState) => (subcategoriaId: number): Producto[] => {
			return state.productos.filter((prod: Producto) => prod.codigo_categoria === subcategoriaId);
		},
		isDataStale: (state: ProductoState): boolean => {
			if (!state.lastFetched) return true;
			const cacheExpiry = 60 * 60 * 500;
			return (Date.now() - new Date(state.lastFetched).getTime()) > cacheExpiry;
		},
		getUltimosProductosVistos: (state: ProductoState): Producto[] => {
			return state.ultimosVistos
				.map(id => state.productos.find(p => p.codigo === id))
				.filter((p): p is Producto => p !== undefined);
		}
	},

	actions: {
		clearStore(): void {
			this.productos = [];
			this.error = null;
			this.lastFetched = null;
			this.ultimosVistos = [];
		},

		async fetchProductos(): Promise<Producto[]> {
			this.loading = true;
			this.error = null;

			try {
				const apiUrl = 'https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC';
				const data: ProductoResponse[] = await $fetch(apiUrl);

				this.productos = data.map(prod => ({
					...mapToProducto(prod),
					precio: typeof prod.PRECIO === 'string' ?
						parseInt(String(prod.PRECIO).replace(/\./g, '')) :
						Number(prod.PRECIO)
				}));

				this.lastFetched = new Date();
				return this.productos;
			} catch (err) {
				console.error('Error al cargar productos:', err);
				this.error = err instanceof Error ? err.message : 'Error al cargar los productos';
				throw err;
			} finally {
				this.loading = false;
			}
		},

		async fetchProductoById(id: number): Promise<Producto | null> {
			const cachedProduct = this.productos.find(p => p.codigo === id);
			const isStale = !this.lastFetched || (Date.now() - new Date(this.lastFetched).getTime() > 60 * 60 * 500);

			if (cachedProduct && !isStale) {
				return cachedProduct;
			}

			try {
				const apiUrl = `https://panel.colchonesparana.com.py/api/v2/articulos/detalle/${id}/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC`;
				const data = await $fetch<ProductoResponse[]>(apiUrl);

				if (!data || !Array.isArray(data) || data.length === 0) {
					throw new Error(`No se encontró el producto con ID ${id}`);
				}

				const rawProducto = mapToProducto(data[0]);
				const producto: Producto = {
					...rawProducto,
					precio: typeof rawProducto.precio === 'string' || typeof rawProducto.precio === 'number'
						? Number(String(rawProducto.precio).replace(/\./g, ''))
						: 0
				};

				const index = this.productos.findIndex(p => p.codigo === id);
				if (index !== -1) {
					this.productos[index] = producto;
				} else {
					this.productos.push(producto);
				}

				return producto;
			} catch (err) {
				console.error(`Error al cargar producto con ID ${id}:`, err);
				this.error = err instanceof Error ? err.message : `Error al cargar el producto con ID ${id}`;
				return null;
			}
		},

		agregarProductoVisto(producto: Producto): void {
			// Remove the product if it's already in the list
			this.ultimosVistos = this.ultimosVistos.filter(id => id !== producto.codigo);
			// Add the product to the beginning of the list
			this.ultimosVistos.unshift(producto.codigo);
			// Keep only the last 3 products
			this.ultimosVistos = this.ultimosVistos.slice(0, 3);
		},

		updateProducto(id: number, updatedData: Partial<Producto>): Producto | null {
			const index = this.productos.findIndex(p => p.codigo === id);
			if (index !== -1) {
				this.productos[index] = { ...this.productos[index], ...updatedData };
				return this.productos[index];
			}
			return null;
		}
	}
});
