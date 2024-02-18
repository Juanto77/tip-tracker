/* Playground Configuration */
import {createResolver} from '@nuxt/kit'
const {resolve} = createResolver(import.meta.url)

export default defineNuxtConfig({
extends: ['../ui', '../auth', '@tip-tracker/util'],
alias: {'~playground' : resolve('./')},
/* Playground Module */
  modules: [
    // '@nuxt/ui',
    '@pinia/nuxt'   
  ],
});