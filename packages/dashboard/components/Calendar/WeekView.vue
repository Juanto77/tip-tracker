<template>

    <div class="grid grid-cols-7 gap-1">
        <div v-for="weekDay in weekDays" class="text-center">
            <div>{{ weekDay }}</div>
        </div>
    </div>
    <div class="grid grid-cols-7">
        <template v-for="day in calendar">
            <div class="text-center border border-slate-200 flex flex-col h-32" :day="day.format('YYYY-MM-DD')">

                {{ day.format('Do') }}

                <template v-for="data of store.incomeData">
                    <div v-if="data.date == day.format('YYYY-MM-DD')" :day="day.format('YYYY-MM-DD')">
                        <div>
                            {{ data.netIncome }}
                        </div>
                    </div>
                </template>
            </div>

        </template>
    </div>

</template>

<script setup lang="ts">
import { useDashboardStore } from '~/stores/DashboardStore';
import { useTimelineStore } from '~/stores/TimelineStore';
import { useCalendar } from '#imports';
import advancedFormat from 'dayjs/plugin/advancedFormat'

const timeline = useTimelineStore()
const store = useDashboardStore();

const { weekDays, prependCalendar, calendar } = useCalendar()

const dayjs = useDayjs();
dayjs.extend(advancedFormat)
</script>