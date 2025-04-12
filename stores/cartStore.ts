import {defineStore} from 'pinia';
import type {CartItem, Producto} from '~/types';

interface PurchaseHistoryItem {
    orderId: string;
    date: string;
    customerName: string;
    total: number;
    paymentMethod: string;
    items: CartItem[];
}

interface ConfirmedOrder extends PurchaseHistoryItem {
    customerInfo: {
        email: string;
        address: string;
        coordinates?: { lat: number; lng: number; } | null;
    };
    subtotal: number;
    shipping: number;
    discount: number;
    selectedProducts: {
        codigo: number;
        nombre: string;
        precio: number;
        quantity: number;
        total: number;
    }[];
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
        purchaseHistory: [] as PurchaseHistoryItem[],
        lastOrder: null as ConfirmedOrder | null
    }),

    getters: {
        itemCount: (state) => {
            return state.items.reduce((total, item) => total + item.quantity, 0);
        },

        totalPrice: (state) => {
            return state.items.reduce((total, item) => {
                return total + (item.product.precio * item.quantity);
            }, 0);
        },

        isInCart: (state) => (productId: number) => {
            return state.items.some(item => item.product.codigo === productId);
        }
    },

    actions: {
        loadCart() {
            if (process.client) {
                const storedCart = localStorage.getItem('cart');
                if (storedCart) {
                    this.items = JSON.parse(storedCart);
                }
                const storedHistory = localStorage.getItem('purchaseHistory');
                if (storedHistory) {
                    this.purchaseHistory = JSON.parse(storedHistory);
                }
                const lastOrder = localStorage.getItem('lastOrder');
                if (lastOrder) {
                    this.lastOrder = JSON.parse(lastOrder);
                }
            }
        },

        saveCart() {
            if (process.client) {
                localStorage.setItem('cart', JSON.stringify(this.items));
                localStorage.setItem('purchaseHistory', JSON.stringify(this.purchaseHistory));
                if (this.lastOrder) {
                    localStorage.setItem('lastOrder', JSON.stringify(this.lastOrder));
                }
            }
        },

        saveConfirmedOrder(order: ConfirmedOrder) {
            if (process.client) {
                // Preparar productos seleccionados con detalles
                const selectedProducts = order.items.map(item => ({
                    codigo: item.product.codigo,
                    nombre: item.product.nombre,
                    precio: item.product.precio,
                    quantity: item.quantity,
                    total: item.product.precio * item.quantity
                }));

                // Crear orden completa con productos seleccionados
                const completeOrder = {
                    ...order,
                    selectedProducts
                };

                // Guardar orden completa
                localStorage.setItem(`order_${order.orderId}`, JSON.stringify(completeOrder));
                
                // Actualizar última orden
                this.lastOrder = completeOrder;
                
                // Añadir a historial de compras
                this.purchaseHistory.unshift({
                    orderId: order.orderId,
                    date: order.date,
                    customerName: order.customerName,
                    total: order.total,
                    paymentMethod: order.paymentMethod,
                    items: order.items
                });
                
                this.saveCart();
            }
        },

        getConfirmedOrder(orderId: string): ConfirmedOrder | null {
            if (process.client) {
                const orderData = localStorage.getItem(`order_${orderId}`);
                return orderData ? JSON.parse(orderData) : null;
            }
            return null;
        },

        getLastOrder(): ConfirmedOrder | null {
            return this.lastOrder;
        },

        addToCart(product: Producto, quantity: number) {
            const existingItem = this.items.find(item => item.product.codigo === product.codigo);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({product, quantity});
            }

            this.saveCart();
        },

        updateItemQuantity(productId: number, quantity: number) {
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
