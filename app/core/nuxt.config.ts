/* Global Core Configuration */
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({

  /* Debugger & Development */
  devtools: { enabled: true },
  // debug: true,

  alias: { '~Core': resolve('./') },


  app: {
    head: {
      title: 'Tip Tracker',
      meta: [
        // TODO Fill in Meta Info here (https://nuxt.com/docs/api/nuxt-config#app)
      ],
    },
  },

  extends: ['../../packages/finance', '../../packages/server', '../../packages/ui',],
});
