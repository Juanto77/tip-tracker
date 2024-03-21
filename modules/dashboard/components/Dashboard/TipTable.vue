<script setup lang="ts">
/* Database */
import type { Database } from '../../types/database';
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

/* Stores */
import { useTableStore } from '../../stores/view/useTableStore';
const tableStore = useTableStore();
// tableStore.fetch()

// const getSales = await $fetch('/api/sales')
const { data: getSales, error } = await client.from( 'user_tip' ).select( 'id, inTime, outTime, totalHours, creditTip, cashTip, sales, totalSales, stats, tipOut, creditNet, cashNet, netIncome' );
if ( error ) {
  console.log( error );
}

/* Form Params */
//TODO: make this dynamic
const columns = [
  {
    key: 'id',
    label: 'Tip ID',
    sortable: true
  }, {
    key: 'inTime',
    label: 'In Time'
  }, {
    key: 'outTime',
    label: 'Out Time'
  }, {
    key: 'totalHours',
    label: 'Total Hours'
  }, {
    key: 'creditTip',
    label: 'Credit Tip',
    sortable: true
  }, {
    key: 'cashTip',
    label: 'Cash Tip',
    sortable: true
  }, {
    key: 'sales.beerSales',
    label: 'Beer Sales'
  }, {
    key: 'sales.foodSales',
    label: 'Food Sales'
  }, {
    key: 'sales.wineSales',
    label: 'Wine Sales'
  }, {
    key: 'sales.liquorSales',
    label: 'Liquor Sales'
  }, {
    key: 'sales.retailSales',
    label: 'Retail Sales'
  }, {
    key: 'totalSales',
    label: 'Total Sales',
    sortable: true
  }, {
    key: 'stats.guestNum',
    label: 'Guests'
  }, {
    key: 'tipOut.barTip',
    label: 'Bar Tip'
  }, {
    key: 'tipOut.busTip',
    label: 'Bus Tip'
  }, {
    key: 'tipOut.foodTip',
    label: 'Food Tip'
  }, {
    key: 'creditNet',
    label: 'Credit Net',
    sortable: true
  }, {
    key: 'cashNet',
    label: 'Cash Net',
    sortable: true
  }, {
    key: 'netIncome',
    label: 'Net Income',
    sortable: true
  },
];

const selectedColumns = ref( [ ...columns ] )

</script>

<template>
  <!-- <UTable class="w-full" :rows="getIncome" />
  <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
    </div>
    <UTable class="w-full" :rows="getSales" :columns="selectedColumns" />
  </div> -->
</template>
