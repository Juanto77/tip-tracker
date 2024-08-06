<script setup lang="ts">
// const timeline = useTimelineStore();
const {shiftView} = useTimelineStore()
const { _currentMonth, viewDate, prependCalendar, calendar, weekDays, viewSelect, viewList, monthDisplay } = storeToRefs(useTimelineStore())

const { jobSelection, rawJobData } = storeToRefs(useIncomeData())

// const {shiftView, viewMonth } = useCalendar()

  const props = withDefaults(defineProps<Props>(), {
        modelValue: () => null,
    });

    type Props = {
        modelValue?: any;
    };

    const emits = defineEmits(['update:modelValue']);

</script>

<template>
            <div class="flex flex-row">
            <!-- <div class="flex-row mx-8"> -->
                <Icon name="eva:arrow-ios-back-fill" @click="shiftView(-1)"></Icon>
            <!-- </div> -->
            <div class="grow text-center">
                <h1 class="monthName">{{ monthDisplay }}</h1>
            </div>
            <!-- <div class="flex-none mx-8"> -->
                <Icon name="eva:arrow-ios-forward-fill" @click="shiftView(1)"></Icon>
            <!-- </div> -->
        </div>
</template>
