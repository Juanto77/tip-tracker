<template>
    <div class="min-w-full mt-5">
        <!-- Calendar Navigation -->
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
        <!-- Put your slots here -->
        <div class="bg-black"></div>
        <!-- Calendar Display -->
        <div class="mt-96">
            <div class=" grid grid-cols-7 gap-1">
                <div v-for="d in weekDays" class="text-center text-1XL mb-6">
                    <div>{{ d }}</div>
                </div>
            </div>
            <div class="grid grid-cols-7">
                <div v-for="p in daysToPrepend"></div>
                <div class="border border-slate-200 flex flex-col h-32" v-for="(value, key) in calendar">
                    <div <div class="text-center">{{ dayjs( key ).format( 'D' ) }}</div>
                    <div>
                        <div class="text-center align-middle" v-if="value.netIncome > 0">${{ value.netIncome }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
/* Imports */
import type { Database } from '~sTypes/database';

/* Page Config */
const client = useSupabaseClient<Database>();
const dayjs = useDayjs();


/* Components config */
const props = withDefaults( defineProps<Props>(), {
    modelValue: () => null,
    startDate: () => '2024-03-07',
} );

const emits = defineEmits( [ 'update:modelValue' ] );

const viewDate = ref( dayjs( props.startDate ) );

/* // Components Config */

/* Types */
type Props = {
    modelValue?: any;
    startDate?: string;
};

type DateArray = {
    [ index: string ]: {
        netIncome?: number,
    };
};

type CalendarData = {
    [ index: string ]: {
        id?: number | 0,
        inTime?: string | '';
        netIncome?: number | 0;
    };
};

type dataModel = {
    id: number | 0,
    inTime: string | '',
    netIncome: number | 0,
};
/* // Types */

/* Global Variables */

const rangeStart = ref( viewDate.value.startOf( 'month' ).add( -1, 'day' ) );
const rangeEnd = ref( viewDate.value.endOf( 'month' ).add( -1, 'day' ) );

const rStart = ref( rangeStart.value );
const rEnd = ref( rangeEnd.value );

const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ];

/* // Global Variables */


/* Data Store */
let calendar = ref( {} ) as CalendarData; //FIXME: Fix Type
let incoming = ref( [] );
/* // Data Store */

/* Build Calendar */
async function buildCalendar() {
    let units = {};
    let currentDate = rangeStart.value;

    while ( currentDate.isBefore( rangeEnd.value ) || currentDate.isSame( rangeEnd.value ) ) {
        currentDate = currentDate.add( 1, 'day' );
        let date = dayjs( currentDate ).format( 'YYYY-MM-DD' );

        calendar.value[ date ] = { netIncome: 0 };
        // units[ date ] = { netIncome: 0 };

    }

    const { data } = await client.from( 'user_tip' ).select( 'id, inTime, netIncome' ).gte( 'inTime', rStart.value ).lte( 'inTime', rEnd.value ).then( ( { data } ) => {
        let arr = data;
        arr.forEach( ( el: any, idx: any, arr: any ) => {

            let date = dayjs( el.inTime ).format( 'YYYY-MM-DD' );

            let filter = arr.filter( ( item ) => {
                let itemDate = dayjs( item.inTime ).format( 'YYYY-MM-DD' );
                return itemDate === date;
            } );

            let sum = filter.reduce( ( acc, item ) => {
                return acc + item.netIncome;
            }, 0 );

            // units[ date ] = { netIncome: sum };
            calendar.value[ date ] = { netIncome: sum }; //FIXME: Fix Type
        } ); // end of forEach

    } );
    // groupIncome( data );
    return;
};
// );
/* // Build Calendar */



const shiftMonth = function ( amount: number ) {
    calendar.value = {};
    viewDate.value = viewDate.value.add( amount, 'month' );
    rStart.value = viewDate.value.startOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
    rEnd.value = viewDate.value.endOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
    rangeStart.value = viewDate.value.startOf( 'month' ).add( -1, 'day' );
    rangeEnd.value = viewDate.value.endOf( 'month' ).add( -1, 'day' );
    buildCalendar();

};


// FIXME: add fetch sequence
const reset = function () {
    viewDate.value = dayjs();
};

const daysToPrepend = computed( () => {
    const monthStart = viewDate.value.startOf( 'month' );
    const firstWeekStart = monthStart.startOf( 'week' );
    const firstDayStart = monthStart.diff( firstWeekStart, 'day' );
    return Array.from( new Array( firstDayStart ).keys() );
} );

buildCalendar();

</script>
