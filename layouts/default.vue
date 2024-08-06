<template>
    <div class="container mx-auto w-auto max-w-full">
        <DesktopNavBar class=""/>
        <main class="my-3">
            <slot />
        </main>
    </div>
    <NavDock class="lg:hidden md:hidden"/>
</template>

<script setup>

// Link to Google Fonts
/* 
useHead({
    link: [
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
            crossorigin: ''
        }
    ]
});
 */
</script>

<style>
/* Set the font family for the entire site */
/* 
body {
    font-family: 'Inter';
} 
*/

/* Set the background color for the entire site */
body {
    @apply dark:bg-gray-900 bg-white
}
</style>