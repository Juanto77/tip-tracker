<template>
    <div>
        <div class="grid grid-cols-7 gap-1 mb-5 ">
            <template v-if="timeline.viewSelect.code != 'd'">
                <div v-for="weekDay in weekDays" class="text-center">
                    <div>{{ weekDay }}</div>
                </div>
            </template>
        </div>

        <template v-if="timeline.viewSelect.code != 'd'">
            <div class="grid grid-cols-7">
                <!-- Offsets the whole month view -->
                <template v-if="timeline.viewSelect.code === 'M'">
                    <div v-for="p in prependCalendar"></div>
                </template>
                <template v-for="day in calendar">
                    <div class="text-center border border-slate-200 flex flex-col h-32" :day="day.format('YYYY-MM-DD')">
                        {{ day.format('Do') }}
                        <template v-for="(i, idx) of totalIncome.daySum">
                            <div v-if="idx == day.format('YYYY-MM-DD')" :day="day.format('YYYY-MM-DD')">
                                $ {{ i }}
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </template>

        <!-- DAILY VIEW -->
        <!-- TODO: Style the data view for single day -->
        <template v-else>
            <template v-for="day in calendar">
                <div class="text-center border border-slate-200 flex flex-col h-fit" :day="day.format('YYYY-MM-DD')">
                    {{ day.format('Do') }}
                    <template v-for="(a, idx) in totalIncome.dayIncomeData" :key="a.id">
                        <div v-if="$dayjs(a.date).format('YYYY-MM-DD') == day.format('YYYY-MM-DD')" class="mt-3">
                            <div v-for="b in a.dayChild" class="mt-3">
                                <NuxtLink :to="{ name: 'crud-tip-id', params: { 'crud': 'edit', 'id': b.id } }">
                                    <div>{{ b.jobName }}</div>
                                    <div>{{ b.id }} </div>
                                    <div>$ {{ b.netIncome }} </div>
                                </NuxtLink>
                            </div>
                            <div>Total income: $ {{ a.income }} </div>
                        </div>
                    </template>
                </div>
             
            </template>
        </template>

    </div>

</template>

<script setup lang="ts">

    import { useTimelineStore } from '~/stores/TimelineStore';
    // import { useCalendar } from '~/composables/useCalendar';
    import advancedFormat from 'dayjs/plugin/advancedFormat'

    const timeline = useTimelineStore()
    const incomeStore = useIncomeData()
    const { totalIncome, jobIncome } = storeToRefs(useIncomeData())
    const { _currentMonth, viewDate, prependCalendar, calendar, weekDays, _viewEnd, _viewStart } = storeToRefs(useTimelineStore())
    // const calDay = totalIncome.value.dayIncomeData[_viewStart.value]

    // const start = JSON.stringify(_viewStart.value)
    // const end = JSON.stringify(_viewEnd.value)

    // incomeStore.getIncome()
      incomeStore.getJobIncome()



    // const { weekDays, prependCalendar, calendar } = useCalendar()

    const day = useDayjs();
    day.extend(advancedFormat)
</script>