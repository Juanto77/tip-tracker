<script setup lang="ts">
  const store = useJobStore()
const _next = use_Job().step
const _back = use_Job().back
const poolOptions = store.poolOptions


// await callOnce(store.addPool)
</script>

<template>
  <form>
    <div id="poolSource" class="my-4">

      <InputGroup>
        <MultiSelect v-model="store.poolSource" :options="store.poolOptions" optionLabel="name" display="chip" label="PoolSource" placeholder="Tip Out Category" class="w-full md:w-56"/>
        
      </InputGroup>
<!-- Text Field -->
<!--       <div v-for="(j, idx, a) in store.poolSource" id="poolLoop" :key="a">
        <UIFormInputText v-model="j._name" type="text" :label="`Pool Source ${a + 1}`" />
        <button type="button" @click="store.rmPool(idx, j.key)">
          rm
        </button>
      </div> -->
<!-- Add Pool Text Field -->

<!--       <button type="button" @click="store.addPool()">
        Add Pool Source
      </button> -->
    </div>
    <!-- FIXME: Refactor & provide proper field ID -->
<div v-for="item in store.poolSource" class="mt-3 px-5">
  <label>{{item.name}}</label>
      <InputGroup>
        <InputGroupAddon>%</InputGroupAddon>
        <InputNumber :id="`${item.name}_sales`" v-model="item.percent" />
      </InputGroup>

    </div>
  </form>
  <div class="columns-2">
    <div>
       <button type="button" @click="_back">
        Back
      </button>
    </div>
    <div>
      <button type="button" @click="_next">
        Next
      </button>
    </div>
  </div>
  <div class="mt-11">
    <button type="button" @click="store.$reset()">
      RESET STORE
    </button>
  </div>
  <div class="mt-11">
    <button type="button" @click="store._sourceLink">
      LINK SOURCES
    </button>
  </div>
</template>
