<script setup>
/* **
TODO -  Hand off data to calendar
*/
const fata = [
    { "date": "2024-02-03", "amount": 68.00 },
    { "date": "2024-02-04", "amount": 154.00 },
    { "date": "2024-02-05", "amount": 121.00 },
    { "date": "2024-02-09", "amount": 7.00 },
    { "date": "2024-02-10", "amount": 7.00 },
    { "date": "2024-02-11", "amount": 229.00 },
    { "date": "2024-02-12", "amount": 141.00 },
    { "date": "2024-02-16", "amount": 1.00 },
    { "date": "2024-02-17", "amount": 64.00 },
    { "date": "2024-02-18", "amount": 193.0 }
]
</script>

<template>
    <Calendar inline showWeek v-model="date" :panelProps="fata">
        <template #date="slotProps">
            <strong v-if="slotProps.date.day > 1 && slotProps.date.day < 10" style="text-decoration: line-through;">{{
                slotProps.date.day }}</strong>
            <template v-else> {{ slotProps.date.day }}</template>
        </template>

    </Calendar>
</template>

<style>
@import url('primevue/resources/themes/md-light-indigo/theme.css')
</style>