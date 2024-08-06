<script setup lang="ts">
import isBetween from 'dayjs/plugin/isBetween.js'

const { formatWeekStart, formatWeekEnd } = storeToRefs(useTimelineStore())
const {totalIncome } = storeToRefs(useIncomeData())

const dayjs = useDayjs()
dayjs.extend(isBetween)

const weekIncome = computed(()=>{
    const income = {}
    Object.keys(totalIncome.value.dayIncomeData).forEach((key)=>{
            if(dayjs(key).isBetween(formatWeekStart.value, dayjs(formatWeekEnd.value))){
                income[key]= totalIncome.value.dayIncomeData[key]
            }
    })
    return income
})



</script>

<template>
    <div v-for="(i, idx, arr) in weekIncome">
        <!-- {{ i }} -->

        <div>{{ i.date }}: {{ i.income }}</div>
        <div v-for="(item, index, array) in i.dayChild">
            {{ item.jobName }}: {{ item.netIncome }}
        </div>
    </div>

</template>
