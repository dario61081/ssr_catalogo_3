import { ref, onMounted } from 'vue';
import { useFetch } from '#app';
import { Categoria } from '~/models.js';

/**
[
  {
    "DIV_CODIGO": 5,
    "DIV_DESC": "ACCESORIOS PARA EL HOGAR",
    "DIV_ESTADO": "A",
    "DIV_ORDEN": 0,
    "DIV_DIR_IMAGEN": null
    }
]
 */
interface CategoriaResponse {
    DIV_CODIGO: number;
    DIV_DESC: string;
    DIV_ESTADO: string;
    DIV_ORDEN: number;
    DIV_DIR_IMAGEN: string | null;
}





export const useCategorias = () => {
    const categorias = ref<Categoria[]>([]);
    const loading = ref(false);
    const hasError = ref<string | null>(null);

    const mapToCategoria = (item: CategoriaResponse): Categoria => {
        return new Categoria(item.DIV_CODIGO, item.DIV_DESC, item.DIV_DIR_IMAGEN, item.DIV_ESTADO, item.DIV_ORDEN);
    }


    const refresh = async () => {
        loading.value = true
        hasError.value = null

        try {
            const { data, error } = await useFetch<CategoriaResponse[]>('/api/categorias', { 
                key: 'categorias', 
                retry: 3,
                timeout: 10000
            });

            if (error.value) {
                console.error('Error al obtener categorías:', error.value);
                throw new Error(error.value.message || 'Error al buscar categorías');
            }
            
            if (!data.value) {
                throw new Error('No se recibieron datos de categorías');
            }
            
            if (!Array.isArray(data.value)) {
                console.error('Formato de respuesta inválido:', data.value);
                throw new Error('Formato de respuesta inválido');
            }

            // Filtrar solo categorías activas y ordenarlas
            const categoriasActivas = data.value
                .filter(cat => cat.DIV_ESTADO === 'A')
                .map(mapToCategoria);
                
            categorias.value = categoriasActivas;
            
            // Si no hay categorías después del filtrado
            if (categorias.value.length === 0) {
                console.warn('No se encontraron categorías activas');
            }

        } catch (error) {
            console.error('Error en refresh de categorías:', error);
            hasError.value = error instanceof Error ? error.message : 'Error desconocido al buscar categorías';
        } finally {
            loading.value = false;
        }
    }


    const sortByOrden = () => {
        categorias.value = [...categorias.value].sort((a: Categoria, b: Categoria) => a.orden - b.orden);
    }

    const clearSearch = () => {
        categorias.value = [];
        hasError.value = null;
    };

    onMounted(() => { refresh(); sortByOrden(); });

    return {
        categorias,
        loading,
        hasError,
        refresh,
        clearSearch
    };
};
