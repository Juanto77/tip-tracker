<template>
    <slot name="calendar-header">
        <CalendarHeader :start-date="day" />
    </slot>

    <slot name="charts">
        <LibPageContainer>
            <!-- <Bar :data="chartData" /> -->
            <!-- <Bar :data="chartData" :options="chartOptions" /> -->
            <ChartBarChart :datasets="data" :options="chartOptions" :color="'#000000'" />
        </LibPageContainer>
    </slot>
    <slot name="calendar-pane">
        <CalendarPane />
    </slot>

</template>

<script setup>
import { useDashboardStore } from '~Dashboard/stores/Dashboard';
// import { useTimelineStore } from '~Dashboard/stores/Timeline';


const dayjs = useDayjs();
const day = dayjs().format('YYYY-MM-DD');


/* FETCH DATA */
const client = useSupabaseClient();
const { data } = await client.from('user_tip').select('id, jobID, inTime, netIncome');

/* PROPS */
/*
const chartData = ref({
    // labels: store.dateArr,
    type: 'bar',
    datasets: [
        {
            // backgroundColor: '#f87979',
            // label: toRaw(store.dateArr),
            data: data
        },
    ],
});
*/

const chartOptions = ref({
    responsive: true,
    parsing: {
        xAxisKey: 'inTime',
        yAxisKey: 'netIncome',
    }
});
</script>
