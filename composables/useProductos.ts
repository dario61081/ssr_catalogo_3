import {Producto} from "~/models.js";

interface ArticuloResponse {
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

export const useProductos = () => {
	const productos = ref<Producto[]>([]);
	const loading = ref<boolean>(false);
	const hasError = ref<Error | null>(null);


	const mapToProducto = (item: ArticuloResponse): Producto => {
		// Limpiar el precio (eliminar puntos y convertir a número)
		const precioLimpio = parseFloat(item.PRECIO.replace(/\./g, ''));

		return new Producto(
			item.ART_COD,
			item.ART_DESCRIPCION,
			item.DIVISION,
			item.DIV_DESC,
			precioLimpio,
			item.ART_DIR_IMAG1, // Puede ser null
			item.STOCK,
			item.DIV_CLAS,
			item.DIV_CLAS_DESC,
		);
	};
	const refresh = async () => {
		loading.value = true;
		hasError.value = null;

		try {
			const {data, error} = await useFetch<ArticuloResponse[]>('/api/articulos', {
				key: 'articulos'
			});

			if (error.value) {
				throw error.value;
			}

			if (!data.value) {
				throw new Error('Error al buscar artículos');
			}

			if (data.value) {
				productos.value = data.value.map(item => (
					{...mapToProducto(item)})
				)
			}
		} catch (error) {
			hasError.value = error as Error;
			productos.value = [];
		} finally {
			loading.value = false;
		}
	};

	// Optional: Don't call refresh automatically
	refresh();

	return {
		productos,
		loading,
		hasError,
		refresh
	};
};
