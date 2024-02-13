// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* UI Modules */
    modules:[
    '@samk-dev/nuxt-vcalendar',
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    'nuxt-primevue'
    ],

    /* UI Tailwind Config */
    tailwindcss: {
    cssPath: '~/packages/ui/assets',
    configPath: '/tailwind.config',
  },
  /* UI Prime View Config */
primevue: {
    importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
},
});
