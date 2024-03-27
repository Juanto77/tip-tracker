<template v-slot:calendar-header>
    <div class="min-w-full mt-5">
        <div class="flex flex-row">
            <div class="flex-row mx-8">
                <!-- <font-awesome-icon icon="fa-solid fa-chevron-left" @click="store.shiftMonth( -1 )"></font-awesome-icon> -->
                <h1 @click="shiftMonth(-1)">BACK</h1>
            </div>
            <div>
                <DropdownBase />
            </div>
            <div class="grow text-center">
                <h1 class="monthName">{{ timeline.currentMonth }}</h1>

            </div>
            <div class="flex-none mx-8">
                <h1 @click="shiftMonth(1)">FORWARD</h1>
                <!-- <font-awesome-icon icon="fa-solid fa-chevron-right" @click="store.shiftMonth( 1 )"></font-awesome-icon> -->
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



import { useDashboardStore } from '~Dashboard/stores/Dashboard';
import { useTimelineStore } from '~Dashboard/stores/Timeline';
import { useCalendar } from '../../composables/useCalendar';

const { prependCalendar, calendar, shiftMonth } = useCalendar()


const dayjs = useDayjs();
const timeline = useTimelineStore();
const store = useDashboardStore();
// const calendar = useCalendarStore();


store.fetch();

/* Types */
type Props = {
    modelValue?: any;
    startDate?: string;
    display?: 'month' | 'year' | 'week' | 'day';
};

</script>