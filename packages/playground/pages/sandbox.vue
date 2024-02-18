<script setup lang="ts">
import { useTipInputStore } from '~util/stores/AddTip';
import { useCalcStore } from '~util/stores/Calc';
import { useJobStore } from '~util/stores/GetJobs';
const tipInput = useTipInputStore()
const calcStore = useCalcStore()
const jobStore = useJobStore()

// Loop through tip store getter.
// console.log(Object.entries(toRaw(tipInput)))

</script>
<template>
  <!-- <FormExample /> -->
  <!-- <addTip /> -->
  <!-- <CalendarView /> -->
  <AddTipUI />
  <!-- <AddTipFK /> -->
  <!-- <CalculatorBase /> -->
</template>
