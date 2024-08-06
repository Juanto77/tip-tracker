<template>
<component :is="currentView" />

</template>

<script setup>
const router = useRouter()
const route = useRoute()

const store = useTipStore()


let currentView = resolveComponent('AddTip')

/* Middleware */
// console.log(route.query)

if (route.path === '/add-tip'){
    store.jobPull()
    currentView = resolveComponent('AddTip')
}


</script>