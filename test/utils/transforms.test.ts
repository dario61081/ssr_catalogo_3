import {describe, expect, it} from 'vitest'
import {mapToCategoria, mapToProducto} from '~/utils/transforms'

describe('Funciones de transformación', () => {
	describe('mapToProducto', () => {
		it('transforma correctamente los datos de producto', () => {
			const productoResponse = {
				ART_COD: 1,
				ART_DESCRIPCION: 'Producto de prueba',
				DIV_CLAS: 101,
				DIV_CLAS_DESC: 'Subcategoría',
				PRECIO: '150.000',
				ART_DIR_IMAG1: '/images/producto.jpg',
				ART_DIR_IMAG2: '/images/producto2.jpg',
				ART_DIR_IMAG3: '/images/producto3.jpg',
				STOCK: 10,
				DIVISION: 1,
				DIV_DESC: 'Categoría',
				COD_ALFANUM: 'P001',
				LINEA: 'Línea',
				ART_DIR_IMAG4: null,
				ART_DIR_IMAG5: null,
				ART_DIR_IMAG6: null,
				ART_IND_IMP: 'S',
				MOSTRAR_ECOM: 'S',
				MOSTRAR_CAT: 'S',
				TIENE_DOCUMENTOS: 'N'
			}

			const resultado = mapToProducto(productoResponse)

			expect(resultado)
				.toEqual({
					codigo: 1,
					nombre: 'Producto de prueba',
					codigo_categoria: 101,
					desc_categoria: 'Subcategoría',
					precio: 150000, // Precio transformado correctamente
					imagen: '/images/producto.jpg',
					imagen_2: '/images/producto2.jpg',
					imagen_3: '/images/producto3.jpg',
					stock: 10,
					codigo_division: 1,
					desc_division: 'Categoría'
				})
		})

		it('maneja correctamente precios con formato incorrecto', () => {
			const productoResponse = {
				ART_COD: 1,
				ART_DESCRIPCION: 'Producto de prueba',
				DIV_CLAS: 101,
				DIV_CLAS_DESC: 'Subcategoría',
				PRECIO: 'no-es-un-precio',
				ART_DIR_IMAG1: '/images/producto.jpg',
				ART_DIR_IMAG2: '',
				ART_DIR_IMAG3: '',
				STOCK: 10,
				DIVISION: 1,
				DIV_DESC: 'Categoría',
				COD_ALFANUM: 'P001',
				LINEA: 'Línea',
				ART_DIR_IMAG4: null,
				ART_DIR_IMAG5: null,
				ART_DIR_IMAG6: null,
				ART_IND_IMP: 'S',
				MOSTRAR_ECOM: 'S',
				MOSTRAR_CAT: 'S',
				TIENE_DOCUMENTOS: 'N'
			}

			const resultado = mapToProducto(productoResponse)

			// Debería manejar el error y establecer el precio a 0
			expect(resultado.precio)
				.toBe(0)
		})

		it('maneja correctamente imágenes nulas o vacías', () => {
			const productoResponse = {
				ART_COD: 1,
				ART_DESCRIPCION: 'Producto de prueba',
				DIV_CLAS: 101,
				DIV_CLAS_DESC: 'Subcategoría',
				PRECIO: '150.000',
				ART_DIR_IMAG1: null,
				ART_DIR_IMAG2: null,
				ART_DIR_IMAG3: null,
				STOCK: 10,
				DIVISION: 1,
				DIV_DESC: 'Categoría',
				COD_ALFANUM: 'P001',
				LINEA: 'Línea',
				ART_DIR_IMAG4: null,
				ART_DIR_IMAG5: null,
				ART_DIR_IMAG6: null,
				ART_IND_IMP: 'S',
				MOSTRAR_ECOM: 'S',
				MOSTRAR_CAT: 'S',
				TIENE_DOCUMENTOS: 'N'
			}

			const resultado = mapToProducto(productoResponse)

			// Debería establecer las imágenes a cadenas vacías
			expect(resultado.imagen)
				.toBe('')
			expect(resultado.imagen_2)
				.toBe('')
			expect(resultado.imagen_3)
				.toBe('')
		})
	})

	describe('mapToCategoria', () => {
		it('transforma correctamente los datos de categoría', () => {
			const categoriaResponse = {
				DIV_CODIGO: 1,
				DIV_DESC: 'Categoría de prueba',
				DIV_ESTADO: 'A',
				DIV_ORDEN: 1,
				DIV_DIR_IMAGEN: '/images/categoria.jpg'
			}

			const resultado = mapToCategoria(categoriaResponse)

			expect(resultado)
				.toEqual({
					codigo: 1,
					nombre: 'Categoría de prueba',
					imagen: '/images/categoria.jpg',
					estado: 'A',
					orden: 1
				})
		})

		it('maneja correctamente imágenes nulas', () => {
			const categoriaResponse = {
				DIV_CODIGO: 1,
				DIV_DESC: 'Categoría de prueba',
				DIV_ESTADO: 'A',
				DIV_ORDEN: 1,
				DIV_DIR_IMAGEN: null
			}

			const resultado = mapToCategoria(categoriaResponse)

			// Debería establecer la imagen a una cadena vacía
			expect(resultado.imagen)
				.toBe('')
		})
	})
})
