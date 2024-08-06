<template>
    <div>
        <!-- HEADER -->
        <!-- <div class="flex flex-row"> -->
            <!-- <div class="flex-row mx-8"> -->
            <!-- <Icon name="eva:arrow-ios-back-fill" @click="shiftView(-1)"></Icon> -->
            <!-- </div> -->
            <!-- <div class="grow text-center"> -->
                <!-- <h1 class="monthName">{{ viewMonth }}</h1> -->
            <!-- </div> -->
            <!-- <div class="flex-none mx-8"> -->
            <!-- <Icon name="eva:arrow-ios-forward-fill" @click="shiftView(1)"></Icon> -->
            <!-- </div> -->
        <!-- </div> -->
        <!-- VIEW SELECTION & JOB FILTER -->
        <!-- <div class="m-4 grid grid-cols-3"> -->
            <!-- <div class="col-start-2 justify-self-center"> -->
                <!-- <UTabs :items="tabs" :default-index="2" :content="false" @change="onChange" /> -->
                 <!-- <UTabs :items="tabs" :content="false" @change="onChange" /> -->
            <!-- </div> -->
            <!-- <div class="col-start-3 justify-self-end"> -->
                <!-- <USelectMenu v-model="jobSelection" multiple :options="rawJobData" option-attribute="jobName" -->
                    <!-- placeholder="Job Filter" /> -->
            <!-- </div> -->
        <!-- </div> -->
        <!-- DAYS OF WEEK -->
        <div class="grid grid-cols-7 gap-1 mb-5 ">
            <template v-if="viewSelect.code != 'd'">
                <div v-for="weekDay in weekDays" class="text-center">
                    <div>{{ weekDay }}</div>
                </div>
            </template>
        </div>
        <!-- BUILD CALENDAR -->
        <template v-if="viewSelect.code != 'd'">
            <div class="grid grid-cols-7">
                <!-- Offsets the whole month view -->
                <template v-if="viewSelect.code === 'M'">
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
                        <div v-if="dayjs(a.date).format('YYYY-MM-DD') == day.format('YYYY-MM-DD')" class="mt-3">
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
    import advancedFormat from 'dayjs/plugin/advancedFormat'
    const dayjs = useDayjs();
    dayjs.extend(advancedFormat)
    /* INCOME DATA */
    const {getJobIncome} = useIncomeData()
    const { totalIncome, jobIncome, jobSelection, rawJobData } = storeToRefs(useIncomeData())
    /* TIMELINE STORE */
    const { calendar, viewSelect, prependCalendar, weekDays } = storeToRefs(useTimelineStore())
    const {shiftView } = useTimelineStore()
    /* CALENDAR / TIMELINE */
    // const {weekDays, prependCalendar, calendar, viewSelect, viewMonth, shiftView } = useCalendar()


    /* Testing Computed function */
    // incomeStore.getIncome()
    getJobIncome()

    const props = withDefaults(defineProps<Props>(), {
        modelValue: () => null,
        startDate: () => '2024-03-07',
        display: () => 'month'
    });

    type Props = {
        modelValue?: any;
        startDate?: string;
        display?: string;
        view?: string
    };

    const emits = defineEmits(['update:modelValue']);

    const tabs = [{
        label: 'Day',
        code: 'd',
        icon: 'fluent-mdl2:calendar-day',
    }, {
        label: 'Week',
        code: 'w',
        icon: 'fluent-mdl2:calendar-week',
    }, {
        label: 'Month',
        code: 'M',
        icon: 'fluent-mdl2:calendar',
    }]
    function onChange(index) {
        const tab = tabs[index]

        viewSelect.value = { name: tab.label, code: tab.code }
    }

    onMounted(() => {
        const view = props.display
        if (view === "Day") {
            viewSelect.value = { name: 'Day', code: 'd' }
        }
        else if (view === "Week") {
            viewSelect.value = { name: 'Week', code: 'W' }
        }
        else
            viewSelect.value = { name: 'Month', code: 'M' }
        return view
    })

</script>