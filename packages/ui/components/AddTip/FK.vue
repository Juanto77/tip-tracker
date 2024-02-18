<script setup lang="ts">
/* ///////////////////////////////////////////////////////////////////////////////////////////
// TODO AddTip.vue
// TODO [] REFACTOR IF NOT USING NUXT/UI
// TODO [] Refactor & Consolodate Code
// 
// TODO [] Template Versions:
// TODO  [] All Manual input (no calc)
// TODO  [] No Sales Tracking 
// TODO    [] Cash Tips
// TODO    [] Credit Tips
// TODO    [] Total Sales
// TODO    [] Total Tipout
// 
// TODO [] Test to see if this data can be referenced later on and elimanate function: jobData
// 
// TODO [] Form Validation:
// TODO   [] Change input type=number to text, validate that only numbers are entered
// TODO [] Figure out how to import types from other packages a bit easier


///////////////////////////////////////////////////////////////////////////////////////////*/

// const loading = ref(false);
import type { FormError, FormSubmitEvent } from '#ui/types';
import { useAddTipStore } from '~util/stores/AddTip';
import type Job from '~util/types/job'
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

///////////////////////////////////////////////////////////////////////////////////////////

///* Job Data */

// TODO - Test to see if this data can be referenced later on and elimanate function: jobData

//GET JOB DATA
///* This gets info from db, stores it using the Job Interface & can be called upon later (I think)*/
const listJob = ref<Job[]>([]);
async function fetchJobs() {
  const { data } = await client
    .from('jobs')
    .select(`*`)
    .eq('user_id', user.value?.id);

  listJob.value = data;
}
fetchJobs();

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

let zzzz = ref<Job>

/* Call Function to get rest of job data on form submission */
async function jobData(val: number) {
  const { data: fullJob } = await client.from('jobs').select(`*`).eq('id', val);
  // console.log(fullJob);
  if (fullJob) {
    const selectedJob = fullJob.find((job) => job.id === val);
    // console.log(selectedJob);
    zzzz = selectedJob; //Abit redundant because selectedJob will post to DB as is.
    dbPost(zzzz); // Test post to Database
  }
}
/* /Job Data */



// /* Testing */
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///* Print data stored in jobs array to console. */
// function ddd() {
//   console.log();
//   console.log(Object.keys(jobs.value[0]));
//   console.log(Object.values(jobs.value[0]['tip_metab']));
// }


// jobData(1);

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// /* /Testing */

/* Form Logic */
const state = reactive({
  job: undefined || 0,
  clockIn: undefined || null,
  clockOut: undefined || null,
  cashTip: undefined || 0,
  creditTip: undefined || 0,
  foodSales: undefined || 0,
  beerSales: undefined || 0,
  liquorSales: undefined || 0,
  wineSales: undefined || 0,
  retailSales: undefined || 0,
  guestNum: undefined || 0,
});

const store = useAddTipStore()

async function onSubmit(event: FormSubmitEvent<any>) {
  const value = Number(event.data.job); //Was getting a string before
  const user = useSupabaseUser();


}
function submit() {
  console.log(store.clockIn, store.clockOut, store.cashTip, store.creditTip, store.foodSales,)
}

/* /Form Logic */
///////////////////////////////////////////////////////////////////////////////////////////
</script>

<template>
  <div class="p-5">

    <FormKit type="form" id="TipForm-all-tracked" submit-label="Add Tip" @submit="submit">
      <div class="columns-2">
        <FormKit name='in-time' v-model="store.clockIn" type="date" label="Clock In Time" />
        <FormKit name='out-time' v-model="store.clockOut" type="date" label="Clock Out Time" />
      </div>
      <div class="mt-2 ">
        <FormKit name='cash-tip' v-model="store.cashTip" type="number" label="Cash Tip" />
        <FormKit name='credit-tip' v-model="store.creditTip" type="number" label="Credit Tip" />
      </div>
      <div class="mt-2">
        <FormKit name='food-sales' v-model="store.foodSales" type="number" step=".01" label="Food Sales" />
        <FormKit name='beer-sales' v-model="store.beerSales" type="number" step=".01" label="Beer Sales" />
        <FormKit name='liquor-sales' v-model="store.liquorSales" type="number" step=".01" label="Liquor Sales" />
        <FormKit name='wine-sales' v-model="store.wineSales" type="number" step=".01" label="Wine Sales" />
        <FormKit name='retail-sales' v-model="store.retailSales" type="number" step=".01" label="Retail Sales" />
      </div>
      <div>
        <FormKit name='guest-num' v-model="store.guestNum" type="number" label="Guest Number" />
      </div>

    </FormKit>
  </div>
</template>
