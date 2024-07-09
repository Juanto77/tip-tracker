<script setup lang="ts">
const user = useSupabaseUser()

// Get redirect path from cookies
const cookieName = useRuntimeConfig().public.supabase.cookieName
const cookieVal = useCookie(cookieName)
const redirectPath = useCookie(`${cookieName}-redirect-path`).value
console.log(cookieName)
console.log(cookieVal)
console.log(redirectPath)



watch(user, () => {
  if (user.value) {
    // Clear cookie
    useCookie(`${cookieName}-redirect-path`).value = null
    // Redirect to path
    return navigateTo(redirectPath || '/');
  }
}, { immediate: true })
</script>
<template>
  <div>Waiting for login...</div>
</template>