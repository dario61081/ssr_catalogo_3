import { ref, computed } from 'vue';
import { useFetch } from '#app';
import { Categoria, Producto } from "~/models.js";

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

interface FilterOptions {
	categorias?: number[];
	subcategorias?: { categoria: number; subcategoria: number }[];
	precio?: number;
	favoritos?: string[];
}

type SortField = 'precio' | 'nombre';
type SortDirection = 'asc' | 'desc';

export const useProductos = () => {
	const productos = ref<Producto[]>([]);
	const cacheProductos = ref<Producto[]>([]);
	const loading = ref<boolean>(false);
	const hasError = ref<Error | null>(null);
	const activeFilters = ref<FilterOptions>({});

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
			const { data, error } = await useFetch<ArticuloResponse[]>('/api/articulos', {
				key: 'articulos',
				retry: 3, // Retry up to 3 times on failure
			});

			if (error.value) {
				throw error.value;
			}

			if (!data.value) {
				throw new Error('Error al buscar artículos');
			}

			// Map the API response to our Producto model
			productos.value = data.value.map(item => mapToProducto(item));
			cacheProductos.value = [...productos.value]; // Create a deep copy
			
			// Apply any active filters after refresh
			applyFilters();
		} catch (error) {
			console.error('Error fetching productos:', error);
			hasError.value = error as Error;
			productos.value = [];
		} finally {
			loading.value = false;
		}
	};

	const categorias = computed(() => {
		// Use a Map to ensure unique categories by ID
		const categoriasMap = new Map();
		
		cacheProductos.value.forEach((producto: Producto) => {
			if (producto.codigo_categoria) {
				categoriasMap.set(
					producto.codigo_categoria, 
					new Categoria(producto.codigo_categoria, producto.desc_categoria)
				);
			}
		});
		
		return Array.from(categoriasMap.values());
	});

	const reset = () => {
		activeFilters.value = {};
		if (cacheProductos.value.length > 0) {
			productos.value = [...cacheProductos.value];
			return;
		}

		refresh();
	};

	const applyFilters = () => {
		let filteredProducts = [...cacheProductos.value];
		
		// Apply category filter
		if (activeFilters.value.categorias && activeFilters.value.categorias.length > 0) {
			filteredProducts = filteredProducts.filter((producto: Producto) => 
				activeFilters.value.categorias?.includes(producto.codigo_categoria)
			);
		}
		
		// Apply subcategory (division) filter
		if (activeFilters.value.subcategorias && activeFilters.value.subcategorias.length > 0) {
			filteredProducts = filteredProducts.filter((producto: Producto) => 
				activeFilters.value.subcategorias?.some(subcategoria => 
					subcategoria.categoria === producto.codigo_categoria && 
					subcategoria.subcategoria === producto.codigo_division
				) || false
			);
		}
		
		// Apply price filter
		if (activeFilters.value.precio) {
			filteredProducts = filteredProducts.filter((producto: Producto) => 
				producto.precio <= (activeFilters.value.precio || Infinity)
			);
		}
		
		// Apply favorites filter
		if (activeFilters.value.favoritos && activeFilters.value.favoritos.length > 0) {
			filteredProducts = filteredProducts.filter((producto: Producto) => 
				activeFilters.value.favoritos?.includes(producto.codigo.toString())
			);
		}
		
		productos.value = filteredProducts;
	};

	const filterByCategoria = (categorias: number[]) => {
		activeFilters.value.categorias = categorias.length > 0 ? categorias : undefined;
		applyFilters();
	};
	
	const filterBySubcategoria = (subcategorias: { categoria: number; subcategoria: number }[]) => {
		activeFilters.value.subcategorias = subcategorias.length > 0 ? subcategorias : undefined;
		applyFilters();
	};

	const filterByPrecio = (precio: number) => {
		activeFilters.value.precio = precio > 0 ? precio : undefined;
		applyFilters();
	};
	
	const filterByFavoritos = (favoritos: string[]) => {
		activeFilters.value.favoritos = favoritos.length > 0 ? favoritos : undefined;
		applyFilters();
	};

	const ordenarPor = (opcion: string) => {
		if (!opcion || opcion === '-- Sin Ordenar --') {
			// Reset to the current filtered state without sorting
			applyFilters();
			return;
		}
		
		const [campo, direccion] = opcion.split('_');
		
		if (campo === 'precio' && direccion === 'asc') {
			sortByPrecioAsc();
		} else if (campo === 'precio' && direccion === 'desc') {
			sortByPrecioDesc();
		}
	};

	const sortByPrecioAsc = () => {
		productos.value = [...productos.value].sort((a: Producto, b: Producto) => {
			return a.precio - b.precio;
		});
	};

	const sortByPrecioDesc = () => {
		productos.value = [...productos.value].sort((a: Producto, b: Producto) => {
			return b.precio - a.precio;
		});
	};

	// Generic sort function
	const sortBy = (field: SortField, direction: SortDirection = 'asc') => {
		const sortedProducts = [...productos.value];
		
		sortedProducts.sort((a: Producto, b: Producto) => {
			let comparison = 0;
			
			if (field === 'precio') {
				comparison = a.precio - b.precio;
			} else if (field === 'nombre') {
				comparison = a.nombre.localeCompare(b.nombre);
			}
			
			return direction === 'asc' ? comparison : -comparison;
		});
		
		productos.value = sortedProducts;
	};

	// Initialize data on first load
	if (cacheProductos.value.length === 0) {
		refresh();
	}

	return {
		productos,
		categorias,
		loading,
		hasError,
		refresh,
		reset,
		filterByCategoria,
		filterBySubcategoria,
		filterByPrecio,
		filterByFavoritos,
		ordenarPor,
		sortBy,
		activeFilters
	};
};
