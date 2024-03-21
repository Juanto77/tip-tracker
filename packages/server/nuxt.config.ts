// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver( import.meta.url );
export default defineNuxtConfig( {

  alias: { '~Server': resolve( './' ) },
  devtools: { enabled: true },
  // debug: true,

  /* Configure Server options */
  // extends: ['../server', '../ui', '../finance'],

  modules: [ '@nuxtjs/supabase' ],
} );
