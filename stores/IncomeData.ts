import { defineStore, acceptHMRUpdate } from 'pinia'
const dayjs = useDayjs()

export const useIncomeData = defineStore('Income Data', () => {
    /* Private Storage */
    const rawIncomeData = ref([])

    const localData = ref({})

    /* Import Data to Object */
    const incomeData = ref({})

    const dailyIncome = ref({}) // FORMERLY AN OBJECT

    const monthlyIncome = ref({}) 

    const yearIncome = ref(0)

    const routeData = ref({})


    /* Combine multiple incomes that occur in one day */
    async function dayFilter(month) {
        try{
        Object.entries(localData.value[month]).forEach((i, idx, arr) => {
            const childItem = i[1]
            const parentDate = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM-DD')))
            const parentMonth = JSON.parse(JSON.stringify(dayjs(childItem.inTime).format('YYYY-MM')))
            let _child = {}
            let child = []

            let filter = arr.filter((item) => {
                const localItem = item[1]
                const itemDay = JSON.parse(JSON.stringify(dayjs(localItem.inTime).format('YYYY-MM-DD')))
                return itemDay === parentDate
            })

            let dayIncome = filter.reduce((acc, item) => {
                let nestedItem = item[1]
                let incomeRange = dayjs(nestedItem.inTime).format('YYYY-MM-DD');
                // _child[nestedItem.id] = nestedItem
                child.push(nestedItem)

                return acc + item[1].netIncome
            }, 0)

            // incomeData.value[month][parentDate] = _child
            incomeData.value[month][parentDate] = child

            dailyIncome.value[parentDate] = dayIncome
            // dailyIncome.value.push({date: parentDate, income: dayIncome})
        })
     // FIXME: Fix Error Handling when navigating to month that has no tips entered.

    } catch (e){
        alert(e)
    }
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
                return acc + item.netIncome;
            }, 0);

            /* Create an empty object for months with data*/
            incomeData.value[date] = {}; 
            localData.value[date] =  _child
            monthlyIncome.value[date] = monthIncome
            yearIncome.value = sumTotal

            // monthlyIncome.value.push
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
        let arr = data;
        monthFilter(arr)
    }

    function $setDailyIncome(){
        dailyIncome.value = []
    }

    function $onRoute() {
        // console.log(id)
        // Object.entries(incomeData.value[id]).forEach((key)=>{
        //     console.log(key)
        // })
    }



    return { incomeData, dailyIncome, monthlyIncome, yearIncome, routeData, getIncome, monthFilter, dayFilter, $onRoute }

}, {
    // persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useIncomeData, import.meta.hot))
}
