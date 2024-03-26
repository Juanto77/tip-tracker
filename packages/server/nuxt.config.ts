// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);
export default defineNuxtConfig({

  alias: { '~Server': resolve('./') },
  // devtools: { enabled: true },
  // debug: true,

  /* Configure Server options */
  // extends: ['../server', '../ui', '../finance'],

  modules: ['@nuxtjs/supabase'],

  /*
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/form', '/sandbox', '/signup', '/magiclink', '/dashboard/monthview', '/Dashboard/*', '/UISandbox'],
    },
  },
  */
  supabase: {
    redirect: false,
  },

});
