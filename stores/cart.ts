import { defineStore } from 'pinia'
import { Producto } from '~/models'

interface CartItem {
    product: Producto
    quantity: number
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[]
    }),

    actions: {
        addItem(item: CartItem) {
            const existingItem = this.items.find(i => i.product.codigo === item.product.codigo)
            if (existingItem) {
                existingItem.quantity += item.quantity
            } else {
                this.items.push(item)
            }
        },

        removeItem(codigo: number) {
            const index = this.items.findIndex(item => item.product.codigo === codigo)
            if (index > -1) {
                this.items.splice(index, 1)
            }
        },

        updateQuantity(codigo: number, quantity: number) {
            const item = this.items.find(item => item.product.codigo === codigo)
            if (item) {
                item.quantity = quantity
            }
        }
    },

    getters: {
        totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
        totalAmount: (state) => state.items.reduce((total, item) => total + (item.product.precio * item.quantity), 0)
    }
})