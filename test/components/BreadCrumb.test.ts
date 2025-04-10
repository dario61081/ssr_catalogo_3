import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
// @ts-ignore
import BreadCrumb from '../../components/BreadCrumb.vue'

// Mock NuxtLink component
const mockNuxtLink = {
	name: 'NuxtLink',
	props: ['to'],
	template: '<a :href="to"><slot /></a>'
}

describe('BreadCrumb', () => {
	it('renders properly with no items', () => {
		const wrapper = mount(BreadCrumb, {
			global: {
				stubs: {
					NuxtLink: mockNuxtLink
				}
			}
		})
		expect(wrapper.exists())
			.toBe(true)
		expect(wrapper.find('nav')
			.exists())
			.toBe(true)
		// Should only have the home link
		expect(wrapper.findAll('li').length)
			.toBe(1)
	})

	it('renders items correctly', () => {
		const items = [
			{text: 'Categoría', link: '/category'},
			{text: 'Subcategoría', link: '/subcategory'},
			{text: 'Producto'}
		]

		const wrapper = mount(BreadCrumb, {
			props: {
				items
			},
			global: {
				stubs: {
					NuxtLink: mockNuxtLink
				}
			}
		})

		// Home + 3 items = 4 list items
		expect(wrapper.findAll('li').length)
			.toBe(4)

		// Check if the text content is correct
		expect(wrapper.text())
			.toContain('Inicio')
		expect(wrapper.text())
			.toContain('Categoría')
		expect(wrapper.text())
			.toContain('Subcategoría')
		expect(wrapper.text())
			.toContain('Producto')

		// Check links
		const links = wrapper.findAll('a')
		expect(links.length)
			.toBe(3) // Home + 2 links (last item has no link)
		expect(links[0].attributes('href'))
			.toBe('/')
		expect(links[1].attributes('href'))
			.toBe('/category')
		expect(links[2].attributes('href'))
			.toBe('/subcategory')
	})

	it('renders last item without link', () => {
		const items = [
			{text: 'Categoría', link: '/category'},
			{text: 'Producto', link: '/product'} // Even though it has a link, it should not be rendered as a link
		]

		const wrapper = mount(BreadCrumb, {
			props: {
				items
			},
			global: {
				stubs: {
					NuxtLink: mockNuxtLink
				}
			}
		})

		// Check that the last item is not a link
		const lastItem = wrapper.findAll('li')
			.at(2)
		expect(lastItem.find('a')
			.exists())
			.toBe(false)
		expect(lastItem.find('span.text-gray-900')
			.text())
			.toBe('Producto')
	})
})
