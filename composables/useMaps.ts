import { Categoria, Producto } from "~/models"
import type { ArticuloResponse, CategoriaResponse } from "~/types/types"

export const useMaps = () => {

    const mapToProducto = (item: ArticuloResponse) => {
        return new Producto(
            item.ART_COD,
            item.ART_DESCRIPCION,
            item.DIVISION,
            item.DIV_DESC,
            item.PRECIO,
            item.ART_DIR_IMAG1,
            item.STOCK,
            item.DIV_CLAS,
            item.DIV_CLAS_DESC,
        )
    }
    const mapToCategoria = (item: CategoriaResponse) => {
        new Categoria(
            item.DIV_CODIGO,
            item.DIV_DESC,
            item.DIV_ESTADO,
            item.DIV_ORDEN,
            item.DIV_DIR_IMAGEN
        )
    }

    return {
        mapToProducto,
        mapToCategoria
    }
}