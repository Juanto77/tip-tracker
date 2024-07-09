import { acceptHMRUpdate, defineStore } from 'pinia'
import user from '~/server/api/user'

export const useAddJobStore = defineStore('AddJob', () => {
  const jobName = ref('')

  const _active = ref(true)

  const _calculate = ref(false)

  const _advanced = ref(true)

  const template = ref(false)

  const _template = ref(true)

  ///////////////////////////////////////////////////////////////////////////////////////////

  const saleSource = ref({})

  const poolSource = ref({})

  const childSource = ref({})

  ///////////////////////////////////////////////////////////////////////////////////////////
  /* Testing Grounds */

  //////////////////////////////////////////////////////////////////////////////////////////
  function addSale() {
    saleSource.value[`sale_${use_uid()}`] = { _name: '', _value: true }
  }
  function rmSale(idx, id) {
    delete saleSource.value[idx]
  }
  function addPool() {
    poolSource.value[`pool_${use_uid()}`] = { _name: '', _value: false }
  }
  function rmPool(idx, id) {
    delete poolSource.value[idx]
  }

  /* Sorted by sales categories */
  /*   function _sourceLink() {
    Object.entries(saleSource.value).forEach((saleKey) => {
      // Clone the poolSource object to avoid direct reference
      const _child = JSON.parse(JSON.stringify(poolSource.value))
      const _key = JSON.parse(JSON.stringify(saleKey[0]))
      const _name = JSON.parse(JSON.stringify(saleKey[1]._name))
      // console.log(_name)
      childSource.value[_key] = { _name, _child }
    })
  } */

  function _sourceLink() {
    Object.entries(poolSource.value).forEach((saleKey) => {
      // Clone the poolSource object to avoid direct reference
      const _child = JSON.parse(JSON.stringify(saleSource.value))
      const _key = JSON.parse(JSON.stringify(saleKey[0]))
      const _name = JSON.parse(JSON.stringify(saleKey[1]._name))
      // console.log(_name)
      childSource.value[_key] = { _name, _child }
    })
  }

  function $set(v: number) {
    if (v === 1) {
      saleSource.value[`sale_${use_uid()}`] = { _name: 'Food', _value: false }
      saleSource.value[`sale_${use_uid()}`] = { _name: 'Beer', _value: false }
      saleSource.value[`sale_${use_uid()}`] = { _name: 'Liquor', _value: false }
      saleSource.value[`sale_${use_uid()}`] = { _name: 'Wine', _value: false }
      saleSource.value[`sale_${use_uid()}`] = { _name: 'Retail', _value: false }

      poolSource.value[`pool_${use_uid()}`] = { _name: 'Bar', _value: false }
      poolSource.value[`pool_${use_uid()}`] = { _name: 'Food', _value: false }
      poolSource.value[`pool_${use_uid()}`] = { _name: 'Bus', _value: false }
    }
    else {
      saleSource.value[`sale_${use_uid()}`] = { _name: '', _value: true }
      poolSource.value[`pool_${use_uid()}`] = { _name: '', _value: false }
    }
  }

  function $reset() {
    jobName.value = ''

    _active.value = true

    _calculate.value = false

    _advanced.value = true

    template.value = false

    _template.value = true

    saleSource.value = {}

    poolSource.value = {}
    childSource.value = {}
  }

  async function post() {
    const client = useSupabaseClient()
    const user = useSupabaseUser()

    const updates = {
      user_id: user.value.id,
      job_name: jobName.value,
      active: _active.value,
      calculate: _calculate.value,
      advanced: _advanced.value,
      sale_source: saleSource.value,
      pool_source: poolSource.value,
      source_pair: childSource.value,
      _params: {},
    }

    const { error } = await client
      .from('user_jobs')
      .insert(updates)
    if (error) {
      console.log(error)
    }
  }

  return { jobName, _active, _calculate, _advanced, template, _template, saleSource, poolSource, childSource, addSale, rmSale, addPool, rmPool, _sourceLink, $reset, $set, post }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAddJobStore, import.meta.hot))
