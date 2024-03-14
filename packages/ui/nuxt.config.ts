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
 
  modules: [
    '@samk-dev/nuxt-vcalendar',
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    'dayjs-nuxt'
  ],


  tailwindcss: {
    configPath: '/tailwind.config.js',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  /* UI Prime View Config */
  primevue: {
    // usePrimeVue: true,
    options: {
      unstyled: true,
    },
    importPT: { as: 'base', from: '~UIAssets/presets/base' }
    // importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
  },
});
