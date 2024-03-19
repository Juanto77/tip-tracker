<template>
    <div class="grid grid-cols-7 gap-1">
        <div v-for="weekDay in store.weekDays" class="text-center">
            <div>{{ weekDay }}</div>
        </div>
    </div>
    <div class="grid grid-cols-7">
        <div v-for="p in store.prependCalendar"></div>
        <!-- <div v-for="i of store.firstDay"></div> -->
        <div class="border border-slate-200 flex flex-col h-32" v-for="day in store.calendar">

            <!-- <div :class="[ day.isToday() ? 'bg-red-300' : '' ]" class="text-center">{{ this.day }}</div> -->
            <div class="text-center">{{ day.format( 'D' ) }}
                <div v-for="data, key in store.calendarObject">
                    <div v-if="key == day.format( 'YYYY-MM-DD' )">
                        {{ data.netIncome }}
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCalendarStore } from '~Server/stores/view/Calendar';

const store = useCalendarStore();
</script>