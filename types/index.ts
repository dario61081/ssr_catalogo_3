import { OrderStatus } from "./orders_status";
import { IFormaPago } from "./payments";

export interface CategoriaResponse {
	DIV_CODIGO: number;
	DIV_DESC: string;
	DIV_ESTADO: string;
	DIV_ORDEN: number;
	DIV_DIR_IMAGEN: string | null;
}

export interface ProductoResponse {
	COD_ALFANUM: string;
	ART_COD: number;
	ART_DESCRIPCION: string;
	LINEA: string;
	PRECIO: string;
	STOCK: number;
	ART_DIR_IMAG1: string | null;
	ART_DIR_IMAG2: string | null;
	ART_DIR_IMAG3: string | null;
	ART_DIR_IMAG4: string | null;
	ART_DIR_IMAG5: string | null;
	ART_DIR_IMAG6: string | null;
	ART_IND_IMP: string;
	DIVISION: number;
	DIV_DESC: string;
	DIV_CLAS: number;
	DIV_CLAS_DESC: string;
	MOSTRAR_ECOM: string;
	MOSTRAR_CAT: string;
	TIENE_DOCUMENTOS: string;
	MARCA: string;
	ART_GRUPO: number;
	GRUPO: string;
	ART_PROV_MARCA: number;
	MARC_DESC: string;
	ART_DESC_PRINCIPAL_APP: string | null;
	ART_DESC_LARGA_APP: string | null;
	PRECIO_VALOR: number;
	ACTIVO: boolean;
	ACTUALIZADO: string;
	SYNC_TOKEN: string;

}

export interface Categoria {
	codigo: number;
	nombre: string;
	imagen: string;
	estado: string;
	orden: number;
	subcategorias?: Subcategoria[];
}

export interface Subcategoria {
	codigo: number;
	nombre: string;
	codigoCategoria: number;
}

export interface Producto {
	codigo: number;
	codigo_alfanum: string;
	nombre: string;
	codigo_categoria: number;
	desc_categoria: string;
	precio: number;
	imagen: string;
	imagen_2?: string;
	imagen_3?: string;
	stock: number;
	codigo_division: number;
	desc_division: string;
}

export interface FilterData {
	codigo_orden: number
	codigo_categoria: number
	desc_categoria: string
	estado: string
	imagen: string | null
	total_categoria: number
	codigo_subcategoria: number
	desc_subcategoria: string
	imagen_subcategoria: string | null
	total_subcategoria: number
}

export type SortCriteria = 'recientes' | 'nombre_asc' | 'nombre_desc' | 'precio_asc' | 'precio_desc';

export interface FilterState {
	categorias: number[];
	subcategorias: number[];
	precioMin: number;
	precioMax: number;
	searchQuery: string;
	sortBy: SortCriteria;
}

export interface CartItem {
	product: Producto;
	quantity: number;
}

export interface FiltersResponse {
	"DIV_ORDEN": number,
	"DIV_CODIGO": number,
	"DIV_DESC": string,
	"DIV_ESTADO": string,
	"DIV_DIR_IMAGEN": string | null,
	"DIV_CANT_TOTAL": number,
	"DCLAS_CODIGO": number,
	"DCLAS_DESC": string,
	"DCLAS_ECOM": string,
	"DCLAS_CATALOGO": string,
	"DCLAS_DIR_IMAGEN": string | null,
	"SUBDIV_CANT_TOTAL": number
}

// Tipo para órdenes confirmadas
export interface ConfirmedOrder {
	orderId: string;
	orderStatus: OrderStatus;
	date: string;
	customerName: string;
	customerInfo: {
		email: string;
		address: string;
		coordinates: { lat: number; lng: number } | null;
		telephone: string;
		ruc: string;
	};
	total: number;
	subtotal: number;
	discount: number;
	paymentMethod: IFormaPago;
	items: CartItem[];
}
