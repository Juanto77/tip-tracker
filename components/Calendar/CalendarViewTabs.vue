<script setup lang="ts">
import { routeLocationKey } from 'vue-router';

const route = useRoute()

const { viewSelect } = storeToRefs(useTimelineStore())
// const {viewSelect} = useCalendar()

const tabs = [{
  label: 'Day',
  code: 'd',
icon: 'fluent-mdl2:calendar-day',
}, {
  label: 'Week',
  code: 'W',
  icon: 'fluent-mdl2:calendar-week',
}, {
  label: 'Month',
  code: 'M',
  icon: 'fluent-mdl2:calendar',
}]

const selected = computed({
    get(){
        const index = tabs.findIndex((item) => item.label === route.query.tab)
        if (index === -1){
            return 0
        }
        return index
    },
    set(value){
        viewSelect.value = {name: tabs[value].label, code: tabs[value].code}
    }
})

function onChange(index){
    const tab = tabs[index]

    viewSelect.value = {name: tab.label, code: tab.code}
}


</script>

<template>
<UTabs :items="tabs" :default-index="2" :content="false" @change="onChange"/>


</template>
