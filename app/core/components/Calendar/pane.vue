<template>
    <div class="grid grid-cols-7 gap-1">
        <div v-for="weekDay in store.weekDays" class="text-center">
            <div>{{ weekDay }}</div>
        </div>
    </div>
    <div class="grid grid-cols-7">
        <div v-for="p in store.prependCalendar"></div>
        <!-- <div v-for="i of store.firstDay"></div> -->
        <template v-for="day in store.calendar">
            <!-- <div class="border border-slate-200 flex flex-col h-32" v-for="day in store.calendar"> -->
            <!-- <div :class="[ day.isToday() ? 'bg-red-300' : '' ]" class="text-center">{{ this.day }}</div> -->
            <div class="text-center border border-slate-200 flex flex-col h-32" :day="day.format( 'YYYY-MM-DD' )">{{
            day.format( 'D' ) }}
                <template v-for="data of store.incomeData">
                    <!-- <div v-for="data, key in store.incomeData"> -->
                    <div v-if="data.date == day.format( 'YYYY-MM-DD' )" :day="day.format( 'YYYY-MM-DD' )">
                        {{ data.netIncome }}
                    </div>
                </template>
                <!-- </div> -->
            </div>
            <!-- </div> -->
        </template>
    </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '../../stores/view/Dashboard';

const store = useDashboardStore();
</script>~Server/stores/view/Dashboard