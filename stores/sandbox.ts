import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSandboxStore = defineStore('sandbox', () => {
  return { }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSandboxStore, import.meta.hot))
