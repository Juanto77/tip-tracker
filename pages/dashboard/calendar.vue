<template>
    <CalendarHeader />
        <div class="m-10">
       <CalendarPane />
        </div>

<div>
    <button @click="setChartData()">Chart Refresh</button>
</div>

</template>

<script setup>
    // import { useDashboardStore } from '~/stores/DashboardStore';
    import { useTimelineStore } from '~/stores/TimelineStore';
    import Chart from 'primevue/chart';

    /* Dayjs */
    const dayjs = useDayjs();
    // const day = dayjs().format('YYYY-MM-DD');

    /* Stores */
    // const timeline = useTimelineStore()
    const income = useIncomeData()
    const {formatViewStart, formatViewEnd, _currentMonth, viewDate } = storeToRefs(useTimelineStore())
    const { dailyIncome, monthlyIncome, getIncome, totalIncome } = storeToRefs(useIncomeData())

    // const {viewDate} = useCalendar()
    income.getIncome()

    // onMounted({
    //    const day = dayjs() 
    // })

        onMounted(() => {
     viewDate.value = dayjs()
    })


</script>
