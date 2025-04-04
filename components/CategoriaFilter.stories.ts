import type { Meta, StoryObj } from '@storybook/vue3';
import CategoriaFilter from './CategoriaFilter.vue';

const meta = {
  title: 'Components/CategoriaFilter',
  component: CategoriaFilter,
  tags: ['autodocs'],
  argTypes: {
    'on-selected': { action: 'selected' }
  },
} satisfies Meta<typeof CategoriaFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCategories: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: '/api/categorias',
        method: 'GET',
        status: 200,
        response: [
          { codigo: 1, nombre: 'Electrónica', DIV_ESTADO: 'A' },
          { codigo: 2, nombre: 'Hogar', DIV_ESTADO: 'A' },
          { codigo: 3, nombre: 'Jardín', DIV_ESTADO: 'A' },
        ],
      },
    ],
  },
};

export const Loading: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: '/api/categorias',
        method: 'GET',
        status: 200,
        delay: 2000,
        response: [],
      },
    ],
  },
};

export const Error: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: '/api/categorias',
        method: 'GET',
        status: 500,
        response: { message: 'Error al cargar las categorías' },
      },
    ],
  },
};
