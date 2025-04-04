import { ref, computed } from 'vue';
import { useFetch } from '#app';

// {
// 	"COD_ALFANUM": "10641AM",
// 	"ART_COD": 18924,
// 	"ART_DESCRIPCION": "AGENDA ROSA 2024",
// 	"LINEA": "ACCESORIOS",
// 	"PRECIO": "189.000",
// 	"STOCK": 2,
// 	"ART_DIR_IMAG1": "https://panel.colchonesparana.com.py/imagenes/2024/10/10641AM_1.jpg",
// 	"ART_DIR_IMAG2": null,
// 	"ART_DIR_IMAG3": null,
// 	"ART_DIR_IMAG4": null,
// 	"ART_DIR_IMAG5": null,
// 	"ART_DIR_IMAG6": null,
// 	"ART_IND_IMP": "N",
// 	"DIVISION": 0,
// 	"DIV_DESC": "SIN ASIGNAR",
// 	"DIV_CLAS": 0,
// 	"DIV_CLAS_DESC": "SIN ASIGNAR",
// 	"MOSTRAR_ECOM": "N",
// 	"MOSTRAR_CAT": "N",
// 	"TIENE_DOCUMENTOS": "S"
// }
interface Articulo {
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
  // Add other properties as needed
}

interface Categoria {
  DIV_CODIGO: number;
  DIV_DESC: string;
  DIV_ESTADO: string;
  DIV_ORDEN: number;
  DIV_DIR_IMAGEN: string | null;
  articulos: Articulo[];
}

export const useTree = () => {
  const categorias = ref<Categoria[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const selectedCategories = ref<number[]>([]);

  const fetchCategorias = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Categoria[]>('/api/tree');

      if (fetchError.value) {
        throw fetchError.value;
      }

      if (!data.value) {
        throw new Error('No se encontraron categorías');
      }

      categorias.value = data.value;
    } catch (err) {
      console.error('Error fetching categorías:', err);
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const toggleCategory = (categoryId: number) => {
    // Para radio buttons, simplemente reemplazamos la selección actual
    // Si ya está seleccionado y se hace clic de nuevo, lo deseleccionamos
    if (selectedCategories.value.length === 1 && selectedCategories.value[0] === categoryId) {
      selectedCategories.value = [];
    } else {
      selectedCategories.value = [categoryId];
    }
  };

  const categoriasConConteo = computed(() => {
    return categorias.value.map(categoria => ({
      ...categoria,
      conteo: categoria.articulos.length
    }));
  });

  // Initialize data on first load
  fetchCategorias();

  return {
    categorias: categoriasConConteo,
    loading,
    error,
    selectedCategories,
    toggleCategory,
    fetchCategorias
  };
};
