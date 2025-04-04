import {ref} from 'vue';
import {useFetch} from '#app';
import {Producto} from "~/models.js";
import {utilidades} from '~/composables/utilidades.js';

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

export const useProducto = () => {
	const producto = ref<Producto | null>(null);
	const loading = ref<boolean>(false);
	const error = ref<Error | null>(null);
	const imagenes = ref<string[]>([]);
	const cantidad = ref<number>(1);
	const openSections = ref({
		envios: false,
		garantia: false,
		pagos: false
	});
	const {formatPrecio} = utilidades();

	const fetchProducto = async (codigo: string | number) => {
		loading.value = true;
		error.value = null;

		try {
			const {data, error: fetchError} = await useFetch<ArticuloResponse>(`/api/articulos`, {
				params: {codigo},
				key: `producto-${codigo}`,
				retry: 3,
			});

			if (fetchError.value) {
				throw fetchError.value;
			}

			if (!data.value) {
				throw new Error('Producto no encontrado');
			}

			// Map the API response to our Producto model
			const item = data.value;

			// Limpiar el precio (eliminar puntos y convertir a número)
			const precioLimpio = parseInt(item.PRECIO.toString()
				.replace('.', ''), 10);

			producto.value = new Producto(
				item.ART_COD,
				item.ART_DESCRIPCION,
				item.DIVISION,
				item.DIV_DESC,
				precioLimpio,
				item.ART_DIR_IMAG1,
				item.STOCK,
				item.DIV_CLAS,
				item.DIV_CLAS_DESC
			);

			// Initialize product images array
			imagenes.value = [
				item.ART_DIR_IMAG1, // Main image
				item.ART_DIR_IMAG2,
				item.ART_DIR_IMAG3,
				item.ART_DIR_IMAG4,
				item.ART_DIR_IMAG5,
				item.ART_DIR_IMAG6
			].filter(Boolean) as string[]; // Remove any null/undefined values

		} catch (err) {
			console.error('Error fetching producto:', err);
			error.value = err as Error;
			producto.value = null;
		} finally {
			loading.value = false;
		}
	};

	const incrementQuantity = () => {
		if (producto.value && cantidad.value < producto.value.stock) {
			cantidad.value++;
		}
	};

	const decrementQuantity = () => {
		if (cantidad.value > 1) {
			cantidad.value--;
		}
	};

	const toggleSection = (section: keyof typeof openSections.value) => {
		openSections.value[section] = !openSections.value[section];
	};

	return {
		producto,
		loading,
		error,
		imagenes,
		cantidad,
		openSections,
		formatPrecio,
		fetchProducto,
		incrementQuantity,
		decrementQuantity,
		toggleSection
	};
};
