import { acceptHMRUpdate, defineStore } from 'pinia'
//TODO: Form Validation

export const useJobStore = defineStore('Job Store', () => {
  /* Default Store */
  const jobName = ref('')
  const _active = ref(true)
  const _calculate = ref(false)
  const _advanced = ref(true)
  const template = ref(false)

  ///////////////////////////////////////////////////////////////////////////////////////////

  const saleSource = ref<Array<saleSource>>([])
  const poolSource = ref<Array<poolSource>>([])
  const pairSource = ref({})  

  ///////////////////////////////////////////////////////////////////////////////////////////

  const _saleSource = ref({})
  const _poolSource = ref({})

///////////////////////////////////////////////////////////////////////////////////////////

  const _createDate = ref(new Date())
  const _editDate = ref(new Date())

  const saleOptions = ref([
    { id: `0${use_uid()}`, name: 'Food Sales', code: 'fSales', active: true, sales: 0 },
    { id: `1${use_uid()}`, name: 'Beer Sales', code: 'bSales', active: true, sales: 0 },
    { id: `2${use_uid()}`, name: 'Liquor Sales', code: 'liqSales', active: true, sales: 0 },
    { id: `3${use_uid()}`, name: 'Wine Sales', code: 'wiSales', active: true, sales: 0 },
    { id: `4${use_uid()}`, name: 'Retail Sales', code: 'retSailes', active: true, sales: 0 }
  ])
  const poolOptions = ref([
    { id: `0${use_uid()}`, name: 'Food Runner', code: 'frPool', active: true, sumOut: 0, percent: 0 },
    { id: `1${use_uid()}`, name: 'Bar', code: 'barPool', active: true, sumOut: 0, percent: 0 },
    { id: `2${use_uid()}`, name: 'Host', code: 'hPool', active: true, sumOut: 0, percent: 0 },
    { id: `3${use_uid()}`, name: 'Busser', code: 'busPool', active: true, sumOut: 0, percent: 0 },
  ])

  /* Types */
interface saleSource {
  id: String,
  name: String,
  code: String,
  active: Boolean,
  sales: Number
}

interface poolSource {
  id: String,
  name: String,
  code: String,
  active: Boolean,
  sumOut: Number,
  percent: Number
}

interface pairSource {
}


/* Source link v2 */
  function _sourceLink() {
    Object.entries(poolSource.value).forEach((saleKey) => {
      /* Destructure Sales Source Array */
      let _child = {} as Object
      const child = JSON.parse(JSON.stringify(saleSource.value))
      const nestedObject = child.forEach(element => { 
        let id = element.id as String
        let name = element.name as String
        let code = element.code as String
        let active = true
        let isChild = false
        let sales = 0
        _child[element.id] = {id, name, code, isChild}
      });

      /* Pool Source Values */
      const id = JSON.parse(JSON.stringify(saleKey[1].id))
      const name = JSON.parse(JSON.stringify(saleKey[1].name))
      const code = JSON.parse(JSON.stringify(saleKey[1].code))
      const active = JSON.parse(JSON.stringify(saleKey[1].active))
      const sales = 0
      const sumOut = 0
      const percent = JSON.parse(JSON.stringify(saleKey[1].percent))
      const _createDate = new Date()      
      
      const _editDate = null
      const _archiveDate = null

      pairSource.value[id] = { id, name, code, active, sales, sumOut, percent, _child }

      
    })
  }

  async function post() {
    const client = useSupabaseClient()
    const user = useSupabaseUser()

    /* Array Destructuring */
    saleSource.value.forEach((obj) => {
      // console.log(obj.id, { obj })
      _saleSource.value[obj.id] = obj
    }
    )

    poolSource.value.forEach((obj) => {
      // console.log(obj.id, { obj })
      _poolSource.value[obj.id] = obj
    }
    )

    /* Updates for database */
    const updates = {
      user_id: user.value.id,
      job_name: jobName.value,
      active: _active.value,
      calculate: _calculate.value,
      advanced: _advanced.value,
      sale_source: _saleSource.value,
      pool_source: _poolSource.value,
      source_pair: pairSource.value,
      _params: {},
      _createDate: _createDate.value,
      _editDate: _editDate.value
    }


/* Insert Updates to database */
    const { data, error } = await client
      .from('user_jobs')
      .insert(updates)
    if (error) {
      console.log(error)
    }
    console.log(updates)
  }


///////////////////////////////////////////////////////////////////////////////////////////
  function $reset() {
    jobName.value = ''
    _active.value = true
    _calculate.value = false
    _advanced.value = true
    template.value = false

    saleSource.value = []
    poolSource.value = []
    pairSource.value = {}

    _saleSource.value = {}
    _poolSource.value = {}
  }
/* onClick function called in _Job composable when clicking back button. */
  function resetPair(){
    pairSource.value = {}
  }


  return { _createDate, _editDate, jobName, _active, _calculate, _advanced, template, saleSource, poolSource, _saleSource, _poolSource, pairSource,_sourceLink, $reset, post, resetPair, poolOptions, saleOptions }
}, {
  persist: false,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot))
