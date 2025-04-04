import { ref, computed } from 'vue';
import { useFetch } from '#app';

interface Articulo {
  COD_ALFANUM: string;
  ART_COD: number;
  ART_DESCRIPCION: string;
  DIVISION: number;
  DIV_DESC: string;
  STOCK: number;
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
    const index = selectedCategories.value.indexOf(categoryId);
    if (index === -1) {
      selectedCategories.value.push(categoryId);
    } else {
      selectedCategories.value.splice(index, 1);
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
