<template>
    <div class="min-w-full">
        <!-- Month Display -->
        <div class="flex flex-row">
            <div class="flex-none mx-8">
                <font-awesome-icon icon="fa-solid fa-chevron-left" @click="shiftMonth(-1)"></font-awesome-icon>
            </div>
            <div class="grow text-center">
                <h1 class="monthName">{{ viewDate.format('MMMM YYYY') }}</h1>
            </div>
            <div class="flex-none mx-8">
                <font-awesome-icon icon="fa-solid fa-chevron-right" @click="shiftMonth(1)"></font-awesome-icon>
            </div>
        </div>
        <!-- Days of Week -->
        <div class=" grid grid-cols-7 gap-1">
            <div v-for="d in weekDays" class="text-center">
                <div>{{ d }}</div>
            </div>
        </div>
        <!-- Calendar Pane -->
        <div class="grid grid-cols-7">
            <div v-for="p in daysToPrepend"></div>
            <div class="border border-slate-200 flex flex-col h-32" v-for="(value, key) in calendar">
                <!-- <div class="border border-slate-200 flex flex-col h-32" v-for="(value, key) in store.calendarPane"> -->
                <!-- Display Day # -->
                <div <div class="text-center">{{ dayjs(key).format('D') }}</div>

                <!-- Display Day Data -->
                <div class="text-center">{{ value.netIncome }} </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* Imports */

import type { Database } from '~sTypes/database';
import { useCalendarStore } from '~sStores/view/Calendar';


/* Page Config */
const client = useSupabaseClient<Database>()
const dayjs = useDayjs();

/* Stores */
const store = useCalendarStore();


/* Components config */
const props = withDefaults(defineProps<Props>(), {
    modelValue: () => null,
    startDate: () => '2024-03-07',
})

const emits = defineEmits(['update:modelValue']);

const viewDate = ref(dayjs(props.startDate))

/* Types */
type Props = {
    modelValue?: any;
    startDate?: string;
}

type DateArray = {
    [index: string]: {
        netIncome?: number,
    }
}

type CalendarData = {
    [index: string]: {
        id?: number | 0,
        inTime?: string | '';
        netIncome?: number | 0;
    }
}

type dataModel = {
    id: number | 0,
    inTime: string | '',
    netIncome: number | 0,
}
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/* Data Handling */
// TODO: Only fetch data from month on display.
// Offload to store
// const { data } = await client.from('user_tip').select(`id, inTime, netIncome`);
// const { data } = await client.from('tips').select(`id, date, credit`);
// console.log(data)


/* Stores */
// let incomeData = () => useState<CalendarData>('income', () => ([]) as Object as CalendarData)
// let incomeObj = () => useState('income', {} as Object as CalendarData)
// const incomeObj = useState<CalendarData>('Income', () => ({}) as Object as CalendarData)
let incomeObj = ref([]) as Object as CalendarData;
// const calendar = useState<DateArray>('Calendar', () => ({} as DateArray))

const calendar = useState<CalendarData>('calendar', () => ({}) as Object as CalendarData)

// let incomeObj = ref({})
// let calendar = ref({}) as Object as CalendarData;

/* Fetch using supabase */
const rangeStart = ref(viewDate.value.startOf('month').add(-1, 'day'))
const rangeEnd = ref(viewDate.value.endOf('month').add(-1, 'day'))

let incoming = ref([])

// FIXME: Browser: Uncaught (in promise) TypeError: undefined has no properties
// async function fetch() {
// const request = await client.from('user_tip').select(`id, inTime, netIncome`).gte('inTime', rangeStart.value).lte('inTime', rangeEnd.value).then((request) => {
//     console.log(request)
//         const data = incomeData.data;
//         data?.forEach((el, idx, arr) => {
//             let date = dayjs(el.inTime).format('YYYY-MM-DD');
//             // let income = el.netIncome
//             // let id = el.id

//             let filter = arr.filter((item) => {
//                 let itemDate = dayjs(item.inTime).format('YYYY-MM-DD');
//                 return itemDate === date
//             });

//             let sum = filter.reduce((acc, item) => {
//                 return acc + item.netIncome;
//             }, 0);

//             store.calendarPane[date] = { netIncome: sum }
//             calendar.value[date] = { netIncome: sum };
//         }) // end of filter

// });
// // return incomeData;
// };

async function fetch() {
    const { data } = await client.from('user_tip').select(`id, inTime, netIncome`).gte('inTime', rangeStart.value).lte('inTime', rangeEnd.value)

    incoming.value = data
    parseData(data)
    console.log(incoming.value)
}





/* Calendar */
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',]


///////////////////////////////////////////////////////////////////////////////////////////

const parseData = (arr) => {
    arr.forEach((el, idx, arr) => {
        // console.log(incoming.value)
        let date = dayjs(el.inTime).format('YYYY-MM-DD');
        // let income = el.netIncome
        // let id = el.id

        let filter = arr.filter((item) => {
            let itemDate = dayjs(item.inTime).format('YYYY-MM-DD');
            return itemDate === date
        });

        let sum = filter.reduce((acc, item) => {
            return acc + item.netIncome;
        }, 0);

        // store.calendarPane[date] = { netIncome: sum }
        calendar.value[date] = { netIncome: sum };
    }) // end of filter
}

/* Create Calendar in an Object */
const calendarPane = () => {
    // const calendarPane = computed(() => {
    let group: DateArray = {}

    /* Keep these for ref */
    // let rangeStart = viewDate.value.startOf('month').add(-1, 'day');
    // let rangeEnd = viewDate.value.endOf('month').add(-1, 'day');


    let currentDate = rangeStart.value;

    while (currentDate.isBefore(rangeEnd.value) || currentDate.isSame(rangeEnd.value)) {

        currentDate = currentDate.add(1, 'day');
        let date = dayjs(currentDate).format('YYYY-MM-DD');

        /* use local group */
        // group[date] = { netIncome: undefined }

        /* useref */
        calendar.value[date] = { netIncome: undefined }

        /* useCalendarStore */
        // store.calendarPane[date] = { netIncome: null }

    }
    fetch()

    // });
    return
    ///////////////////////////////////////////////////////////////////////////////////////////
}
// )
calendarPane()

// calendarPane()

/* Fetch when page is mounted */
// onMounted(() => {
//     fetch()
// })

/* 
watch(() => props.modelValue, (value) => {
    console.log(value)
}) */


///////////////////////////////////////////////////////////////////////////////////////////


const shiftMonth = function (amount: number) {

    clearNuxtState((calendar) => { })
    viewDate.value = viewDate.value.add(amount, 'month')
    rangeStart.value = viewDate.value.startOf('month').add(-1, 'day')
    rangeEnd.value = viewDate.value.endOf('month').add(-1, 'day')
    fetch()
    // console.log('shiftMonth', viewDate.value)
    // console.log('shiftStart', rangeStart)
    // console.log('shiftEnd', rangeEnd)
}

const reset = function () {
    // filterData(amount);
    viewDate.value = dayjs()
}

const daysToPrepend = computed(() => {
    const monthStart = viewDate.value.startOf('month');
    const firstWeekStart = monthStart.startOf('week');
    const firstDayStart = monthStart.diff(firstWeekStart, 'day');
    return Array.from(new Array(firstDayStart).keys())
})

/* LOGGING */

/* Date Values */
// console.log('viewDate', viewDate.value)
// console.log('rangeStart', rangeStart)
// console.log('rangeEnd', rangeEnd)

</script>
