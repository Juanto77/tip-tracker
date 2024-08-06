// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'
export default defineNuxtConfig({
  /* Development & Debugging */
  devtools: { enabled: true },
  dev: true,
/* 
  experimental: {
    componentIslands: true
  },
   */
 // debug: true,

 /* Configure Dashboard options */
 extends: ['@nuxt/ui-pro'],

  modules: [
    // '@tip-tracker-turbo/ui',
    '@nuxt/devtools',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@primevue/nuxt-module',
    //  '@nuxtjs/tailwindcss', // Removed to install Nuxt UI
    '@nuxtjs/device',
    //  '@nuxtjs/color-mode', // Removed to install Nuxt UI
    'dayjs-nuxt',
    //  'nuxt-icon', // Removed to install Nuxt UI
    //  'nuxt-headlessui', 
    '@vee-validate/nuxt',
    '@nuxt/ui'
  ],

  components:[
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  tailwindcss: {
    configPath: '/tailwind.config.ts',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  /*
  headlessui: {
    prefix: 'H'
  },
 */

  primevue: { // Treeshaking to lower bundle size
    // usePrimeVue: true,

    options: {
      //  unstyled: true,
      theme: {
        preset: Aura
      }
    },

    //  importPT: { as: 'base', from: '~/assets/presets/tw-lara' }
    // importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
  },



  supabase: {
    /*
    clientOptions: {
      auth: {
        persistSession: true,
      },
    },
    */
    cookieOptions: {
      secure: false,
    },
    //  redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      // exclude: ['/form', '/sandbox', '/signup', '/magiclink', '/dashboard/monthview', '/Dashboard/*', '/UISandbox'],
      exclude: ['/sandbox', '/signup', '/magiclink', '/'],
      cookieRedirect: true,
    },

  },
  compatibilityDate: '2024-07-08'
})
