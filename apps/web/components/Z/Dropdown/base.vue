<template>
    <Dropdown v-model="selectedView" :options="viewList" optionLabel="name" class="w-full md:w-[14rem]" />
</template>

<script setup lang="ts">

const selectedView = ref()

const viewList = ref([
    { name: 'Week', code: 'W' },
    { name: 'Month', code: 'M' },
    { name: 'Year', code: 'Y' }
])

</script>