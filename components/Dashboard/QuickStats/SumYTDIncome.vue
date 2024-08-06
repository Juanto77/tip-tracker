<script setup lang="ts">
import isBetween from 'dayjs/plugin/isBetween.js'

const { formatWeekStart, formatWeekEnd, viewWeekEnd, viewYearStart, viewYearEnd } = storeToRefs(useTimelineStore())
const {totalIncome } = storeToRefs(useIncomeData())

const dayjs = useDayjs()
dayjs.extend(isBetween)

const year = computed(()=>{
    const income = {}
    let sum = 0
    Object.keys(totalIncome.value.daySum).forEach((key)=>{
            if(dayjs(key).isBetween(viewYearStart.value, dayjs(viewWeekEnd.value))){
                income[key]= totalIncome.value.daySum[key]
                sum += totalIncome.value.daySum[key]
            }
    })
    return {income, sum}
})



</script>

<template>
    <div>
        $ {{ year.sum }}
    </div>
</template>
