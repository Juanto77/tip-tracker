<script setup lang="ts">
import type { Database } from '~sTypes/database'
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();


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

const { data: getSales } = await client.from('user_tip').select(`sales`)
// const { data: getIncome } = await client.from('user_tip').select(`creditNet,cashNet,netIncome`)
// const { data: getAll } = await client.from('user_tip').select('*')
// console.log(getSales)
// getSales.forEach((sale) => {
//   console.log(sale)
// })
// Object.entries(getSales).forEach(([key, value]) => {
//   console.log(value)
// })
console.log(getSales[0].sales.beerSales)

// const columns = [...Object.keys(getSales)]
// console.log(columns)
</script>
<template>
  <div class="columns-2">
    <!-- <UTable class="w-full" :rows="getIncome" /> -->
    <UTable class="w-full" :rows="getSales" />
  </div>
</template>
