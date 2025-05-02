export interface IFormaPago {
    tipo_codigo: Number
    tipo_descripcion: String
}

export const ListPaymentMethods = ref<IFormaPago[]>([
    { tipo_codigo: 1, tipo_descripcion: 'EFECTIVO / CONTRAENTREGA' } as IFormaPago,
    { tipo_codigo: 2, tipo_descripcion: 'TRANSFERENCIA BANCARIA' } as IFormaPago,
    { tipo_codigo: 3, tipo_descripcion: 'TARJETA DE CRÉDITO' } as IFormaPago,
    { tipo_codigo: 4, tipo_descripcion: 'TARJETA DE DÉBITO' } as IFormaPago,
    { tipo_codigo: 5, tipo_descripcion: 'PAGO QR' } as IFormaPago,
])
