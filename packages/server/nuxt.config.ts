// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);
export default defineNuxtConfig({
  extends: [''],
  alias: { 
    '~Server': resolve('./'),
    '~sStores' : resolve('./stores'),
    '~sComposables' : resolve('./composables'),
    '~sTypes' : resolve('./types'),

},
  
  modules: ['@pinia/nuxt', '@nuxtjs/supabase'],


  /* Supabase Config */
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/form', '/sandbox', '/signup', '/magiclink'],
    },
  },
});
