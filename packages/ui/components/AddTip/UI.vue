<script setup lang="ts">
// const loading = ref(false);
import type { FormError, FormSubmitEvent } from '#ui/types';
import type Job from '~util/types/job'
import { useTipInputStore } from '~util/stores/AddTip';
import { useCalcStore } from '~util/stores/Calc';
import { useJobStore } from '~util/stores/GetJobs';
import { object } from 'zod';
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const tipInput = useTipInputStore()
const calcStore = useCalcStore()
const jobStore = useJobStore()

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
///////////////////////////////////////////////////////////////////////////////////////////
// async function parent() {
//   const input = toRaw(tip.sales)
//   const meta = toRaw(jobStore.returnTipMeta)
//   return { input, meta }
// }
/* recursive approach */
// function iterate(obj) {
//   Object.keys(obj).forEach((key) => {
//     // console.log(`${key}: ${obj[key]}`)
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       iterate(obj[key])
//       console.log(obj[key])
//     }
//   })
// }

/* non-recurisve approach */
// function iterate(obj) {
//   const stack = [obj];
//   const bar = [obj]
//   while (stack?.length > 0) {
//     const currentObj = stack.pop();
//     Object.keys(currentObj).forEach((key) => {
//       console.log(`key: ${key}, value: ${currentObj[key]}`)
//       if (typeof currentObj[key] === 'object' && key == 'barTip') {
//         stack.push(currentObj[key])
//         console.log('foundbar')
//       } else if (typeof currentObj[key] === 'object' && key == 'busTip') {
//         stack.push(currentObj[key])
//         console.log('foundbus')
//       }
//     })
//   }
// };


function what() {
  //Push truthy keys to array
  const arr = []
  //Remove Falsy Values
  Object.entries(jobStore.barTip.child).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
  })

  //Remaining values in array will grab respective from user input

}


/////////////////////////////////////////////////////////////////////////////////////////
// Object.keys(obj).forEach((key) => {
//   const barTip = calcStore.barTip
//   const busTip = calcStore.busTip
//   const foodTip = calcStore.foodTip
//   const value = obj[key]
//   // console.log(key)
//   // console.log([key, toRaw(value)])
//   // console.log(`${ key }: ${ value }`)
//   ///////////////////////////////////////////////////////////////////////////////////////////
//   /* // Loops through object and pushes to store but */
//   Object.keys(value).forEach((key2) => {
//     console.log([`${key}: ${value[key2]}`, `${key2}: ${value[key2]}`])
//     // console.log(`${ key }: `, `${ key2 }: ${ value[key2]}`)
//     if (key == 'barTip' && typeof key === 'object') {
//       barTip.push(`${key}: ${value[key2]}`)
//     } else if (key == 'busTip') {
//       busTip.push(value[key2])
//     } else {
//       foodTip.push(value[key2])
//     }
//   })
//   console.log(key, value)
//   // ///////////////////////////////////////////////////////////////////////////////////////////
// })
///////////////////////////////////////////////////////////////////////////////////////////
//This works with new data structure
// Object.entries(obj).forEach(([key, value]) => {
//   const val = obj[key]
//   // console.log(key, toRaw(value))
//   Object.entries(val).forEach(([key2, value2]) => {
//     console.log(`${key}: ${key2}, ${value2}`)
//   })
// })

///////////////////////////////////////////////////////////////////////////////////////////
// for (const [key, value] of Object.entries(obj)) {
//   // let obj = key;
//   // for (const [key2, value2] of Object.entries(obj[m])) {
//   //   console.log(`${ key2 }: ${ value2 }`)
//   // }
//   console.log(`${key}: ${value}`)
// }
///////////////////////////////////////////////////////////////////////////////////////////

// Object.keys(jobStore.foodTip.child).forEach((key) => {

//   console.log(key, value)

// })
// }
///////////////////////////////////////////////////////////////////////////////////////////
// const tipInput = useTipInputStore()
// const calcStore = useCalcStore()
// const jobStore = useGetJobStore()
async function onSubmit(event: FormSubmitEvent<any>) {
  // const value = Number(event.data.job); //Was getting a string before
  // console.log(event)
  const user = useSupabaseUser();
  what()
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
</template>
