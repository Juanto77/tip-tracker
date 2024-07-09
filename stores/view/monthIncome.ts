import { defineStore, acceptHMRUpdate } from 'pinia'


export const useMonthIncome = defineStore('monthIncome', {
    state: () => ({
        monthIncome: {} as Object,
        monthArr: [] as Array<any>,



        ///////////////////////////////////////////////////////////////////////////////////////////    
    }),
    getters: {



        ///////////////////////////////////////////////////////////////////////////////////////////    
    },
    /////////////////////////////////////////////////////////////////////////////////////////// 
    actions: {
        /* Fetch from Database */
        async fetchIncome() {
            const dayjs = useDayjs()
            const client = useSupabaseClient();
            let { data } = await client.from('user_tip').select(`id, inTime,netIncome`);
            data?.forEach((item) => {
                let format = 'YYYY-MM-DD';
                let fullDate = dayjs(item.inTime).format(format);
                let itemDay = dayjs(item.inTime).format('DD');
                let itemMonth = dayjs(item.inTime).format('MM');
                let itemYear = dayjs(item.inTime).format('YYYY');

                // this.monthIncome[item.id] = { id: item.id, inTime: item.inTime, day: itemDay, month: itemMonth, year: itemYear, netIncome: item.netIncome } // Creates onbect with id val as key
                this.monthArr.push({
                    id: item.id,
                    format: format,
                    fullDate: fullDate,
                    inTime: item.inTime,
                    day: itemDay,
                    month: itemMonth,
                    year: itemYear,
                    netIncome: item.netIncome
                }) // Pushes to array
            })
        }, // end fetchIncome()
        ///////////////////////////////////////////////////////////////////////////////////////////
        // async fetchLocal() {
        //     const data = await $fetch('')
        //     console.log(data)
        // } //end fetchlocal()

        ///////////////////////////////////////////////////////////////////////////////////////////    
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMonthIncome, import.meta.hot))
}
