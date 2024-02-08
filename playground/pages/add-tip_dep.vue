<!-- 
  TODO: 
  - ~~Connect to API for post~~
  - ~~Connect to Job & Get Tip %~~
  - Insert todays date in date field
  - 
-->

<script setup>
const client = useSupabaseClient();
const loading = ref(true);

// DECLARATIONS: USER INPUT / TIP OUT / CALCULATIONS
// #region
const user = useSupabaseUser();
const date = ref("");
const cash = ref("");
const credit = ref("");
const beerSales = ref("");
const foodSales = ref("");
const liquorSales = ref("");
const wineSales = ref("");
const retailSales = ref("");
const guestCount = ref("");
// JOB & GET TIP OUT INFORMATION
const jobID = ref(0);
const jobName = ref("");
const busTip = ref(0);
const barTip = ref(0);
const foodTip = ref(0);
const cardFee = ref(0);
//CALCULATIONS
const tSales = ref(0);
const barSales = ref(0);
const busSales = ref(0);
const cardProcess = ref(0);
const creditOut = ref(0);
const foodOut = ref(0);
const barOut = ref(0);
const busOut = ref(0);
const revTotal = ref(0);
const ppa = ref(0);
const liquorPercent = ref(0);
// #endregion
///////////////////////////////////////////////////////////////////////////////////////////

loading.value = true;

// Calculate vals from user input
// #region
function calculate() {
  tSales.value =
    foodSales.value +
    beerSales.value +
    liquorSales.value +
    wineSales.value +
    retailSales.value;
  // barSales.value = beerSales.value + liquorSales.value + wineSales.value;
  barOut.value =
    barTip.value % (beerSales.value + liquorSales.value + wineSales.value);
  busOut.value =
    busTip.value %
    (foodSales.value + beerSales.value + liquorSales.value + wineSales.value);
  foodOut.value = foodTip.value % foodSales.value;
  cardProcess.value = cardFee.value % credit.value;
  creditOut.value =
    credit.value -
    (cardFee.value % credit.value) -
    foodOut.value -
    barOut.value -
    busOut.value;
  revTotal.value =
    credit.value +
    cash.value -
    foodOut.value -
    barOut.value -
    busOut.value -
    cardProcess.value;
  ppa.value = tSales.value / guestCount.value;
  liquorPercent.value =
    (beerSales.value + liquorSales.value + wineSales.value) / foodSales.value;
}
//#endregion
///////////////////////////////////////////////////////////////////////////////////////////

//GET JOB DATA
//#region
const { data } = await client
  .from("jobs")
  .select(`*`)
  .eq("user_id", user.value.id)
  .single();

if (data) {
  jobID.value = data.id;
  jobName.value = data.name;
  busTip.value = data.bus_tip;
  barTip.value = data.bar_tip;
  foodTip.value = data.food_tip;
  cardFee.value = data.card_fee;
}

//#endregion
///////////////////////////////////////////////////////////////////////////////////////////

loading.value = false;

// TIP DATA HANDLER: POST TO DATABASE
// #region

async function submitData() {
  try {
    loading.value = true;
    const user = useSupabaseUser();
    calculate();
    const updates = {
      user_id: user.value.id,
      job_id: jobID.value,
      date: date.value,
      cash: cash.value,
      credit: credit.value,
      beer_sales: beerSales.value,
      food_sales: foodSales.value,
      liquor_sales: liquorSales.value,
      wine_sales: wineSales.value,
      retail_sales: retailSales.value,
      guest_count: guestCount.value,
      bus_tip: busTip.value,
      bar_tip: barTip.value,
      food_tip: foodTip.value,
      ///
      card_fee: cardFee.value,
      food_out: foodOut.value,
      bar_out: barOut.value,
      bus_out: busOut.value,
      card_fee: cardFee.value,
      food_out: foodOut.value,
      bar_out: barOut.value,
      bus_out: busOut.value,
      ppa: ppa.value,
      liquor_percent: liquorPercent.value,
      total_revenue: revTotal.value,
      credit_revenue: creditOut.value,
    };

    const { error } = await client
      .from("tips")
      .insert(updates, {
        return: "minimal",
      })
      .single();
    if (error) throw error;
    console.log(updates);
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
// #endregion
///////////////////////////////////////////////////////////////////////////////////////////

//DEPRECIATED CODE
//#region
// const getTipData = async () => {
//   const user = useSupabaseUser();

//   const { data } = await client
//     .from("jobs")
//     .select("*")
//     .eq("user_id", user.value.id)
//     .single();
//   if (data) {
//     jobID.value = data.id;
//     busTip.value = data.bus_tip;
//     barTip.value = data.bar_tip;
//     foodTip.value = data.food_tip;
//   }
//   return data;
// };
// getTipData;

//#endregion
///////////////////////////////////////////////////////////////////////////////////////////
</script>

<template>
  <form class="form-widget" @submit.prevent="submitData">
    <div>
      <label for="date">Date</label>
      <input id="date" type="date" v-model="date" />
    </div>
    <!-- <div>
      <label for="inTime">In Time</label>
      <input id="inTime" type="time" v-model="inTime" />
    </div>
    <div>
      <label for="outTime">Out Time</label>
      <input id="outTime" type="time" v-model="outTime" />
    </div> -->
    <div>
      <label for="cash">Cash</label>
      <input id="cash" type="number" step=".01" v-model="cash" />
    </div>
    <div>
      <label for="credit">Credit</label>
      <input id="credit" type="number" step=".01" v-model="credit" />
    </div>
    <div>
      <label for="beer_sales">Beer Sales</label>
      <input id="beer_sales" type="number" step=".01" v-model="beerSales" />
    </div>
    <div>
      <label for="food_sales">Food Sales</label>
      <input id="food_sales" type="number" step=".01" v-model="foodSales" />
    </div>
    <div>
      <label for="liquor_sales">Liquor Sales</label>
      <input id="liquor_sales" type="number" step=".01" v-model="liquorSales" />
    </div>
    <div>
      <label for="wine_sales">Wine Sales</label>
      <input id="wine_sales" type="number" step=".01" v-model="wineSales" />
    </div>
    <div>
      <label for="retail_sales">Retail Sales</label>
      <input id="retail_sales" type="number" step=".01" v-model="retailSales" />
    </div>
    <div>
      <label for="guest_count">Guest Count</label>
      <input id="guest_count" type="number" v-model="guestCount" />
    </div>
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
    <div>
      <label for="card_fee">Card Fee</label>
      <input id="card_fee" type="number" step=".01" v-model="cardFee" />
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
