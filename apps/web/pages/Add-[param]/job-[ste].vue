<script setup lang="ts">
const route = useRoute()
// definePageMeta({
//   validate: async (route) => {
//     // Check if the id is made up of digits
//     return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
//   },
// })
console.log(route)
</script>

<template>
  {{ route.params }}
</template>
