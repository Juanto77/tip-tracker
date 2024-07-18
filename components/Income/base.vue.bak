<script setup lang="ts">
/* Nuxt UI Version */

/* Type Imports */
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { Database } from '~sTypes/database';

/* Store Imports */

import { useTipStore } from '~Dashboard/stores/useTipStore';
import { useTotalStore } from '~Dashboard/stores/useTotalStore';
import { useJobStore } from '~Dashboard/stores/useJobStore';

/* Database */
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

/* Store definitions */
const tipStore = useTipStore();
const totalStore = useTotalStore();
const jobStore = useJobStore();

/* Fetch job data using store*/
jobStore.fetchJobs();

/* Tip Input Composable */
import { useTipInput } from '#imports';
const { submit, testing, post } = useTipInput();

async function onSubmit( event: FormSubmitEvent<any> ) {
  // Object.keys(jobStore.jobSelect.metadata).forEach((key) => {
  //   jobStore.object.push({ key: key, value: jobStore.jobSelect.metadata[key] })
  // },
  // )
  // jobStore.object.forEach(addTotals, (job, idx, arr) => { return })

  submit(); // composable
  testing(); // composable
  post();

}
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
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


/* Testing */

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
~/composables/useTipInput