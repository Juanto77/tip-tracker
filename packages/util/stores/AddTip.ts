import { defineStore, acceptHMRUpdate } from 'pinia';
// TODO Change Name
export const useTipInputStore = defineStore('TipInput', {
    state: () => ({
        ///////////////////////////////////////////////////////////////////////////////////////////
        jobData: {
            jid: '4',
        },
        hours: {
            clockIn: '',
            clockOut: '',
        },
        income: {
            cashTip: 0,
            creditTip: 0,
        },
        sales: {
            foodSales: 111,
            beerSales: 222,
            liquorSales: 333,
            wineSales: 444,
            retailSales: 555,

        },
        stats: {
            guestNum: 0,
        },

    }),

    getters: {

    },



    // [Map State](https://pinia.vuejs.org/core-concepts/state.html)
    // [Map State 2](https://jerickson.net/basics-of-mapstate-vuex/)
    actions: {
    },
    })
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTipInputStore, import.meta.hot))
}
