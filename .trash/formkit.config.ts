import { defineFormKitConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import { createProPlugin, rating, toggle, repeater, togglebuttons, dropdown, } from '@formkit/pro'
import '@formkit/themes/genesis'
import '@formkit/pro/genesis'

const proPlugin = createProPlugin('fk-98bbcc5c83', {
    rating,
    toggle,
    repeater,
    dropdown,
    togglebuttons
    // any other Pro Inputs
})


export default defineFormKitConfig({
    plugins: [proPlugin],
    config: {
        rootClasses
    }

})