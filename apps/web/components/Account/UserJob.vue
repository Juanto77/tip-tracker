<template :jobData="fallBackData">

    <UIPageContainerLr>
        <template v-for="j in jobData">
            <UIPageCardBaseHeader>
                <template #header>
                    <div class="text-center">
                        <h1 class="text-3xl">{{ j.name }}</h1>
                    </div>
                </template>
                <template #content>


                    <form class="md:col-span-2">
                        <!-- <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6"> -->
                        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <!--    <div class="col-span-full flex items-center gap-x-8">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="" class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
                                <div>
                                    <button type="button"
                                        class="rounded-md bg-text-black/10 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-text-black/20">Change
                                        avatar</button>
                                    <p class="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div> -->
                            <div class="sm:col-span-3">
                                <label for="first-name" class="block text-sm font-medium leading-6 text-black">
                                    Job Name</label>
                                <div class="mt-2">
                                    <!-- <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                        v-model="j.name"
                                        class="block w-full rounded-md border-0 bg-text-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-text-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" /> -->
                                    <UIInputText type="text" name="first-name" id="first-name" v-model="j.name" />
                                </div>
                            </div>
                            <div class="sm:col-span-3">
                                <label for="last-name" class="block text-sm font-medium leading-6 text-black">
                                    Last name
                                </label>
                                <div class="mt-2">
                                    <UIInputText type="text" name="last-name" id="last-name" autocomplete="family-name"
                                        v-model="j.id" />
                                    <!-- <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                        v-model="j.id"
                                        class="block w-full rounded-md border-0 bg-text-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-text-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" /> -->
                                </div>
                            </div>
                            <div class="col-span-full">
                                <label for="email" class="block text-sm font-medium leading-6 text-black">
                                    Email address
                                </label>
                                <div class="mt-2">
                                    <input id="email" name="email" type="email" autocomplete="email"
                                        class="block w-full rounded-md border-0 bg-text-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-text-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div class="col-span-full">
                                <label for="username" class="block text-sm font-medium leading-6 text-black">
                                    Username
                                </label>
                                <div class="mt-2">
                                    <div
                                        class="flex rounded-md bg-text-black/5 ring-1 ring-inset ring-text-black/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <!-- <span
                                            class="flex select-none items-center pl-3 text-gray-400 sm:text-sm">example.com/</span> -->
                                        <input type="text" name="username" id="username" autocomplete="username"
                                            class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="janesmith" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-full">
                                <label for="timezone"
                                    class="block text-sm font-medium leading-6 text-black">Timezone</label>
                                <div class="mt-2">
                                    <select id="timezone" name="timezone"
                                        class="block w-full rounded-md border-0 bg-text-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-text-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black">
                                        <option>Pacific Standard Time</option>
                                        <option>Eastern Standard Time</option>
                                        <option>Greenwich Mean Time</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mt-8 flex">
                            <button type="submit"
                                class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                        </div>
                    </form>


                </template>
            </UIPageCardBaseHeader>
        </template>
    </UIPageContainerLr>

</template>
<script setup lang="ts">
import data from '~/assets/data-stream/profile-job-sample.json'
const fallBackData = data



const props = defineProps({
    jobData: {
        type: Object,
        // required: true,
    }
})

// let name = ref('')

if (props.jobData) {
    // console.log(props.jobData)
}
/*
const fallback = [
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

/*
const client = useSupabaseClient();

let loading = ref(true);
let avatar_path = ref('') || '';

let username = ref('');
let password = ref('');
let email = ref('');
let website = ref('');
let fName = ref('');
let lName = ref('');

// const [username, password, email, website, fName, lName] = defineModel()


loading.value = true;
const user = useSupabaseUser();

const { data } = await client
    .from('profiles')
    .select(`username, website, avatar_url`)
    .eq('id', user.value.id)
    .single();

if (data) {
}

console.log(data)
*/

</script>