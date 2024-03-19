<template>
    <div class="flex">

        <button class="btn-primary" @click="reset()">Today</button>
        <button class="btn" @click="shiftMonth( -1 )">Previous</button>
        <button class="btn" @click="shiftMonth( 1 )">Next</button>
        <span class="text-3xl">{{ viewDate.format( 'MMMM YYYY' ) }}</span>

    </div>
    <div class="grid grid-cols-7 gap-1">
        <div v-for="d in weekDays" class="text-center">
            <div>{{ d }}</div>
        </div>
    </div>
    <div class="grid grid-cols-7">
        <div v-for="p in daystoPrepend"></div>
        <div class="border border-slate-200 flex flex-col h-32" v-for="d in units">
            <div :class="[ d.isToday() ? 'bg-red-300' : '' ]" class="text-center">{{ d.format( 'D' ) }}</div>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { ISODate } from '$/common/types/Notebook';
import { computed, ref } from 'vue';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend( isToday );

type Props = {
    modelValue?: any;
    startDate?: ISODate;
    display?: 'month' | 'year' | 'week' | 'day';
};
const props = withDefaults( defineProps<Props>(), {
    modelValue: () => null,
    display: () => 'month',
    startDate: () => '2022-12-05'
} );
const emits = defineEmits( [ 'update:modelValue' ] );

const viewDate = ref( dayjs( props.startDate ) );

const daystoPrepend = computed( () => {
    const startOfMonth = viewDate.value.startOf( "month" );
    const startOfFirstWeek = startOfMonth.startOf( "week" );
    const daysToFirstDay = startOfMonth.diff( startOfFirstWeek, "day" );
    return Array.from( new Array( daysToFirstDay ).keys() );
} );

const units = computed( () => {
    let ranges = [];
    let startOfRange = viewDate.value.startOf( 'month' ).add( -1, 'day' );
    let endOfRange = viewDate.value.endOf( 'month' ).add( -1, 'day' );

    let currentDate = startOfRange;

    while ( currentDate.isBefore( endOfRange ) || currentDate.isSame( endOfRange ) ) {
        currentDate = currentDate.add( 1, 'day' );
        ranges.push( currentDate );
    }
    return ranges;
} );

const shiftMonth = function ( amount: number ) {
    viewDate.value = viewDate.value.add( amount, 'month' );
};
const reset = function () {
    viewDate.value = dayjs();
};


const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

</script>