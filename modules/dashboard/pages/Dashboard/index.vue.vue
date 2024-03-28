<template>
    <slot name="calendar-header">
        <!-- <CalendarHeader :start-date="day" /> -->
        <CalendarCHeader />
    </slot>


    <!-- <template>
        <LibPageContainer>
            <ChartBarChart :datasets="data" :options="chartOptions" :color="'#000000'" />
        </LibPageContainer>
    </template> -->

    <template v-if="timeline.selectFormat === 'Week'">
        <CalendarWeekView />
        week view
    </template>

    <template v-if="timeline.selectFormat === 'Month'">
        <CalendarMonthView />
    </template>
    <template v-if="timeline.selectFormat === 'Year'">
        <div>This is your yearly view </div>
    </template>
</template>

<script setup>
import { useDashboardStore } from '~/stores/DashboardStore';
import { useTimelineStore } from '~/stores/TimelineStore';
/* Dayjs */
const dayjs = useDayjs();
const day = dayjs().format('YYYY-MM-DD');
/* Stores */
const timeline = useTimelineStore()
const dashboard = useDashboardStore()

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
