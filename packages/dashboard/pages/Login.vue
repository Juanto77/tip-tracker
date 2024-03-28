<script setup>
const client = useSupabaseClient();
const email = ref('');
const password = ref('');

async function signInAuth() {
    const { error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });
    if (error) console.log(error);
}
</script>

<template>


    <div class="block">
        <form>
            <div>
                <!-- <LibInputText v-model="email" placeholder="Email Address" /> -->
                <!-- <InputText v-model="email" placeholder="Email Address" /> -->
                <input type="text" v-model="email" placeholder="Email Address" />
            </div>
            <div>
                <!-- <LibInputPassword v-model="password" placeholder="Password" /> -->
                <!-- <Password v-model="password" placeholder="Password" type="password" /> -->
                <input type="text" v-model="password" placeholder="Password" />
            </div>
            <div><button class="bg-black" label="Log In" onclick="signInAuth">Log In</button></div>
        </form>
    </div>



</template>