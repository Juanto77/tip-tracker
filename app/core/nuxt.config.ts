/* Global Core Configuration */
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver( import.meta.url );

export default defineNuxtConfig( {
  app: {
    head: {
      title: 'Tip Tracker',
      meta: [
        // TODO Fill in Meta Info here (https://nuxt.com/docs/api/nuxt-config#app)
      ],
    },
  },
  modules: [],

  extends: [ '../../packages/ui', '../../packages/server', '../../modules/dashboard' ],

  alias: { '~TT': resolve( './' ) },
  ///////////////////////////////////////////////////////////////////////////////////////////
  /* Debugger & Development */
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  // debug: true,

  ///////////////////////////////////////////////////////////////////////////////////////////
  /* Add On Configurations */


  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [ '/form', '/sandbox', '/signup', '/magiclink', '/dashboard/monthview', '/dashboard/*', '/UISandbox' ],
    },
  },

} );