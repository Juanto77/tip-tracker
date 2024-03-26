<template>
    <div class="min-w-full">
        <div class="flex flex-row">
            <div class="flex-none mx-8">
                <font-awesome-icon icon="fa-solid fa-chevron-left"></font-awesome-icon>
            </div>
            <!-- <div class="grow text-center">
                <h1 class="monthName">{{ month }}</h1>
            </div> -->
            <div class="flex-none mx-8">
                <font-awesome-icon icon="fa-solid fa-chevron-right"></font-awesome-icon>
            </div>
        </div>
        <div id="dayContainer">
            <!-- <div id="dayName" v-for="weekday in weekdays" :key="weekday">
                {{ weekday }}
            </div> -->
        </div>
        <div>
            <!-- <div id="dayParent" v-for="(week, index1) in calendar" :key="`week-${index1}`">
                <div id="dayChild" v-for="(day, index2) in week" :key="`week-${index1}-day-${index2}`"
                    :value="`${day.value.day}`">
                    {{ day.value.day ? day.value.day : '' }}
                    <div>
                    </div>
                </div>
            </div> -->
        </div>
        <!-- /inline classes -->

        <!-- SHITTYFUCKHERE -->
        <!--     <div id="dayContainer" class="flex flex-row m-w-full mt-40">
            <div id="dayName" class="dayName grow" v-for="weekday in weekdays" :key="weekday">
                {{ weekday }}
            </div>
        </div>
        <div class="">
            <div id="dayParent" v-for="(week, index1) in calendar" :key="`week-${index1}`"
                class="flex flex-row m-w-full">
                <div id="dayChild" v-for="(day, index2) in week" :key="`week-${index1}-day-${index2}`"
                    class="grow border border-Space-Cadet pb-28"
                    :class="{ calendar__day: true, 'calendar__day--holiday': index2 === 0, }">
                    {{ day ? day : '' }}
                </div>
            </div>
        </div> -->
        <!-- /SHITTYFUCKHERE -->
    </div>

</template>

<script setup lang="ts">
import type { Database } from '~Server/types/database'
// import { useCreateCalendar } from '~sComposables/createCalendar';


// const dayjs = useDayjs();
// const client = useSupabaseClient();


// const { currentDate, weekdays, month, buildCal } = useBuildCal();
// const { fetchIncome, monthArr, monthObj } = useCreateCalendar();

/* useBuildCal */
// const calendar = buildCal();
// buildCal()
// console.log(buildCal())

/* useCreateCalendar */
// fetchIncome();
// console.log(monthArr)



/* Internal Data Test */
// import data from './assets/dist-sample-data.json' // for testing

/* External Data Source */
// const { data } = await client
//     .from('user_tip')
//     .select(`
//     id,
//     inTime,
//     netIncome
//     `)

// console.log(data)
///////////////////////////////////////////////////////////////////////////////////////////



</script>

<style scoped>
#dayContainer {
    display: flex;
    flex-direction: row;
    min-width: full;
    margin-top: 10rem;
}

#dayName {
    flex-grow: 1;
    text-align: center;
}

#dayParent {
    display: flex;
    flex-direction: row;
    min-width: full;
}

#dayChild {
    flex-grow: 1;
    /* border: 1px solid rgb(34 46 80); */
    border-width: 1px;
    border-color: rgb(34 46 80);
    padding-bottom: 7rem;
    width: 2rem;
    height: 2rem;
}

/* prefab style */
/*
:root {
    --ff-inter: 'Inter', sans-serif;
    --c-red-500: #ef4444;
    --c-slate-200: #e2e8f0;
    --c-slate-300: #cbd5e1;
    --c-slate-400: #94a3b8;
    --c-slate-800: #1e293b;
}

html {
    font-family: var(--ff-inter);
    font-size: 16px;
}

body {
    margin: 0;
    padding: 1rem;
    box-sizing: border-box;
}

.calendar-wrapper {
    display: inline-block;
    min-width: max-content;
    padding: 1rem;
    box-sizing: border-box;
    box-shadow: 0 0.25rem 1.25rem 0 rgba(15, 23, 42, 0.2);
    border: 1px solid var(--c-slate-200);
    border-radius: 4px;
}

.calendar {
    text-align: center;
    box-sizing: border-box;
    color: var(--c-slate-800);
    border-collapse: collapse;
}

.calendar__navigation {
    text-align: right;
}

.calendar__button {
    cursor: pointer;
    font-size: 1.25rem;
    margin: 0 0.15rem;
    padding: 0;
    border: 0;
    background-color: transparent;
}

.calendar__month {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
}

.calendar__weekday {
    text-transform: uppercase;
    font-size: 0.75rem;
    color: var(--c-slate-400);
    padding: 0.5rem 0 0.25rem;
}

.calendar__day {
    width: 2rem;
    height: 2rem;
    color: var(--c-slate-600);
}

.calendar__day--holiday {
    color: var(--c-red-500);
}
*/
</style>~/composables/createCalendar