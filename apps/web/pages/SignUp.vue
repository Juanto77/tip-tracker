<script setup>
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  return { data };
}
</script>

<template>
  <FormKit
    type="form"
    id="signUp"
    @submit="signUpNewUser"
    submit-label="Sign Up"
  >
    <FormKit
      type="text"
      name="email"
      v-model="email"
      label="Your Email"
      placeholder="your@email.com"
      help="Your Email"
      validation="required|email"
    />
    <FormKit
      type="password"
      name="password"
      v-model="password"
      label="Password"
      placeholder="Your Password"
      help="Your Password"
      validation="required|length:6|matches:/[^a-zA-Z]/"
      :validation-messages="{
        matches: 'Please include at least one symbol',
      }"
    />
  </FormKit>
</template>
