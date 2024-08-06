<template>
    <!-- <CalendarCHeader /> -->

    <ClientOnly>
        
        <div class="m-2 p-4 overflow-x-hidden min-w-full min-h-full">
            <Chart type="line" :data="totalIncome.chart.D" :options="chartOptions" :width="800" :height="400"/>
            </div>
        
    </ClientOnly>
</template>

<script setup>
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* TODO */
    ///////////////////////////////////////////////////////////////////////////////////////////
    // TODO: Conditional Logic to print data based on viewSelect

    import Chart from 'primevue/chart';
    import * as dayJSAdapter from 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

    const { getJobIncome, getIncome, buildChart } = useIncomeData()
    const { totalIncome, jobIncome, jobSelection } = storeToRefs(useIncomeData())

    const { formatViewStart, formatViewEnd, viewSelect } = storeToRefs(useTimelineStore())
    getJobIncome()
    // getIncome()

    const chartOptions = computed(() => {
        const options = {
            responsive: true,
            maintainAspectRatio: false,
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

        const documentStyle = getComputedStyle(document.documentElement)
        const surfaceBorder = documentStyle.getPropertyValue('')

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
