<script setup lang="ts">
const store = useAddJobStore()
const _next = useNext().step

// await callOnce(store.addPool)
</script>

<template>
  <form>
    <div id="poolSource" class="my-4">
      <div v-for="(j, idx, a) in store.poolSource" id="poolLoop" :key="a">
        <!-- <pre> {{ a }} | {{ idx }} | {{ j._name }} | {{ j._child }} </pre> -->
        <UIFormInputText v-model="j._name" type="text" :label="`Pool Source ${a + 1}`" />
        <button type="button" @click="store.rmPool(idx, j.key)">
          rm
        </button>
      </div>
      <button type="button" @click="store.addPool()">
        Add Pool Source
      </button>
    </div>
  </form>
  <div class="columns-2">
    <div>
      <button type="button" @click="$router.back">
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
