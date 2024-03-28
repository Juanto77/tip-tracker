// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({

  alias: {
    '~UI': resolve('./'),
    '~UIComponents': resolve('./components'),
    '~UIAssets': resolve('./assets'),
  },

  extends: [],

  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    'dayjs-nuxt',
    'nuxt-icon'
  ],


  tailwindcss: {
    configPath: '/tailwind.config.ts',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // css: [
  //   '@fortawesome/fontawesome-svg-core/styles.css'
  // ],

  /* UI Prime View Config */
  primevue: { // Treeshaking to lower bundle size
    // usePrimeVue: true,
    options: {
      unstyled: true,
    },
    importPT: { as: 'base', from: '~UIAssets/presets/tw-lara' }
    // importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
  },
});
