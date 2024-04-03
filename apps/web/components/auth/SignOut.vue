<script lang="ts" setup>
const client = useSupabaseClient()

const { error } = await client.auth.signOut()

navigateTo('/')

</script>

<template>
  <div>

  </div>
</template>

<style scoped></style>