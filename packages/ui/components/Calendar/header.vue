<template>
    <div class="min-w-full">
        <div class="flex flex-row">
            <div class="flex-none mx-8">
                <font-awesome-icon icon="fa-solid fa-chevron-left" @click="shiftMonth( -1 )"></font-awesome-icon>
            </div>
            <div class="grow text-center">
                <h1 class="monthName">{{ viewDate.format( 'MMMM YYYY' ) }}</h1>
            </div>
            <div class="flex-none mx-8">
                <font-awesome-icon icon="fa-solid fa-chevron-right" @click="shiftMonth( 1 )"></font-awesome-icon>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>