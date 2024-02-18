/* Global Core Configuration */

export default defineNuxtConfig({
  /* Debugger & Development */
  devtools: { enabled: true },
  // debug: true,

  app: {
    head: {
      title: 'Tip Tracker',
      meta: [
        // TODO Fill in Meta Info here (https://nuxt.com/docs/api/nuxt-config#app)
      ],
    },
  },

  extends: ['../../packages/ui', '../../packages/auth', '../../packages/playground', '@tip-tracker/util']
});
