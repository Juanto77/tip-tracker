<template>
<Line ref="" :data="data" :options="options"/>

</template>

<script setup>
import { Line } from 'vue-chartjs'
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
// import Chart from 'primevue/chart';


const {rawJobComp, jobSortData, monthComp, getJobIncome, chartData, filterChart} = storeToRefs(useIncomeData())
const {_viewStart, _viewEnd} = storeToRefs(useTimelineStore())


const data = ref({
    type:'line',
        datasets:[{
            data: chartData.value.month.datasets
        }]
})

const options = ref({
    responsive: true,
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
})
</script>