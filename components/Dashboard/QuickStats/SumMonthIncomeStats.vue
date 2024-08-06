<script setup lang="ts">
import isBetween from 'dayjs/plugin/isBetween.js'

const { formatWeekStart, formatWeekEnd, _currentMonth } = storeToRefs(useTimelineStore())
const { totalIncome } = storeToRefs(useIncomeData())

const dayjs = useDayjs()
dayjs.extend(isBetween)

const month = computed(()=>{
    const income = {}
    let sum = 0
    Object.keys(totalIncome.value.monthIncomeData).forEach((key)=>{
            if(dayjs(key).isSame(_currentMonth.value)){
                income[key]= totalIncome.value.monthIncomeData[key]
                sum += totalIncome.value.monthIncomeData[key]
            }
    })
    return {income, sum}
})



</script>

<template>
    <div>
        $ {{ month.sum }}
    </div>
</template>
