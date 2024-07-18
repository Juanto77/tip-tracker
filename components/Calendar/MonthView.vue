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
            </div>
        </template>
        <!-- Only show if daily view is selected -->
        <template v-else>
            <template v-for="day in calendar">
                <div class="text-center border border-slate-200 flex flex-col h-32" :day="day.format('YYYY-MM-DD')">
                    {{ day.format('Do') }}
                    <template v-for="(i, idx) of incomeStore.dailyIncome">
                        <div v-if="idx == day.format('YYYY-MM-DD')" :day="day.format('YYYY-MM-DD')">
                            $ {{ i }}
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
    <div>timeline: {{ useTimelineStore()._currentMonth }}</div>
    <div>current month: {{ currentMonth }}</div>
</template>

<script setup lang="ts">
    import { useDashboardStore } from '~/stores/DashboardStore';
    import { useTimelineStore } from '~/stores/TimelineStore';
    import { useCalendar } from '~/composables/useCalendar';
    import advancedFormat from 'dayjs/plugin/advancedFormat'

    const timeline = useTimelineStore()
    // const store = useDashboardStore();
    const incomeStore = useIncomeData()
    const incomeData = useIncomeData().incomeData
    let currentMonth = useTimelineStore()._currentMonth

    const { weekDays, prependCalendar, calendar } = useCalendar()

    const day = useDayjs();
    day.extend(advancedFormat)
</script>