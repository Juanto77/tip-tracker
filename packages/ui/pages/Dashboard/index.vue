<template>
    <slot name="calendar-header">
        <CalendarHeader :start-date="day" />
    </slot>
    <slot name="calendar-pane">
        <CalendarPane />
    </slot>

</template>

<script setup>
const dayjs = useDayjs();
const day = dayjs().format('YYYY-MM-DD');
</script>