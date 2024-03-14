<script setup>
const client = useSupabaseClient()
const email = ref()
const password = ref()

async function signInAuth() {
    const { error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });
    if (error) console.log(error);
}

</script>

<template>

    <LibPageContainer>
        <div class="block">
            <div>
                <InputText v-model="email" placeholder="Email Address" />
            </div>
            <div>
                <Password v-model="password" placeholder="Password" />
            </div>
            <div><Button label="Log In" @click="signInAuth" /></div>
        </div>
    </LibPageContainer>

</template>