import {beforeEach, describe, expect, it, vi} from 'vitest'
import {createPinia, setActivePinia} from 'pinia'
import {useProductoStore} from '~/stores/productoStore'

// Mock de useFetch
vi.mock('#app', () => ({
	useFetch: vi.fn((url) => {
		// Mock para fetchProductos
		if (url.includes('articulos/division')) {
			return {
				data: {
					value: [
						{
							ART_COD: 1,
							ART_DESCRIPCION: 'Producto de prueba',
							DIV_CLAS: 101,
							DIV_CLAS_DESC: 'Subcategoría',
							PRECIO: '150.000',
							ART_DIR_IMAG1: '/images/producto.jpg',
							ART_DIR_IMAG2: '',
							ART_DIR_IMAG3: '',
							STOCK: 10,
							DIVISION: 1,
							DIV_DESC: 'Categoría'
						}
					]
				}
			}
		}
		// Mock para fetchProductoById
		else if (url.includes('articulos/detalle')) {
			return {
				data: {
					value: {
						ART_COD: 1,
						ART_DESCRIPCION: 'Producto de prueba',
						DIV_CLAS: 101,
						DIV_CLAS_DESC: 'Subcategoría',
						PRECIO: '150.000',
						ART_DIR_IMAG1: '/images/producto.jpg',
						ART_DIR_IMAG2: '',
						ART_DIR_IMAG3: '',
						STOCK: 10,
						DIVISION: 1,
						DIV_DESC: 'Categoría'
					}
				}
			}
		}
		return {data: {value: null}}
	})
}))

// Mock de la función mapToProducto
vi.mock('~/utils/transforms', () => ({
	mapToProducto: (data) => ({
		codigo: data.ART_COD,
		nombre: data.ART_DESCRIPCION,
		codigo_categoria: data.DIV_CLAS,
		desc_categoria: data.DIV_CLAS_DESC,
		precio: 150000,
		imagen: data.ART_DIR_IMAG1 || '',
		imagen_2: data.ART_DIR_IMAG2 || '',
		imagen_3: data.ART_DIR_IMAG3 || '',
		stock: data.STOCK,
		codigo_division: data.DIVISION,
		desc_division: data.DIV_DESC
	})
}))

describe('ProductoStore', () => {
	beforeEach(() => {
		// Crear una instancia fresca de pinia para cada test
		setActivePinia(createPinia())
	})

	it('tiene un estado inicial correcto', () => {
		const store = useProductoStore()

		expect(store.productos)
			.toEqual([])
		expect(store.loading)
			.toBe(false)
		expect(store.error)
			.toBe(null)
	})

	it('obtiene productos por ID correctamente', () => {
		const store = useProductoStore()

		// Establecer algunos productos de prueba
		store.productos = [
			{
				codigo: 1,
				nombre: 'Producto 1',
				codigo_categoria: 101,
				desc_categoria: 'Subcategoría',
				precio: 150000,
				imagen: '/img1.jpg',
				stock: 10,
				codigo_division: 1,
				desc_division: 'Categoría'
			},
			{
				codigo: 2,
				nombre: 'Producto 2',
				codigo_categoria: 101,
				desc_categoria: 'Subcategoría',
				precio: 200000,
				imagen: '/img2.jpg',
				stock: 5,
				codigo_division: 1,
				desc_division: 'Categoría'
			}
		]

		// Verificar que getProductoById funciona correctamente
		expect(store.getProductoById(1))
			.toEqual({
				codigo: 1,
				nombre: 'Producto 1',
				codigo_categoria: 101,
				desc_categoria: 'Subcategoría',
				precio: 150000,
				imagen: '/img1.jpg',
				stock: 10,
				codigo_division: 1,
				desc_division: 'Categoría'
			})
		expect(store.getProductoById(3))
			.toBeUndefined()
	})

	it('obtiene productos por categoría correctamente', () => {
		const store = useProductoStore()

		// Establecer algunos productos de prueba
		store.productos = [
			{
				codigo: 1,
				nombre: 'Producto 1',
				codigo_categoria: 101,
				desc_categoria: 'Subcategoría',
				precio: 150000,
				imagen: '/img1.jpg',
				stock: 10,
				codigo_division: 1,
				desc_division: 'Categoría'
			},
			{
				codigo: 2,
				nombre: 'Producto 2',
				codigo_categoria: 101,
				desc_categoria: 'Subcategoría',
				precio: 200000,
				imagen: '/img2.jpg',
				stock: 5,
				codigo_division: 1,
				desc_division: 'Categoría'
			},
			{
				codigo: 3,
				nombre: 'Producto 3',
				codigo_categoria: 201,
				desc_categoria: 'Otra Subcategoría',
				precio: 300000,
				imagen: '/img3.jpg',
				stock: 15,
				codigo_division: 2,
				desc_division: 'Otra Categoría'
			}
		]

		// Verificar que getProductosByCategoria funciona correctamente
		expect(store.getProductosByCategoria(1).length)
			.toBe(2)
		expect(store.getProductosByCategoria(2).length)
			.toBe(1)
		expect(store.getProductosByCategoria(3).length)
			.toBe(0)
	})

	it('obtiene productos por subcategoría correctamente', () => {
		const store = useProductoStore()

		// Establecer algunos productos de prueba
		store.productos = [
			{
				codigo: 1,
				nombre: 'Producto 1',
				codigo_categoria: 101,
				desc_categoria: 'Subcategoría',
				precio: 150000,
				imagen: '/img1.jpg',
				stock: 10,
				codigo_division: 1,
				desc_division: 'Categoría'
			},
			{
				codigo: 2,
				nombre: 'Producto 2',
				codigo_categoria: 101,
				desc_categoria: 'Subcategoría',
				precio: 200000,
				imagen: '/img2.jpg',
				stock: 5,
				codigo_division: 1,
				desc_division: 'Categoría'
			},
			{
				codigo: 3,
				nombre: 'Producto 3',
				codigo_categoria: 201,
				desc_categoria: 'Otra Subcategoría',
				precio: 300000,
				imagen: '/img3.jpg',
				stock: 15,
				codigo_division: 2,
				desc_division: 'Otra Categoría'
			}
		]

		// Verificar que getProductosBySubcategoria funciona correctamente
		expect(store.getProductosBySubcategoria(101).length)
			.toBe(2)
		expect(store.getProductosBySubcategoria(201).length)
			.toBe(1)
		expect(store.getProductosBySubcategoria(301).length)
			.toBe(0)
	})

	it('actualiza el estado durante fetchProductos', async () => {
		const store = useProductoStore()

		// Verificar estado inicial
		expect(store.loading)
			.toBe(false)

		// Llamar a fetchProductos
		const fetchPromise = store.fetchProductos()

		// Verificar que loading es true durante la carga
		expect(store.loading)
			.toBe(true)

		// Esperar a que termine la carga
		await fetchPromise

		// Verificar que loading vuelve a false
		expect(store.loading)
			.toBe(false)

		// Verificar que los productos se cargaron correctamente
		expect(store.productos.length)
			.toBe(1)
		expect(store.productos[0].nombre)
			.toBe('Producto de prueba')
	})

	it('fetchProductoById devuelve un producto correctamente', async () => {
		const store = useProductoStore()

		// Llamar a fetchProductoById
		const producto = await store.fetchProductoById(1)

		// Verificar que el producto se cargó correctamente
		expect(producto)
			.toBeDefined()
		expect(producto?.nombre)
			.toBe('Producto de prueba')
		expect(producto?.precio)
			.toBe(150000)
	})
})
