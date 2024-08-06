<template>
<LogIn/>
</template>

<script setup>
/* Last updated 4/3/2024, moved to login page */

const client = useSupabaseClient();

const email = ref('');
const password = ref('');

// import { useProfileStore } from '~/stores/Profile';
// const store = useProfileStore()


async function emailAuth() {
    console.log(email.value)
    console.log(password)
    const { error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    }).then(navigateTo('/confirm'))
    console.log(email)
    console.log(password)

    if (error) console.log(error);
}

async function signOut() {
    const { error } = await client.auth.signOut()
}

</script>