<template>
    <slot name="calendar-header">
        <CalendarHeader :start-date="day" />
    </slot>

    <slot name="charts">
        <LibPageContainer>
            <!-- <Bar :data="chartData" /> -->
            <!-- <Bar :data="chartData" :options="chartOptions" /> -->
            <ChartsBarChart :data="chartData" :options="chartOptions" />
        </LibPageContainer>
    </slot>
    <slot name="calendar-pane">
        <CalendarPane />
    </slot>

</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { useDashboardStore } from '~/stores/Dashboard';

const dayjs = useDayjs();
const day = dayjs().format('YYYY-MM-DD');

const store = useDashboardStore();
// const dataFetch = store.incomeData;

///////////////////////////////////////////////////////////////////////////////////////////
/* Working Area */

/*
/* Trying to Fetch Locally */
const client = useSupabaseClient();
const { data } = await client.from('user_tip').select('id, jobID, inTime, netIncome');

let dateArr = [];
let incomeArr = [];

const idArr = data?.map((x) => x.id);
const jobID = data?.map((x) => x.jobID);
const date = data?.map((x) => dayjs(x.inTime).format('YYYY-MM-DD'));
const netIncomeArr = data?.map((x) => x.netIncome);

dateArr = date;
incomeArr = netIncomeArr;


///////////////////////////////////////////////////////////////////////////////////////////
/* Lets try these */

const chartData = ref({
    // labels: store.dateArr,
    type: 'bar',
    datasets: [
        {
            backgroundColor: '#f87979',
            // label: toRaw(store.dateArr),
            data: data
        },
    ],
});

const chartOptions = ref({
    responsive: true,
    parsing: {
        xAxisKey: 'inTime',
        yAxisKey: 'netIncome',
    }
});

///////////////////////////////////////////////////////////////////////////////////////////


/* Fallback Data */
/*
const chartData = ref({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 50, 10],
        },
    ],
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: true,
});
*/

// console.log('toRaw', toRaw(store.dateArr));
// console.log('chartData', chartData)


</script>
