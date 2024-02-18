// https://nuxt.com/docs/api/configuration/nuxt-config
import {createResolver} from '@nuxt/kit'
const {resolve} = createResolver(import.meta.url)
export default defineNuxtConfig({
  alias: {'~ui' : resolve('./')},
  /* UI Modules */
  modules: [
    '@samk-dev/nuxt-vcalendar',
    // '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    'nuxt-primevue',
    '@nuxt/ui'
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
