<script setup lang="ts">

    const { totalIncome } = storeToRefs(useIncomeData())
    const { viewYearStart, viewYearEnd, compYearStart, compYearEnd } = storeToRefs(useTimelineStore())

    const dayjs = useDayjs()

    const comp = computed(() => {
        let firstComp = {}
        let secondComp = {}

        let firstDate = viewYearStart.value
        let secondDate = compYearStart.value


        while (firstDate.isBefore(viewYearEnd.value) || firstDate.isSame(viewYearEnd.value)) {
            let date = dayjs(firstDate).format('YYYY-MM');
            let month = dayjs(firstDate).format('MMMM');
            firstComp[month] = totalIncome.value.monthIncomeData[date]
            firstDate = firstDate.add(1, 'day');
        }
        while (secondDate.isBefore(compYearEnd.value) || secondDate.isSame(compYearEnd.value)) {
            let date = dayjs(secondDate).format('YYYY-MM');
            let month = dayjs(secondDate).format('MMMM');
            secondComp[month] = totalIncome.value.monthIncomeData[date]
            secondDate = secondDate.add(1, 'day');
        }

        // datasets.value.push(firstComp, secondComp)
        // console.log(datasets)

        return { firstComp, secondComp }
    })
    const chartData = computed(() => {
        // let labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        let datasets = [

            {
                label: 'This Year',
                data: comp.value.firstComp,
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                // borderColor: 'rgb(255, 99, 132)'

            },
            {
                label: 'Last Year',
                data: comp.value.secondComp,
                // borderColor: 'rgb(54, 162, 235)',
                // backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        return { datasets }
    })
        const chartOptions = computed(() => {
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            // scales:{
            //     x: {
            //         type: 'time',
            //         time:{
            //             unit: 'month'
            //         }
            //     }
            // }
        }
        return options
    })
</script>

<template>
    <Chart type="bar" :data="chartData" :options="chartOptions" :width="200" :height="400" />
</template>
