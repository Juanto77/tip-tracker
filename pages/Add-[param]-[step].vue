<script setup lang="ts">
import { JobAddInfo, JobAddLink, JobAddPool, JobAddSales } from '#components'

const route = useRoute()
const router = useRouter()
let currentView = resolveComponent('JobAddInfo')

if (route.path === '/add-job-start')
  currentView = resolveComponent('JobAddInfo')
if (route.path === '/add-job-sales') {
  currentView = resolveComponent('JobAddSales')
  // if (route. === 1){

  // }
}
if (route.path === '/add-job-pool')
  currentView = resolveComponent('JobAddPool')
if (route.path === '/add-job-link')
  currentView = resolveComponent('JobAddLink')
</script>

<template>
  <UIPageContainerMO>
    <component :is="currentView" />
  </UIPageContainerMO>
</template>
