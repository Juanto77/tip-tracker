export default defineNuxtConfig({
  devtools: { enabled: true },

  // debug: true,
  modules: ['@nuxtjs/supabase', '@nuxt/ui', '@pinia/nuxt', '@formkit/nuxt'],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/form', '/sandbox', '/signup', '/magiclink'],
    },
  },
  imports: {
    dirs: ['stores'],
  },
});
