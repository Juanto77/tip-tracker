import { defineStore, acceptHMRUpdate } from 'pinia';
export const useTipStore = defineStore('Tip Store', {
    state: () => ({
        /* None of these fields should be acted upon */
        job: {
            id: 0 || "0",

        },
        hours: {
            clockIn: '',
            clockOut: '',
        },
        income: {
            cashTip: undefined || 500,
            creditTip: undefined || 500,
        },
        sales: {
            foodSales: undefined || 111,
            beerSales: undefined || 222,
            liquorSales: undefined || 333,
            wineSales: undefined || 444,
            retailSales: undefined || 555,
        },
        stats: {
            guestNum: undefined || 0,
        },

    }), // end of state

    getters: {

    },


    actions: {

    }, //End of Actions
}) // end of export
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTipStore, import.meta.hot))
}
