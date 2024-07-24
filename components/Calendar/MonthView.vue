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
                        <template v-for="(i, idx) of incomeStore.dailyIncome">
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
                <div class="text-center border border-slate-200 flex flex-col h-32" :day="day.format('YYYY-MM-DD')">
                    {{ day.format('Do') }}
                    <template v-for="(i, idx) in incomeData[_currentMonth]">
                        
                        <div v-if="idx == day.format('YYYY-MM-DD')" :day="day.format('YYYY-MM-DD')">
                            <div v-for="a in i">
                                <NuxtLink :to="{ name: 'crud-tip-id', params: { 'crud': 'edit', 'id': a.id } }">
                                    {{ a.id }} :
                                  $  {{ a.netIncome }}
                                </NuxtLink>
                            </div>

                        </div>

                    </template>
                    <!-- <template v-for="data of incomeData[useTimelineStore()._currentMonth]" >
                                <div v-if="$dayjs(data.inTime).format('YYYY-MM-DD') == day.format('YYYY-MM-DD')" :day="day.format('YYYY-MM-DD')">
                                    <div class="align-middle">
                                        $ {{ data.netIncome }}
                                    </div>
                                </div>
                            </template> -->
                    <!-- </div> -->
                </div>
                <!-- </div> -->
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
    const { incomeData } = storeToRefs(useIncomeData())
    const { _currentMonth, viewDate, prependCalendar, calendar, weekDays, _viewEnd, _viewStart } = storeToRefs(useTimelineStore())

    const start = JSON.stringify(_viewStart.value)
    const end = JSON.stringify(_viewEnd.value)

      incomeStore.getIncome(_viewStart.value, _viewEnd.value)


    // const { weekDays, prependCalendar, calendar } = useCalendar()

    const day = useDayjs();
    day.extend(advancedFormat)
</script>