<script setup lang="ts">
import { AddJobInfo, AddJobLink, AddJobPool, AddJobSales } from '#components'

const route = useRoute()
const router = useRouter()
let currentView = resolveComponent('AddJobInfo')

if (route.path === '/add-job-start')
  currentView = resolveComponent('AddJobInfo')
if (route.path === '/add-job-sales') {
  currentView = resolveComponent('AddJobSales')
  // if (route. === 1){

  // }
}
if (route.path === '/add-job-pool')
  currentView = resolveComponent('AddJobPool')
if (route.path === '/add-job-link')
  currentView = resolveComponent('AddJobLink')
</script>

<template>
  <UIPageContainerMO>
    <component :is="currentView" />
  </UIPageContainerMO>
</template>
