/* Finance Configuration */
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: ['../ui', '../server'],

  alias: { '~Finance': resolve('./') },

  /* Finance Module */
  modules: [],
});