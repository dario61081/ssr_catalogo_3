import { h } from 'vue';
import type { Decorator } from '@storybook/vue3';

const NuxtDecorator: Decorator = (story, context) => {
  // Mock Nuxt's useNuxtApp
  const mockNuxtApp = {
    $bus: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
  };

  // Mock provide/inject for Nuxt context
  return () => h(story as any, {
    ...context.args,
    provide: {
      nuxtApp: mockNuxtApp,
    },
  });
};

export default NuxtDecorator;
