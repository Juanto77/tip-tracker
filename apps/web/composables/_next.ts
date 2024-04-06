export function useNext() {
  function link() {
    const store = useAddJobStore()
    store._sourceLink()
  }

  function step() {
    const route = useRoute()
    const store = useAddJobStore()
    if (route.path === '/add-job-start' || '/add-job-info' || '/Add-job-start') {
      navigateTo({ path: '/add-job-sales' })
      if (store.template === true && store._template === true) {
        store.$set(1)
      }
      else if (store.template === false && store._template === true) {
        store.$set(0)
      }
      store._template = false
    }
    if (route.path === '/add-job-sales') {
      navigateTo({ path: '/add-job-pool' })
    }
    if (route.path === '/add-job-pool') {
      store._sourceLink()
      navigateTo('/add-job-link')
    }
    if (route.path === '/add-job-link') {
      store.post()
    }
  }
  return { step }
}
