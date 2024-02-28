/* Finance Configuration */
import {createResolver} from '@nuxt/kit'
const {resolve} = createResolver(import.meta.url)

export default defineNuxtConfig({
extends: ['../ui', '../server'],
alias: {'~Finance' : resolve('./')},

/* Finance Module */
  modules: [

    // '@formkit/nuxt',
    // // 'nuxt-primevue',
    // // '@nuxt/ui',
    // '@samk-dev/nuxt-vcalendar',
  ],
});