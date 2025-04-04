import type { Meta, StoryObj } from '@storybook/vue3';
import PriceFilter from './PriceFilter.vue';

const meta = {
  title: 'Components/PriceFilter',
  component: PriceFilter,
  tags: ['autodocs'],
  argTypes: {
    'price-filter-changed': { action: 'priceChanged' }
  },
} satisfies Meta<typeof PriceFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    minPrice: 0,
    maxPrice: 10000,
  },
};

export const WithLargeRange: Story = {
  args: {
    minPrice: 0,
    maxPrice: 1000000,
  },
};

export const WithSmallRange: Story = {
  args: {
    minPrice: 100,
    maxPrice: 500,
  },
};
