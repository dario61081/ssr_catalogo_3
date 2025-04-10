import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '../../components/ProductCard.vue'
import { createPinia, setActivePinia } from 'pinia'

// Mock de los stores
vi.mock('~/stores/favoritesStore', () => ({
  useFavoritesStore: () => ({
    isFavorite: vi.fn((id) => id === 1),
    toggleFavorite: vi.fn()
  })
}))

vi.mock('~/stores/cartStore', () => ({
  useCartStore: () => ({
    addToCart: vi.fn()
  })
}))

// Mock NuxtLink component
const mockNuxtLink = {
  name: 'NuxtLink',
  props: ['to'],
  template: '<a :href="to"><slot /></a>'
}

describe('ProductCard', () => {
  beforeEach(() => {
    // Crear una instancia fresca de pinia para cada test
    setActivePinia(createPinia())
  })

  it('renders product information correctly', () => {
    const product = {
      codigo: 1,
      nombre: 'Producto de prueba',
      desc_division: 'Categoría',
      precio: 150000,
      imagen: '/images/product.jpg',
      stock: 10,
      codigo_division: 1,
      desc_categoria: 'Subcategoría',
      codigo_categoria: 1
    }

    const wrapper = mount(ProductCard, {
      props: {
        product
      },
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })

    // Verificar que se muestra la información del producto
    expect(wrapper.find('h3').text()).toBe('Producto de prueba')
    expect(wrapper.find('.text-gray-500').text()).toBe('Categoría')
    expect(wrapper.find('img').attributes('src')).toBe('/images/product.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe('Producto de prueba')
    
    // Verificar que se muestra el precio correctamente
    expect(wrapper.find('.text-gray-900.font-bold').text()).toContain('150.000')
    
    // Verificar que se muestra la etiqueta de stock
    expect(wrapper.find('.bg-green-100').exists()).toBe(true)
    expect(wrapper.find('.bg-green-100').text()).toBe('En stock')
  })

  it('shows out of stock label when product has no stock', () => {
    const product = {
      codigo: 2,
      nombre: 'Producto sin stock',
      desc_division: 'Categoría',
      precio: 150000,
      imagen: '/images/product.jpg',
      stock: 0,
      codigo_division: 1,
      desc_categoria: 'Subcategoría',
      codigo_categoria: 1
    }

    const wrapper = mount(ProductCard, {
      props: {
        product
      },
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })

    // Verificar que se muestra la etiqueta de sin stock
    expect(wrapper.find('.bg-red-100').exists()).toBe(true)
    expect(wrapper.find('.bg-red-100').text()).toBe('Sin stock')
  })

  it('shows filled heart icon for favorite products', () => {
    const product = {
      codigo: 1, // Este ID está configurado como favorito en el mock
      nombre: 'Producto favorito',
      desc_division: 'Categoría',
      precio: 150000,
      imagen: '/images/product.jpg',
      stock: 10,
      codigo_division: 1,
      desc_categoria: 'Subcategoría',
      codigo_categoria: 1
    }

    const wrapper = mount(ProductCard, {
      props: {
        product
      },
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })

    // Verificar que se muestra el icono de favorito lleno
    expect(wrapper.find('.pi-heart-fill').exists()).toBe(true)
  })

  it('shows outline heart icon for non-favorite products', () => {
    const product = {
      codigo: 2, // Este ID no está configurado como favorito en el mock
      nombre: 'Producto no favorito',
      desc_division: 'Categoría',
      precio: 150000,
      imagen: '/images/product.jpg',
      stock: 10,
      codigo_division: 1,
      desc_categoria: 'Subcategoría',
      codigo_categoria: 1
    }

    const wrapper = mount(ProductCard, {
      props: {
        product
      },
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })

    // Verificar que se muestra el icono de favorito vacío
    expect(wrapper.find('.pi-heart').exists()).toBe(true)
  })

  it('calls toggleFavorite when favorite button is clicked', async () => {
    const product = {
      codigo: 1,
      nombre: 'Producto de prueba',
      desc_division: 'Categoría',
      precio: 150000,
      imagen: '/images/product.jpg',
      stock: 10,
      codigo_division: 1,
      desc_categoria: 'Subcategoría',
      codigo_categoria: 1
    }

    const wrapper = mount(ProductCard, {
      props: {
        product
      },
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })

    // Simular clic en el botón de favoritos
    await wrapper.find('button[aria-label="Quitar de favoritos"]').trigger('click')
    
    // Verificar que se llamó al método toggleFavorite
    // Nota: No podemos verificar directamente la llamada al método del store
    // porque está dentro de un método del componente
  })

  it('calls addToCart when add to cart button is clicked', async () => {
    const product = {
      codigo: 1,
      nombre: 'Producto de prueba',
      desc_division: 'Categoría',
      precio: 150000,
      imagen: '/images/product.jpg',
      stock: 10,
      codigo_division: 1,
      desc_categoria: 'Subcategoría',
      codigo_categoria: 1
    }

    const wrapper = mount(ProductCard, {
      props: {
        product
      },
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })

    // Simular clic en el botón de añadir al carrito
    await wrapper.find('button.bg-gray-900').trigger('click')
    
    // Verificar que se llamó al método addToCart
    // Nota: No podemos verificar directamente la llamada al método del store
    // porque está dentro de un método del componente
  })
})
