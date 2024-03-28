// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);
export default defineNuxtConfig({

  alias: { '~Server': resolve('./') },
  devtools: { enabled: true },
  // debug: true,

  // modules: ['@nuxtjs/supabase', 'nuxt-security'],

  modules: ['@nuxtjs/supabase'],


  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      // exclude: ['/form', '/sandbox', '/signup', '/magiclink', '/dashboard/monthview', '/Dashboard/*', '/UISandbox'],
      exclude: ['/sandbox', '/signup', '/magiclink'],
      // cookieRedirect: true,
    },
  },

  /*   supabase: {
      redirect: false,
    }, */
});
