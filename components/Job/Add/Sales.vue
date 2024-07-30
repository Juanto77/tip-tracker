<script setup lang="ts">
  const store = useJobStore()
const _next = use_Job().step
const _back = use_Job().back
const saleOptions = store.saleOptions

</script>

<template>
  <form>
    <div id="saleSource" class="my-4">
      <!-- <div v-for="(j, idx, a) in store.saleSource" id="saleLoop" :key="a"> -->

        <InputGroup class="p-2">
          <MultiSelect :options="store.saleOptions" optionLabel="name" display="chip" v-model="store.saleSource" label="`SaleSource" placeholder="Sales Category" class="w-full md:w-56"/>
         <!-- <InputGroupAddon>
          <Button severity="danger" @click="store.rmSale(idx, j.key)"><Icon name="streamline:delete-1"/></Button>
          </InputGroupAddon> -->
        </InputGroup>


        <!-- <InputGroup class="p-2">
          <InputText v-model="j._name" type="text" :label="`SaleSource-${a + 1}`" placeholder="Sales Category" />
          <InputGroupAddon>
          <Button severity="danger" @click="store.rmSale(idx, j.key)"><Icon name="streamline:delete-1"/></Button>
          </InputGroupAddon>
        </InputGroup> -->

      <!-- </div> -->
       <!-- Add Sale Source -->

    <!--   <button type="button" @click="store.addSale()">
       <Icon name="material-symbols-light:add"/> Add Sales Source
      </button>
       -->
    </div>
  </form>
  <div class="columns-2">
    <div>
       <button type="button" @click="_back">
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
