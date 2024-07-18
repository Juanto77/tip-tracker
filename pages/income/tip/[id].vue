<template>
    <div><span>Route ID: {{ routeID }}</span></div>
    <div class="mt-5" v-for="(val, key) in store.incomeData">
       {{ key }} {{ val }}
    </div>
   {{ store.incomeData }}

    
</template>

<script setup>
const router = useRouter()
const route = useRoute()

const store = useIncomeStore()
const routeID = route.params.id
store.getTips(routeID)



// const routeID = route.params.id
let list = store.incomeData
// let jobID = list[routeID]


// store.$onRoute(routeID)



</script>