<template>
<component :is="currentView" />

<div class="m-5">{{ route.params }}</div>
<div class="m-5">{{ route.params.id }}</div>
<div class="m-5">{{ route.params.crud }}</div>

</template>

<script setup>
const router = useRouter()
const route = useRoute()

const store = useTipStore()


let currentView = resolveComponent('ViewTip')

/* Middleware */
// console.log(route.query)

if (route.params.crud === 'edit' ){
    console.log(route.params.id)
    // console.log($route.params.id)
    store.getTips(route.params.id)
    currentView = resolveComponent('AddTip')
}


</script>