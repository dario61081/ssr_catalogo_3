import type { Preview } from '@storybook/vue3';
import '../assets/css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import NuxtDecorator from './NuxtDecorator';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [NuxtDecorator],
};

export default preview;
