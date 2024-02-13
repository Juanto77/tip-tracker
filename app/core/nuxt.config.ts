/* Global Core Configuration */

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Tip Tracker',
      meta: [
        // TODO Fill in Meta Info here (https://nuxt.com/docs/api/nuxt-config#app)
      ],
    },
  },

  /* Debugger & Development */
  devtools: { enabled: true },
  // debug: true,
  extends: ['../../packages/ui', '../../packages/auth', '../../packages/playground']
});
