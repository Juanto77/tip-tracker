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
    const dayjs = useDayjs();
    // const day = dayjs().format('YYYY-MM-DD');

    const income = useIncomeData()
    const {formatViewStart, formatViewEnd, _currentMonth, viewDate } = storeToRefs(useTimelineStore())
    const { dailyIncome, monthlyIncome, getIncome, totalIncome } = storeToRefs(useIncomeData())

    // const {viewDate} = useCalendar()
    // income.getIncome()


        onMounted(() => {
     viewDate.value = dayjs()
    })


</script>
