// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver( import.meta.url );
export default defineNuxtConfig( {

  alias: { '~<FTName | Capitalize >': resolve( './' ) },
  devtools: { enabled: true },
  // debug: true,

  /* Configure <FTName | Capitalize > options */
  // extends: ['../../packages/server', '../../packages/ui'],

  modules: [],
} );
