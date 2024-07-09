<template v-slot:calendar-header>
    <div class="min-w-full mt-5">
        <div class="flex flex-row">
            <div class="flex-row mx-8">
                <h1 @click="timeline.shiftView(-1)">BACK</h1>
            </div>
            <div>
                <UIDropDown v-model="timeline.viewSelect" :options="viewList" />
            </div>
            <div class="grow text-center">
                <h1 class="monthName">{{ timeline.currentMonth }}</h1>

            </div>
            <div class="flex-none mx-8">
                <h1 @click="timeline.shiftView(1)">FORWARD</h1>

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



import { useDashboardStore } from '~/stores/DashboardStore';
import { useTimelineStore } from '~/stores/TimelineStore';
import { useCalendar } from '~/composables/useCalendar';

const { prependCalendar, calendar } = useCalendar()


const dayjs = useDayjs();
const timeline = useTimelineStore();
const store = useDashboardStore();
// const calendar = useCalendarStore();

const viewList = ref([
    { name: 'Week', code: 'w' },
    { name: 'Month', code: 'M' },
    { name: 'Year', code: 'y' }
])

store.fetch();

/* Types */
type Props = {
    modelValue?: any;
    startDate?: string;
    display?: 'month' | 'year' | 'week' | 'day';
};

</script>