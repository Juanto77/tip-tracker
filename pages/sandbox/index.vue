<template>
    <CalendarHeader />

    <ClientOnly>
        <!-- <Chart type="line" :data="totalIncome.chart.D" :options="chartOptions"/> -->
    </ClientOnly>
    <!-- <NavDock2/> -->
    <!-- <NavDock /> -->
    <!-- <WeekRangeComp :first="first" :second="second" /> -->
     <MonthRangeComp />
</template>

<script setup>
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* WORKING ON CHART.JS INTEGRATION */
    import Chart from 'primevue/chart';
    import * as dayJSAdapter from 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

    const { getJobIncome, getIncome, buildChart } = useIncomeData()
    const { totalIncome, jobIncome, jobSelection } = storeToRefs(useIncomeData())

    const { formatViewStart, formatViewEnd, viewSelect, compWeekStart, compWeekEnd, viewWeekStart, viewWeekEnd } = storeToRefs(useTimelineStore())
    getJobIncome()
    // getIncome()


    const chartOptions = computed(() => {
        const options = {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        /*
                        displayFormats:{
                            day: 'YYYY-MM-DD'
                        },
                        */
                    },
                    min: formatViewStart.value,
                    max: formatViewEnd.value
                },
            }
        }
        return options
    })

    /* This will do job Comps */
    const chartDisplay = computed(() => {
        let chartData = {
            datasets: []
        }

        jobSelection.value.forEach((i, idx, arr) => {
            const jobName = i.jobName
            const jobID = i.id
            const active = i.active
            const jobTip = i.user_tip
            let data = {}

            jobTip.forEach((it, ix, ar) => {
                const tip = it
                const tipID = tip.id
                const date = tip.date
                const tipIncome = tip.netIncome

                data[date] = tipIncome
                // data.push({date: date, tipIncome})
                // console.log(data)
            })
            chartData.datasets.push({ label: jobName, jobID, data: data })
        })
        return chartData
    })


</script>
