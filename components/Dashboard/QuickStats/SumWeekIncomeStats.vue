<script setup lang="ts">
import isBetween from 'dayjs/plugin/isBetween.js'

const { formatWeekStart, formatWeekEnd } = storeToRefs(useTimelineStore())
const {totalIncome } = storeToRefs(useIncomeData())

const dayjs = useDayjs()
dayjs.extend(isBetween)

const week = computed(()=>{
    const income = {}
    let weekSum = 0
    Object.keys(totalIncome.value.daySum).forEach((key)=>{
            if(dayjs(key).isBetween(formatWeekStart.value, dayjs(formatWeekEnd.value))){
                income[key]= totalIncome.value.daySum[key]
                weekSum += totalIncome.value.daySum[key]
            }
    })
    return {income, weekSum}
})



</script>

<template>
    <div>
        $ {{ week.weekSum }}
    </div>
</template>
