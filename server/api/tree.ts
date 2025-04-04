export default defineEventHandler(async (event) => {
	const urlArticulos = "https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC"
	const apiCategorias = "https://panel.colchonesparana.com.py/articulos/divisiones/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC/TODOS"

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
	const articulos = await $fetch(urlArticulos)
	// {
	// 	"DIV_CODIGO": 5,
	// 	"DIV_DESC": "ACCESORIOS PARA EL HOGAR",
	// 	"DIV_ESTADO": "A",
	// 	"DIV_ORDEN": 0,
	// 	"DIV_DIR_IMAGEN": null
	// }
	const categorias = await $fetch(apiCategorias)

	// combinar a categorias (div_codigo) con (division)


	// const combinado = categorias.map(categoria => {
	// 	const articulosEnCategoria = articulos.filter(articulo => articulo.DIVISION === categoria.DIV_CODIGO)
	// 	return {
	// 		...categoria,
	// 		articulos: articulosEnCategoria
	// 	}
	// })


	const combinado = categorias.map(categoria => {
		const articulosEnCategoria = articulos.filter(articulo => articulo.DIVISION === categoria.DIV_CODIGO)
		return {
			...categoria,
			articulos: articulosEnCategoria
		}
	})

	return combinado

})
