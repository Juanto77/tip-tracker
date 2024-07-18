import { defineStore, acceptHMRUpdate } from 'pinia'
const dayjs = useDayjs()

export const useIncomeData = defineStore('Income Data', () => {
    /* Private Storage */
    const rawIncomeData = ref([])

    const localData = ref({})

    /* Import Data to Object */
    const incomeData = ref({})

    const dailyIncome = ref({})

    const monthlyIncome = ref({})

    const yearIncome = ref(0)

    const routeData = ref({})

    async function getTips() {

        const client = useSupabaseClient()
        const { data, error } = await client
            .from('user_tip')
            .select(`*, user_jobs(*)`)
        // .eq('id', i)

        // console.log(data)

        // incomeData.value = data

        // data.forEach((o, idx, arr) =>{
        //     incomeData.value = o
        // })       

    }


    /* Combine multiple incomes that occur in one day */
    // FIXME: Fix Error Handling when navigating to month that has no tips entered.
    async function dayFilter(month) {
        
        try{
        Object.entries(localData.value[month]).forEach((i, idx, arr) => {

            // console.log(arr)

            const childItem = i[1]

            const parentDate = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM-DD')))
            const parentMonth = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM')))

            let _child = {}

            let filter = arr.filter((item) => {
                const localItem = item[1]
                const itemDay = JSON.parse(JSON.stringify(dayjs(localItem.inTime).format('YYYY-MM-DD')))
                return itemDay === parentDate
            })


            let dayIncome = filter.reduce((acc, item) => {
                let nestedItem = item[1]
                let incomeRange = dayjs(nest.inTime).format('YYYY-MM-DD');
                _child[nestedItem.id] = nestedItem
                return acc + item[1].netIncome
            }, 0)

            incomeData.value[month][parentDate] = _child
            dailyIncome.value[parentDate] = dayIncome
        })
    } catch (e){
        alert(e)
    }


        ///////////////////////////////////////////////////////////////////////////////////////////
        /* Combine multiple incomes that occur in one day */
        // Object.keys(incomeData.value).forEach((key) => {
        //         console.log(incomeData.value[key])
        //         Object.entries(incomeData.value[key]).forEach((o, idx, arr) => {
        //             const childItem = o[1]
        //             /* Day format */
        //             const parentDate = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM-DD')))

        //             let filter = arr.filter((item) => {
        //                 const itemDay = JSON.parse(JSON.stringify(dayjs(item[1].inTime).format('YYYY-MM-DD')))
        //                 return itemDay === parentDate
        //             })


        //             let dayIncome = filter.reduce((acc, item) => {
        //                 let incomeRange = dayjs(item.inTime).format('YYYY-MM-DD');
        //                 return acc + item[1].netIncome
        //             }, 0)


        //             dailyIncome.value[parentDate] = dayIncome

        //             // console.log('FILTER DAY', filter)
        //             // console.log(incomeData.value[key])
        //             // console.log('O', o)
        //             // console.log('idx', idx)
        //             // console.log('ARR', arr)
        //         })
        //     })
    }


    /* Combine tips into monthly category, calcualte yearly & monthly income */
    function monthFilter(array){
        const today = JSON.parse(JSON.stringify(dayjs().format('YYYY-MM')))
        let sumTotal = 0
        array.forEach((el: any, idx: any, arr: any) => {
            const date = JSON.parse(JSON.stringify(dayjs(el.inTime).format('YYYY-MM')))

            /* Update YTD Income */
            sumTotal += el.netIncome
            // yearIncome.value += el.netIncome

            let _child = {} 


            /* Group income entries by month */
            let filter = arr.filter((item) => {
                let itemDate = dayjs(item.inTime).format('YYYY-MM');
                return itemDate === date;
            });


            /* Calculate income per month & push tip profiles to parent month*/
            let monthIncome = filter.reduce((acc, item) => {
                _child[item.id] = item
                // _child.push(item)

                return acc + item.netIncome;
            }, 0);

            /* Create an empty object for months with data*/
            incomeData.value[date] = {}; 
            localData.value[date] =  _child
            monthlyIncome.value[date] = monthIncome
            yearIncome.value = sumTotal

        });
        dayFilter(today) // Call day filter on completion
    }



    /* Fetch Income */
    // TODO: Allow values to be passed through for .gt & .lt
    async function getIncome() {
        const client = useSupabaseClient();
        const { data, error } = await client.from('user_tip').select()
        // .gt('inTime', '2024-07-01')
        if (error) {
            console.log(error)
        }

        // rawIncomeData.value = data;
        let arr = data;
        // rawIncomeData.value = data;

        monthFilter(arr)
    }

    function $onRoute() {
        // console.log(id)
        // Object.entries(incomeData.value[id]).forEach((key)=>{
        //     console.log(key)
        // })
    }



    return { incomeData, dailyIncome, monthlyIncome, yearIncome, routeData, getTips, getIncome, monthFilter, dayFilter, $onRoute }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useIncomeData, import.meta.hot))
}
