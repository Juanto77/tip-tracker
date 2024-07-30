import { defineStore, acceptHMRUpdate } from 'pinia'
const dayjs = useDayjs()

export const useIncomeData = defineStore('Income Data', () => {
    const {_viewStart, _viewEnd } = storeToRefs(useTimelineStore())
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* TODO */
    ///////////////////////////////////////////////////////////////////////////////////////////
    // TODO: Only show chart data for month / week / year range
    // In progress

    // TODO: Create function that'll rebuild a chart when changing view
    // - In progress

    // TODO: Filter income data by date with a child object that contains tip info (job name, income, etc...)
    ///////////////////////////////////////////////////////////////////////////////////////////

    const loading = ref(false)
    const rawIncomeData = ref([])
    const rawJobData = ref([])
    const localData = ref({})

    const jobSelection = ref([])
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Chart Data Testing */
    ///////////////////////////////////////////////////////////////////////////////////////////
    

    /* Formatting data for chart.js */
    // const chartData = ref({
    //     datasets: [],
    //     data: [],
    //     labels: [],
    // })

    /* Structuring data for Chart.js */
    // const chartData = ref({
    //     year: {
    //         datasets: [],

    //     },
    //     month: {
    //         datasets: [],

    //     },
    //     day: {
    //         datasets: [],

    //     }
    // })
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* CHART DATA */
    // function buildChart() {
    //     // let data = []
    //     jobSelection.value.forEach((i, idx, arr) => {
    //         const jobName = i.jobName
    //         const jobID = i.id
    //         const active = i.active
    //         const jobTip = i.user_tip

    //         // let data = []
    //         let data = {}

    //         jobTip.forEach((it, ix, ar) => {
    //             const tip = it
    //             const tipID = tip.id
    //             const date = tip.date
    //             const tipIncome = tip.netIncome

    //             data[date] = tipIncome
    //             // data.push({date: date, tipIncome})
    //             // console.log(data)
    //         })
    //         chartData.value['datasets'].push({ label: jobName, jobID, data: data })
    //     })
    // }

    const computedOptions = computed(() =>{
        const options = {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        /*
                        displayFormats:{
                            day: 'YYYY-MM-DD'
                        },
                        */
                    },
                    min: _viewStart.value,
                    max: _viewEnd.value
                },
            }
        }
        return options
    })

    const chartDisplay = computed(() => {
        let chartData = {
            datasets:[]
        }

        jobSelection.value.forEach((i, idx, arr) => {
            const jobName = i.jobName
            const jobID = i.id
            const active = i.active
            const jobTip = i.user_tip
            
            let data = {}

            jobTip.forEach((it, ix, ar) => {
                const tip = it
                const tipID = tip.id
                const date = tip.date
                const tipIncome = tip.netIncome

                data[date] = tipIncome
                // data.push({date: date, tipIncome})
                // console.log(data)
            })
            chartData.datasets.push({ label: jobName, jobID, data: data })
        })
        return chartData
    })

    ///////////////////////////////////////////////////////////////////////////////////////////
    /* totalIncome */
    /* getIncome */
    ///////////////////////////////////////////////////////////////////////////////////////////


    /* GETJOBINCOME() */

    /* BASED ON JOB SELECTION */

    /* POSTING TO CHARTDATA */
    const totalIncome = computed(() => {

        /* Flatten The Array */
        let incomeArray = []

        jobSelection.value.forEach((i, idx, arr) => {
            const tip = i.user_tip
            incomeArray.push(tip)
        })

        const flatArray = [].concat(...incomeArray)
        ///////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////

        let dayIncomeData = {}
        let daySum = {}
        let monthIncomeData = {}
        let monthSum = {}
        let yearIncomeData = 0

        // FIXME: CHANGED TO flatArray from rawIncomeData
        flatArray.forEach((item, index, array) => {
            const tip = item
            const tipID = tip.id
            const tipDate = tip.date
            const tipIncome = tip.netIncome

            const jobID = tip.jobID
            const jobName = tip.jobName

            const dayDate = dayjs(tipDate).format('YYYY-MM-DD')
            const monthDate = dayjs(tipDate).format('YYYY-MM')
            const dayFormat = JSON.parse(JSON.stringify(dayjs(tipDate).format('YYYY-MM-DD')))
            const monthFormat = JSON.parse(JSON.stringify(dayjs(tipDate).format('YYYY-MM')))

            let dayChild = {}
            let monthChild = {}
            yearIncomeData += tipIncome

            let dayFilter = array.filter((item) => {
                const itemID = item.id
                const itemIncome = item.netIncome
                const itemDate = item.date
                const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                const itemMonth = dayjs(itemDate).format('YYYY-MM')
                return itemDay === dayDate
            })

            let dayIncome = dayFilter.reduce((acc, item) => {
                const itemID = item.id
                const itemIncome = item.netIncome
                const itemDate = item.date
                const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                const itemMonth = dayjs(itemDate).format('YYYY-MM')
                dayChild[itemID] = item
                return acc + itemIncome
            }, 0)
            daySum[dayFormat] = dayIncome
            dayIncomeData[dayFormat] = { id: use_uid(), date: dayFormat, income: dayIncome, dayChild }

            let monthFilter = array.filter((item) => {
                const itemID = item.id
                const itemIncome = item.netIncome
                const itemDate = item.date
                const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                const itemMonth = dayjs(itemDate).format('YYYY-MM')
                return itemMonth === monthDate
            })

            let monthIncome = monthFilter.reduce((acc, item) => {
                const itemID = item.id
                const itemIncome = item.netIncome
                const itemDate = item.date
                const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                const itemMonth = dayjs(itemDate).format('YYYY-MM')
                return acc + itemIncome
            }, 0)
            monthIncomeData[monthFormat] = monthIncome
        })
        return { daySum, dayIncomeData, monthIncomeData, yearIncomeData }
    })

    /* TOTALINCOME */
    async function getIncome() {
        // const s = JSON.stringify(start)
        // const e = JSON.stringify(end)
        // const {viewStart, viewEnd} = useTimelineStore()
        const client = useSupabaseClient();
        const { data, error } = await client.from('user_tip').select('id, jobID, date, netIncome, jobName').order('date', { ascending: true })

        // const { data, error } = await client.from('user_tip').select().gt('inTime', s ).lt('inTime', e) // Query time range
        if (error) {
            console.log(error)
        }
        rawIncomeData.value = data
    }

    /*
    const totalIncome = computed(() =>{
        let incomeArray = []

        jobSelection.value.forEach((i, idx, arr)=>{
            const tip = i.user_tip

            incomeArray.push(tip)

            console.log(i)
            console.log(idx)
            // console.log(arr)
        })

        const flatArray = [].concat(...incomeArray)

        return flatArray
    })
    */

    ///////////////////////////////////////////////////////////////////////////////////////////
    /* jobIncome */
    /* getJobIncome */
    ///////////////////////////////////////////////////////////////////////////////////////////

    /* Multiple jobs & job selection */
    /* GETJOBINCOME() */
    const jobIncome = computed(() => {
        let incomeObj = {}

        let jobDayIncome = {}
        let jobMonthIncome = {}
        let jobYearIncome = {}

        let chartData = {
            month: {
                datasets: {}
            }
        }

        rawJobData.value.forEach((item, index, arr) => {
            const job = item
            const jobID = job.id
            const jobName = job.jobName
            const jobTip = job.user_tip

            jobDayIncome[jobID] = { jobName, jobID, }
            jobMonthIncome[jobID] = { jobName, jobID, }
            jobYearIncome[jobID] = 0

            jobTip.forEach((i, idx, arr) => {
                const tip = i
                const tipID = tip.id
                const tipJobID = tip.jobID
                const tipJobName = tip.jobName
                const tipIncome = tip.netIncome
                const tipDate = tip.date

                const tipDay = dayjs(tipDate).format('YYYY-MM-DD')
                const tipMonth = dayjs(tipDate).format('YYYY-MM')
                const dayFormat = JSON.parse(JSON.stringify(dayjs(tipDate).format('YYYY-MM-DD')))
                const monthFormat = JSON.parse(JSON.stringify(dayjs(tipDate).format('YYYY-MM')))

                let dayChild = {}
                let monthChild = {}
                jobYearIncome[jobID] += tipIncome

                let dayFilter = arr.filter((item) => {
                    const itemID = item.id
                    const itemDate = item.date
                    const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                    const itemMonth = dayjs(itemDate).format('YYYY-MM')
                    return tipDay === itemDay
                })

                let dayIncome = dayFilter.reduce((acc, item) => {
                    const tipID = item.id
                    const itemIncome = item.netIncome
                    const tipDate = item.date
                    const tipDay = dayjs(tipDate).format('YYYY-MM-DD')
                    const tipMonth = dayjs(tipDate).format('YYYY-MM')

                    // jobYearIncome[jobID] += itemIncome // FIXME: Returning Incorrect amt
                    return acc + itemIncome
                }, 0)

                jobDayIncome[jobID][dayFormat] = dayIncome


                ///////////////////////////////////////////////////////////////////////////////////////////

                let monthFilter = arr.filter((item) => {
                    const itemID = item.id
                    const itemDate = item.date
                    const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                    const itemMonth = dayjs(itemDate).format('YYYY-MM')
                    return tipMonth === itemMonth
                })

                let monthIncome = monthFilter.reduce((acc, item) => {
                    const itemID = item.id
                    const itemDate = item.date
                    const itemIncome = item.netIncome
                    const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                    const itemMonth = dayjs(itemDate).format('YYYY-MM')
                    ///////////////////////////////////////////////////////////////////////////////////////////
                    return acc + itemIncome
                }, 0)
                jobMonthIncome[jobID][monthFormat] = monthIncome


            })
        })


        return { jobDayIncome, jobMonthIncome, jobYearIncome }
    })

    /* JOBINCOME */
    async function getJobIncome() {
        const client = useSupabaseClient();
        // const { data, error } = await client.from('user_jobs').select(`id, job_name, user_tip(id, inTime, netIncome)`)

        // FIXME: Fetch Job name from user_tip table
        const { data, error } = await client.from('user_jobs').select(`active, id, jobName, user_tip(id, netIncome, date, jobName, jobID)`).order('date', { referencedTable: 'user_tip', ascending: true })
        if (error) {
            loading.value = false
            console.log(error)
        }
        rawJobData.value = data
        jobSelection.value = data
    }




    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Reset State */
    ///////////////////////////////////////////////////////////////////////////////////////////
    function $reset() {
        loading.value = false
        rawIncomeData.value = []
        localData.value = {}
        rawJobData.value = []
        jobSelection.value = []
    }

    return {
        loading, getIncome, getJobIncome, $reset, jobIncome, totalIncome, rawIncomeData, rawJobData, jobSelection, chartDisplay, chartOptions
    }

}, {
    // persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useIncomeData, import.meta.hot))
}
