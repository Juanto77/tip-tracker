import { defineStore, acceptHMRUpdate } from 'pinia'
const dayjs = useDayjs()

export const useIncomeData = defineStore('Income Data', () => {
    /* Private Storage */
    const loading = ref(false)

    const rawIncomeData = ref([])

    const localData = ref({})

    /* General Income */
    const incomeData = ref({})

    const dailyIncome = ref({}) // FORMERLY AN OBJECT

    const monthlyIncome = ref({})

    const yearIncome = ref(0)


    ///////////////////////////////////////////////////////////////////////////////////////////    
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    /* All tips */

    /* Combine multiple incomes that occur in one day */
    function dayFilter(month) {
        try {
            // Object.entries(localData.value[month].forEach(filterDay, month))
            Object.entries(localData.value[month]).forEach((i, idx, arr) => {
                const childItem = i[1]
                // const parentDate = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM-DD')))
                // const parentMonth = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM')))

                const parentDate = dayjs(childItem.date).format('YYYY-MM-DD')
                const parentMonth = dayjs(childItem.date).format('YYYY-MM')
                let _child = {}
                let child = []

                let filter = arr.filter((item) => {
                    const localItem = item[1]
                    // const itemDay = JSON.parse(JSON.stringify(dayjs(localItem.date).format('YYYY-MM-DD')))
                    const itemDay = dayjs(localItem.date).format('YYYY-MM-DD')
                    return itemDay === parentDate
                })

                let dayIncome = filter.reduce((acc, item) => {
                    let nestedItem = item[1]
                    let incomeRange = dayjs(nestedItem.date).format('YYYY-MM-DD');
                    _child[nestedItem.id] = nestedItem
                    // child.push(nestedItem)

                    return acc + item[1].netIncome
                }, 0)

                incomeData.value[month][parentDate] = _child
                // incomeData.value[month][parentDate] = child

                dailyIncome.value[parentDate] = dayIncome
                // dailyIncome.value.push({date: parentDate, income: dayIncome})
            })
            // FIXME: Fix Error Handling when navigating to month that has no tips entered.

        } catch (e) {
            alert(e)
        }
    }

    /* refactored function to Callback Function */
    // function monthFilter(el, idx, arr){
    //     // console.log(el)
    //     // const date = JSON.parse(JSON.stringify(dayjs(el.inTime).format('YYYY-MM')))
    //     const date = dayjs(el.inTime).format('YYYY-MM')
    //     /* Update YTD Income */
    //     // sumTotal += el.netIncome
    //     // yearIncome.value += el.netIncome
    //     let _child = {}

    //     /* Group income entries by month */
    //     let filter = arr.filter((item) => {
    //         // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
    //         let itemDate = dayjs(item.inTime).format('YYYY-MM')
    //         return itemDate === date;
    //     });


    //     /* Calculate income per month & push tip profiles to parent month*/
    //     let monthIncome = filter.reduce((acc, item) => {
    //         _child[item.id] = item
    //         return acc + item.netIncome;
    //     }, 0);

    //     /* Create an empty object for months with data*/
    //     incomeData.value[date] = {};
    //     localData.value[date] = _child
    //     monthlyIncome.value[date] = monthIncome
    //     // yearIncome.value = sumTotal

    //     // monthlyIncome.value.push
    // }


    /* Combine tips into monthly category, calcualte yearly & monthly income */
    function monthFilter(array) {
        const today = JSON.parse(JSON.stringify(dayjs().format('YYYY-MM')))
        // const today = dayjs().format('YYYY-MM')
        let sumTotal = 0

        array.forEach((el: any, idx: any, arr: any) => {
            // const date = JSON.parse(JSON.stringify(dayjs(el.inTime).format('YYYY-MM')))
            const date = dayjs(el.date).format('YYYY-MM')
            /* Update YTD Income */
            sumTotal += el.netIncome
            // yearIncome.value += el.netIncome
            let _child = {}

            /* Group income entries by month */
            let filter = arr.filter((item) => {
                // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
                let itemDate = dayjs(item.date).format('YYYY-MM')
                return itemDate === date;
            });

            /* Calculate income per month & push tip profiles to parent month*/
            let monthIncome = filter.reduce((acc, item) => {
                _child[item.id] = item
                return acc + item.netIncome;
            }, 0);

            /* Create an empty object for months with data*/
            incomeData.value[date] = {};
            localData.value[date] = _child
            monthlyIncome.value[date] = monthIncome
            yearIncome.value = sumTotal

            // monthlyIncome.value.push
        });
        dayFilter(today) // Call day filter on completion
    }



    /* Fetch Income */
    async function getIncome(start, end) {
        const s = JSON.stringify(start)
        const e = JSON.stringify(end)
        // const {viewStart, viewEnd} = useTimelineStore()
        const client = useSupabaseClient();
        const { data, error } = await client.from('user_tip').select('id, jobID, date, netIncome')

        // const { data, error } = await client.from('user_tip').select().gt('inTime', s ).lt('inTime', e) // Query time range
        if (error) {
            console.log(error)
        }

        let arr = data;
        // incomeData.value = data
        // console.log(arr)

        monthFilter(arr)



        // const jobGroup= Object.groupBy(arr, ({inTime}) => inTime)
        // console.log(jobGroup)
        // monthFilter(arr)
        // const job = Object.groupBy(localData.value)

    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////


    /* JOB COMP */

    /* Job Sorted Income for comps */
    const rawJobComp = ref([])
    const jobSortData = ref({})
    const yearComp = ref({})
    const monthComp = ref({})
    const dayComp = ref({})
    const jobComp = ref({})

    const chartData = ref({
        datasets: [],
        data: [],
        labels: [],
})
    ///////////////////////////////////////////////////////////////////////////////////////////

    // function jobFilter(, idx, arr){
    //     const parent = el
    //     const jobName = el.job_name
    //     const jobID = el.id
    //     const userTip = el.user_tip

    //     let tip = []

    //     Object.keys(userTip).forEach((key) => {
    //         const childTip = userTip[key]
    //         // console.log(childTip)
    //         tip.push(childTip)
    //         // console.log(tip)

    //     })
    //     // tip.forEach((el, idx, arr) =>{
    //     //     const date = dayjs(el.inTime).format('YYYY-MM')
    //     //     console.log(el)
    //     // })
    //     jobComp.value[parent.id] = { jobName, jobID, tip }
    //     tip.forEach(monthFilter)
    // };

    function dayJobSort(m) {
        let incomeObj = {}
        Object.keys(m).forEach((i, idx, arr) => {
            const job = m[i]
            const _ID = job.jobID
            const _Name = job.jobName
            const _Income = job.income

            let sumIncome = 0

            ///////////////////////////////////////////////////////////////////////////////////////////


            dayComp.value[_ID] = { _Name, _ID }
            monthComp.value[_ID] = { _Name, _ID }
            yearComp.value[_ID] = { _Name, _ID }


            chartData.value.datasets.push({ label: _Name, data: {}, tension: 0.4 }) // For an array

            
            _Income.forEach((a, ldx, rra) => {
                const date = JSON.parse(JSON.stringify(dayjs(a.date).format('YYYY-MM-DD')))
                const month = JSON.parse(JSON.stringify(dayjs(a.date).format('YYYY-MM')))
                const aID = a.id

                /* Sum & sort daily values */
                ///////////////////////////////////////////////////////////////////////////////////////////
                let dayFilter = rra.filter((item) => {
                    // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
                    let itemDate = dayjs(item.date).format('YYYY-MM-DD')
                    return itemDate === date;
                });

                let dayIncome = dayFilter.reduce((acc, item) => {
                    incomeObj[item.date] = item
                    return acc + item.netIncome;
                }, 0);

                chartData.value.datasets[idx].data[date] = dayIncome // Update datasets with an array item that contains a data object
                dayComp.value[_ID][date] = dayIncome // monthComp -> jobID -> {Date: { date: IncomeDate, income: dateIncome }}

                /* Sum & sort monthly values */
                ///////////////////////////////////////////////////////////////////////////////////////////
                let monthFilter = rra.filter((item) => {
                    // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
                    let itemDate = dayjs(item.date).format('YYYY-MM')
                    return itemDate === month;
                });

                let monthIncome = monthFilter.reduce((acc, item) => {
                    incomeObj[item.date] = item
                    sumIncome += item.netIncome
                    return acc + item.netIncome;
                }, 0);

                monthComp.value[_ID][month] = monthIncome // monthComp -> jobID -> {Date: { date: IncomeDate, income: dateIncome }}
                yearComp.value[_ID]['income'] = sumIncome

            })
        })
    }
    ///////////////////////////////////////////////////////////////////////////////////////////

    function monthJobSort(arr) {

    }

    function jobSort(array) { // Array of objects [ { active, id, job_name, user_tip:{} } ]

        // const today = JSON.parse(JSON.stringify(dayjs().format('YYYY-MM')))
        const today = dayjs().format('YYYY-MM')
        let sumTotal = 0
        // console.log(array) // Array of objects [ { active, id, job_name, user_tip:{} } ]

        /* Create job object containing tip array */
        array.forEach((el: any, idx: any, arr: any) => {
            const parent = el
            const jobName = el.job_name
            const jobID = el.id
            const userTip = el.user_tip
            ///////////////////////////////////////////////////////////////////////////////////////////

            let income = []
            // let income = {}


            let template = {}
            template[parent.id] = { jobName, jobID }

            ///////////////////////////////////////////////////////////////////////////////////////////

            Object.keys(userTip).forEach((key) => {
                const childTip = userTip[key]
                const childDate = childTip.date
                const childID = childTip.id
                const _childDate = dayjs(childDate).format('YYYY-MM')

                income.push(childTip) // Push to jobSortData -> jobID -> income -> [ TIP DATA ]
                // income[childID] = childTip // // Push to jobSortData -> jobID -> income -> tipID: { TIP DATA }
            })
            ///////////////////////////////////////////////////////////////////////////////////////////

            jobSortData.value[parent.id] = { jobName, jobID, income }
            // jobSortData.value[parent.id] = { jobName, jobID, income }
        });

        dayJobSort(jobSortData.value)

    }


    // TODO: structuring data to comp 2 jobs & display results to user
    /* Fetch Income by job & relation */
    async function getJobIncome() {

        const client = useSupabaseClient();
        // const { data, error } = await client.from('user_jobs').select(`id, job_name, user_tip(id, inTime, netIncome)`)
        const { data, error } = await client.from('user_jobs').select(`active, id, job_name, user_tip(id, netIncome, date)`).order('date', {referencedTable: 'user_tip', ascending: true})


        if (error) {
            loading.value = false
            console.log(error)
        }

        let arr = data;
        rawJobComp.value = data

        // jobFilter(rawJobComp.value)
        jobSort(arr)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Reset Store */
    function $reset() {
        loading.value = false
        rawIncomeData.value = []
        localData.value = {}
        incomeData.value = {}
        dailyIncome.value = {}
        monthlyIncome.value = {}
        yearIncome.value = 0

        rawJobComp.value = []
        jobComp.value = {}
        yearComp.value = {}
        monthComp.value = {}
        dayComp.value = {}

    }

    return { loading, incomeData, dailyIncome, monthlyIncome, yearIncome, monthFilter, dayFilter, getIncome, getJobIncome, jobSort, $reset, rawJobComp, jobSortData, localData, yearComp, monthComp, dayComp, jobComp, chartData }

}, {
    // persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useIncomeData, import.meta.hot))
}
