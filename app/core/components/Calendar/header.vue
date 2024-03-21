<template v-slot:calendar-header>
    <div class="min-w-full">
        <div class="flex flex-row">
            <div class="flex-none mx-8">
                <!-- <font-awesome-icon icon="fa-solid fa-chevron-left" @click="store.shiftMonth( -1 )"></font-awesome-icon> -->
                <h1 @click="store.shiftMonth( -1 )">BACK</h1>
            </div>
            <div class="grow text-center">
                <h1 class="monthName">{{ store.currentMonth }}</h1>
            </div>
            <div class="flex-none mx-8">
                <h1 @click="store.shiftMonth( 1 )">FORWARD</h1>
                <!-- <font-awesome-icon icon="fa-solid fa-chevron-right" @click="store.shiftMonth( 1 )"></font-awesome-icon> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults( defineProps<Props>(), {
    modelValue: () => null,
    startDate: () => '2024-03-07',
} );

const emits = defineEmits( [ 'update:modelValue' ] );
///////////////////////////////////////////////////////////////////////////////////////////



import { useDashboardStore } from '../../stores/view/Dashboard';


const dayjs = useDayjs();
const store = useDashboardStore();

store.fetch();

/* Types */
type Props = {
    modelValue?: any;
    startDate?: string;
    display?: 'month' | 'year' | 'week' | 'day';
};

</script>~Server/stores/view/Dashboard