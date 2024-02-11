import * as path from 'path';
export default defineNuxtConfig({
  devtools: { enabled: true },
  // debug: true,
  // alias: {
  //   '~': '/<rootDir>',
  //   '@': '/<rootDir>',
  //   '~~': '/<rootDir>',
  //   '@@': '/<rootDir>',
  //   assets: '/<rootDir>/assets',
  //   public: '/<rootDir>/public',
  //   presets: '/<rootDir>/presets',
  // },
  modules: [
    '@nuxtjs/supabase',
    // '@nuxt/ui',
    '@pinia/nuxt',
    '@formkit/nuxt',
    // '@samk-dev/nuxt-vcalendar',
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config',
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/form', '/sandbox', '/signup', '/magiclink'],
    },
  },
  primevue: {
    usePrimeVue: true,
    components: {
      include: '*',
    },

    options: { unstyled: true },
   importPT: { from: path.resolve(__dirname, '.\\preset\\lara\\') } 
  },

  imports: {
    dirs: ['stores'],
  },
});
