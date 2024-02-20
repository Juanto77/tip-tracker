const tipRawData = {
    id: 11,
    user_id: 'a74c9361-2585-4154-91f8-3d378d51377e',
    job_id: 1,
    pa: 4,
    data: '2023-01-20',
    in_time: '15:16:00',
    out_time: '23:32:00',
    total_hours: 8.266666667,
    cash: 191.0,
    credit: 375.44,
    beerSales: 290.0,
    foodSales: 1875.88,
    liquorSales: 277.0,
    retailSales: 0,
    wine_salese: 0,
    guest_count: 73,
    busTip: 0,
    barTip: 0,
    foodTip: 0,
    card_fee: 0,
    food_out: 0,
    bar_out: 0,
    bus_out: 0,
    ppa: 0,
    liquor_percent: 0,
    total_revenue: 0,
    credit_revenue: 0,
};

const jobRawData = [
    {
        id: 1,
        user_id: 'a74c9361-2585-4154-91f8-3d378d51377e',
        name: 'Q39',
        card_fee: 2.25,
        metadata: {
            barTip: {
                value: 5,
                // "beerSales": true,
                foodSales: false,
                // "wineSales": true,
                // "liquorSales": true,
                retailSales: false,
            },
            busTip: {
                value: 1,
                beerSales: true,
                foodSales: true,
                wineSales: true,
                liquorSales: true,
                retailSales: false,
            },
            params: {
                cardFee: 2.25,
            },
            foodTip: {
                value: 2,
                beerSales: false,
                foodSales: true,
                wineSales: false,
                liquorSales: false,
                retailSales: false,
            },
        },
        metadata_d: [
            {
                cardFee: 2.25,
            },
            {
                title: 'barTip',
                value: 5,
                beerSales: true,
                foodSales: false,
                wineSales: true,
                liquorSales: true,
                retailSales: false,
            },
            {
                title: 'busTip',
                value: 1,
                beerSales: true,
                foodSales: true,
                wineSales: true,
                liquorSales: true,
                retailSales: false,
            },
            {
                title: 'foodTip',
                value: 2,
                beerSales: false,
                foodSales: true,
                wineSales: false,
                liquorSales: false,
                retailSales: false,
            },
        ],
        calc: true,
    },
    {
        id: 2,
        user_id: 'a74c9361-2585-4154-91f8-3d378d51377e',
        name: 'Cheesecake factory',
        card_fee: 2.25,
        metadata: null,
        metadata_d: null,
        calc: false,
    },
    {
        id: 4,
        user_id: 'a74c9361-2585-4154-91f8-3d378d51377e',
        name: 'UseThis',
        card_fee: 2.25,
        params: {
            cardFee: 2.25,
        },
        metadata: {
            barTip: {
                child: {
                    beerSales: true,
                    foodSales: false,
                    wineSales: true,
                    liquorSales: true,
                    retailSales: false,
                },
                value: 5,
            },
            busTip: {
                child: {
                    beerSales: true,
                    foodSales: true,
                    wineSales: true,
                    liquorSales: true,
                    retailSales: false,
                },
                value: 1,
            },
            foodTip: {
                child: {
                    beerSales: false,
                    foodSales: true,
                    wineSales: false,
                    liquorSales: false,
                    retailSales: false,
                },
                value: 2,
            },
        },
        metadata_d: [
            {
                cardFee: 5,
            },
            {
                title: 'barTip',
                value: 5,
                beerSales: true,
                foodSales: false,
                wineSales: true,
                liquorSales: true,
                retailSales: false,
            },
            {
                title: 'busTip',
                value: 1,
                beerSales: true,
                foodSales: true,
                wineSales: true,
                liquorSales: true,
                retailSales: false,
            },
            {
                title: 'foodTip',
                value: 2,
                beerSales: false,
                foodSales: true,
                wineSales: false,
                liquorSales: false,
                retailSales: false,
            },
        ],
        calc: true,
    },
];
////////////////////////////////////////////////////////

/* Data */

const tipData = tipRawData;
const jobData = jobRawData[2].metadata;

/* Input Data */

const inputData = {
    foodSales: 111,
    beerSales: 222,
    wineSales: 333,
    liquorSales: 444,
    retailSales: 555,
};

/* Workable Arrays */

const jobObj = [];
const tipObj = [];


/* Calc Data */
const totalSales = 0; // 1665
const barTotal = 0; // 999
const foodTotal = 0; // 111

/* Tip Section */
const barTip = 0; // 999
const busTip = 0; // 1110
const foodTip = 0; // 111

// iters over raw job data to return workable data for function: holler
Object.keys(jobData).forEach((key) => {
    jobObj.push({ key, value: jobData[key] }); //Returns an array of objects{key: 'Key name", value:{Value Data}}. Would be good to parse data for FormKit selection drop down.
});

/* Store busTip, barTip, foodTip vals here */
let tipMap = new Map();
function holler(job, idx, arr) {
    /* Variables from forEach */ ///////////////////////////////////////////////////////////////////////////////////////////

    let parent = arr[idx].key; // Parent Category ('barTip', 'busTip', 'foodTip')
    let val = arr[idx].value.value; // Category Value ('barTip: 5', 'busTip: 1', 'foodTip:
    let child = arr[idx].value.child; // Child Category ('Value' : boolean...)

    /* Function Calculator */ ///////////////////////////////////////////////////////////////////////////////////////////

    let sum = 0;
    let findP = (val / 100) * this.sum;

    let length = Object.keys(child).length;

    /* Lets Try Something New */ ///////////////////////////////////////////////////////////////////////////////////////////
    let count = 0;

    Object.entries(inputData).forEach(([key, value]) => {
        count=0
        //console.log('Outer Count:', count);
        // console.log(key, value) // return ex: foodSales 111

        Object.entries(child).forEach(([key2, value2]) => {
            // console.log(key) //return foodSales, beerSales, etc...
            // console.log(parent, key2, value2) //return examples: 'barTip' arr: ["beerSales", true]
            if (value2 === true && key === key2 && count < length) {
                sum += value;
                count++;
                tipMap.set(parent, sum);
                
                // console.log('If Count:', count);
            } else if (value2 !== true) {
                count++;

                // console.log('Else if Count:', count)
            } else {
                count++;
                // console.log('Else Count:', count)
            }
        });
    });
}

/* The start of it all. */
jobObj.forEach(holler, (job, idx, arr) => {return});
