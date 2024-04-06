<script setup lang="ts">
const store = useAddJobStore()
const _next = useNext().step
</script>

<template>
  <form>
    <div>
      <UIFormInputText v-model="store.jobName" type="text" label="Job Name" />
    </div>
    <div>
      <!-- Advanced Settings -->
      <div class="columns-3 mt-5">
        <div>
          <HSwitchGroup>
            <HSwitch
              v-model="store._advanced"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              :class="[store._advanced ? 'bg-indigo-600' : 'bg-gray-200']"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                :class="[store._advanced ? 'translate-x-5' : 'translate-x-0']"
              />
            </HSwitch>
            <HSwitchLabel as="span" class="ml-3 text-sm">
              <span class="text-gray-900"> Advanced Settings </span>
            </HSwitchLabel>
          </HSwitchGroup>
        </div>
        <!-- Calculate -->
        <div>
          <HSwitchGroup>
            <HSwitch
              v-model="store._calculate"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              :class="[store._calculate ? 'bg-indigo-600' : 'bg-gray-200']"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                :class="[store._calculate ? 'translate-x-5' : 'translate-x-0']"
              />
            </HSwitch>
            <HSwitchLabel as="span" class="ml-3 text-sm">
              <span class="text-gray-900"> Calculate </span>
            </HSwitchLabel>
          </HSwitchGroup>
        </div>
        <!-- Template -->
        <div>
          <HSwitchGroup>
            <HSwitch
              v-model="store.template"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              :class="[store.template ? 'bg-indigo-600' : 'bg-gray-200']"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                :class="[store.template ? 'translate-x-5' : 'translate-x-0']"
              />
            </HSwitch>
            <HSwitchLabel as="span" class="ml-3 text-sm">
              <span class="text-gray-900"> Default Template? </span>
            </HSwitchLabel>
          </HSwitchGroup>
        </div>
      </div>
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
  <!-- End Page -->
  <!-- Begin Dev -->

  <!-- <pre>params: {{ $route.params }}</pre><br><br>
  <pre>query: {{ $route.query }}</pre><br><br>
  <pre>hash: {{ $route.hash }}</pre><br><br>

  <pre> getRoutes: {{ $router.getRoutes }} </pre><br><br>
  <pre> currentRoute: {{ $router.currentRoute.value }} </pre><br><br>
  <pre> : {{ }} </pre><br><br>
  <button type="button" @click="$router.go(1)">
    GO
  </button> -->
</template>
