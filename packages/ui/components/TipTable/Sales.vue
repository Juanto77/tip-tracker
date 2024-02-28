<script setup lang="ts">
/* Database */
import type { Database } from '~sTypes/database'
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

/* Stores */
import { useTableStore } from '~sStores/view/useTableStore'
const tableStore = useTableStore()
// tableStore.fetch()

const sales = `sales->beerSales, sales->foodSales`;
const data = await $fetch('./api/sales', { query: { select: sales } })
console.log(data)




//TODO: Format nested json fields
// const { data: getSales } = await client.from('user_tip').select(
//   `
//   sales->beerSales,
//   sales->wineSales,
//   sales->foodSales,
//   sales->retailSales,
//   sales->liquorSales
//   `
// )

// const { data: getSales } = await client.from('user_tip').select(`*`)
// console.log(getSales)
// getSales?.forEach((item) => {
//   Object.entries(item.sales).forEach(([key, value]) => {
//     console.log(`${key}: ${value}`)
//   })
// })


</script>
<template>
  <!--   <div class="columns-2"> -->
  <!-- <UTable class="w-full" :rows="getIncome" /> -->
  <!--    <UTable class="w-full" :rows="getSales" /> -->
  <!--   </div> -->
</template>
