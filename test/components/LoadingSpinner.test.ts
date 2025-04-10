import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
// @ts-ignore
import LoadingSpinner from '../../components/LoadingSpinner.vue'

describe('LoadingSpinner', () => {
	it('renders properly', () => {
		const wrapper = mount(LoadingSpinner)
		expect(wrapper.exists())
			.toBe(true)
		expect(wrapper.find('.loading-spinner')
			.exists())
			.toBe(true)
	})

	it('has the correct CSS classes', () => {
		const wrapper = mount(LoadingSpinner)
		const spinner = wrapper.find('.loading-spinner')
		expect(spinner.classes())
			.toContain('loading-spinner')
		expect(spinner.find('.spinner-circle')
			.exists())
			.toBe(true)
	})
})
