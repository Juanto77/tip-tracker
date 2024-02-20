import { defineStore, acceptHMRUpdate } from 'pinia'
import { useTipInputStore } from './AddTip';
export const useJobStore = defineStore('Job Store', {
    state: () => ({
        jobList: [] as Array<any>,
        jobObj:[] as Array<any>,

    }),
    getters: {

        jobSelect: (state) => {
            const tipStore = useTipInputStore();
            return state.jobList.filter((job) => job.id === Number(tipStore.jobData.jid))[length];
        },


        metadata: (state) => {
            const tipStore = useTipInputStore();
            return state.jobList.filter((job) => job.id === Number(tipStore.jobData.jid))[length].metadata
        },



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

        what() {
            Object.keys(this.jobSelect.metadata).forEach((key) => {
                this.jobObj.push({ key, value: this.jobSelect[key] })
            },
            )
        }

        ///////////////////////////////////////////////////////////////////////////////////////////
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
},)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot))
}
