<script setup lang="ts">
/* FormKit Version */
/* Fix Me & To Dos */

/* Type Imports */
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { Database } from '~sTypes/database'
import type Job from '~sTypes/job'

/* Store Imports */
import { useTipStore } from '~sStores/useTipStore';
import { useCalcStore } from '~sStores/Calc';
import { useJobStore } from '~sStores/useJobStore';

/* Database */
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

/* Store definitions */
const tipStore = useTipStore()
// const calcStore = useCalcStore()
// const jobStore = useJobStore()


/* Form Submit */
function submit() {
}
///////////////////////////////////////////////////////////////////////////////////////////



/* TESTING */


/* FETCHING JOBS & FORMATTING FOR FORMKIT */


// fetchJobs()

/* Fetch job data using store */
/* Doesn't work */
// tipStore.fetch()

/* Fetch jobs & post to tipStore.job */
/* Doesn't Work */
// async function fetch() {
//   const { data: jobs } = await client.from('jobs').select('*');
//   jobs?.forEach((job) => {
//     // console.log(job)
//     tipStore.job.options.push({ label: job.name, value: job })
//   })
// }

// fetch()




/* Trial Post to Database */
const dbPost = async (event: any) => {
  // loading.value = true;
  const { data, error } = await client
    .from('jobs_duplicate')
    .insert(event)
    .select();
  if (error) console.error(error);
  console.log(event);
};



</script>

<template>
  <div class="p-5">

    <!-- <FormKit type="form" id="TipForm-all-tracked" submit-label="Add Tip" @submit="submit">
      <FormKit type="select" name="job-select" :options="tipStore.job.list" v-model="tipStore.job.select" />
      <div class=" columns-2">
        <FormKit name='in-time' v-model="tipStore.hours.clockIn" type="date" label="Clock In Time" />
        <FormKit name='out-time' v-model="tipStore.hours.clockOut" type="date" label="Clock Out Time" />
      </div>
      <div class="mt-2 ">
        <FormKit name='cash-tip' v-model="tipStore.income.cashTip" type="number" label="Cash Tip" />
        <FormKit name='credit-tip' v-model="tipStore.income.creditTip" type="number" label="Credit Tip" />
      </div>
      <div class="mt-2">
        <FormKit name='food-sales' v-model="tipStore.sales.foodSales" type="number" step=".01" label="Food Sales" />
        <FormKit name='beer-sales' v-model="tipStore.sales.beerSales" type="number" step=".01" label="Beer Sales" />
        <FormKit name='liquor-sales' v-model="tipStore.sales.liquorSales" type="number" step=".01" label="Liquor Sales" />
        <FormKit name='wine-sales' v-model="tipStore.sales.wineSales" type="number" step=".01" label="Wine Sales" />
        <FormKit name='retail-sales' v-model="tipStore.sales.retailSales" type="number" step=".01" label="Retail Sales" />
      </div>
      <div>
        <FormKit name='guest-num' v-model="tipStore.stats.guestNum" type="number" label="Guest Number" />
      </div>

    </FormKit> -->
  </div>
</template>
