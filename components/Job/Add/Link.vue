<script setup lang="ts">
  const store = useJobStore()
  const _next = use_Job().step
  const _back = use_Job().back
</script>

<template>
  <div class="lg:grid lg:grid-cols-3 sm:inline-grid items-center">
    <div v-for="(i, idx, a) in store.pairSource" :key="a" class=" self-center">
      <!-- <pre> a: {{ a }} <br><br> idx: {{ idx }}  <br><br> i: {{ i.name }} <br><br></pre> -->
      {{ i.name }}
      <div v-for="(z, xy, w) in i._child" :key="w">
        <!-- <pre> w: {{ w }} <br><br> xy: {{ xy }} <br><br> z: {{ z.name }}  <br><br></pre> -->

        <ToggleSwitch v-model="z.isChild" />
        <label as="span" class="ml-3 text-sm">
          <span class="text-gray-900"> {{ z.name }} </span>
        </label>
      </div>
    </div>
    <!-- <div v-for="item in store.poolSource" class="mt-3 px-5">
      <InputGroup>
        <InputGroupAddon>%</InputGroupAddon>
        <InputNumber :id="`${item.name}_sales`" v-model="item.percent" />
      </InputGroup>

    </div> -->
  </div>
  <div class="columns-2">
    <div>
      <button type="button" @click="_back">
        Back
      </button>
    </div>
    <div>
      <!-- <NuxtLink to="/add-job-?">
        Next
      </NuxtLink> -->
      <button type="button" @click="_next">
        Next
      </button>
    </div>
  </div>
</template>
