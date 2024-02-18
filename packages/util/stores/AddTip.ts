import { defineStore, acceptHMRUpdate } from 'pinia';

export const useTipInputStore = defineStore('TipInput', {
    state: () => ({
        ///////////////////////////////////////////////////////////////////////////////////////////
        jobData:{
            jid: '' as string,
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
            foodSales: 0,
            beerSales: 0,
            liquorSales: 0,
            wineSales: 0,
            retailSales: 0,
            
        },
        stats:{
            guestNum: 0,
        },

    }),
    
    getters: {
    
    },



    // [Map State](https://pinia.vuejs.org/core-concepts/state.html)
    // [Map State 2](https://jerickson.net/basics-of-mapstate-vuex/)
    actions: {
    },
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTipInputStore, import.meta.hot))
}
