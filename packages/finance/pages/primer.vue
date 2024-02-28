<script setup lang="ts">
import { useTipStore } from '~/stores/useTipStore'
const client = useSupabaseClient()
const tipStore = useTipStore()

async function fetch() {
    const { data: jobs } = await client.from('jobs').select('*');
    jobs?.forEach((job) => {
        // console.log(job)
        tipStore.job.options.push({ label: job.name, value: job })
    })
}
fetch()
</script>
<template>
    <NuxtLink to="/sandbox">SandBox</NuxtLink>
</template>