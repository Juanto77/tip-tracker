<script setup lang="ts">
import type { Database } from '~sTypes/database'
const client = useSupabaseClient();
const user = useSupabaseUser();

// const sales = ['creditTip, cashTip, creditNet, cashNet, netIncome, sales->beerSales, sales->wineSales, sales->foodSales, sales->retailSales, sales->liquorSales']
// const grossIncome = ['creditTip, cashTip']
// const netIncome = ['creditNet, cashNet, netIncome']

// let stringS = sales.toString()



//TODO: Format nested json fields
const { data: getIncome } = await client.from('user_tip').select(`creditNet,cashNet,netIncome`)



</script>
<template>
    <UTable class="w-full" :rows="getIncome" />
</template>
