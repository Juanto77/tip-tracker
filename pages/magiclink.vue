<script setup lang="ts">
const client = useSupabaseClient();
const email = ref("");

const signInWithOtp = async () => {
  const { error } = await client.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: "http://192.168.86:3000/confirm",
    },
  });
  if (error) console.log(error);
};
</script>
<template>
  <div>
    <button @click="signInWithOtp">Sign In with E-Mail</button>
    <input v-model="email" type="email" />
  </div>
</template>
