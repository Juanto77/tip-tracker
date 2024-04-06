# Add Job Scratch Pad

### State `sandbox.ts`

```
  const jobName = ref('')

  const saleSource = ref({
    'sale_ca5c4e21-ef1d-4939-9cf6-46f7c1a0c0ac': {
      _name: 'Add a Source',
      _child: false,
    },
  })

  const poolSource = ref({
    'pool_92424c15-73da-4605-a8b9-164ca8454374': {
      _name: 'Add a Pool',
      _child: false,
    },
  })

  function addSale() {
    saleSource.value[`sale_${use_uid()}`] = { _name: '', _child: false }
  }
  function rmSale(idx, id) {
    delete saleSource.value[idx]
  }
  function addPool() {
    poolSource.value[`pool_${use_uid()}`] = { _name: '', _child: false }
  }
  function rmPool(idx, id) {
    delete poolSource.value[idx]
  }

  function _sourceLink() {
    Object.keys(saleSource.value).forEach((saleKey) => {
      // Clone the poolSource object to avoid direct reference
      const poolSourceClone = JSON.parse(JSON.stringify(poolSource.value))
      saleSource.value[saleKey]._child = poolSourceClone
    })
  }

  return { jobName, saleSource, poolSource, addSale, rmSale, addPool, rmPool, _sourceLink }

```

### App `AddJob.vue`

```
<script setup>
const store = useAddJobStore()
</script>

<template>
  <pre> {{ store.sourcePair }} </pre>
  <form>
    <div>
      <!-- Job Name -->
      <UIFormInputText v-model="store.jobName" type="text" label="Job Name" />
    </div>
    <!-- End Job name -->
    <!-- Sale Source -->
    <div id="saleSource" class="my-4">
      <div v-for="(j, idx, a) in store.saleSource" id="saleLoop" :key="a">
        <!-- <pre> {{ a }} | {{ idx }} | {{ j._name }} | {{ j._child }} </pre> -->
        <UIFormInputText v-model="j._name" type="text" :label="`Sale Source ${a + 1}`" />
        <button type="button" @click="store.rmSale(idx, j.key)">
          rm
        </button>
      </div>
      <!-- End saleLoop -->
      <button type="button" @click="store.addSale()">
        Add Sales Source
      </button>
    </div>
    <!-- Pool Source -->
    <div id="poolSource" class="my-4">
      <div v-for="(j, idx, a) in store.poolSource" id="poolLoop" :key="a">
        <!-- <pre> {{ a }} | {{ idx }} | {{ j._name }} | {{ j._child }} </pre> -->
        <UIFormInputText v-model="j._name" type="text" :label="`Pool Source ${a + 1}`" />
        <button type="button" @click="store.rmPool(idx, j.key)">
          rm
        </button>
      </div>
      <!-- end poolLoop -->
      <button type="button" @click="store.addPool()">
        Add Pool Source
      </button>
    </div>
    <!-- end poolSource -->

    <!-- Source Pair -->
    <div class="grid grid-cols-5">
      <div v-for="(j, idx) in store.saleSource" id="sale" :key="idx">
        <div>
          {{ j._name }}
          <div v-for="(i, ix, a) in store.poolSource" id="pool" :key="a">
            <HSwitchGroup as="div" class="flex items-center">
              <HSwitch
                v-model="i.value"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                :class="[i.value ? 'bg-indigo-600' : 'bg-gray-200']"
              >
                <span
                  aria-hidden="true"
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="[i.value ? 'translate-x-5' : 'translate-x-0']"
                />
              </HSwitch>
              <HSwitchLabel as="span" class="ml-3 text-sm">
                <span class="text-gray-900"> {{ i._name }} </span>
              </HSwitchLabel>
            </HSwitchGroup>
          </div>
        </div>
      </div>
    </div>
    <!-- End Source Pair -->
    <div />
  </form>
  <button type="button" @click="store._sourceLink">
    Click Me
  </button>
</template>

```

# Combining sources

**Description:** Adding poolSource to saleSource[key]._child

This is good but cannot be a computed property because it takes too long to execute. -> It creates a reference from every single input field to each and every child element, 4 saleSource * 4 poolSource = 20 elements that are being manipulated.

I could try using a multi step form to execute a function instead of having an event listener.

Step 1: Job Title, Sales Sources / Use Defaults?

Step 2: poolSource

Step 3: sourceLink

```
  const sourceD = computed(() => {
    Object.keys(saleSource.value).forEach((saleKey) => {
      // Clone the poolSource object to avoid direct reference
      const poolSourceClone = JSON.parse(JSON.stringify(poolSource.value))
      saleSource.value[saleKey]._child = poolSourceClone

    })
  })
```

# Multi Step Form

### Does the user want to track an overview (bottom line) of of sales, tipout and income or do they want a more granular view?

  Breaking down each section to a single component

  ~~Using dynamic components on a page to create steps~~

  - - ~~Validate each step before data is pushed to store~~

  Use Routing with dynamic pages to add tips & jobs

  - `~/pages/add-[params]-[step].vue`

### Desired output of information

#### Total Sales
  ####
  `if (!advanced) { User Defined Categories (Bar, Food, Liquor, etc...) }`

#### Total Tipout
  - Does the user want to track total tipout

  `if (!calculate) { User Defined Pools }`

#### Total Hours
#### Total Income
- Does the user want to track different categories of income? Cash? Credit?
- Does the user want us to
  - Credit
  - Cash

### Steps
#### Step One:
- Job Name
- Truthy/Falsy:
  - Calculate
    - if (!calculate) -> Step 2
  - Advanced Features
    - if (!calculate) && (!advanced) -> Step 2 ++ Step 3 ++ Step 4

#### Step Two:
- Create Sale Sources

#### Step Three:
- Create Pool Sources

#### Step Four:
- Link Sale & Pool Sources
