const tipRawData = {
    "id": 11,
    "user_id": "a74c9361-2585-4154-91f8-3d378d51377e",
    "job_id": 1,
    "pa": 4,
    "data": "2023-01-20",
    "in_time": "15:16:00",
    "out_time": "23:32:00",
    "total_hours": 8.266666667,
    "cash": 191.00,
    "credit": 375.44,
    "beer_sales": 290.00,
    "food_sales": 1875.88,
    "liquor_sales": 277.00,
    "retail_sales": 0,
    "wine_salese": 0,
    "guest_count": 73,
    "bus_tip": 0,
    "bar_tip": 0,
    "food_tip": 0,
    "card_fee": 0,
    "food_out": 0,
    "bar_out": 0,
    "bus_out": 0,
    "ppa": 0,
    "liquor_percent": 0,
    "total_revenue": 0,
    "credit_revenue": 0
};

const jobRawData = [
{
        "id": 1,
        "user_id": "a74c9361-2585-4154-91f8-3d378d51377e",
        "name": "Q39",
        "card_fee": 2.25,
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
            "params": {
                "cardFee": 2.25
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
        "metadata_d": [
            {
                "cardFee": 2.25
            },
            {
                "title": "barTip",
                "value": 5,
                "beerSales": true,
                "foodSales": false,
                "wineSales": true,
                "liquorSales": true,
                "retailSales": false
            },
            {
                "title": "busTip",
                "value": 1,
                "beerSales": true,
                "foodSales": true,
                "wineSales": true,
                "liquorSales": true,
                "retailSales": false
            },
            {
                "title": "foodTip",
                "value": 2,
                "beerSales": false,
                "foodSales": true,
                "wineSales": false,
                "liquorSales": false,
                "retailSales": false
            }
        ],
        "calc": true
    },
    {
        "id": 2,
        "user_id": "a74c9361-2585-4154-91f8-3d378d51377e",
        "name": "Cheesecake factory",
        "card_fee": 2.25,
        "metadata": null,
        "metadata_d": null,
        "calc": false
    },
    {
        "id": 4,
        "user_id": "a74c9361-2585-4154-91f8-3d378d51377e",
        "name": "UseThis",
        "card_fee": 2.25,
        "metadata": {
            "barTip": {
                "child": {
                    "beerSales": true,
                    "foodSales": false,
                    "wineSales": true,
                    "liquorSales": true,
                    "retailSales": false
                },
                "value": 5
            },
            "busTip": {
                "child": {
                    "beerSales": true,
                    "foodSales": true,
                    "wineSales": true,
                    "liquorSales": true,
                    "retailSales": false
                },
                "value": 1
            },
            "params": {
                "cardFee": 2.25
            },
            "foodTip": {
                "child": {
                    "beerSales": false,
                    "foodSales": true,
                    "wineSales": false,
                    "liquorSales": false,
                    "retailSales": false
                },
                "value": 2
            }
        },
        "metadata_d": [
            {
                "cardFee": 5
            },
            {
                "title": "barTip",
                "value": 5,
                "beerSales": true,
                "foodSales": false,
                "wineSales": true,
                "liquorSales": true,
                "retailSales": false
            },
            {
                "title": "busTip",
                "value": 1,
                "beerSales": true,
                "foodSales": true,
                "wineSales": true,
                "liquorSales": true,
                "retailSales": false
            },
            {
                "title": "foodTip",
                "value": 2,
                "beerSales": false,
                "foodSales": true,
                "wineSales": false,
                "liquorSales": false,
                "retailSales": false
            }
        ],
        "calc": true
    }]
////////////////////////////////////////////////////////
const tipData = tipRawData[length]
// const jobData = jobRawData[2]
const jobData = jobRawData[2].metadata
// console.log(tipData)
// console.log(jobData)
////////////////////////////////////////////////////////
const jobMap = new Map();

const tipMap = new Map();
////////////////////////////////////////////////////////
tipMap.set(tipData)
// console.log(tipMap)

// Iterates over object & returns objects
Object.keys(jobData).forEach((key) => {
    // jobMap.set(jobData[key].name, jobData[key]) //Good for returning a name instead of array position.
    jobMap.set(key, jobData[key])
// console.log(key, jobData[key])
});
console.log(jobMap)
////////////////////////////////////////////////////////
// const jobKeys = jobMap.keys();
// console.log(jobKeys.next())
