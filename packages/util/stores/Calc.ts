import { defineStore, acceptHMRUpdate } from 'pinia'
import { useJobStore } from './GetJobs';
import { useTipInputStore } from './AddTip';

export const useCalcStore = defineStore('Calc', {
    state: () => ({

    }),
    getters: {
        /* Does Calculator Run? */
        runCalc: (state) => {
            const jobStore = useJobStore();
            return jobStore.toCalc
        },
        /* Income */
        creditTip: (state) => {
        },
        cashTip: (state) => {
        },
        /* Sales */
        foodSales: (state) => {
        },
        beerSales: (state) => {
        },
        wineSales: (state) => {
        },
        liquorSales: (state) => {
        },
        retailSales: (state) => { 
        },
        /* Stats */
        guestNum: (state) => {
        },

        totalSales: (state) => {
            const tipStore = useTipInputStore();
            const job = useJobStore()
            return Object.values(tipStore.sales).reduce((a, b) => a + b, 0)

        },
        /* Calculator */
        cardFeeValue:(state) =>{
            const jobStore = useJobStore()
            return jobStore.cardFee
        },
        cardFee: (state) => {
            const jobStore = useJobStore()
            const tipStore = useTipInputStore();
            return (jobStore.cardFee / 100) * tipStore.income.creditTip
        },
        ///////////////////////////////////////////////////////////////////////////////////////////
    },
    ///////////////////////////////////////////////////////////////////////////////////////////
    actions: {


        ///////////////////////////////////////////////////////////////////////////////////////////        
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCalcStore, import.meta.hot))
}
