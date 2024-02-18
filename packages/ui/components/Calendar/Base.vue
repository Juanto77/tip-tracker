<script setup>
/* TODO CalendarView.vue
// TODO [] Styling Calendar Styling
// TODO [] Create a breakpoint 
// TODO    [] Mobile
// TODO    [] Desktop
// TODO [] Create container for elements within day box
*/


import data from './assets/calendar-data.json';
const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = {
  weekdays: 'WWW',
};

const attributes = data;


</script>

<template>
  <div class="text-center section">
    <VCalendar class="custom-calendar" :masks="masks" :attributes="attributes" disable-page-swipe>
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p v-for="attr in attributes" :key="attr.id"
              class="text-xs leading-tight rounded-sm p-3 mt-0 mb-1 text-black text-center align-text-bottom">
              ${{ attr.cash }}
            </p>
          </div>
        </div>
      </template>
    </VCalendar>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #d7d7d7;

  border-radius: 0;

  & .vc-header {
    background-color: #f1f5f8;
    padding: 2em;
  }

  & .vc-weeks {
    padding: 0;
  }

  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }

  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;

    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }

    &:not(.on-bottom) {
      border-bottom: var(--day-border);

      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }

    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }

  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
