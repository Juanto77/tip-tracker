import { defineStore, acceptHMRUpdate } from 'pinia';
import { useTipStore } from './TipStore';

// TODO Move interface to types
declare interface List {
    calc?: boolean,
    id?: number,
    card_fee?: number,
    metadata?: object,
    metadata_d?: object,
    name?: string,
    params?:
    {
        cardFee: number,
    },
    user_id?: number,
}

export const useJobStore = defineStore('Job Store', {
    state: () => ({
        // TODO: Refactor empty arrays to objects
        list: [] as Array<List>,
        options: [] as Array<any>,
        select: [] as Array<any>,
        // TODO:  Change to object & refactor addTips function
        object: [] as Array<any>,

    }),
    // TODO fix this as returning undefined
    getters: {
        jobSelect: (state) => {
            const tipStore = useTipStore();
            return state.list.filter((job) => job.id === Number(tipStore.job.id))[length] || undefined;
        },

        metadata: (state) => {
            const tipStore = useTipStore();
            return state.list.filter((job) => job.id === Number(tipStore.job.id))[length].metadata || undefined;
        },

        cardFee: (state) => {
            const tipStore = useTipStore();
            return state.list.filter((job) => job.id === Number(tipStore.job.id))[length].params?.cardFee || 0;
        },

        ///////////////////////////////////////////////////////////////////////////////////////////
    },
    actions: {
        async fetchJobs() {
            const headers = useRequestHeaders(['cookie'])
            this.list = await useFetch('/api/jobs', { headers });
        }, // End of fetch()
    }, // end of actions
}); // End of export

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot));
}
