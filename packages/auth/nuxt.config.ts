// https://nuxt.com/docs/api/configuration/nuxt-config
import {createResolver} from '@nuxt/kit'
const {resolve} = createResolver(import.meta.url)
export default defineNuxtConfig({
  extends:['@tip-tracker/util'],
  alias: {'~auth' : resolve('./')},
  modules: ['@nuxtjs/supabase'],
  /* Supabase Config */
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/form', '/sandbox', '/signup', '/magiclink'],
    },
  },
});
