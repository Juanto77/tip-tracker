import { defineStore, acceptHMRUpdate } from 'pinia'
import { useJobStore } from './JobStore';
import { useTipStore } from './TipStore';


export const useTotalStore = defineStore('Get Totals', {
    state: () => ({
        /* Net Revenue */
        // creditNet: undefined || 0, // Minus Everything: 425.48
        // cashNet: undefined || 0,
        // netIncome: undefined || 0,
        /* Calculate */
        sales: {} as Object,
        tipOut: {} as Object,
        cardFee: 0, //11.25 for $500

    }),
    getters: {
        creditNet: (state) => {
            const tipStore = useTipStore();
            return tipStore.income.creditTip - state.cardFee - state.totalTipOut || 0;
        },

        cashNet: (state) => {
            const tipStore = useTipStore();
            return tipStore.income.cashTip || 0;
        },

        netIncome: (state) => {
            return state.creditNet + state.cashNet || 0;
        },

        totalTipOut: (state) => {
            return Object.values(state.tipOut).reduce((a, b) => a + b, 0) || 0;
        },

        totalSales: (state) => {
            const tipStore = useTipStore();
            return Object.values(tipStore.sales).reduce((a, b) => a + b, 0) || 0;
        },

        PPA: (state) => {
            const tipStore = useTipStore();
            let tPPA = undefined;
            tPPA = (state.totalSales / tipStore.stats.guestNum)
            return tPPA
        },

        //FIXME: returns undefined at sometimes
        // getCardFee: (state) => {
        //     const jobStore = useJobStore();
        //     const tipStore = useTipStore();
        //     return ((jobStore.cardFee / 100) * tipStore.income.creditTip)
        // },

    },

    actions: {
    }

})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTotalStore, import.meta.hot))
}
