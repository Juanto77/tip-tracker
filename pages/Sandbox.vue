<template>
<SandboxIncomeData />

<Chart type="line" :data="chartData"/>
 <!-- <SandboxImport /> -->
</template>

<script setup>
import Chart from 'primevue/chart';
const {rawJobComp, jobSortData, monthComp, getJobIncome, chartData} = useIncomeData()
getJobIncome()

const chartView = {

}


const data = {
        datasets:[{
            data: chartData
        }]
}

const options = {
    parsing:{
        xAxisKey: 'x',
        yAxisKey: 'y'
    }
}


</script>