import {describe, expect, it, vi} from 'vitest'
import {mount} from '@vue/test-utils'
// @ts-ignore
import SortOptions from '../../components/SortOptions.vue'

// Mock del event bus
vi.mock('~/utils/eventBus', () => ({
	default: {
		emit: vi.fn()
	}
}))

// Mock del router
vi.mock('vue-router', () => ({
	useRouter: () => ({
		currentRoute: {
			value: {
				query: {}
			}
		},
		push: vi.fn()
	})
}))

describe('SortOptions', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(SortOptions)

		// Verificar que el componente se renderiza correctamente
		expect(wrapper.find('.sort-options')
			.exists())
			.toBe(true)
		expect(wrapper.find('label')
			.text())
			.toContain('Ordenar por:')
		expect(wrapper.find('select')
			.exists())
			.toBe(true)

		// Verificar que hay 5 opciones de ordenamiento
		expect(wrapper.findAll('option').length)
			.toBe(5)

		// Verificar que la opción por defecto es 'nombre_asc'
		expect(wrapper.find('select').element.value)
			.toBe('nombre_asc')
	})

	it('selects the correct option based on props', () => {
		const wrapper = mount(SortOptions, {
			props: {
				sortBy: 'precio_desc'
			}
		})

		// Verificar que la opción seleccionada es 'precio_desc'
		expect(wrapper.find('select').element.value)
			.toBe('precio_desc')
	})

	it('emits update:sortBy and sort-changed events when selection changes', async () => {
		const wrapper = mount(SortOptions)

		// Cambiar la selección
		await wrapper.find('select')
			.setValue('precio_asc')

		// Verificar que se emiten los eventos correctos
		expect(wrapper.emitted())
			.toHaveProperty('update:sortBy')
		expect(wrapper.emitted())
			.toHaveProperty('sort-changed')
		expect(wrapper.emitted()['update:sortBy'][0])
			.toEqual(['precio_asc'])
	})

	it('updates local state when props change', async () => {
		const wrapper = mount(SortOptions, {
			props: {
				sortBy: 'nombre_asc'
			}
		})

		// Verificar estado inicial
		expect(wrapper.find('select').element.value)
			.toBe('nombre_asc')

		// Actualizar props
		await wrapper.setProps({sortBy: 'precio_desc'})

		// Verificar que el estado local se actualizó
		expect(wrapper.find('select').element.value)
			.toBe('precio_desc')
	})
})
