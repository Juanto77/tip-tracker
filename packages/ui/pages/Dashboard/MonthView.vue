<template>
    <CalendarMonthViewMV3 :start-date="startDate" />
</template>

<script lang="ts" setup>
const day = useDayjs();
const startDate = day().format( 'YYYY-MM-DD' );
const start = '2024-02-01'


</script>