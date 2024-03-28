<template>
    <div v-if="$device.isDesktop">
        <h1>This is on desktop</h1>
    </div>
    <div v-if="$device.isMobile">
        <h1>This is on mobile</h1>
    </div>
</template>

<script setup>
const { isMobile, isDesktop } = useDevice();
</script>