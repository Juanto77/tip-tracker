<script setup lang="ts">
    import Chart from 'primevue/chart';
    import * as dayJSAdapter from 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

    const { totalIncome } = storeToRefs(useIncomeData())
    const { compWeekStart, compWeekEnd, viewWeekStart, viewWeekEnd } = storeToRefs(useTimelineStore())

    /* Trying it with Props */
    // Probably not worth the extra resources

    // const props = defineProps({
    //     first:{
    //         type: Object,
    //         required: true,
    //     },
    //     second:{
    //         type: Object,
    //         required: true
    //     }
    // })

    const dayjs = useDayjs()

    let datasets = ref([])

    /* Version 1 */
    const comp = computed(() => {
        // datasets.value = [] // Resetting datasets if not using computed chartData prop

        /* Chart.js Template */
        
        // let firstComp = {
        //     label: 'This Year',
        //     borderColor: "rgba(54, 162, 235, 0.5)",
        //     backgroundColor: "rgba(54, 162, 235, 0.5)",
        //     data: {}
        // }
        // let secondComp = {
        //     label: 'Last Year',
        //      borderColor: "rgba(54, 162, 235, 0.5)",
        //     backgroundColor: "rgba(54, 162, 235, 0.5)",
        //     data:{},
        // }

        let firstComp = {}
        let secondComp = {}

        let firstDate = viewWeekStart.value
        let secondDate = compWeekStart.value

        while (firstDate.isBefore(viewWeekEnd.value) || firstDate.isSame(viewWeekEnd.value)) {
            let date = dayjs(firstDate).format('YYYY-MM-DD');
            let day = dayjs(firstDate).format('dd');
            // firstComp.data[day] = totalIncome.value.daySum[date]

            firstComp[day] = totalIncome.value.daySum[date]
            firstDate = firstDate.add(1, 'day');
        }
        while (secondDate.isBefore(compWeekEnd.value) || secondDate.isSame(compWeekEnd.value)) {
            let date = dayjs(secondDate).format('YYYY-MM-DD');
            let day = dayjs(secondDate).format('dd');
            // secondComp.data[day] = totalIncome.value.daySum[date]

            secondComp[day] = totalIncome.value.daySum[date]
            secondDate = secondDate.add(1, 'day');
        }

        // datasets.value.push(firstComp, secondComp)
        // console.log(datasets)

        return { firstComp, secondComp }
    })
///////////////////////////////////////////////////////////////////////////////////////////
    /* Version 2: Using Props */
    //     const comp = computed(() => {
    //     // datasets.value = [] // Resetting datasets if not using computed chartData prop

    //     /* Chart.js Template */
        
    //     // let firstComp = {
    //     //     label: 'This Year',
    //     //     borderColor: "rgba(54, 162, 235, 0.5)",
    //     //     backgroundColor: "rgba(54, 162, 235, 0.5)",
    //     //     data: {}
    //     // }
    //     // let secondComp = {
    //     //     label: 'Last Year',
    //     //      borderColor: "rgba(54, 162, 235, 0.5)",
    //     //     backgroundColor: "rgba(54, 162, 235, 0.5)",
    //     //     data:{},
    //     // }

    //     let firstComp = {}
    //     let secondComp = {}

    //     let firstStart = props.first.start
    //     let firstEnd = props.first.end
    //     let secondStart = props.second.start
    //     let secondEnd = props.second.end

    //     while (firstStart.isBefore(firstEnd) || firstStart.isSame(firstEnd)) {
    //         let date = dayjs(firstStart).format('YYYY-MM-DD');
    //         let day = dayjs(firstStart).format('dd');
    //         // firstComp.data[day] = totalIncome.value.daySum[date]

    //         firstComp[day] = totalIncome.value.daySum[date]
    //         firstStart = firstStart.add(1, 'day');
    //     }
    //     while (secondStart.isBefore(secondEnd) || secondStart.isSame(secondEnd)) {
    //         let date = dayjs(secondStart).format('YYYY-MM-DD');
    //         let day = dayjs(secondStart).format('dd');
    //         // secondComp.data[day] = totalIncome.value.daySum[date]

    //         secondComp[day] = totalIncome.value.daySum[date]
    //         secondStart = secondStart.add(1, 'day');
    //     }

    //     // datasets.value.push(firstComp, secondComp)
    //     // console.log(datasets)

    //     return { firstComp, secondComp }
    // }) ///////////////////////////////////////////////////////////////////////////////////////////

    // V2 Props
    //     const first = computed(() => {
    //     let data = {
    //         start: viewWeekStart.value,
    //         end: viewWeekEnd.value
    //     }
    //     return data
    // })

    // const second = computed(() => {
    //     let data = {
    //         start: compWeekStart.value,
    //         end: compWeekEnd.value
    //     }
    //     return data
    // })

    
   const chartData = computed(()=>{
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
            return {datasets}
   })



</script>

<template>
    <div>
        <button @click="week">WEEK</button>
    </div>

    <Chart type="bar" :data="chartData" :width="800" :height="400" />

</template>
