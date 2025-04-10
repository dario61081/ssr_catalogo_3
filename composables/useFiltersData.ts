import {FilterData, FiltersResponse} from "~/types";

export const useFiltersData = () => {
	const filtrosData = ref<FilterData[]>([])
	const loading = ref(false)

	const mapToFilterData = (item: FiltersResponse): FilterData => {
		return {
			codigo_orden: item.DIV_ORDEN,
			codigo_categoria: item.DIV_CODIGO,
			desc_categoria: item.DIV_DESC,
			estado: item.DIV_ESTADO,
			imagen: item.DIV_DIR_IMAGEN,
			total_categoria: item.DIV_CANT_TOTAL,
			codigo_subcategoria: item.DCLAS_CODIGO,
			desc_subcategoria: item.DCLAS_DESC,
			imagen_subcategoria: item.DCLAS_DIR_IMAGEN,
			total_subcategoria: item.SUBDIV_CANT_TOTAL
		}
	}


	const refresh = async () => {
		loading.value = true
		// usefetch to get data
		const url = 'https://panel.colchonesparana.com.py/articulos/divisiones/subdivision/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC/TODOS/TODOS'
		const {data} = await useFetch<FiltersResponse[]>(url, {key: 'filtros'})

		if (!data.value) {
			filtrosData.value = []
		}


		// @ts-ignore
		filtrosData.value = data.value.map(item => mapToFilterData(item))
		loading.value = false
	}

	refresh()


	return {
		filtrosData,
		loading
	}


}
