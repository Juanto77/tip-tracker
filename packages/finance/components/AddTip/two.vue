<script setup lang="ts">
/* Nuxt UI Version */

/* Type Imports */
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { Database } from '~sTypes/database';

/* Store Imports */
import { useTipStore } from '~sStores/useTipStore';
import { useTotalStore } from '~sStores/useTotalStore';
import { useJobStore } from '~sStores/useJobStore';

/* Database */
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

/* Store definitions */
const tipStore = useTipStore()
const totalStore = useTotalStore()
const jobStore = useJobStore()

/* Fetch job data using store*/
jobStore.fetchJobs()

/* Tip Input Composable */
import useTipInput from '~sComposables/useTipInput';
const { submit, testing, post } = useTipInput()
///////////////////////////////////////////////////////////////////////////////////////////

/* Trial Post to Database */
// const dbPost = async (event: any) => {
//   // loading.value = true;
//   const { data, error } = await client
//     .from('jobs_duplicate')
//     .insert(event)
//     .select();
//   if (error) console.error(error);
//   console.log(event);
// };

/* Add Totals & Local State */
//#region
///////////////////////////////////////////////////////////////////////////////////////////
// /* Local Store & State*/
// let jobData = ref();
// let jobObj = reactive([]);
// let tipMap = new Map();

// /* Temp State Data */
// let state = reactive({
//   jid: "4",

//   clockIn: 0,
//   clockOut: 0,

//   cashTip: 0,
//   creditTip: 0,

//   foodSales: 111,
//   beerSales: 222,
//   liquorSales: 333,
//   wineSales: 444,
//   retailSales: 555,

//   guestNum: 0,
// })



// function addTotals(job, idx, arr) {

//   let parent = job.key
//   let val = job.value.value;
//   let child = job.value.child;

//   let sum = 0;

//   // FIXME let findP = (this.val / 100) * this.sum;

//   let length = Object.keys(child).length;
//   let count = 0;

//   Object.entries(tipStore.sales).forEach(([key, value]) => {
//     count = 0

//     Object.entries(child).forEach(([key2, value2]) => {
//       if (value2 === true && key === key2 && count < length) {
//         sum += value;
//         // console.log((val / 100) * this.sum)
//         count++;
//         tipMap.set(parent, sum);
//       } else {
//         count++;

//       }
//     });
//     console.log(tipMap)
//   });

//   /* TESTING */
//   // console.log(tipMap)
// }
/* Refactor */
/* add this to the submit button but leaving for testing purposes */
// function submit() {
//   Object.keys(tipStore.jobSelect.metadata).forEach((key) => {
//     tipStore.jobObj.push({ key: key, value: tipStore.jobSelect.metadata[key] })
//   },
//   )
//   tipStore.jobObj.forEach(addTotals, (job, idx, arr) => { return }) // I think this being nested will work.
// }

/* Nested into submit but leaving here for the time being */
// function what2() {
//   tipStore.jobObj.forEach(addTotals, (job, idx, arr) => { return })
// }
//#endregion

/* Testing */

async function onSubmit(event: FormSubmitEvent<any>) {
  // Object.keys(jobStore.jobSelect.metadata).forEach((key) => {
  //   jobStore.object.push({ key: key, value: jobStore.jobSelect.metadata[key] })
  // },
  // )
  // jobStore.object.forEach(addTotals, (job, idx, arr) => { return })

  submit() // composable
  testing() // composable
  post()

}
</script>

<template>
  <UContainer>
    <UForm ref="add-tip-form" :state="tipStore" @submit="onSubmit" class="p-4">
      <div class="py-3">
        <h1>Job</h1>
        <div class="pb-3">
          <UFormGroup label="Job">
            <USelect id="job-select" :options="jobStore.list" v-model="tipStore.job.id" label="select"
              option-attribute="name" value-attribute="id" />
          </UFormGroup>
        </div>
      </div>
      <!-- Date: (2) -->
      <div class="py-3">
        <div>
          <h1>Hours</h1>
        </div>
        <div class="columns-2">
          <UFormGroup label="Clock In Time" class="py-3">
            <UInput type="datetime-local" v-model="tipStore.hours.clockIn" name="in-time" />
          </UFormGroup>
          <UFormGroup label="Clock Out Time" class="py-3">
            <UInput type="datetime-local" v-model="tipStore.hours.clockOut" name="out-time" />
          </UFormGroup>
        </div>
      </div>
      <!-- /Date -->
      <!-- Income: (2) -->
      <div class="py-3">
        <div>
          <h1>Income</h1>
        </div>
        <div>
          <UFormGroup label="Cash Tips" class="py-3">
            <UInput type="number" v-model="tipStore.income.cashTip" name="cash-tips" step="0.00" class="remove-arrow" />
          </UFormGroup>
          <UFormGroup label="Credit Tips" class="py-3">
            <UInput type="number" v-model="tipStore.income.creditTip" name="credit-tips" step="0.00" />
          </UFormGroup>
        </div>
      </div>
      <!-- /Income -->
      <!-- Sales: (5) -->
      <div>
        <div>
          <h1>Sales</h1>
        </div>
        <div>
          <UFormGroup label="Food Sales" class="py-3">
            <UInput type="number" v-model="tipStore.sales.foodSales" name="food-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Beer Sales" class="py-3">
            <UInput type="number" v-model="tipStore.sales.beerSales" name="beer-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Liquor Sales" class="py-3">
            <UInput type="number" v-model="tipStore.sales.liquorSales" name="liquor-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Wine Sales" class="py-3">
            <UInput type="number" v-model="tipStore.sales.wineSales" name="wine-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Retail Sales" class="py-3">
            <UInput type="number" v-model="tipStore.sales.retailSales" name="retail-sales" step="0.00" />
          </UFormGroup>
        </div>
      </div>
      <!-- /Sales -->
      <!-- PPA: (1) -->
      <div>
        <div>
          <UFormGroup label="Guest Count" class="py-3">
            <UInput type="number" v-model="tipStore.stats.guestNum" name="guest-count" />
          </UFormGroup>
        </div>
      </div>
      <!-- /PPA -->
      <!-- Calculate -->
      <!-- /Calculate -->
      <!-- Submit -->
      <div class="py-3">
        <UButton type="submit">Submit</UButton>
      </div>
      <!-- /Submit -->
    </UForm>
  </UContainer>
</template>
