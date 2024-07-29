import { defineStore, acceptHMRUpdate } from 'pinia'
const dayjs = useDayjs()

export const useIncomeData = defineStore('Income Data', () => {
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* TODO */
    ///////////////////////////////////////////////////////////////////////////////////////////
    // TODO: Only show chart data for month / week / year range
    // In progress

    // TODO: Create function that'll rebuild a chart when changing view
    // - In progress

    // TODO: Combine income from *all* jobs for yearIncome, monthIncome & dayIncome
    // TODO: Change dailyIncome, monthlyIncome, yearIncome to computed props
    // - In progress

    // TODO: Refactor chart data structure from computed values
    // TODO: Refactor monthFilter into computed property
    // TODO: Refactor dayFilter into computed property
    // TODO: Filter income data by date with a child object that contains tip info (job name, income, etc...)

    ///////////////////////////////////////////////////////////////////////////////////////////
    /* All tips */
    ///////////////////////////////////////////////////////////////////////////////////////////

    /* Private Storage */
    const loading = ref(false)
    const rawIncomeData = ref([])
    const rawJobData = ref([])
    const localData = ref({})

    /* General Income */
    const incomeData = ref({}) // FORMERLY AND OBJECT, CHANGE TO ARRAY FOR COMPUTED VALUES
    const dailyIncome = ref({}) // FORMERLY AN OBJECT
    const monthlyIncome = ref({})
    const yearIncome = ref(0)

    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Day Filter: Function -- Combine multiple incomes that occur in one day*/
    ///////////////////////////////////////////////////////////////////////////////////////////
    // function dayFilter() {

    //     // Object.entries(localData.value[month].forEach(filterDay, month))
    //     Object.keys(localData.value).forEach((key) => {
    //         const parentMonth = localData.value[key]
    //         // console.log('ParentMonth', parentMonth)
    //         Object.keys(parentMonth).forEach((key, value) => {
    //             const tip = parentMonth[key]
    //             const tipID = tip.id
    //             const jobID = tip.jobID
    //             const tipDate = tip.date
    //             const tipIncome = tip.netIncome

    //             const formatDay = JSON.parse(JSON.stringify(dayjs(tipDate).format('YYYY-MM-DD')))
    //             const formatMonth = JSON.parse(JSON.stringify(dayjs(tipDate).format('YYYY-MM')))

    //             console.log('dayFilter: Key', key)
    //             console.log('dayFilter: value', value)
    //             // console.log('dayFilter: Arr', arr)
    //             // console.log('dayFilter: idx', idx)
    //             // console.log('tip', tip)
    //             // console.log('tipID', tipID)
    //             // console.log('formatDay', formatDay)

    //         })
    //         Object.entries(parentMonth).forEach((i, idx, arr) => {
    //             console.log('dayFilter: I', i)
    //             // console.log('dayFilter: IDX', idx)
    //             // console.log('dayFilter: ARR', arr)

    //             const tip = i
    //             console.log('tip', tip)


    //             //     ///////////////////////////////////////////////////////////////////////////////////////////
    //             //     /* Commented to refactor computed prop */
    //             //     ///////////////////////////////////////////////////////////////////////////////////////////
    //             const childItem = i[1]
    //             // const parentDate = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM-DD')))
    //             // const parentMonth = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM')))

    //             const parentDate = dayjs(childItem.date).format('YYYY-MM-DD')
    //             const parentMonth = dayjs(childItem.date).format('YYYY-MM')
    //             let _child = {}
    //             let child = []

    //             let filter = arr.filter((item) => {
    //                 const localItem = item[1]
    //                 // const itemDay = JSON.parse(JSON.stringify(dayjs(localItem.date).format('YYYY-MM-DD')))
    //                 const itemDay = dayjs(localItem.date).format('YYYY-MM-DD')
    //                 return itemDay === parentDate
    //             })

    //             let dayIncome = filter.reduce((acc, item) => {
    //                 let nestedItem = item[1]
    //                 let incomeRange = dayjs(nestedItem.date).format('YYYY-MM-DD');
    //                 _child[nestedItem.id] = nestedItem
    //                 // child.push(nestedItem)

    //                 return acc + item[1].netIncome
    //             }, 0)

    //             incomeData.value[month][parentDate] = _child
    //             // incomeData.value[month][parentDate] = child

    //             dailyIncome.value[parentDate] = dayIncome
    //             dailyIncome.value.push({ date: parentDate, income: dayIncome })
    //             ///////////////////////////////////////////////////////////////////////////////////////////
    //             ///////////////////////////////////////////////////////////////////////////////////////////
    //         })
    //         // FIXME: Fix Error Handling when navigating to month that has no tips entered.


    //     })

    // }   ///////////////////////////////////////////////////////////////////////////////////////////

    // FIXME: Change name for combined job month & day income 
    const dayIncome = computed(() =>{

        let dayIncomeData = {}
        let monthIncomeData = {}
        let yearIncomeData = 0

        rawIncomeData.value.forEach((item, index, array) => {
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

            let dayFilter = array.filter((item) => {
                const tip = item
                const tipID = tip.id
                const itemDate = item.date
                const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                const itemMonth = dayjs(itemDate).format('YYYY-MM')
                return itemDay === dayDate
            })

            let dayIncome = dayFilter.reduce((acc, item) => {
                const tip = item
                const tipID = tip.id
                const tipIncome = tip.netIncome
                const itemDate = tip.date
                const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                const itemMonth = dayjs(itemDate).format('YYYY-MM')
                ///////////////////////////////////////////////////////////////////////////////////////////
                dayChild[tipID] = tip
                return acc + tipIncome
            }, 0)

            dayIncomeData[dayFormat] = {dayIncome, dayChild}

            ///////////////////////////////////////////////////////////////////////////////////////////

            let monthFilter = array.filter((item) => {
                const tip = item
                const tipID = tip.id
                const itemDate = item.date
                const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                const itemMonth = dayjs(itemDate).format('YYYY-MM')
                return itemMonth === monthDate
            })

            let monthIncome = monthFilter.reduce((acc, item) => {
                const tip = item
                const tipID = tip.id
                const tipIncome = tip.netIncome
                const itemDate = tip.date
                const itemDay = dayjs(itemDate).format('YYYY-MM-DD')
                const itemMonth = dayjs(itemDate).format('YYYY-MM')
                ///////////////////////////////////////////////////////////////////////////////////////////
                return acc + tipIncome
            }, 0)
            monthIncomeData[monthFormat] = monthIncome 


        })
        return {dayIncomeData, monthIncomeData, yearIncomeData}
        })

    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Day Filter: Computed -- Combine multiple incomes that occur in one day */
    ///////////////////////////////////////////////////////////////////////////////////////////

    // const dayBlend = computed(() =>{

    //     Object.entries(localData.value[month]).forEach((i, idx, arr) => {
    //         const childItem = i[1]
    //         // const parentDate = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM-DD')))
    //         // const parentMonth = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM')))

    //         const parentDate = dayjs(childItem.date).format('YYYY-MM-DD')
    //         const parentMonth = dayjs(childItem.date).format('YYYY-MM')
    //         let _child = {}
    //         let child = []

    //         let filter = arr.filter((item) => {
    //             const localItem = item[1]
    //             // const itemDay = JSON.parse(JSON.stringify(dayjs(localItem.date).format('YYYY-MM-DD')))
    //             const itemDay = dayjs(localItem.date).format('YYYY-MM-DD')
    //             return itemDay === parentDate
    //         })

    //         let dayIncome = filter.reduce((acc, item) => {
    //             let nestedItem = item[1]
    //             let incomeRange = dayjs(nestedItem.date).format('YYYY-MM-DD');
    //             _child[nestedItem.id] = nestedItem
    //             // child.push(nestedItem)

    //             return acc + item[1].netIncome
    //         }, 0)

    //         incomeData.value[month][parentDate] = _child
    //         // incomeData.value[month][parentDate] = child

    //         dailyIncome.value[parentDate] = dayIncome
    //         // dailyIncome.value.push({date: parentDate, income: dayIncome})
    //     })
    // } )


    ///////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Month Filter: Function -- Combine tips into monthly category, calcualte yearly & monthly income */
    // Works with getIncome
    ///////////////////////////////////////////////////////////////////////////////////////////
    function monthFilter(array) {
        const today = JSON.parse(JSON.stringify(dayjs().format('YYYY-MM')))

        let sumTotal = 0

        array.forEach((el: any, idx: any, arr: any) => {
            const tip = el
            const jobID = tip.jobID

            const day = dayjs(el.date).format('YYYY-MM-DD')
            // const day = JSON.parse(JSON.stringify(dayjs(el.inTime).format('YYYY-MM-DD'))) // How does this affect load time?

            const month = dayjs(el.date).format('YYYY-MM')
            // const month = JSON.parse(JSON.stringify(dayjs(el.inTime).format('YYYY-MM')))
            const income = tip.netIncome

            ///////////////////////////////////////////////////////////////////////////////////////////
            /* Update YTD Income */
            sumTotal += income
            // yearIncome.value += el.netIncome
            let _child = {}
            ///////////////////////////////////////////////////////////////////////////////////////////
            /* Group Income entries by day */
            ///////////////////////////////////////////////////////////////////////////////////////////
            let dayFilter = arr.filter((item) => {
                // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
                let itemDate = dayjs(item.date).format('YYYY-MM')

                return itemDate === month;
            });

            /* Calculate income per month & push tip profiles to parent month*/
            let dayIncome = dayFilter.reduce((acc, item) => {
                _child[item.id] = item
                return acc + item.netIncome;
            }, 0);


            ///////////////////////////////////////////////////////////////////////////////////////////
            /* Group income entries by month */
            ///////////////////////////////////////////////////////////////////////////////////////////
            let monthFilter = arr.filter((item) => {
                // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
                let itemDate = dayjs(item.date).format('YYYY-MM')

                return itemDate === month;
            });

            /* Calculate income per month & push tip profiles to parent month*/
            let monthIncome = monthFilter.reduce((acc, item) => {
                _child[item.id] = item
                return acc + item.netIncome;
            }, 0);

            /* Create an empty object for months with data*/
            incomeData.value[month] = {};
            localData.value[month] = _child
            monthlyIncome.value[month] = monthIncome
            yearIncome.value = sumTotal


            // monthlyIncome.value.push
        });
        dayFilter(today) // Call day filter on completion
    } ///////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Month Filter: Computed -- Combine tips into monthly category, calcualte yearly & monthly income */
    ///////////////////////////////////////////////////////////////////////////////////////////
    const monthBlend = computed(() => {
        const today = JSON.parse(JSON.stringify(dayjs().format('YYYY-MM')))

        let sumTotal = 0

        let dataBlend = {}

        let dayBlend = {}
        // let monthBlend = {}
        let yearBlend = 0

        let localBlend = {}

        rawIncomeData.value.forEach((el: any, idx: any, arr: any) => {
            const tip = el
            const jobID = tip.jobID
            const income = tip.netIncome
            const jobName = tip.job_name

            const day = dayjs(el.date).format('YYYY-MM-DD')
            // const day = JSON.parse(JSON.stringify(dayjs(el.inTime).format('YYYY-MM-DD'))) // How does this affect load time?
            const month = dayjs(el.date).format('YYYY-MM')
            // const month = JSON.parse(JSON.stringify(dayjs(el.inTime).format('YYYY-MM')))

            /* Local state data to be returned */
            let _child = {}
            let dayChild = {}
            let monthChild = {}

            dayChild[month] = {}

            /* Update YTD Income */
            // sumTotal += income
            // yearIncome.value += el.netIncome
            ///////////////////////////////////////////////////////////////////////////////////////////
            /* Group income entries by month */
            ///////////////////////////////////////////////////////////////////////////////////////////

            let monthFilter = arr.filter((item) => {
                // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
                let itemDate = dayjs(item.date).format('YYYY-MM')
                return itemDate === month;
            });

            /* Calculate income per month & push tip profiles to parent month*/
            let monthIncome = monthFilter.reduce((acc, item) => {
                monthChild[item.id] = { jobName, item }
                return acc + item.netIncome;
            }, 0);

            /* Computed Specific */
            // monthBlend[month] = monthIncome
            dataBlend[month] = monthIncome
            localBlend[month] = monthChild
            localData.value[month] = monthChild
        });
        ///////////////////////////////////////////////////////////////////////////////////////////
        /* Group Income entries by day */
        ///////////////////////////////////////////////////////////////////////////////////////////
        // let dayFilter = arr.filter((item) => {
        //     // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
        //     let itemDate = dayjs(item.date).format('YYYY-MM-DD')

        //     return itemDate === day;
        // });

        // /* Calculate income per month & push tip profiles to parent month*/
        // let dayIncome = dayFilter.reduce((acc, item) => {
        //     dayChild[item.id] = item
        //     return acc + item.netIncome;
        // }, 0);

        // dayBlend[month][day] = dayChild
        ///////////////////////////////////////////////////////////////////////////////////////////


        return { dataBlend, localBlend }
    })///////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Fetch Income */
    ///////////////////////////////////////////////////////////////////////////////////////////
    async function getIncome(start, end) {
        const s = JSON.stringify(start)
        const e = JSON.stringify(end)
        // const {viewStart, viewEnd} = useTimelineStore()
        const client = useSupabaseClient();
        const { data, error } = await client.from('user_tip').select('id, jobID, date, netIncome, jobName').order('date', { ascending: true })

        // const { data, error } = await client.from('user_tip').select().gt('inTime', s ).lt('inTime', e) // Query time range
        if (error) {
            console.log(error)
        }

        let arr = data;
        rawIncomeData.value = data
        // console.log(arr)

        // monthFilter(arr)



        // const jobGroup= Object.groupBy(arr, ({inTime}) => inTime)
        // console.log(jobGroup)
        // monthFilter(arr)
        // const job = Object.groupBy(localData.value)

    }///////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Job Comp Global Variables */
    ///////////////////////////////////////////////////////////////////////////////////////////

    /* Job Sorted Income for comps */
    const jobRawData = ref([])
    const jobSortData = ref({})
    // const jobYearIncome = ref({})
    // const jobMonthIncome = ref({})
    // const jobDailyIncome = ref({})
    const jobComp = ref({})

    /* Formatting data for chart.js */
    // const chartData = ref({
    //     datasets: [],
    //     data: [],
    //     labels: [],
    // })

    /* Structuring data for Chart.js */
    const chartData = ref({
        year: {
            datasets: [],

        },
        month: {
            datasets: [],

        },
        day: {
            datasets: [],

        }
    })

    /* Sum & Sort income values by job */
    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Multi Income Sort: Function */
    ///////////////////////////////////////////////////////////////////////////////////////////
    // function multiIncomeSort(m) {
    //     let incomeObj = {}
    //     Object.keys(m).forEach((i, idx, arr) => {
    //         const job = m[i]
    //         const jobID = job.jobID
    //         const jobName = job.jobName
    //         const jobIncome = job.income

    //         /* Set initial income values */
    //         jobDailyIncome.value[jobID] = { jobName, jobID }
    //         jobMonthIncome.value[jobID] = { jobName, jobID }
    //         jobYearIncome.value[jobID] = { jobName, jobID }
    //         /* Initial chartData values */
    //         chartData.value.month.datasets.push({ label: jobName, data: {}, tension: 0.4 }) // For an array

    //         let sumIncome = 0

    //         ///////////////////////////////////////////////////////////////////////////////////////////
    //         /* Sum & Sort daily & monthly values */
    //         ///////////////////////////////////////////////////////////////////////////////////////////
    //         jobIncome.forEach((a, ldx, rra) => {
    //             const date = JSON.parse(JSON.stringify(dayjs(a.date).format('YYYY-MM-DD')))
    //             const month = JSON.parse(JSON.stringify(dayjs(a.date).format('YYYY-MM')))
    //             const aID = a.id
    //             ///////////////////////////////////////////////////////////////////////////////////////////
    //             /* Sum & sort daily values */
    //             ///////////////////////////////////////////////////////////////////////////////////////////
    //             let dayFilter = rra.filter((item) => {
    //                 // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
    //                 let itemDate = dayjs(item.date).format('YYYY-MM-DD')
    //                 return itemDate === date;
    //             });

    //             let dayIncome = dayFilter.reduce((acc, item) => {
    //                 incomeObj[item.date] = item
    //                 return acc + item.netIncome;
    //             }, 0);

    //             chartData.value.month.datasets[idx].data[date] = dayIncome // Update datasets with an array item that contains a data object
    //             jobDailyIncome.value[jobID][date] = dayIncome // jobMonthIncome -> jobID -> {Date: { date: IncomeDate, income: dateIncome }}

    //             ///////////////////////////////////////////////////////////////////////////////////////////
    //             /* Sum & sort monthly values */
    //             ///////////////////////////////////////////////////////////////////////////////////////////
    //             let monthFilter = rra.filter((item) => {
    //                 // let itemDate = JSON.parse(JSON.stringify(dayjs(item.inTime).format('YYYY-MM')));
    //                 let itemDate = dayjs(item.date).format('YYYY-MM')
    //                 return itemDate === month;
    //             });

    //             let monthIncome = monthFilter.reduce((acc, item) => {
    //                 incomeObj[item.date] = item
    //                 sumIncome += item.netIncome
    //                 return acc + item.netIncome;
    //             }, 0);

    //             jobMonthIncome.value[jobID][month] = monthIncome // jobMonthIncome -> jobID -> {Date: { date: IncomeDate, income: dateIncome }}
    //             jobYearIncome.value[jobID]['income'] = sumIncome

    //         })
    //     })
    // }

    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Multi Income Sort: Computed */
    ///////////////////////////////////////////////////////////////////////////////////////////
    // TODO: Rename to Income Sum
    const multiIncomeSort = computed(() => {
        let incomeObj = {}
        let jobDailyIncome = {}
        let jobMonthIncome = {}
        let jobYearIncome = {}

        let dataRef = {}

        let chartData = {
            month: {
                datasets: []
            }
        }

        Object.keys(jobSort.value).forEach((i, idx, arr) => {
            const job = jobSort.value[i]
            const jobID = job.jobID
            const jobName = job.jobName
            const jobIncome = job.income


            /* Set initial income values */
            jobDailyIncome[jobID] = { jobName, jobID }
            jobMonthIncome[jobID] = { jobName, jobID }
            jobYearIncome[jobID] = { jobName, jobID }
            /* Initial chartData values */
            chartData.month.datasets.push({ label: jobName, data: {}, tension: 0.9 }) // For an array

            /* Data Reference */
            let ref = {}

            let sumIncome = 0

            ///////////////////////////////////////////////////////////////////////////////////////////
            /* Sum & Sort daily & monthly values */
            ///////////////////////////////////////////////////////////////////////////////////////////
            jobIncome.forEach((a, ldx, rra) => {
                const date = JSON.parse(JSON.stringify(dayjs(a.date).format('YYYY-MM-DD')))
                const month = JSON.parse(JSON.stringify(dayjs(a.date).format('YYYY-MM')))
                const aID = a.id


                ///////////////////////////////////////////////////////////////////////////////////////////
                /* Sum & sort daily values */
                /* (jobDailyIncome -> JobID -> Daily sums of income) */
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

                chartData.month.datasets[idx].data[date] = dayIncome
                jobDailyIncome[jobID][date] = dayIncome
                // jobDailyIncome[jobID] = { dayIncome, incomeObj } 

                ///////////////////////////////////////////////////////////////////////////////////////////
                /* Sum & sort monthly values -- */
                /* (jobMonthIncome -> jobID -> Monthly sums of income) */
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

                jobMonthIncome[jobID][month] = monthIncome
                jobYearIncome[jobID]['income'] = sumIncome

            });

            jobIncome.forEach((item, index, array) => {
                const tip = item
                const tipDate = item.date
                const tipID = item.id
                const tipIncome = item.netIncome

                const dayFormat = JSON.parse(JSON.stringify(dayjs(tipDate).format('YYYY-MM-DD')))
                const monthFormat = JSON.parse(JSON.stringify(dayjs(tipDate).format('YYYY-MM')))

                let dayFilter = array.filter((itm) => {
                    let itmDate = JSON.parse(JSON.stringify(dayjs(itm.date).format('YYYY-MM-DD')))
                    return itmDate === dayFormat;
                })

                let dayIncome = dayFilter.reduce((acc, it) => {
                    let nestedItem = it[1]
                    ref[it.date] = item
                    return acc + item.netIncome
                }, 0)
                dataRef[tipDate] = dayIncome
            })
        })
        return { jobDailyIncome, jobMonthIncome, jobYearIncome, chartData, dataRef }
    }) ///////////////////////////////////////////////////////////////////////////////////////////



    /* How I want to structure the data for daily views
    IncomeData: {
        YYYY-MM: {
            YYYY-MM-DD:{
                totalIncome: number
                _child:{
                    UUID:{
                        income: number
                        jobID: uuid
                        tipID: uuid    
                    }
                }
            }
        }
    }
    
    */


    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Job Sort: Function*/
    ///////////////////////////////////////////////////////////////////////////////////////////
    // function jobSort(array) { // Array of objects [ { active, id, job_name, user_tip:{} } ]
    //     ///////////////////////////////////////////////////////////////////////////////////////////
    //     /* Probs don't need this anymore */
    //     // const today = JSON.parse(JSON.stringify(dayjs().format('YYYY-MM')))
    //     const today = dayjs().format('YYYY-MM')
    //     // console.log(array) // Array of objects [ { active, id, job_name, user_tip:{} } ]
    //     ///////////////////////////////////////////////////////////////////////////////////////////

    //     let data = {}

    //     /* Create job object containing tip array */
    //     array.forEach((el: any, idx: any, arr: any) => {

    //         /* Identifier */
    //         const parent = el
    //         const jobName = el.job_name
    //         const jobID = el.id
    //         const userTip = el.user_tip
    //         ///////////////////////////////////////////////////////////////////////////////////////////

    //         /* Local State */
    //         let income = []
    //         ///////////////////////////////////////////////////////////////////////////////////////////
    //         Object.keys(userTip).forEach((key) => {
    //             const tip = userTip[key]
    //             const tipDate = tip.date
    //             const tipID = tip.id
    //             const tipDateFormat = dayjs(tipDate).format('YYYY-MM')
    //             income.push(tip) // Push to jobSortData -> jobID -> income -> [ TIP DATA ]
    //             // income[childID] = childTip // // Push to jobSortData -> jobID -> income -> tipID: { TIP DATA }
    //         })
    //         ///////////////////////////////////////////////////////////////////////////////////////////
    //         data[jobID] = { jobName, jobID, income } // Local data
    //         // jobSortData.value[jobID] = { jobName, jobID, income } // Global state
    //         // jobSortData.value[parent.id] = { jobName, jobID, income }
    //     });
    //     multiIncomeSort(data)
    // } ///////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Job Sort: Computed */
    ///////////////////////////////////////////////////////////////////////////////////////////
    const jobSort = computed(() => {
        // const today = dayjs().format('YYYY-MM')
        let data = {}
        jobRawData.value.forEach((el: any, idx: any, arr: any) => {

            /* Identifier */
            const parent = el
            const jobName = el.job_name
            const jobID = el.id
            const userTip = el.user_tip

            /* Local State */
            let income = []
            ///////////////////////////////////////////////////////////////////////////////////////////
            Object.keys(userTip).forEach((key) => {
                const tip = userTip[key]
                const tipDate = tip.date
                const tipID = tip.id
                const tipDateFormat = dayjs(tipDate).format('YYYY-MM')
                income.push(tip) // Push to jobSortData -> jobID -> income -> [ TIP DATA ]
                // income[childID] = childTip // // Push to jobSortData -> jobID -> income -> tipID: { TIP DATA }
            })
            ///////////////////////////////////////////////////////////////////////////////////////////
            data[jobID] = { jobName, jobID, income } // Local data
            // jobSortData.value[jobID] = { jobName, jobID, income } // Global state
            // jobSortData.value[parent.id] = { jobName, jobID, income }
        });
        // multiIncomeSort(data)
        return data
    })
    ///////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////
    /* getJobIncome -- Fetch Income by job & relation */
    ///////////////////////////////////////////////////////////////////////////////////////////
    async function getJobIncome() {
        const client = useSupabaseClient();
        // const { data, error } = await client.from('user_jobs').select(`id, job_name, user_tip(id, inTime, netIncome)`)

        // FIXME: Fetch Job name from user_tip table
        const { data, error } = await client.from('user_jobs').select(`active, id, job_name, user_tip(id, netIncome, date, jobName)`).order('date', { referencedTable: 'user_tip', ascending: true })
        if (error) {
            loading.value = false
            console.log(error)
        }
        let arr = data;
        jobRawData.value = data
        // jobSort(arr) // Commented to change jobSort to computed property
    }///////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////
    /* Reset State */
    ///////////////////////////////////////////////////////////////////////////////////////////
    function $reset() {
        loading.value = false
        rawIncomeData.value = []
        localData.value = {}
        incomeData.value = {}
        dailyIncome.value = {}
        monthlyIncome.value = {}
        yearIncome.value = 0

        jobRawData.value = []
        jobComp.value = {}
        // jobYearIncome.value = {}
        // jobMonthIncome.value = {}
        // jobDailyIncome.value = {}

    }///////////////////////////////////////////////////////////////////////////////////////////

    return {
        loading, incomeData, dailyIncome, monthlyIncome, yearIncome, monthFilter, getIncome, getJobIncome, jobSort, $reset, jobRawData, jobSortData, localData, /* jobYearIncome, jobMonthIncome, jobDailyIncome , */ jobComp, /* chartData, */ multiIncomeSort, monthBlend, rawIncomeData, dayIncome
    }

}, {
    // persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useIncomeData, import.meta.hot))
}
