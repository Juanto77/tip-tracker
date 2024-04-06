<script setup lang="ts">
import { JobAddInfo, JobAddLink, JobAddPool, JobAddSales } from '@/components/Job/Add'

const steps = {
  JobAddInfo,
  JobAddSales,
  JobAddPool,
  JobAddLink,
}

const currentStep = ref('JobAddInfo')
</script>

<template>
  <button v-for="(_, step) in steps" :key="step" type="button" @click="currentStep === step">
    {{ step }}
  </button>
  <component :is="steps[currentStep]" />
</template>
