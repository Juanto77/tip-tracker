<script setup>
import data from './assets/job.json';
import array from './assets/job-array.json'
import input from './assets/input.json'
import { useAddTipStore } from '~util/stores/AddTip';

// console.log(data);
// console.log(array);
// console.log(input);

const store = useAddTipStore();
const { addValue } = store
///////////////////////////////////////////////////////////////////////////////////////////
function setJob(input) {
    store.job = input;
    console.log(store.job);
}
// setJob(2)
///////////////////////////////////////////////////////////////////////////////////////////
// addValue(3)


</script>
<template></template>