<template>
<UAuthForm 
title="Login"
description="Enter your credentials to access your account."
:fields="fields"
@submit="emailAuth"
/>
</template>

<script setup>
/* Last updated 4/3/2024, moved to login page */

const client = useSupabaseClient();
// supabase session
const email = ref('');
const password = ref('');

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password'
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
}]

function onSubmit (data) {
  // console.log('Submitted', data)
  // console.log(data.email)
}

async function emailAuth(data) {
    const { error } = await client.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    }).then(navigateTo('/confirm'))
    // console.log(email)
    // console.log(password)

    if (error) console.log(error);
}

async function signOut() {
    const { error } = await client.auth.signOut()
}

</script>