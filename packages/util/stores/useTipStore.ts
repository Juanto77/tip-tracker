import { defineStore, acceptHMRUpdate } from 'pinia';
export const useTipStore = defineStore('Tip Store', {
    state: () => ({
        /* Fetch Job Data */
        job: {
            list: [] as Array<any>,
            obj: [] as Array<any>,
            data: {
                jid: '4',
            },
        },
        /* Input */
        hours: {
            clockIn: '',
            clockOut: '',
        },
        income: {
            cashTip: undefined || 0,
            creditTip: undefined || 0,
        },
        sales: {
            foodSales: undefined || 0,
            beerSales: undefined || 0,
            liquorSales: undefined || 0,
            wineSales: undefined || 0,
            retailSales: undefined || 0,

        },
        stats: {
            guestNum: undefined || 0,
        },

    }),

    getters: {

        jobSelect: (state) => {
            return state.job.list.filter((job) => job.id === Number(state.job.data.jid))[length];
        },


        metadata: (state) => {
            return state.job.list.filter((job) => job.id === Number(state.job.data.jid))[length].metadata
        },

        // jobOptions: (state) => {
        //     state.job.list.forEach((job) =>{
        //     const {key: key, value: value } = job
        //     return job
        // })
        // },
    },
        

    actions: {
        /* Fetches Job Data from JSON */

        async fetch() {
            this.job.list = (await import('~util/assets/new-job-table.json')).default;
        },

        /* fetch from database */

        // async fetch() {
        //     this.job.list = await $fetch('/api/jobs');
        // },
    },
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTipStore, import.meta.hot))
}
