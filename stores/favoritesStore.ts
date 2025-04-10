import {defineStore} from 'pinia';
import type {Producto} from '~/types';

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		favorites: [] as Producto[],
	}),

	getters: {
		isFavorite: (state) => (productId: number) => {
			return state.favorites.some(product => product.codigo === productId);
		}
	},

	actions: {
		loadFavorites() {
			// Solo ejecutar en el cliente
			if (process.client) {
				const storedFavorites = localStorage.getItem('favorites');
				if (storedFavorites) {
					this.favorites = JSON.parse(storedFavorites);
				}
			}
		},

		saveFavorites() {
			// Solo ejecutar en el cliente
			if (process.client) {
				localStorage.setItem('favorites', JSON.stringify(this.favorites));
			}
		},

		addFavorite(product: Producto) {
			if (!this.isFavorite(product.codigo)) {
				this.favorites.push(product);
				this.saveFavorites();
			}
		},

		removeFavorite(productId: number) {
			this.favorites = this.favorites.filter(product => product.codigo !== productId);
			this.saveFavorites();
		},

		clearFavorites() {
			this.favorites = [];
			this.saveFavorites();
		}
	}
});
