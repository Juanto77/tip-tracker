<template>
    <div>
        <!-- <h1 class="text-center">Income for {{ $dayjs(_currentMonth).format('MMMM') }} : {{ income }}</h1> -->
        <UProgress :value="income" :max="goal" :color="color">
            <template #indicator="{ percent }">
                <div class="text-right" :style="{ width: `${percent}%` }">
                    <span> $ {{ income }} </span>
                </div>
            </template>
        </UProgress>
    </div>
</template>

<script setup>
const {formatViewStart, formatViewEnd, _currentMonth } = storeToRefs(useTimelineStore())
const {totalIncome} = storeToRefs(useIncomeData())

const dayjs = useDayjs()

const goal = ref(10000)

// FIXME: if default val is passed then cuts off the trailing zero
const income = computed(()=>{
    let val = totalIncome.value.monthIncomeData[_currentMonth.value] || .0
    let roundedVal = val.toFixed(2)
    let parseVal = parseFloat(roundedVal)
    return parseVal
})

const color = computed(()=>{
    const percent = (income.value / goal.value)*100
    // console.log(percent)
    switch(true){
        case percent < 25: return 'blue'
        case percent < 50: return 'amber'
        case percent < 85: return 'orange'
        default: return 'pink'
    }
})

const meterLabel = computed(()=>{
    return dayjs(_currentMonth.value).format('MMMM')
})

// console.log(meterLabel.value)


// console.log(totalIncome.value.monthIncomeData[_currentMonth.value])

</script>