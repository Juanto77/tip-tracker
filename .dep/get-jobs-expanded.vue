<script setup lang="ts">
// const loading = ref(true);
import type { FormError, FormSubmitEvent } from '#ui/types';
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

///////////////////////////////////////////////////////////////////////////////////////////
/* Ref Job Info */
//#region
// const jobID = ref(0);
// const jobName = ref('');
// const busTip = ref(0);
// const barTip = ref(0);
// const foodTip = ref(0);
// const cardFee = ref(0);
//#endregion

//GET JOB DATA
//#region

// cant end with .single() because this will return all of the jobs associated with the user
const { data } = await client
  .from('jobs')
  .select(`*`)
  .eq('user_id', user.value.id);
// console.log([data]);

// Traverse through array and get job vals
//#region

let jobs: any = [];

let jobName = data?.forEach((job) => {
  jobs.push({ id: job.id, name: job.name });
});

//#endregion

// How do I create a drop down menu with a list for each job, allow user to select a job, and pass through the rest of job info to the input valus to calculate totals?
//#region
// Get each job name and ID

// function getJobs() {
//   data.forEach((job) =>
//     console.log({
//       id: job.id,
//       name: job.name,
//     })
//   );
// }
// getJobs();

// Pass through a job ID to function to get rest of job data
// async function jobData(selID) {
//   const { data } = await client.from('jobs').select(`*`).eq('id', selID);
//   let sel = data[0]['tip_metab'];
//   console.log(sel);
//   Object.entries(sel).forEach(([key, value]) => {
//     console.log(`${key}: ${value}`);
//   });
// }
let jobArray: any = [];
/* Typecheck fix */
async function jobData(selID) {
  const { data } = await client.from('jobs').select(`*`).eq('id', selID);
  if (data) {
    const selectedJob = data.find((job) => job.id === selID);
    console.log(selectedJob); //This returns a single job object

    Object.entries(selectedJob).forEach((key, value) => {
      console.log(`${key}: ${value}`); // This will return individual lines of the object
    });
  }
}
jobData(1);

//#endregion

//How to store values from each job for user selection?

// if (data) {
//   jobID.value = data.id;
//   jobName.value = data.name;
//   busTip.value = data.bus_tip;
//   barTip.value = data.bar_tip;
//   foodTip.value = data.food_tip;
//   cardFee.value = data.card_fee;
// }
// console.log(data);

//#endregion
// const selected = ref(jobs.id);

/* Form Logic */
///////////////////////////////////////////////////////////////////////////////////////////
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

// async function onSubmit(event: FormSubmitEvent<any>) {
//   // jobData(event.data.select);
//   console.log(event.data.select);
//   let jobData = {}
//   const { data } = await client
//     .from('jobs')
//     .select(`*`)
//     .eq('id', event.data.select);
//   if (data) {
//     const selectedJob = data.find((job) => job.id === event.data.select);
//     Object.entries(selectedJob).forEach(([key, value]) => {
//       jobData ={`${key}: ${value}`}
//     });
//   }
// }

///////////////////////////////////////////////////////////////////////////////////////////
</script>

<template>
  <UForm ref="form" :state="state" @submit="onSubmit">
    <UFormGroup label="select">
      <USelect
        v-model="state.select"
        label="select"
        :options="jobs"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>
    <UButton type="submit">Submit</UButton>
  </UForm>
  <!-- <UInputMenu
    v-model="selected"
    :options="jobs"
    value-attribute="id"
    option-attribute="name"
  /> -->
</template>
