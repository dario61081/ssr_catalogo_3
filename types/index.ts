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

export type SortCriteria = 'nombre_asc' | 'nombre_desc' | 'precio_asc' | 'precio_desc' | 'recientes';

export interface FilterState {
	categorias: number[];
	subcategorias: number[];
	precioMin: number | null;
	precioMax: number | null;
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
