<script setup lang="ts">
/* Type Imports */
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { Database } from '~util/types/database'
import type Job from '~util/types/job'

/* Store Imports */
import { useTipInputStore } from '~util/stores/AddTip';
import { useCalcStore } from '~util/stores/Calc';
import { useJobStore } from '~util/stores/GetJobs';

/* Server */
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

/* Store definitions */
const tipInput = useTipInputStore()
const calcStore = useCalcStore()
const jobStore = useJobStore()

/* Fetch Job Data */
jobStore.fetch()


///////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////
/* Store & State*/
let jobData = ref();
let jobObj = reactive([]);

let state = reactive({
  jid: "4",

  clockIn: 0,
  clockOut: 0,

  cashTip: 0,
  creditTip: 0,

  foodSales: 111,
  beerSales: 222,
  liquorSales: 333,
  wineSales: 444,
  retailSales: 555,

  guestNum: 0,
})

/* Store busTip, barTip, foodTip vals here */
let tipMap = new Map();

function addTotals(job, idx, arr) {



  let parent = job.key
  let val = job.value.value;
  let child = job.value.child;



  let sum = 0;

  // // FIXME let findP = (this.val / 100) * this.sum;


  let length = Object.keys(child).length;
  let count = 0;


  Object.entries(tipInput.sales).forEach(([key, value]) => {
    count = 0

    Object.entries(child).forEach(([key2, value2]) => {
      if (value2 === true && key === key2 && count < length) {
        sum += value;
        console.log((val / 100) * this.sum)
        count++;
        tipMap.set(parent, sum);
      } else {
        count++;

      }
    });
  });

  /* TESTING */
  // console.log(tipMap)
}

/* Can just add this to the submit button but leaving for testing purposes */

// function submit() {
//   Object.keys(jobStore.jobSelect.metadata).forEach((key) => {
//     jobStore.jobObj.push({ key: key, value: jobStore.jobSelect.metadata[key] })
//   },
//   )
//   jobStore.jobObj.forEach(addTotals, (job, idx, arr) => { return }) // I think this being nested will work.
// }

/* Nested into submit but leaving here for the time being */
// function what2() {
//   jobStore.jobObj.forEach(addTotals, (job, idx, arr) => { return })
// }


/* just for funsies */
function resetJob() {
  jobStore.$reset()
}

async function onSubmit(event: FormSubmitEvent<any>) {
  Object.keys(jobStore.jobSelect.metadata).forEach((key) => {
    jobStore.jobObj.push({ key: key, value: jobStore.jobSelect.metadata[key] })
  },
  )
  jobStore.jobObj.forEach(addTotals, (job, idx, arr) => { return })


}
</script>

<template>
  <UContainer>
    <UForm ref="add-tip-form" :state="tipInput" @submit="onSubmit" class="p-4">
      <div class="py-3">
        <h1>Job</h1>
        <div class="pb-3">
          <UFormGroup label="Job">
            <USelect id="job-select" v-model="tipInput.jobData.jid" :options="jobStore.jobList" label="select"
              value-attribute="id" option-attribute="name" />
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
            <UInput type="datetime-local" v-model="tipInput.hours.clockIn" name="in-time" />
          </UFormGroup>
          <UFormGroup label="Clock Out Time" class="py-3">
            <UInput type="datetime-local" v-model="tipInput.hours.clockOut" name="out-time" />
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
            <UInput type="number" v-model="tipInput.income.cashTip" name="cash-tips" step="0.00" class="remove-arrow" />
          </UFormGroup>
          <UFormGroup label="Credit Tips" class="py-3">
            <UInput type="number" v-model="tipInput.income.creditTip" name="credit-tips" step="0.00" />
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
            <UInput type="number" v-model="tipInput.sales.foodSales" name="food-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Beer Sales" class="py-3">
            <UInput type="number" v-model="tipInput.sales.beerSales" name="beer-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Liquor Sales" class="py-3">
            <UInput type="number" v-model="tipInput.sales.liquorSales" name="liquor-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Wine Sales" class="py-3">
            <UInput type="number" v-model="tipInput.sales.wineSales" name="wine-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Retail Sales" class="py-3">
            <UInput type="number" v-model="tipInput.sales.retailSales" name="retail-sales" step="0.00" />
          </UFormGroup>
        </div>
      </div>
      <!-- /Sales -->
      <!-- PPA: (1) -->
      <div>
        <div>
          <UFormGroup label="Guest Count" class="py-3">
            <UInput type="number" v-model="tipInput.stats.guestNum" name="guest-count" />
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
  <button @click="resetJob">Reset</button>
</template>
