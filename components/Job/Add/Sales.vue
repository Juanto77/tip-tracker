<script setup lang="ts">
const store = useAddJobStore()
const _next = useNext().step
// await callOnce(store.addSale)
</script>

<template>
  <form>
    <div id="saleSource" class="my-4">
      <div v-for="(j, idx, a) in store.saleSource" id="saleLoop" :key="a">
        <!-- <pre> {{ a }} | {{ idx }} | {{ j._name }} | {{ j._child }} </pre> -->
        <UIFormInputText v-model="j._name" type="text" :label="`Sale Source ${a + 1}`" placeholder="Sales Category" />
        <button type="button" @click="store.rmSale(idx, j.key)">
          rm
        </button>
      </div>
      <button type="button" @click="store.addSale()">
        Add Sales Source
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
      <!-- <NuxtLink to="/add-job-pool">
        Next
      </NuxtLink> -->
      <button type="button" @click="_next">
        Next
      </button>
    </div>
  </div>
</template>
