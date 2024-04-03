<template>
    <Dropdown :options="props.options" optionLabel="name" :class="style" />
</template>

<script setup lang="ts">

const props = defineProps(['v-model', 'options'])

const style = ref('w-full md:w-[14rem]')

const selectedView = ref()

const viewList = ref([
    { name: 'Week', code: 'w' },
    { name: 'Month', code: 'M' },
    { name: 'Year', code: 'y' }
])

</script>