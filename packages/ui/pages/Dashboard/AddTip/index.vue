<script setup lang="ts">
/* Type Imports */
// import type { FormError, FormSubmitEvent } from '#ui/types';
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

</script>

<template>
    <div class="w-full flex justify-center">
        <div class="w-4/6">
            <div class="card">
                <label for="jobSelection">Job</label>
                <Dropdown id="jobSelection" v-model="tipStore.job.id" :options="jobStore.list" placeholder="Job"
                    option-value="id" option-label="name" />
            </div>
            <div class="card">
                <title>Hours</title>
                <div class="columns-2">
                    <label for="inName">Clock In Time</label>
                    <LibInputCalendar id="inTime" showTime hour-format="12" v-model="tipStore.hours.clockIn" />
                    <label for="outName">Clock Out Time</label>
                    <LibInputCalendar id="outTime" showTime hour-format="12" v-model="tipStore.hours.clockOut" />
                </div>
            </div>
            <div class="card">
                <title>Income</title>
                <div class="columns-2">
                    <div>
                        <label for="cashTip">Cash Tip</label>
                        <LibInputNumber id="cashTip" v-model="tipStore.income.cashTip" inputId="currency-us"
                            mode="currency" currency="USD" locale="en-us" />
                        <!-- <InputNumber id="cashTip" v-model="tipStore.income.cashTip" inputId="currency-us"
                            mode="currency" currency="USD" locale="en-us" /> -->
                    </div>
                    <div>
                        <label for="cardTip">Card Tip</label>
                        <LibInputNumber id="cardTip" v-model="tipStore.income.creditTip" inputId="currency-us"
                            mode="currency" currency="USD" locale="en-us" />
                    </div>
                </div>
            </div>
            <div class="card">
                <title>Sales</title>
                <div class="lg:columns-5 sm:columns-0 justify-evenly">
                    <div>
                        <label for="foodSales">Food Sales</label>
                        <LibInputNumber id="foodSales" v-model="tipStore.sales.foodSales" inputId="currency-us"
                            mode="currency" currency="USD" locale="en-us" />
                    </div>
                    <div>
                        <label for="beerSales">Beer Sales</label>
                        <LibInputNumber id="beerSales" v-model="tipStore.sales.beerSales" inputId="currency-us"
                            mode="currency" currency="USD" locale="en-us" />
                    </div>
                    <div>
                        <label for="wineSales">Wine Sales</label>
                        <LibInputNumber id="wineSales" v-model="tipStore.sales.wineSales" inputId="currency-us"
                            mode="currency" currency="USD" locale="en-us" />
                    </div>
                    <div>
                        <label for="liquorSales">Liquor Sales</label>
                        <LibInputNumber id="liquorSales" v-model="tipStore.sales.liquorSales" inputId="currency-us"
                            mode="currency" currency="USD" locale="en-us" />
                    </div>
                    <div>
                        <label for="retailSales">Retail Sales</label>
                        <LibInputNumber id="retailSales" v-model="tipStore.sales.retailSales" inputId="currency-us"
                            mode="currency" currency="USD" locale="en-us" />
                    </div>
                </div>
            </div>
            <div class="card">
                <label for="guestNum">Guest Number</label>
                <LibInputNumber id="guestNum" v-model="tipStore.stats.guestNum" inputId="integeronly" />
            </div>
            <button type="submit">Submit</button>
        </div>
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
