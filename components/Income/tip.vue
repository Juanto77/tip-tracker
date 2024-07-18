<script setup lang="ts">
    import type { Database } from '~/types/database'
    const client = useSupabaseClient<Database>();
    const user = useSupabaseUser();
    const tipStore = useTipStore();
    // tipStore.jobPull()
    import InputNumber from 'primevue/inputnumber';
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* TESTING GROUNDS */


</script>

<template>
    <div class="w-full flex justify-center">
        <div class="w-4/6">
            <div class="card">
                <label for="jobSelection">Job</label>
                <Select v-model="tipStore.jobSelect" :options="tipStore.jobArray" optionLabel="job_name" />
            </div>
            <div class="card">
                <div class="columns-2">
                    <label for="inName" class="block pb-2 font-normal">Clock In Time</label>
                    <DatePicker v-model="tipStore.inTime" id="inTime" showTime hour-format="12" />

                    <label for="outName" class="block pb-2 font-normal">Clock Out Time</label>
                    <DatePicker v-model="tipStore.outTime" id="outTime" showTime hour-format="12" />

                </div>
            </div>
            <div class="card">
                <title>Income</title>
                <div class="columns-2">
                    <div>
                        <label for="cashTip" class="block pb-2 font-normal">Cash Tip</label>
                        <InputGroup>
                            <InputGroupAddon>$</InputGroupAddon>
                            <InputNumber v-model="tipStore.cashTip" id="cashTip" />
                        </InputGroup>
                    </div>
                    <div>
                        <label for="cardTip" class="block pb-2 font-normal">Card Tip</label>
                        <InputGroup>
                            <InputGroupAddon>$</InputGroupAddon>
                            <InputNumber v-model="tipStore.creditTip" id="cardTip" />
                        </InputGroup>
                    </div>
                </div>
            </div>
            <div class="card">
                <title>Sales</title>
                <div class="lg:columns-5 sm:columns-0 justify-evenly">
                    <div v-for="item in tipStore.saleSource">
                        <label :for="`${item.name}_sales`">{{ item.name }}</label>
                        <InputGroup>
                            <InputGroupAddon>$</InputGroupAddon>
                            <InputNumber :id="`${item.name}_sales`" v-model="item.sales" />
                        </InputGroup>
                    </div>

                </div>
            </div>
            <div class="card">
                <label for="guestNum">Guest Number</label>
                <InputNumber id="guestNum" v-model="tipStore.totalGuest" inputId="integeronly" />
            </div>
            <div><button type="submit" @click="tipStore.onSubmit()">Submit</button></div>
            <div><button @click="tipStore.$reset()">Reset</button></div>
            <div><button @click="tipStore.$setState()">Set State</button></div>
            <div><button @click="tipStore.checkVal()">CheckVal</button></div>

        </div>
    </div>
    <div>

    </div>
</template>

<style scoped>
    label {
        display: block;
        padding-bottom: .5em;
        font-weight: 400;
    }

    .card {
        margin-top: 3em;
        margin-bottom: 3em;
        padding: 2em;
        border: 1px solid rgb(14, 8, 8);
        border-radius: 1.5em;
        width: 100%;
    }

    title {
        display: block;
        font-size: xx-large;
        margin-bottom: 1em;
        /* writing-mode: vertical-lr;
    text-orientation: upright; */

    }

    /* Input {
    display: inline-block;
    width: 100%;
} */
</style>