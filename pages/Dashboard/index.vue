<template>
    <CalendarCHeader />
    <div class="m-10">
        <CalendarMonthView />

<!--         <template v-if="timeline.viewSelect.name === 'Day'">
            <CalendarDayView/>
        </template>
    <template v-if="timeline.viewSelect.name === 'Week'">
        <CalendarWeekView />
        week view
    </template>

    <template v-if="timeline.viewSelect.name === 'Month'">
        <CalendarMonthView />
    </template>
    <template v-if="timeline.viewSelect.name === 'Year'">
        <div>This is your yearly view </div>
        
    </template> -->
</div>
    
</template>

<script setup>
import { useDashboardStore } from '~/stores/DashboardStore';
import { useTimelineStore } from '~/stores/TimelineStore';
/* Dayjs */
const dayjs = useDayjs();
const day = dayjs().format('YYYY-MM-DD');

/* Stores */
const timeline = useTimelineStore()
// const dashboard = useDashboardStore()

/* FETCH DATA */
// const client = useSupabaseClient();
// const { data } = await client.from('user_tip').select('id, jobID, inTime, netIncome');

/* Testing */
const income = useIncomeData()
income.getIncome()

// income.dayFilter(useTimelineStore()._currentMonth)

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
