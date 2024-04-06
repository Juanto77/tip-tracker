<script setup lang="ts">
const store = useAddJobStore()
const _next = useNext().step
</script>

<template>
  <!-- <form action="">
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
  </form> -->

  <div class="lg:grid lg:grid-cols-3 sm:inline-grid items-center">
    <div v-for="(i, idx, a) in store.childSource" :key="a" class=" self-center">
      <!-- <pre> a: {{ a }} <br><br> idx: {{ idx }}  <br><br> i: {{ i._name }} <br><br></pre> -->
      {{ i._name }}
      <div v-for="(z, xy, w) in i._child" :key="w">
        <!-- <pre> w: {{ w }} <br><br> xy: {{ xy }} <br><br> z: {{ z._name }}  <br><br></pre> -->
        <!-- Switch Group -->
        <HSwitchGroup as="div" class="flex items-center my-2">
          <HSwitch
            v-model="z._value"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            :class="[z._value ? 'bg-indigo-600' : 'bg-gray-200']"
          >
            <span
              aria-hidden="true"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              :class="[z._value ? 'translate-x-5' : 'translate-x-0']"
            />
          </HSwitch>
          <HSwitchLabel as="span" class="ml-3 text-sm">
            <span class="text-gray-900"> {{ z._name }} </span>
          </HSwitchLabel>
        </HSwitchGroup>
        <!-- End Switch Group -->
      </div>
    </div>
  </div>
  <div class="columns-2">
    <div>
      <button type="button" @click="$router.back">
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
