<script setup>
/* Adding tip entries to database via function. */

/* TODO
- Refactor & use store to hold tip entires before push to db
*/
const client = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref(true);

/* User Input */
let user_id_input = user.value.id;
let date_input = ref().value;
let cash_input = ref(0).value;
let credit_input = ref(0).value;
let beer_sales_input = ref(0).value;
let food_sales_input = ref(0).value;
let liquor_sales_input = ref(0).value;
let wine_sales_input = ref(0).value;
let retail_sales_input = ref(0).value;
let guest_count_input = ref(0).value;

/* JOB */
const job_id_input = 1;

///////////////////////////////////////////////////////////////////////////////////////////
loading.value = false;

const postTips = async () => {
  loading.value = true;
  let { data, error } = await client.rpc("new_tip", {
    beer_sales_input,
    cash_input,
    credit_input,
    date_input,
    food_sales_input,
    guest_count_input,
    job_id_input,
    liquor_sales_input,
    retail_sales_input,
    user_id_input,
    wine_sales_input,
  });
  if (error) console.error(error, data);
};
///////////////////////////////////////////////////////////////////////////////////////////
</script>
<template>
  <form class="form-widget px-5" @submit.prevent="postTips">
    <!-- Time -->
    <div>
      <div>
        <label for="date">Date</label>
        <input id="date" type="date" v-model="date_input" />
      </div>
      <div>
        <label for="inTime">In Time</label>
        <input id="inTime" type="time" v-model="inTime" />
      </div>
      <div>
        <label for="outTime">Out Time</label>
        <input id="outTime" type="time" v-model="outTime" />
      </div>
    </div>
    <!-- User Income -->
    <div>
      <div class="p-3">
        <label for="cash">Cash</label>
        <input id="cash" type="number" step=".01" v-model="cash_input" />
      </div>
      <div class="p-3">
        <label for="credit">Credit</label>
        <input id="credit" type="number" step=".01" v-model="credit_input" />
      </div>
    </div>
    <!-- Sales Input -->
    <div>
      <div>
        <label for="beer_sales">Beer Sales</label>
        <input
          id="beer_sales"
          type="number"
          step=".01"
          v-model="beer_sales_input"
        />
      </div>
      <div>
        <label for="food_sales">Food Sales</label>
        <input
          id="food_sales"
          type="number"
          step=".01"
          v-model="food_sales_input"
        />
      </div>
      <div>
        <label for="liquor_sales">Liquor Sales</label>
        <input
          id="liquor_sales"
          type="number"
          step=".01"
          v-model="liquor_sales_input"
        />
      </div>
      <div>
        <label for="wine_sales">Wine Sales</label>
        <input
          id="wine_sales"
          type="number"
          step=".01"
          v-model="wine_sales_input"
        />
      </div>
      <div>
        <label for="retail_sales">Retail Sales</label>
        <input
          id="retail_sales"
          type="number"
          step=".01"
          v-model="retail_sales_input"
        />
      </div>
    </div>
    <!-- PPA -->
    <div>
      <div>
        <label for="guest_count">Guest Count</label>
        <input id="guest_count" type="number" v-model="guest_count_input" />
      </div>
    </div>
    <!-- Tip out Vals -->
    <div>
      <div>
        <label for="bus_tip">Bus Tip</label>
        <input id="bus_tip" type="number" v-model="busTip" />
      </div>
      <div>
        <label for="bar_tip">Bar Tip</label>
        <input id="bar_tip" type="number" v-model="barTip" />
      </div>
      <div>
        <label for="food_tip">Food Tip</label>
        <input id="food_tip" type="number" v-model="foodTip" />
      </div>
    </div>
    <!-- Other Fees -->
    <div>
      <div>
        <label for="card_fee">Card Fee</label>
        <input id="card_fee" type="number" step=".01" v-model="cardFee" />
      </div>
    </div>
    <div>
      <input type="submit" :value="loading ? 'Loading...' : 'Add Tip'" />
    </div>
  </form>
  <!-- <FormKit type="form" id="add_tip" submit-label="Add Tip" @submit="submitForm">
    <FormKit type="date" name="date" label="Date" />
    <FormKit type="number" name="cash" label="cash" />
    <FormKit type="number" name="credit" label="credit" />
    <FormKit type="number" name="beer_sales" label="beer sales" />
    <FormKit type="number" name="food_sales" label="food sales" />
    <FormKit type="number" name="liquor_sales" label="liquor sales" />
    <FormKit type="number" name="retail_sales" label="retail sales" />
    <FormKit type="number" name="wine_sales" label="wine sales" />
    <FormKit type="number" name="guest_count" label="guest count" />
  </FormKit> -->
</template>
