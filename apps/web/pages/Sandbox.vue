<template>
    <AccountUserProfile :userData="data" />
    <UIDividerTitle>
        <template #title>
            <h1>Jobs</h1>
        </template>
    </UIDividerTitle>
    <AccountUserJob :jobData="data.job_profile" />
    <!-- <AccountUserJob /> -->
</template>

<script setup lang="ts">
// import jobData from '~/assets/data-stream/profile-job-sample.json'

let loading = ref(true);



/*
let avatar_path = ref('') || '';

let username = ref('');
let password = ref('');
let email = ref('');
let website = ref('');
let fName = ref('');
let lName = ref('');
*/

// const [username, password, email, website, fName, lName] = defineModel()



const client = useSupabaseClient();
loading.value = true;
const user = useSupabaseUser();

const { data } = await client
    .from('profiles')
    .select(`*`)
    .eq('id', user.value.id)
    .single();

if (data) {
    loading.value = false;
}
console.log(data)


</script>