export function use_Job() {


  function link() {
    const store = useJobStore()
    store._sourceLink()
  }

  function step() {
    const route = useRoute()
    const store = useJobStore()
    if (route.path === '/add-job-start' || '/add-job-info' || '/Add-job-start') {
      navigateTo({ path: '/add-job-sales' })
  /*     if (store.template === true && store._template === true) {
        // store.$set(1)
      }
      else if (store.template === false && store._template === true) {
        // store.$set(0)
      }
      store._template = false */
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

  function back() {
    const router = useRouter()
    const store = useJobStore()
    store.resetPair()
    router.back()
  }

  return { step, back }
}
