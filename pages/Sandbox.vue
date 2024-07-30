<template>
    <CalendarCHeader />
    <SandboxIncomeData />
    <!-- <ChartLine /> -->


    <Chart type="line" :data="jobIncome.jobChartData" />
    <!-- <SandboxImport /> -->

    <div>
        <button @click="setChartData">Set Chart Data</button>
    </div>

    <!-- <div>
        <button @click="setChartData">Chart.methods.getChart</button>
    </div> -->

{{ _viewStart }}
<br />
{{ _viewEnd }}
</template>

<script setup>
import Chart from 'primevue/chart';

    

    // const { rawJobComp, jobSortData, monthComp, getJobIncome, chartData, filterChart } = useIncomeData()
    const {  getJobIncome, getIncome} = useIncomeData()
    const {totalIncome, jobIncome } = storeToRefs(useIncomeData())
    getJobIncome()
    // getIncome()


    const { _viewStart, _viewEnd } = storeToRefs(useTimelineStore())



    function trueLoad(){
        loading.value = true
    }


    const data = ref({
        datasets: [{
            data: jobIncome.jobMonthIncome
        }]
        
    })

    const chartOptions = ref({
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
    })

    const setChartData = () =>{
    
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
    scales:{
        x:{
            type: 'time',
            time:{
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