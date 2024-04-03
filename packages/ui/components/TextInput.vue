<script lang="ts" setup>
// This works but so does the login.vue in ~/app/web/components/ui/input/

defineProps<{
  type?: String,
  name?: String,
  id?: String,
  class?: String,
  autocomplete?: String,
  placeholder?: String,
  disabled?: boolean
}>()

defineEmits<{
  (a: 'modelValue', value: string): void,
}>()
</script>

<template>
  <input />
  <!-- <button class="btn" :disabled="disabled" @click="$emit('submit')">
    <slot>Button</slot>
  </button> -->
</template>

<style scoped></style>
