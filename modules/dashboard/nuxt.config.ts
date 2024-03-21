// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver( import.meta.url );
export default defineNuxtConfig( {

  alias: { '~Dashboard': resolve( './' ) },

  devtools: { enabled: true },
  // debug: true,

  /* Configure Dashboard options */
  extends: [ '../../packages/ui', '../../packages/server' ],

  modules: [ '@pinia/nuxt', 'dayjs-nuxt', '@pinia-plugin-persistedstate/nuxt' ],
} );
