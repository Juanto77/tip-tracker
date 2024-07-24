<template>
    <div class="m-5">
        <div>
            <button @click="monthFilter">monthfilter</button>
        </div>

        <div>
            <button @click="getIncome">getIncome</button>
        </div>
        <div>
            <button @click="getJobIncome">getJobIncome</button>
        </div>
        <div>
            <button @click="jobFilter(rawJobComp)">Job Filter (RawJobComp)</button>
        </div>
        <div>
            <button @click="$reset">reset</button>
        </div>
    </div>
</template>

<script setup>

const {monthFilter, dayFilter, getIncome, getJobIncome, $reset, filterMonthData, rawJobComp} = useIncomeData()

</script>