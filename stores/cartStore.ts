import {defineStore} from 'pinia';
import type {CartItem, Producto} from '~/types';

export const useCartStore = defineStore('cart', {
	state: () => ({
		items: [] as CartItem[],
	}),

	getters: {
		itemCount: (state) => {
			return state.items.reduce((total,
									   item) => total + item.quantity, 0);
		},

		totalPrice: (state) => {
			return state.items.reduce((total,
									   item) => {
				return total + (item.product.precio * item.quantity);
			}, 0);
		},

		isInCart: (state) => (productId: number) => {
			return state.items.some(item => item.product.codigo === productId);
		}
	},

	actions: {
		loadCart() {
			// Solo ejecutar en el cliente
			if (process.client) {
				const storedCart = localStorage.getItem('cart');
				if (storedCart) {
					this.items = JSON.parse(storedCart);
				}
			}
		},

		saveCart() {
			// Solo ejecutar en el cliente
			if (process.client) {
				localStorage.setItem('cart', JSON.stringify(this.items));
			}
		},

		addToCart(product: Producto,
				  quantity: number) {
			const existingItem = this.items.find(item => item.product.codigo === product.codigo);

			if (existingItem) {
				existingItem.quantity += quantity;
			} else {
				this.items.push({product, quantity});
			}

			this.saveCart();
		},

		updateItemQuantity(productId: number,
						   quantity: number) {
			const item = this.items.find(item => item.product.codigo === productId);

			if (item) {
				item.quantity = quantity;
				this.saveCart();
			}
		},

		removeItem(productId: number) {
			this.items = this.items.filter(item => item.product.codigo !== productId);
			this.saveCart();
		},

		clearCart() {
			this.items = [];
			this.saveCart();
		}
	}
});
