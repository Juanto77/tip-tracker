<template v-slot:calendar-header>
    <div class="min-w-full mt-5">
        <div>
            <CalendarNavigation />
        </div>
        <!-- <div class="flex flex-row">
            <div class="flex-row mx-8">
                <Icon name="eva:arrow-ios-back-fill" @click="shift(-1)"></Icon>
            </div>
            <div class="grow text-center">
                <h1 class="monthName">{{ currentMonth }}</h1>
            </div>
            <div class="flex-none mx-8">
                <Icon name="eva:arrow-ios-forward-fill" @click="shift(1)"></Icon>
            </div>
        </div> -->
        <div class="m-4 grid grid-cols-3">
            <div class="col-start-2 justify-self-center">
                <CalendarViewTabs />
            </div>
            <div class="col-start-3 justify-self-end">
                <USelectMenu v-model="jobSelection" multiple :options="rawJobData" option-attribute="jobName"
                    placeholder="Job Filter" />
            </div>
        </div>
        
        <div class="m-4 p-4 grid grid-cols-3 border-2 border-gray-300 rounded-md">
               <div class="col-start-1 justify-self-center w-2/3">
                <!-- <ProgressIncome /> -->
                 <!-- This Month, Last Year -->
                <UProgress :value="totalIncome.monthIncomeData[compFormatMonth]">
                    <template #indicator="{ percent }">
                        <div class="text-right" :style="{ width: `${percent}%` }">
                            <span> $ {{ totalIncome.monthIncomeData[compFormatMonth] }} </span>
                        </div>
                    </template>
                </UProgress>
            </div>
            <!-- This Week -->
              <div class="col-start-2 justify-self-center w-2/3">
                <!-- <ProgressIncome /> -->
                <UProgress :value="totalIncome.monthIncomeData[_currentMonth]">
                    <template #indicator="{ percent }">
                        <div class="text-right" :style="{ width: `${percent}%` }">
                            <span> $ {{ totalIncome.monthIncomeData[_currentMonth] }} </span>
                        </div>
                    </template>
                </UProgress>
            </div>
            <!-- This Month -->
            <div class="col-start-3 justify-self-center w-2/3">
                <!-- <ProgressIncome /> -->
                <UProgress :value="totalIncome.monthIncomeData[_currentMonth]">
                    <template #indicator="{ percent }">
                        <div class="text-right" :style="{ width: `${percent}%` }">
                            <span> $ {{ totalIncome.monthIncomeData[_currentMonth] }} </span>
                        </div>
                    </template>
                </UProgress>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import MultiSelect from 'primevue/multiselect';

    /* Moved to Calendar Pane 8/1 */
    // const props = withDefaults(defineProps<Props>(), {
    //     modelValue: () => null,
    //     startDate: () => '2024-03-07',
    // });

    // const emits = defineEmits(['update:modelValue']);
    /* Types */
    // type Props = {
    //     modelValue?: any;
    //     startDate?: string;
    //     display?: 'month' | 'year' | 'week' | 'day';
    // };
    ///////////////////////////////////////////////////////////////////////////////////////////



    // import { useDashboardStore } from '~/stores/DashboardStore';
    import { useTimelineStore } from '~/stores/TimelineStore';
    // import { useCalendar } from '~/composables/useCalendar';
    import Select from 'primevue/select';
    import selectbutton from '~/assets/presets/tw-lara/selectbutton';

    // const { prependCalendar, calendar } = useCalendar()
    const { _currentMonth, viewDate, prependCalendar, calendar, weekDays, viewSelect, viewList, currentMonth, compFormatMonth } = storeToRefs(useTimelineStore())

    const { jobSelection, rawJobData, totalIncome } = storeToRefs(useIncomeData())



    const dayjs = useDayjs();
    const timeline = useTimelineStore();
    const shift = timeline.shiftView
    // const store = useDashboardStore();
    // const calendar = useCalendarStore();

    // store.fetch();

    /* Types */
    // type Props = {
    //     modelValue?: any;
    //     startDate?: string;
    //     display?: 'month' | 'year' | 'week' | 'day';
    // };

</script>