<template>

    <div class="">
        <template v-for="day in calendar">
            <div class="text-center border border-slate-200 flex flex-col h-32" :day="day.format('YYYY-MM-DD')">

                {{ day.format('Do') }}

                <template v-for="data of income">
                    <div v-if="data.date == day.format('YYYY-MM-DD')" :day="day.format('YYYY-MM-DD')">
                        <div>
                            <!-- {{ data.netIncome }} -->
                            <div v-for="d in data._child">
                                <NuxtLink :to="{name: 'crud-tip-id', params: { 'crud': 'edit', 'id': d.id } }">
                                {{ d.user_jobs.job_name }} : {{ d.netIncome }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

        </template>
    </div>
</template>

<script setup>
import { useDashboardStore } from '~/stores/DashboardStore';
import { useTimelineStore } from '~/stores/TimelineStore';
import { useCalendar } from '#imports';
import advancedFormat from 'dayjs/plugin/advancedFormat'

const _incomeData = useIncomeData()
const income = _incomeData.incomeData


const timeline = useTimelineStore()
const store = useDashboardStore();

const { weekDays, prependCalendar, calendar } = useCalendar()

const dayjs = useDayjs();
dayjs.extend(advancedFormat)

</script>