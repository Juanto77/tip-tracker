<template>
    <CalendarCHeader />
    <div>
        <h1 class="text-center">Income for {{ $dayjs(_currentMonth).format('MMMM') }} : {{ totalIncome.monthIncomeData[_currentMonth] }}</h1>
        <UProgress :value="totalIncome.monthIncomeData[_currentMonth]" :max="10000"/>
    </div>
        <div class="m-10">
            <CalendarMonthView />
        </div>
    

<div>
    <button @click="setChartData()">Chart Refresh</button>
</div>

</template>

<script setup>
    // import { useDashboardStore } from '~/stores/DashboardStore';
    import { useTimelineStore } from '~/stores/TimelineStore';
    import * as dayJSAdapter from 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
    // import { Bar } from 'vue-chartjs';
    import Chart from 'primevue/chart';
    /* Dayjs */
    // const dayjs = useDayjs();
    // const day = dayjs().format('YYYY-MM-DD');

    /* Stores */
    // const timeline = useTimelineStore()
    const income = useIncomeData()
    const {_viewStart, _viewEnd, _currentMonth } = storeToRefs(useTimelineStore())
    const { dailyIncome, monthlyIncome, getIncome, totalIncome } = storeToRefs(useIncomeData())
    income.getIncome()

    /* Chart Data */
    
    // const chartData = ref({
    //     // labels: income.dailyIncome,
    //     // type: 'bar',
    //     datasets: [
    //         {
    //             label: 'Income',
    //             backgroundColor: '#222E50',
    //             // fill: true, // for line graphs
    //             data: dailyIncome.value,
    //             tension: 0.4 // For Line Graphs
    //         },
    //     ],
    // });

//     const chartOptions = ref({
//         responsive: true,
//     parsing: {
//             xAxisKey: 'id',
//             yAxisKey: 'value',
//         },
//     scales:{
//         x:{
//             type: 'time',
//             time:{
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

// const setChartData = () =>{
    
//     // chartData.value = {
//     //     datasets: [
//     //         {
//     //             label: 'Income',
//     //             backgroundColor: '#222E50',
//     //             // fill: true, // for line graphs
//     //             data: dailyIncome.value,
//     //             tension: 0.4 // For Line Graphs
//     //         },
//     //     ],
//     // }

//     chartOptions.value = {
//         responsive: true,
//     // parsing: {
//     //         xAxisKey: 'id',
//     //         yAxisKey: 'value',
//     //     },
//     scales:{
//         x:{
//             type: 'time',
//             time:{
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
//     }
// // console.log('view Start', _viewStart)
// // console.log('view End', _viewEnd)  
// // console.log(chartOptions)
// console.log(chartData.value)
// console.log(chartOptions.value)
// }


</script>
