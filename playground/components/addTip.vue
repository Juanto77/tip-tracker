<script setup lang="ts">
/* ///////////////////////////////////////////////////////////////////////////////////////////

TODO - Refactor & Consolodate Code

TODO - Template Versions:
TODO  - All Manual input (no calc)
TODO  - All Manual input (no calc)
TODO  - No Sales Tracking 
TODO    - Cash Tips
TODO    - Credit Tips
TODO    - Total Sales
TODO    - Total Tipout

TODO - Test to see if this data can be referenced later on and elimanate function: jobData

TODO - Form Validation:
TODO   - Change input type=number to text, validate that only numbers are entered

///////////////////////////////////////////////////////////////////////////////////////////*/

// const loading = ref(false);
import type { FormError, FormSubmitEvent } from '#ui/types';
import type { Tables } from '~/types/database';
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
    .eq('user_id', user.value.id);

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
  input: undefined,
  inputMenu: undefined,
  textarea: undefined,
  select: undefined,
  selectMenu: undefined,
  checkbox: undefined,
  toggle: undefined,
  radio: undefined,
  radioGroup: undefined,
  switch: undefined,
  range: undefined,
});

async function onSubmit(event: FormSubmitEvent<any>) {
  const value = Number(event.data.select); //Was getting a string before
  // console.log(value);
}
/* /Form Logic */
///////////////////////////////////////////////////////////////////////////////////////////
</script>

<template>
  <UContainer>
    <UForm ref="add-tip-form" :state="state" @submit="onSubmit" class="p-4">
      <div class="py-3">
        <h1>Job</h1>
        <div class="pb-3">
          <UFormGroup label="Job">
            <USelect id="job-select" v-model="state.select" label="select" :options="listJob" value-attribute="id"
              option-attribute="name" />
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
            <UInput type="datetime-local" name="in-time" />
          </UFormGroup>
          <UFormGroup label="Clock Out Time" class="py-3">
            <UInput type="datetime-local" name="out-time" />
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
            <UInput type="number" name="cash-tips" step="0.00" class="remove-arrow" />
          </UFormGroup>
          <UFormGroup label="Credit Tips" class="py-3">
            <UInput type="number" name="credit-tips" step="0.00" />
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
            <UInput type="number" name="food-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Beer Sales" class="py-3">
            <UInput type="number" name="beer-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Liquor Sales" class="py-3">
            <UInput type="number" name="liquor-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Wine Sales" class="py-3">
            <UInput type="number" name="wine-sales" step="0.00" />
          </UFormGroup>
          <UFormGroup label="Retail Sales" class="py-3">
            <UInput type="number" name="retail-sales" step="0.00" />
          </UFormGroup>
        </div>
      </div>
      <!-- /Sales -->
      <!-- PPA: (1) -->
      <div>
        <div>
          <UFormGroup label="Guest Count" class="py-3">
            <UInput type="number" name="guest-count" />
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
