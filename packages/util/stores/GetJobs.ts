import { defineStore, acceptHMRUpdate } from 'pinia'
import { useTipInputStore } from './AddTip';
export const useJobStore = defineStore('Job Store', {
    state: () => ({
        jobList: [] as Array<any>,

    }),
    getters: {
        /* Returns a destructured object of the users job selection */
        jobSelect: (state) => {
            const tipStore = useTipInputStore();
            return state.jobList.filter((job) => job.id === Number(tipStore.jobData.jid))[length];
        },

        /* Returns Job ID */
        jobID: (state) => {
            return state.jobSelect.id
        },
        toCalc: (state) =>{
            return state.jobSelect.calc
        },
        cardFee: (state) => {
            return state.jobSelect.card_fee
        },
        /* Returns User ID */
        userID: (state) => {
            return state.jobSelect.user_id
        },
        /* Returns Job Name */
        jobName: (state) => {
            return state.jobSelect.name
        },



        /* // retrieves the selected job's metadata */
        metadata: (state) => {
            return state.jobSelect.metadata
        },

        params: (state) => {
            return state.metadata.params
        },

        foodTip: (state) => {
            return state.metadata.foodTip
        },

        busTip: (state) => {
            return state.metadata.busTip
        },

        barTip: (state) => {
            return state.metadata.barTip
        },

        /* // A getter that mutates the jobSelection state. */
        // inputJobSelection: (state) => {
        //     const tipStore = useTipInputStore();

        //     return (state.jobList.filter(
        //         (job) => job.id === Number(tipStore.jobData.jid)
        //     )[length])
        // },

        /* // retrieves the selected job's metadata */


        ///////////////////////////////////////////////////////////////////////////////////////////
    },
    actions: {
        /* Fetches Job Data from JSON */
        async fetch() {
            this.jobList = (await import('~util/assets/new-job-table.json')).default;
        },

        /* fetch from database */
        // async fetch() {
        //     this.jobList = await $fetch('/api/jobs');
        // },



        ///////////////////////////////////////////////////////////////////////////////////////////
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
},)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot))
}
