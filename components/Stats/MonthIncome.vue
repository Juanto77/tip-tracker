<template>
   <Chart type="bar" :data="chartData" :options="chartOptions"/>
</template>

<script setup>
const income = useIncomeData()
const { dailyIncome, monthlyIncome, getIncome } = storeToRefs(useIncomeData())
import { Bar } from 'vue-chartjs';

income.getIncome()

// console.log(toRaw(dailyIncome)._value)

const chartData = ref({
    // labels: income.dailyIncome,
    type: 'bar',
    datasets: [
        {
            backgroundColor: '#f87979',
            // label: toRaw(income.dailyIncome),
            data: monthlyIncome.value
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

</script>