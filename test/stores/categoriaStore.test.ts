import {beforeEach, describe, expect, it, vi} from 'vitest'
import {createPinia, setActivePinia} from 'pinia'
import {useCategoriaStore} from '~/stores/categoriaStore'

// Mock de useFetch
vi.mock('#app', () => ({
	useFetch: vi.fn(() => ({
		data: {
			value: [
				{
					DIV_CODIGO: 1,
					DIV_DESC: 'Categoría de prueba',
					DIV_ESTADO: 'A',
					DIV_ORDEN: 1,
					DIV_DIR_IMAGEN: '/images/categoria.jpg'
				}
			]
		}
	}))
}))

describe('CategoriaStore', () => {
	beforeEach(() => {
		// Crear una instancia fresca de pinia para cada test
		setActivePinia(createPinia())
	})

	it('tiene un estado inicial correcto', () => {
		const store = useCategoriaStore()

		expect(store.categorias)
			.toEqual([])
		expect(store.subcategorias)
			.toEqual([])
		expect(store.loading)
			.toBe(false)
		expect(store.error)
			.toBe(null)
	})

	it('obtiene categorías por ID correctamente', () => {
		const store = useCategoriaStore()

		// Establecer algunas categorías de prueba
		store.categorias = [
			{codigo: 1, nombre: 'Categoría 1', imagen: '', estado: 'A', orden: 1},
			{codigo: 2, nombre: 'Categoría 2', imagen: '', estado: 'A', orden: 2}
		]

		// Verificar que getCategoriaById funciona correctamente
		expect(store.getCategoriaById(1))
			.toEqual({codigo: 1, nombre: 'Categoría 1', imagen: '', estado: 'A', orden: 1})
		expect(store.getCategoriaById(3))
			.toBeUndefined()
	})

	it('obtiene subcategorías por ID de categoría correctamente', () => {
		const store = useCategoriaStore()

		// Establecer algunas subcategorías de prueba
		store.subcategorias = [
			{codigo: 101, nombre: 'Subcategoría 1', codigoCategoria: 1},
			{codigo: 102, nombre: 'Subcategoría 2', codigoCategoria: 1},
			{codigo: 201, nombre: 'Subcategoría 3', codigoCategoria: 2}
		]

		// Verificar que getSubcategoriasByCategoriaId funciona correctamente
		expect(store.getSubcategoriasByCategoriaId(1))
			.toEqual([
				{codigo: 101, nombre: 'Subcategoría 1', codigoCategoria: 1},
				{codigo: 102, nombre: 'Subcategoría 2', codigoCategoria: 1}
			])
		expect(store.getSubcategoriasByCategoriaId(3))
			.toEqual([])
	})

	it('obtiene imágenes de categorías correctamente', () => {
		const store = useCategoriaStore()

		// Establecer algunas categorías de prueba
		store.categorias = [
			{codigo: 1, nombre: 'Categoría 1', imagen: '/img1.jpg', estado: 'A', orden: 1},
			{codigo: 2, nombre: 'Categoría 2', imagen: '/img2.jpg', estado: 'A', orden: 2}
		]

		// Verificar que getCategoriasImages funciona correctamente
		expect(store.getCategoriasImages)
			.toEqual(['/img1.jpg',
				'/img2.jpg'])
	})

	it('actualiza el estado durante fetchCategorias', async () => {
		const store = useCategoriaStore()

		// Mock de extractSubcategoriasFromProductos
		store.extractSubcategoriasFromProductos = vi.fn()
			.mockResolvedValue([
				{codigo: 101, nombre: 'Subcategoría 1', codigoCategoria: 1}
			])

		// Verificar estado inicial
		expect(store.loading)
			.toBe(false)

		// Llamar a fetchCategorias
		const fetchPromise = store.fetchCategorias()

		// Verificar que loading es true durante la carga
		expect(store.loading)
			.toBe(true)

		// Esperar a que termine la carga
		await fetchPromise

		// Verificar que loading vuelve a false
		expect(store.loading)
			.toBe(false)

		// Verificar que las categorías se cargaron correctamente
		expect(store.categorias.length)
			.toBe(1)
		expect(store.categorias[0].nombre)
			.toBe('Categoría de prueba')

		// Verificar que se llamó a extractSubcategoriasFromProductos
		expect(store.extractSubcategoriasFromProductos)
			.toHaveBeenCalled()
	})
})
