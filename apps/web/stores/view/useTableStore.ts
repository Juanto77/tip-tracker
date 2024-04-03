import { defineStore, acceptHMRUpdate } from 'pinia'
import { useSupabaseClient } from '#imports'

export const useTableStore = defineStore('Table Store', {
    state: () => ({
        data: [] as Array<any>,

    }),
    getters: {},
    actions: {
        async fetch() {
            const client = useSupabaseClient();
            this.data = (await client.from('user_tip').select(`*`)).data
            console.log(this.data)
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot))
}
