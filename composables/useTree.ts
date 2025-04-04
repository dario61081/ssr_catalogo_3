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
  const selectedProducts = ref<number[]>([]);

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

  // Toggle product selection (multiple selection allowed)
  const toggleProduct = (productId: number) => {
    const index = selectedProducts.value.indexOf(productId);
    if (index === -1) {
      selectedProducts.value.push(productId);
    } else {
      selectedProducts.value.splice(index, 1);
    }
  };
  
  // Toggle all products in a class
  const toggleClassProducts = (classId: number, selected: boolean) => {
    // Find all products with the given DIV_CLAS
    const productsInClass: number[] = [];
    
    categorias.value.forEach(categoria => {
      categoria.articulos.forEach(articulo => {
        if (articulo.DIV_CLAS === classId) {
          productsInClass.push(articulo.ART_COD);
        }
      });
    });
    
    if (selected) {
      // Add all products that aren't already selected
      productsInClass.forEach(productId => {
        if (!selectedProducts.value.includes(productId)) {
          selectedProducts.value.push(productId);
        }
      });
    } else {
      // Remove all products in this class from selection
      selectedProducts.value = selectedProducts.value.filter(
        productId => !productsInClass.includes(productId)
      );
    }
  };

  // Check if a product is selected
  const isProductSelected = (productId: number) => {
    return selectedProducts.value.includes(productId);
  };

  // Clear all selected products
  const clearSelectedProducts = () => {
    selectedProducts.value = [];
  };

  // Check if all products in a class are selected
  const areAllClassProductsSelected = (classId: number): boolean => {
    let allSelected = true;
    let hasProducts = false;
    
    // Check if all products in this class are selected
    categorias.value.forEach(categoria => {
      categoria.articulos.forEach(articulo => {
        if (articulo.DIV_CLAS === classId) {
          hasProducts = true;
          if (!selectedProducts.value.includes(articulo.ART_COD)) {
            allSelected = false;
          }
        }
      });
    });
    
    // If there are no products, consider it not selected
    return hasProducts && allSelected;
  };
  
  // Check if some (but not all) products in a class are selected
  const areSomeClassProductsSelected = (classId: number): boolean => {
    let someSelected = false;
    let allSelected = true;
    let hasProducts = false;
    
    // Check if some products in this class are selected
    categorias.value.forEach(categoria => {
      categoria.articulos.forEach(articulo => {
        if (articulo.DIV_CLAS === classId) {
          hasProducts = true;
          if (selectedProducts.value.includes(articulo.ART_COD)) {
            someSelected = true;
          } else {
            allSelected = false;
          }
        }
      });
    });
    
    // Return true only if some (but not all) products are selected
    return hasProducts && someSelected && !allSelected;
  };

  return {
    categorias: categoriasConConteo,
    loading,
    error,
    selectedCategories,
    selectedProducts,
    toggleCategory,
    toggleProduct,
    toggleClassProducts,
    isProductSelected,
    areAllClassProductsSelected,
    areSomeClassProductsSelected,
    clearSelectedProducts,
    fetchCategorias
  };
};
