// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 devtools: { enabled: true },
 dev: true,

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
   // 'nuxt-primevue',
   '@nuxtjs/tailwindcss',
   '@nuxtjs/device',
   '@nuxtjs/color-mode',
   'dayjs-nuxt',
   'nuxt-icon',
   'nuxt-headlessui',
   '@vee-validate/nuxt',
   '@nuxt/ui'
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

 headlessui: {
   prefix: 'H'
 },

 /*
 primevue: { // Treeshaking to lower bundle size
   // usePrimeVue: true,
   options: {
     unstyled: true,
   },
   importPT: { as: 'base', from: '~/assets/presets/tw-lara' }
   // importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
 },
 */


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