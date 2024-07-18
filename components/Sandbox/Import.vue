<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
// import data from '../assets/data-stream/job_profile.json'
import data from '../assets/import/raw-tip.json'

// console.log(data)

const block = []
data.forEach((o, idx, arr)=>{
    // console.log('O:', o)
    // console.log('IDX:', idx)
    // console.log('ARR:', arr)
    const dataDate = o.Date
    const dataInTime = o.In
    const dataOut = o.Out
    const dataHours = o.Hours
    const dataCash= o.Cash
    const dataCredit = o.Credit
    const dataBeer = o.BeerS
    const dataFood = o.FoodS
    const dataLiquor = o.LiquorS
    const dataRetail = o.RetailS
    const dataWine = o.WineS
    const dataGuest = o['Guest Count']
    const dataTotalSales = o.Sales
    const dataCardFee = o.Fee
    const dataCreditR = o.CreditR
    const dataTotalR = o.TotalR
    const dataFoodTip = o.FoodT
    const dataBarTip = o.BarT
    const dataBusTip = o.BusT
    const dataTotalTipOut = o['Tip Out']
    const dataHourly = o.Hourly
    const dataPPA = o.PPA
    const dataGrossI = (dataCash + dataCredit)

    ///////////////////////////////////////////////////////////////////////////////////////////

    const id = use_uid()
    const jobID = "40784d56-39da-412c-9b57-2db4e8b79d5d"
    const userID = "a74c9361-2585-4154-91f8-3d378d51377e"
    const jobName = "Q39"
    const inTime = dataDate + 'T' + dataInTime
    const outTime = dataDate + 'T' + dataOut
    const cashTip = dataCash
    const creditTip = dataCredit
    const totalGuest = dataGuest
    const totalSales = dataTotalSales
    const grossIncome = dataGrossI
    const cardFee = dataCardFee
    const totalHours = dataHours
    const totalTipOut = dataTotalTipOut
    const netIncome = dataTotalR

///////////////////////////////////////////////////////////////////////////////////////////
    const foodSales = dataFood

    const foodTip = dataFoodTip
    const barTip = dataBarTip    
    const busTip= dataBusTip

    const barSales = (dataBeer + dataLiquor + dataWine)
    const busSales = (dataFood + dataBeer + dataLiquor + dataWine)


    const saleSource = {
    "03ba5e54e-4db9-445b-9c67-ae938bae9ec3": {
        "id": "03ba5e54e-4db9-445b-9c67-ae938bae9ec3",
        "code": "fSales",
        "name": "Food Sales",
        "sales": dataFood,
        "active": true
    },
    "1e040e90e-5e27-40c4-9175-05b14cd1de9e": {
        "id": "1e040e90e-5e27-40c4-9175-05b14cd1de9e",
        "code": "bSales",
        "name": "Beer Sales",
        "sales": dataBeer,
        "active": true
    },
    "20c522c27-b39c-439a-baa7-5c2e07be891c": {
        "id": "20c522c27-b39c-439a-baa7-5c2e07be891c",
        "code": "liqSales",
        "name": "Liquor Sales",
        "sales": dataLiquor,
        "active": true
    },
    "3eaf6afed-fab9-4279-b0a6-21bb8ad641f5": {
        "id": "3eaf6afed-fab9-4279-b0a6-21bb8ad641f5",
        "code": "wiSales",
        "name": "Wine Sales",
        "sales": dataWine,
        "active": true
    },
    "4f2cd909e-8b2e-44d0-9b5d-91eea1257932": {
        "id": "4f2cd909e-8b2e-44d0-9b5d-91eea1257932",
        "code": "retSailes",
        "name": "Retail Sales",
        "sales": dataRetail,
        "active": true
    }
}
    const poolSource = {
    "0153aa3a1-8212-415d-b988-0b51f157ab9f": {
        "id": "0153aa3a1-8212-415d-b988-0b51f157ab9f",
        "code": "frPool",
        "name": "Food Runner",
        "active": true,
        "sumOut": 0,
        "percent": 2
    },
    "193bb707f-193d-4821-a4af-4bb9a7996e3f": {
        "id": "193bb707f-193d-4821-a4af-4bb9a7996e3f",
        "code": "barPool",
        "name": "Bar",
        "active": true,
        "sumOut": 0,
        "percent": 5
    },
    "36cdeceaa-73aa-4ecd-93f2-0d1bd9f808be": {
        "id": "36cdeceaa-73aa-4ecd-93f2-0d1bd9f808be",
        "code": "busPool",
        "name": "Busser",
        "active": true,
        "sumOut": 0,
        "percent": 1
    }
}

const pairSource = {
    "0153aa3a1-8212-415d-b988-0b51f157ab9f": {
        "id": "0153aa3a1-8212-415d-b988-0b51f157ab9f",
        "code": "frPool",
        "name": "Food Runner",
        "sales": foodSales,
        "_child": {
            "03ba5e54e-4db9-445b-9c67-ae938bae9ec3": {
                "id": "03ba5e54e-4db9-445b-9c67-ae938bae9ec3",
                "code": "fSales",
                "name": "Food Sales",
                "isChild": true
            },
            "1e040e90e-5e27-40c4-9175-05b14cd1de9e": {
                "id": "1e040e90e-5e27-40c4-9175-05b14cd1de9e",
                "code": "bSales",
                "name": "Beer Sales",
                "isChild": false
            },
            "20c522c27-b39c-439a-baa7-5c2e07be891c": {
                "id": "20c522c27-b39c-439a-baa7-5c2e07be891c",
                "code": "liqSales",
                "name": "Liquor Sales",
                "isChild": false
            },
            "3eaf6afed-fab9-4279-b0a6-21bb8ad641f5": {
                "id": "3eaf6afed-fab9-4279-b0a6-21bb8ad641f5",
                "code": "wiSales",
                "name": "Wine Sales",
                "isChild": false
            },
            "4f2cd909e-8b2e-44d0-9b5d-91eea1257932": {
                "id": "4f2cd909e-8b2e-44d0-9b5d-91eea1257932",
                "code": "retSailes",
                "name": "Retail Sales",
                "isChild": false
            }
        },
        "active": true,
        "sumOut": foodTip,
        "percent": 2
    },
    "193bb707f-193d-4821-a4af-4bb9a7996e3f": {
        "id": "193bb707f-193d-4821-a4af-4bb9a7996e3f",
        "code": "barPool",
        "name": "Bar",
        "sales": barSales,
        "_child": {
            "03ba5e54e-4db9-445b-9c67-ae938bae9ec3": {
                "id": "03ba5e54e-4db9-445b-9c67-ae938bae9ec3",
                "code": "fSales",
                "name": "Food Sales",
                "isChild": false
            },
            "1e040e90e-5e27-40c4-9175-05b14cd1de9e": {
                "id": "1e040e90e-5e27-40c4-9175-05b14cd1de9e",
                "code": "bSales",
                "name": "Beer Sales",
                "isChild": true
            },
            "20c522c27-b39c-439a-baa7-5c2e07be891c": {
                "id": "20c522c27-b39c-439a-baa7-5c2e07be891c",
                "code": "liqSales",
                "name": "Liquor Sales",
                "isChild": true
            },
            "3eaf6afed-fab9-4279-b0a6-21bb8ad641f5": {
                "id": "3eaf6afed-fab9-4279-b0a6-21bb8ad641f5",
                "code": "wiSales",
                "name": "Wine Sales",
                "isChild": true
            },
            "4f2cd909e-8b2e-44d0-9b5d-91eea1257932": {
                "id": "4f2cd909e-8b2e-44d0-9b5d-91eea1257932",
                "code": "retSailes",
                "name": "Retail Sales",
                "isChild": false
            }
        },
        "active": true,
        "sumOut": barTip,
        "percent": 5
    },
    "36cdeceaa-73aa-4ecd-93f2-0d1bd9f808be": {
        "id": "36cdeceaa-73aa-4ecd-93f2-0d1bd9f808be",
        "code": "busPool",
        "name": "Busser",
        "sales": busSales,
        "_child": {
            "03ba5e54e-4db9-445b-9c67-ae938bae9ec3": {
                "id": "03ba5e54e-4db9-445b-9c67-ae938bae9ec3",
                "code": "fSales",
                "name": "Food Sales",
                "isChild": true
            },
            "1e040e90e-5e27-40c4-9175-05b14cd1de9e": {
                "id": "1e040e90e-5e27-40c4-9175-05b14cd1de9e",
                "code": "bSales",
                "name": "Beer Sales",
                "isChild": true
            },
            "20c522c27-b39c-439a-baa7-5c2e07be891c": {
                "id": "20c522c27-b39c-439a-baa7-5c2e07be891c",
                "code": "liqSales",
                "name": "Liquor Sales",
                "isChild": true
            },
            "3eaf6afed-fab9-4279-b0a6-21bb8ad641f5": {
                "id": "3eaf6afed-fab9-4279-b0a6-21bb8ad641f5",
                "code": "wiSales",
                "name": "Wine Sales",
                "isChild": true
            },
            "4f2cd909e-8b2e-44d0-9b5d-91eea1257932": {
                "id": "4f2cd909e-8b2e-44d0-9b5d-91eea1257932",
                "code": "retSailes",
                "name": "Retail Sales",
                "isChild": false
            }
        },
        "active": true,
        "sumOut": busTip,
        "percent": 1
    }
}


block.push({id, jobID, userID, inTime, outTime, cashTip, creditTip, totalGuest, totalSales, grossIncome, cardFee, totalHours, totalTipOut, netIncome, saleSource, pairSource, poolSource})

    // block[use_uid()] = {id, jobID, inTime, outTime, cashTip, creditTip, totalGuest, totalSales, grossIncome, cardFee, totalHours, totalTipOut, netIncome, saleSource, pairSource, poolSource}


})
console.log(block)

async function callOnce(){
const { data, error } = await client.from('user_tip').insert(block)
if (error){
    console.log(error)
}
}
callOnce()

</script>