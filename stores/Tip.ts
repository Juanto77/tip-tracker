import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTipStore = defineStore('Tip Store', () => {
    /* Job Selection */
    const jobArray = ref([])
    const jobSelect = ref({})

    /* Job Details */
    const userID = ref('')
    const jobID = ref('')
    const jobName = ref('')
    const advanced = ref(false)
    const calculate = ref(false)
    const _params = ref({cardFee: 0})

    /* Form Input */
    const inTime = ref('')
    const outTime = ref('')
    const cashTip = ref(0)
    const creditTip = ref(0)
    const totalGuest = ref(0)

    /* Calculation Values */
    const totalSales = ref(0)
    const grossIncome = ref(0)
    const cardFee = ref(0)
    const totalHours = ref(0)
    const totalTipOut = ref(0)
    const netIncome = ref(0)

    /* Computed Properties */
    // const grossIncome = computed(() => { return cashTip.value + creditTip.value })
    // const cardFee = computed(() => ((creditTip.value / 100) * _params.value.cardFee))
    // const netIncome = computed(() => { return (cashTip.value + creditTip.value) - (totalTipOut.value + cardFee.value) })
    // const totalHours = computed(() => { return Math.abs((outTime.value - inTime.value) / 36e5) })

    /* Calculation Pairs */
    const saleSource = ref({})
    const poolSource = ref({})
    const pairSource = ref({})
    const stats = ref({})

    ///////////////////////////////////////////////////////////////////////////////////////////

    /* Functions */
    async function jobPull() {
        const client = useSupabaseClient()

        const { data, error } = await client
            .from('user_jobs')
            .select(`*`)

        jobArray.value = data
    }

    /* Adding tip info to store for user to edit */
    async function getTips(i) {
        jobPull()

        const client = useSupabaseClient()
        const { data, error } = await client
            .from('user_tip')
            .select(`*, user_jobs(*)`)
            .eq('id', i)

        // console.log(data)

        // incomeData.value = data

        data.forEach((o, idx, arr) => {
            console.log(o)
            $setTip(o)
        })

    }

    //FIXME: Fix $setState & $setTip when using edit tip.

    function $setTip(o){
            jobSelect.value = o.user_jobs

             /* User ID, Job ID, Job Name */
            userID.value = o.userID
            jobID.value= o.jobID,
            jobName.value= o.jobName,
            advanced.value = o.user_jobs.advanced,
            calculate.value = o.user_jobs.calculate,
            _params.value = o.user_jobs._params,


            /* User Input (Hours, Income, Sales) */
            inTime.value= o.inTime,
            outTime.value= o.outTime,
            cashTip.value= o.cashTip,
            creditTip.value= o.creditTip,
            totalGuest.value= o.totalGuest,

            /* Calc Values (Tip Out, Net Income, Total Sales, PPA) */
            totalSales.value= o.totalSales,
            totalTipOut.value = o.totalTipOut,
            grossIncome.value = o.grossIncome,
            cardFee.value = o.cardFee,
            netIncome.value = o.netIncome,
            totalHours.value = o.totalHours,

            /* Sources */
            saleSource.value = o.saleSource,
            poolSource.value = o.poolSource,
            pairSource.value = o.pairSource,

            stats.value= o.stats

            console.log(o.saleSource)
    }

    //FIXME: Change to onChange
    function $setState() {
        userID.value = jobSelect.value.user_id
        jobID.value = jobSelect.value.id
        jobName.value = jobSelect.value.job_name
        advanced.value = jobSelect.value.advanced
        calculate.value = jobSelect.value.calculate
        _params.value = jobSelect.value._params
        saleSource.value = jobSelect.value.sale_source
        poolSource.value = jobSelect.value.pool_source
        pairSource.value = jobSelect.value.source_pair
    }


    function onSubmit() {
        // TODO: On successful post, destroy store & navigate to a stats page / modal of income for the shift

        const user = useSupabaseUser()
        const client = useSupabaseClient()

        /* Calculate Gross Income */
        grossIncome.value = (cashTip.value + creditTip.value)

        /* Card Fee */
        cardFee.value = ((creditTip.value / 100) * _params.value.cardFee)

        /* Calculate Hours Worked */
        totalHours.value = Math.abs((outTime.value - inTime.value) / 36e5)

        /* Calculate Total Sales */
        Object.values(saleSource.value).forEach((key) => {
            const nestedSales = key.sales
            totalSales.value += nestedSales
        })

        /* PPA */
        const _ppa = totalSales.value / totalGuest.value
        stats.value['PPA'] = _ppa


       /* Tip pool sales */
        Object.keys(pairSource.value).forEach((key) => {
            /* Iterate through pairSources */

            const pairItem = pairSource.value[key] // Returns Object
            /* PairItem Object Destructuring */
            const pairID = pairItem.id // Returns Parent UUID
            const pairCode = pairItem.code // Returns Parent String
            const pairActive = pairItem.active // returns boolean
            const pairChild = pairItem._child // nested _child object
            let pairSales = pairItem.sales // Sales value, add sales to this
            const pairPercent = pairItem.percent // user defined percentage
            const pairSumOut = pairItem.sumOut // _Sales / _percent

            ///////////////////////////////////////////////////////////////////////////////////////////
            /* Iterate through _child of pairSource parent */
            Object.keys(pairChild).forEach((k) => {
                const childItem = pairChild[k] //Nested _child Object
                /* Object destructuring */
                const childID = childItem.id
                const childCode = childItem.code
                const childName = childItem.name
                const isChild = childItem.isChild

                /* Finding the sales value */
                if (isChild === true) {
                    const _saleSource = saleSource.value
                    const _saleChild = _saleSource[childID]
                    const _sales = _saleChild.sales


                    /* Add saleSource Sales to pairSource Sales */
                    pairSource.value[key].sales += _sales

                } // of isChild check & add values together

            }) // end _child iteration

        }) //end pairSource iteration

        /* Tip Out */
        Object.values(pairSource.value).forEach((val)=>{
            val.sumOut = (val.sales/100)*val.percent
        }) // end of tip out calc

        /* Calculate Total Tip Out */
        Object.values(pairSource.value).forEach((val) => {totalTipOut.value += val.sumOut})

        /* Net Income */
        netIncome.value = (cashTip.value + creditTip.value) - (totalTipOut.value + cardFee.value)

        /* Hourly Rate */
        const hourRate = netIncome.value / totalHours.value
        stats.value['Hourly'] = hourRate

        // Structure data for database post
        const updates = {
            /* User ID, Job ID, Job Name */
            userID: user.value.id,
            jobID: jobID.value,
            jobName: jobName.value,

            /* User Input (Hours, Income, Sales) */
            inTime: inTime.value,
            outTime: outTime.value,
            cashTip: cashTip.value,
            creditTip: creditTip.value,
            totalGuest: totalGuest.value,

            /* Calc Values (Tip Out, Net Income, Total Sales, PPA) */
            totalSales: totalSales.value,
            totalTipOut: totalTipOut.value,
            grossIncome: grossIncome.value,
            cardFee: cardFee.value,
            netIncome: netIncome.value,
            totalHours: totalHours.value,

            /* Sources */
            saleSource: saleSource.value,
            poolSource: poolSource.value,
            pairSource: pairSource.value,

            stats: stats.value,
        }

        const post = async () => {
        const { error } = await client.from('user_tip').insert(updates)
        if (error) {
            console.log(error)
        }

    }
    
    /* Post to Server */
    post()
        console.log(updates)
    } //end of onSubmit

    function $reset() {
        
        userID.value = ''
        jobID.value = ''
        jobName.value = ''
        advanced.value = false
        calculate.value = false
        _params.value = {cardFee: 0}
        
        inTime.value = ''
        outTime.value = ''
        cashTip.value = 0
        creditTip.value = 0
        totalSales.value = 0
        totalTipOut.value = 0
        totalGuest.value = 0

        saleSource.value = {}
        poolSource.value = {}
        pairSource.value = {}
    }

    return { jobArray, jobSelect, userID, jobID, jobName, advanced, calculate, _params, inTime, outTime, cashTip, creditTip, totalSales, totalGuest, grossIncome, totalTipOut, netIncome, totalHours, cardFee, stats, saleSource, poolSource, pairSource, jobPull, $setState, onSubmit, $reset, getTips }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTipStore, import.meta.hot))
}
