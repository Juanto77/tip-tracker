// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  alias: {
    '~UI': resolve('./'),
    '~UIComponents': resolve('./components'),
    '~UIAssets': resolve('./assets'),
  },

  extends: ['../server'],

  /* UI Modules */
  modules: [
    '@samk-dev/nuxt-vcalendar',
    '@formkit/nuxt',
    'nuxt-primevue',
    '@nuxt/ui',
    '@formkit/nuxt',
    // '@nuxtjs/tailwindcss',
  ],

  /* UI Tailwind Config */
  tailwindcss: {
    configPath: '/tailwind.config',
  },

  /* UI Prime View Config */
  primevue: {
    importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
  },
});
