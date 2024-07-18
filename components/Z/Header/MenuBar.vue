<template>
    <Menubar :model="items" :pt="style">
        <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex align-items-center" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root, 'rounded-xl': root }"
                    :value="item.badge" />
                <span v-if="item.shortcut"
                    class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut
                    }}</span>
                <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
            </a>
        </template>

        <template #end>
            <div class="flex align-items-center gap-2">
            </div>
        </template>
    </Menubar>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Core',
                icon: 'pi pi-bolt',
                shortcut: '⌘+S'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server',
                shortcut: '⌘+B'
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-pencil',
                shortcut: '⌘+U'
            },
            {
                separator: true
            },
            {
                label: 'Templates',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Apollo',
                        icon: 'pi pi-palette',
                        badge: 2
                    },
                    {
                        label: 'Ultima',
                        icon: 'pi pi-palette',
                        badge: 3
                    }
                ]
            }
        ]
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope',
        badge: 3
    }
]);

const style = {
    root: {
        class: [
            'relative',

            // Flexbox
            'flex',
            'items-center',

            // Spacing
            'p-2',

            // Shape
            'rounded-md',

            // Color
            'bg-surface-50 dark:bg-surface-700',
            'border border-surface-200 dark:border-surface-700'
        ]
    },
    menu: ({ props }) => ({
        class: [
            // Flexbox
            'sm:flex',
            'items-center',
            'flex-wrap',
            'flex-col sm:flex-row',
            { hidden: !props?.mobileActive, flex: props?.mobileActive },

            // Position
            'absolute sm:relative',
            'top-full left-0',
            'sm:top-auto sm:left-auto',

            // Size
            'w-full sm:w-auto',

            // Spacing
            'm-0',
            'py-1 sm:py-0 sm:p-0',
            'list-none',

            // Shape
            'shadow-md sm:shadow-none',
            'border-0',

            // Color
            'bg-surface-500 dark:bg-surface-700 sm:bg-transparent', //Default State

            // Misc
            'outline-none'
        ]
    }),
    menuitem: {
        class: 'sm:relative sm:w-auto w-full static'
    },
    content: ({ props, context }) => ({
        class: [
            // Shape
            { 'rounded-md': props.root },

            //  Colors
            {
                'text-surface-500 dark:text-white/70': !context.focused && !context.active,
                'text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90': context.focused && !context.active,
                'text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30': context.focused && context.active,
                'text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30': !context.focused && context.active
            },

            // Hover States
            {
                'hover:bg-surface-100 dark:hover:bg-surface-600/80': !context.active,
                'hover:bg-primary-500/50 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-0/80': context.active
            },

            // Transitions
            'transition-all',
            'duration-200'
        ]
    }),
    action: ({ context }) => ({
        class: [
            'relative',

            // Flexbox
            'flex',
            'items-center',

            // Spacing
            'py-3',
            'px-5',

            // Size
            {
                'pl-9 sm:pl-5': context.level === 1,
                'pl-14 sm:pl-5': context.level === 2
            },
            'leading-none',

            // Misc
            'select-none',
            'cursor-pointer',
            'no-underline ',
            'overflow-hidden'
        ]
    }),
    icon: {
        class: 'mr-2'
    },
    submenuicon: ({ props }) => ({
        class: [
            {
                'ml-auto sm:ml-2': props.root,
                'ml-auto': !props.root
            }
        ]
    }),
    submenu: ({ props }) => ({
        class: [
            // Size
            'w-full sm:w-48',

            // Spacing
            'py-1',
            'm-0',
            'list-none',

            // Shape
            'shadow-none sm:shadow-md',
            'border-0',

            // Position
            'static sm:absolute',
            'z-10',
            { 'sm:absolute sm:left-full sm:top-0': props.level > 1 },

            // Color
            `bg-[#F2F4F3] dark:bg-Space-Cadet`
            // 'bg-surface-0 dark:bg-surface-700',
            // `bg-slate-300`
        ]
    }),
    separator: {
        class: 'border-t border-surface-200 dark:border-surface-600 my-1'
    },
    button: {
        class: [
            // Flexbox
            'flex sm:hidden',
            'items-center justify-center',

            // Size
            'w-8',
            'h-8',

            // Shape
            'rounded-full',
            // Color
            'text-surface-500 dark:text-white/80',

            // States
            'hover:text-surface-600 dark:hover:text-white/60',
            'hover:bg-surface-100 dark:hover:bg-surface-600/80',
            'focus:outline-none focus:outline-offset-0',
            'focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

            // Transitions
            'transition duration-200 ease-in-out',

            // Misc
            'cursor-pointer',
            'no-underline'
        ]
    },
    end: {
        class: 'ml-auto self-center'
    }
};
</script>
