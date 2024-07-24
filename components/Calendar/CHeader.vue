<template v-slot:calendar-header>
    <div class="min-w-full mt-5">
        <div class="flex flex-row">
            <div class="flex-row mx-8">
                <h1 @click="shift(-1)">BACK</h1>
            </div>
            <div>
                <SelectButton v-model="viewSelect" :options="viewList" optionLabel="name"/>
            </div>
            <div class="grow text-center">
                <h1 class="monthName">{{ currentMonth }}</h1>

            </div>
            <div class="flex-none mx-8">
                <h1 @click="shift(1)">FORWARD</h1>

                <!-- <h1 @click="shiftMonth(1)">FORWARD</h1> -->

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => null,
    startDate: () => '2024-03-07',
});

const emits = defineEmits(['update:modelValue']);
///////////////////////////////////////////////////////////////////////////////////////////



// import { useDashboardStore } from '~/stores/DashboardStore';
import { useTimelineStore } from '~/stores/TimelineStore';
// import { useCalendar } from '~/composables/useCalendar';
import Select from 'primevue/select';

// const { prependCalendar, calendar } = useCalendar()
const { _currentMonth, viewDate, prependCalendar, calendar, weekDays, viewSelect, viewList, currentMonth } = storeToRefs(useTimelineStore())



const dayjs = useDayjs();
const timeline = useTimelineStore();
const shift = timeline.shiftView
// const store = useDashboardStore();
// const calendar = useCalendarStore();

// store.fetch();

/* Types */
type Props = {
    modelValue?: any;
    startDate?: string;
    display?: 'month' | 'year' | 'week' | 'day';
};

</script>