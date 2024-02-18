// https://nuxt.com/docs/api/configuration/nuxt-config
import {createResolver} from '@nuxt/kit'
const {resolve} = createResolver(import.meta.url)

export default defineNuxtConfig({
  /* {TEMPLATE} Developer settings */
  alias: {'~util' : resolve('./')},
  devtools: { enabled: true },
  // debug: true,

  /* {PACKAGE} Extends */
  extends: [],

  /* {PACKAGE} Modules */
  modules: [],
});
