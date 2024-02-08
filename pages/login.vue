<script setup>
const client = useSupabaseClient();
const email = ref("");
const password = ref("");

async function signInAuth() {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) console.log(error);
}
</script>

<template>
  <ClientOnly>
    <div class=""></div>
    <FormKit type="form" id="login" @submit="signInAuth" submit-label="Login">
      <FormKit
        type="text"
        v-model="email"
        name="email"
        label="Your Email"
        placeholder="your@email.com"
        help="Your Email"
        validation="required|email"
      />
      <FormKit
        type="password"
        v-model="password"
        name="password"
        label="Password"
        placeholder="Your Password"
        help="Your Password"
        validation="required|length:6|matches:/[^a-zA-Z]/"
      />
    </FormKit>
  </ClientOnly>
</template>
