<script setup>
const client = useSupabaseClient();

let loading = ref(true);
let username = ref('').value || '';
let password = ref('').value;
let website = ref('').value || '';
let avatar_path = ref('').value || '';

loading.value = true;
const user = useSupabaseUser();

const { data } = await client
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', user.value.id)
  .single();

if (data) {
  username = data.username;
  website = data.website;
  avatar_path = data.avatar_url;
}

loading.value = false;

async function updateProfile() {
  try {
    loading.value = true;
    const user = useSupabaseUser();

    const updates = {
      id: user.value.id,
      username: username,
      password: password,
      website: website,
      avatar_url: avatar_path,
      updated_at: new Date(),
    };

    const { error } = await client.auth.updateUser(updates, {
      returning: 'minimal', // Don't return the value after inserting}
    });
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await client.auth.signOut();
    if (error) throw error;
    user.value = null;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="user.email" disabled />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
</template>
