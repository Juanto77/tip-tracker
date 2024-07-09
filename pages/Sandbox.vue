<template>
    <AccountUserProfile :userData="data" />
    <UIDividerTitle>
        <template #title>
            <h1>Jobs</h1>
        </template>
    </UIDividerTitle>
    <AccountUserJob :jobData="data.job_profile" />
    <!-- <AccountUserJob /> --> <!-- <button type="submit" @click="addData">Add Data</button> -->
</template>

<script setup lang="ts">
import type selectbutton from '~/assets/presets/tw-lara/selectbutton';

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



// /* Non Auth User
const { data, error } = await client
    .from('profiles')
    .select(`*`)
    .single();
// */


if (data) {
    loading.value = false;
} else if (error) {
    console.error(error)
}

// console.log(data)


/*
const job_profile =
    [
        {
            "id": "3XcoUF",
            "name": "Q39",
            "active": true,
            "params": {
                "cardFee": 2.25
            },
            "metadata": {
                "barTip": {
                    "value": 5,
                    "beerSales": true,
                    "foodSales": false,
                    "wineSales": true,
                    "liquorSales": true,
                    "retailSales": false
                },
                "busTip": {
                    "value": 1,
                    "beerSales": true,
                    "foodSales": true,
                    "wineSales": true,
                    "liquorSales": true,
                    "retailSales": false
                },
                "foodTip": {
                    "value": 2,
                    "beerSales": false,
                    "foodSales": true,
                    "wineSales": false,
                    "liquorSales": false,
                    "retailSales": false
                }
            },
            "calculate": true
        },
        {
            "id": "YEmuJv",
            "name": "Twat",
            "active": true,
            "params": {
                "cardFee": 2.25
            },
            "metadata": {
                "barTip": {
                    "value": 5,
                    "beerSales": true,
                    "foodSales": false,
                    "wineSales": true,
                    "liquorSales": true,
                    "retailSales": false
                },
                "busTip": {
                    "value": 1,
                    "beerSales": true,
                    "foodSales": true,
                    "wineSales": true,
                    "liquorSales": true,
                    "retailSales": false
                },
                "foodTip": {
                    "value": 2,
                    "beerSales": false,
                    "foodSales": true,
                    "wineSales": false,
                    "liquorSales": false,
                    "retailSales": false
                }
            },
            "calculate": true
        }
    ]
    */



// console.log(update)
/*
async function updateProfile() {
    const client = await useSupabaseClient()
    // const user = useSupabaseUser()
    console.log(user)

    const { data, error } = await client.from('profiles').update({
        'job_profile': {
            '3XcoUF': {
                'category': {
                    'Beer Sales': use_uid(),
                    'Food Sales': use_uid(),
                    'Liquor Sales': use_uid(),
                    'Wine Sales': use_uid(),
                    'Retail Sales': use_uid(),
                }
            }
        }
    }).eq('id', user.value.id)
    
}
*/
updateProfile()
// console.log(JSON.stringify({ job_profile }))
console.log(user.value?.id)

</script>