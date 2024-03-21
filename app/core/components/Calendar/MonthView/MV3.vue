<template>
    <div class="flex">

        <button class="btn-primary" @click="reset()">Today</button>
        <button class="btn" @click="shiftMonth( -1 )">Previous</button>
        <button class="btn" @click="shiftMonth( 1 )">Next</button>
        <span class="text-3xl">{{ viewDate.format( 'MMMM YYYY' ) }}</span>

    </div>
    <!-- <div class="grid grid-cols-7">
        <div v-for="p in daystoPrepend"></div>
        <template v-for="d in units">
            <div class="border border-slate-200 flex flex-col h-32">
                <div :class="[ d.isToday() ? 'bg-red-300' : '' ]" class="text-center">{{ d.format( 'D' ) }}
                    <template v-for="(val, key) in parseData">
    <div v-if="dayjs( key ).format( 'D' ) === d">
        {{ val }}
        {{ key }}
        {{ dayjs( key ).format( 'D' ) }}
    </div>

    <!-- </template> -->

    <div class="grid grid-cols-7 gap-1">
        <div v-for="weekDay in weekDays" class="text-center">
            <div>{{ weekDay }}</div>
        </div>
    </div>
    <div class="grid grid-cols-7">
        <div v-for="p in daystoPrepend"></div>
        <div class="border border-slate-200 flex flex-col h-32" v-for="day in units">

            <!-- <div :class="[ day.isToday() ? 'bg-red-300' : '' ]" class="text-center">{{ this.day }}</div> -->
            <div :class="[ day.isToday() ? 'bg-red-300' : '' ]" class="text-center">{{ day.format( 'D' ) }}</div>
            <div day="d.format( 'YYYY-MM-DD' )">

            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
const client = useSupabaseClient();
const { data } = await client.from( 'user_tip' ).select( 'id, inTime, netIncome' );
// console.log( data );

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
import { computed, ref } from 'vue';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend( isToday );

const props = defineProps( {
    modelValue: {
        type: String,
        default: null,
    },
    startDate: {
        type: String,
        default: '2024-03-19'
    },
    display: {
        type: String,
        default: 'month'
    }

} );

// type Props = {
//     modelValue?: any;
//     startDate?: ISODate;
//     display?: 'month' | 'year' | 'week' | 'day';
//     day: string;
// };
// const props = withDefaults( defineProps<Props>(), {
//     modelValue: () => null,
//     display: () => 'month',
//     startDate: () => '2022-12-05'
// } );
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
];
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

const parseData = computed( () => {
    let cleanData = {};

    data.forEach( ( el, idx, arr ) => {
        let date = dayjs( el.inTime ).format( 'YYYY-MM-DD' );
        // let income = el.netIncome
        // let id = el.id

        let filter = arr.filter( ( item ) => {
            let itemDate = dayjs( item.inTime ).format( 'YYYY-MM-DD' );
            return itemDate === date;
        } );

        let sum = filter.reduce( ( acc, item ) => {
            return acc + item.netIncome;
        }, 0 );


        /* use global store */
        // store.calendarPane[ date ] = { netIncome: sum };


        /* Use Local state mgmg */
        // calendar.value[ date ] = { netIncome: sum };

        cleanData[ date ] = { netIncome: sum };
        // cleanData[ idx ] = { date, netIncome: sum };
        // cleanData.push( { date: date, netIncome: sum } ); // Changed to pushing it to an array

    } ); // end of forEach
    return cleanData;
} );

console.log( parseData.value )



</script>