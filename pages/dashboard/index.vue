<template>
    <div class="md:grid grid-cols-3 gap-1 sm:flex">
        <!-- Quick Stats Sidebar -->
        <div class="cols-start-1">
            <div class="flex-grow flex flex-col min-h-0 gap-y-2 py-2">
                <div class="flex-1 px-4 flex flex-col gap-y-2 overflow-y-auto">
                    <div class="border-gray-400 border-2 p-2">
                        <div>Weekly Income: If month is over, hide this.</div>
                        <SumWeekIncomeStats />
                    </div>
                    <div class="border-gray-400 border-2 p-2">
                        <div>Monthly Income</div>
                        <SumMonthIncomeStats />
                    </div>
                    <div class="border-gray-400 border-2 p-2">
                        <div>Year To Date for current month, array and step backwards</div>
                        <SumYTDIncome />
                    </div>
                    <div>Goals</div>
                    <div>Taxes Owed</div>
                </div>
            </div>
        </div>
        <div class="grid grid-flow-row-dense col-start-2 col-span-2 m-3 p-3 border-gray-400 border-2">
            <div class="m-2 p-3">
                <CalendarNavigation/>
            </div>
            <!-- <div class="text-center">
                {{ $dayjs(_currentMonth).format('MMMM') }} Overview
            </div> -->
            <ChartTotalIncome />
             <!-- <ChartExample2 /> -->
        </div>
        <div class="col-start-2 col-span-2 row-start-2 m-3 p-3 border-gray-400 border-2">
            <div class="p-3">
                <CalendarPane display="Week"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SumMonthIncomeStats from '~/components/Dashboard/QuickStats/SumMonthIncomeStats.vue';
import SumYTDIncome from '~/components/Dashboard/QuickStats/SumYTDIncome.vue';

const {_currentMonth} = storeToRefs(useTimelineStore())
const dayjs = useDayjs()
</script>