<template>
    <div class="min-w-full">
        <div class="flex flex-row">
            <div class="flex-none mx-8">
                <font-awesome-icon icon="fa-solid fa-chevron-left"></font-awesome-icon>
            </div>
            <div class="grow text-center">
                <h1>{{ month }}</h1>
            </div>
            <div class="flex-none mx-8">
                <font-awesome-icon icon="fa-solid fa-chevron-right"></font-awesome-icon>
            </div>
        </div>
    </div>
</template>

<script setup>
const dayjs = useDayjs();
const monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const month = monthArray[dayjs().month()];
</script>