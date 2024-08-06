<script setup lang="ts">
    const { formatViewStart, formatViewEnd, _currentMonth } = storeToRefs(useTimelineStore())
    const { totalIncome } = storeToRefs(useIncomeData())

    const dayjs = useDayjs()

    const goal = ref(10000)

    const income = computed(() => {
        let val = totalIncome.value.monthIncomeData[_currentMonth.value] || .0
        let roundedVal = val.toFixed(2)
        let parseVal = parseFloat(roundedVal)
        return parseVal
    })

    const meterLabel = computed(() => {
        return dayjs(_currentMonth.value).format('MMMM')
    })
</script>

<template>
    <UMeter :value="income" :max="goal" indicator :label="meterLabel">
        <template #indicator="{ percent }">
            <div class="text-right" :style="{ width: `${percent}%` }">
                $ {{ income }}
            </div>
        </template>
    </UMeter>
</template>
