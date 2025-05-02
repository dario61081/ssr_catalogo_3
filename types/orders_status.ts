export type OrderStatus = "P" | "F" | "A";

// Or as an interface with a string literal union type
export interface OrderStatusInterface {
    status: "P" | "F" | "A";
}

// You can also keep the enum for reference and create a type from it
export enum OrderStatusEnum {
    Pendiente = "P",
    Finalizado = "F",
    Anulado = "A"
}

export enum OrderStatusColors {
    //orange
    Pendiente = "bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    //blue
    Finalizado = "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    //red
    Anulado = "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export type OrderStatusType = `${OrderStatusEnum}`;
