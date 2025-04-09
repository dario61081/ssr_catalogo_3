export interface CategoriaResponse {
    DIV_CODIGO: number;
    DIV_DESC: string;
    DIV_ESTADO: string;
    DIV_ORDEN: number;
    DIV_DIR_IMAGEN: string | null;
}
export interface ArticuloResponse {
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