<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

///////////////////////////////////////////////////////////////////////////////////////////
const { data: getTips } = await client.from('tips').select('*');
// Do I even need to define the columns or can I just use the define rows with the data?

///////////////////////////////////////////////////////////////////////////////////////////
</script>
<template>
  <UTable class="w-full" :rows="getTips" />
</template>
