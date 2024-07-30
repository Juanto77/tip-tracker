<script setup lang="ts">
import InputText from 'primevue/inputtext';

  const store = useJobStore()
const _next = use_Job().step
const _back = use_Job().back
</script>

<template>
  <form>
    <div>
      <InputText v-model="store.jobName" type="text" label="Job Name" class="w-full"/>
    </div>
    <div>
      <!-- Advanced Settings -->
      <div class="columns-3 mt-5">
        <div>
          <label for="AdvancedSettings" class="block">Advanced Settings</label>
          <ToggleSwitch v-model="store._advanced" />
        </div>
        <!-- Calculate -->

        <div>
          <label for="calc" class="block">Calculate</label>
          <ToggleSwitch v-model="store._calculate" />
        </div>

        <!-- Template -->
        <div>
          <label for="defaultTemplate" class="block">Default Template</label>
          <ToggleSwitch v-model="store.template" />
        </div>
      </div>
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
