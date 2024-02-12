export default defineNuxtConfig({
  devtools: { enabled: true },
  // debug: true,

  modules: [
    '@nuxtjs/supabase',
    // '@nuxt/ui',
    '@pinia/nuxt',
    '@formkit/nuxt',
    // '@samk-dev/nuxt-vcalendar',
    '@nuxtjs/tailwindcss',
    'nuxt-primevue',
  ],
  tailwindcss: {
    cssPath: './assets/tailwind.css',
    configPath: '/tailwind.config',
  },
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
