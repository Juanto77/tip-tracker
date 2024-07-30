<template>
    <CalendarCHeader />
    <SandboxIncomeData />

    <Chart type="line" :data="chartDisplay" :options="computedOptions" />
    <!-- <SandboxImport /> -->

    <div>
        <button @click="setChartData">Set Chart Data</button>
    </div>
    <div>
        <button @click="buildChart">build chart</button>
    </div>

    <!-- <div>
        <button @click="setChartData">Chart.methods.getChart</button>
    </div> -->

    {{ _viewStart }}
    <br />
    {{ _viewEnd }}
</template>

<script setup>
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* WORKING ON CHART.JS INTEGRATION */
    import Chart from 'primevue/chart';
    import * as dayJSAdapter from 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

    const { getJobIncome, getIncome, buildChart } = useIncomeData()
    const { totalIncome, jobIncome, jobSelection } = storeToRefs(useIncomeData())

    const { _viewStart, _viewEnd } = storeToRefs(useTimelineStore())
    getJobIncome()
    // getIncome()


    // function buildChart(){
    //     let data = []
    //     jobSelection.value.forEach((i, idx, arr)=>{
    //         const jobName = i.jobName
    //         const jobID = i.id
    //         const active = i.active
    //         const jobTip = i.user_tip

    //         jobTip.forEach((it, ix, ar)=>{
    //             const tip = it
    //             const tipID = tip.id
    //             const date = tip.date
    //             const tipIncome = tip.netIncome

    //             data[date] = tipIncome
    //         })
    //         chartD.value['datasets'].push({label: jobName, jobID, data})
    //     })
    // }
    // buildChart()

    const computedOptions = computed(() => {
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
                    min: _viewStart.value,
                    max: _viewEnd.value
                },
            }
        }
        return options
    })

    const chartDisplay = computed(() => {
        let chartData = {
            datasets: []
        }

        jobSelection.value.forEach((i, idx, arr) => {
            const jobName = i.jobName
            const jobID = i.id
            const active = i.active
            const jobTip = i.user_tip

            // console.log(jobName)
            // let data = []
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


    // const chartOptions = ref({
    //     responsive: true,
    //     scales: {
    //         x: {
    //             type: 'time',
    //             time: {
    //                 unit: 'day',
    //                 /*
    //                 displayFormats:{
    //                     day: 'YYYY-MM-DD'
    //                 },
    //                 */
    //             },
    //             min: _viewStart.value,
    //             max: _viewEnd.value

    //         },
    //     }
    // })

    const setChartData = () => {
        // chartData.value = {
        //     datasets: [
        //         {
        //             label: 'Income',
        //             backgroundColor: '#222E50',
        //             // fill: true, // for line graphs
        //             data: dailyIncome.value,
        //             tension: 0.4 // For Line Graphs
        //         },
        //     ],
        // }

        chartOptions.value = {
            responsive: true,
            // parsing: {
            //         xAxisKey: 'id',
            //         yAxisKey: 'value',
            //     },
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
                    min: _viewStart.value,
                    max: _viewEnd.value

                },
            }
        }
    }


</script>