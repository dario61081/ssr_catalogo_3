import { ConfirmedOrder, CartItem } from '~/types';
import { IFormaPago } from '~/types/payments';
import { useGenerators } from '~/composables/useGenerators';



interface CheckoutData {
    orderId: string;
    customerInfo: {
        name: string;
        email: string;
        address: string;
        coordinates: { lat: number; lng: number } | null;
        telefono: string;
        ruc: string;
        paymentMethod: string; // Todavía recibe un string del formulario
    };
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
    paymentMethodObject?: IFormaPago; // Objeto de método de pago opcional
}

/**
 * Crea un objeto ConfirmedOrder a partir de los datos del checkout
 * @param checkoutData Datos del proceso de checkout
 * @returns Objeto ConfirmedOrder formateado correctamente
 */
export function createConfirmedOrder(checkoutData: CheckoutData): ConfirmedOrder {
    // Determinar el método de pago correcto como IFormaPago
    let paymentMethod: IFormaPago;

    if (checkoutData.paymentMethodObject) {
        // Si se proporciona el objeto de método de pago, úsalo directamente
        paymentMethod = checkoutData.paymentMethodObject;
    } else {
        // Sino, mapea el string a un objeto IFormaPago según el string recibido
        // Este mapeo debe coincidir con los métodos definidos en types/payments.ts
        switch (checkoutData.customerInfo.paymentMethod.toLowerCase()) {
            case 'efectivo contraentrega':
                paymentMethod = { tipo_codigo: 1, tipo_descripcion: 'EFECTIVO / CONTRAENTREGA' };
                break;
            case 'transferencia':
                paymentMethod = { tipo_codigo: 2, tipo_descripcion: 'TRANSFERENCIA BANCARIA' };
                break;
            case 'tarjeta':
                paymentMethod = { tipo_codigo: 3, tipo_descripcion: 'TARJETA DE CRÉDITO' };
                break;
            case 'qr':
                paymentMethod = { tipo_codigo: 5, tipo_descripcion: 'PAGO QR' };
                break;
            default:
                paymentMethod = { tipo_codigo: 1, tipo_descripcion: 'EFECTIVO / CONTRAENTREGA' };
        }
    }

    return {
        orderId: checkoutData.orderId,
        date: useGenerators().getCurretTimestampCart(), // Formato de fecha
        orderStatus: 'P', // Estado inicial de la orden
        customerName: checkoutData.customerInfo.name,
        customerInfo: {
            email: checkoutData.customerInfo.email,
            address: checkoutData.customerInfo.address,
            coordinates: checkoutData.customerInfo.coordinates,
            telephone: checkoutData.customerInfo.telefono,
            ruc: checkoutData.customerInfo.ruc
        },
        total: checkoutData.total,
        subtotal: checkoutData.subtotal,
        discount: checkoutData.discount,
        paymentMethod: paymentMethod,
        items: [...checkoutData.items],
    };
}