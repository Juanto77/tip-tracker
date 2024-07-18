<template>
    <CalendarCHeader />

    <div class="grid grid-cols-2 gap-1">
        <div class="m-10">
            <Chart type="line" :data="chartData" :options="chartOptions" />
        </div>
        <div class="m-10">
            <CalendarMonthView />
        </div>
    </div>

</template>

<script setup>
    // import { useDashboardStore } from '~/stores/DashboardStore';
    import { useTimelineStore } from '~/stores/TimelineStore';
    import { Bar } from 'vue-chartjs';
    /* Dayjs */
    const dayjs = useDayjs();
    const day = dayjs().format('YYYY-MM-DD');

    /* Stores */
    const timeline = useTimelineStore()
    const income = useIncomeData()
    const { dailyIncome, monthlyIncome, getIncome } = storeToRefs(useIncomeData())
    income.getIncome()

    /* Chart Data */
    const chartData = ref({
        // labels: income.dailyIncome,
        // type: 'bar',
        datasets: [
            {
                label: 'Income',
                backgroundColor: '#222E50',
                // fill: true, // for line graphs
                data: monthlyIncome.value,
                tension: 0.4 // For Line Graphs
            },
        ],
    });

    const chartOptions = ref({
        responsive: true,
        /*
        parsing: {
            xAxisKey: 'id',
            yAxisKey: 'value',
        }
            */
    });

    /* PROPS */
</script>
