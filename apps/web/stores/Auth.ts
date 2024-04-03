import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore('Auth', () => {
  /* State */
  const authenticated = ref(false);

  const loading = ref(false);

  const user = ref({
    id: 0,
    app_metadata: {},
    user_metadata: {},
    aud: '',
    confirmation_sent_at: '',
    recovery_sent_at: '',
    email_change_sent_at: '',
    new_email: '',
    new_phone: '',
    invited_at: '',
    action_link: '',
    email: '',
    phone: '',
    created_at: '',
    confirmed_at: '',
    email_confirmed_at: '',
    phone_confirmed_at: '',
    last_sign_in_at: '',
    role: '',
    updated_at: '',
    identities: [],
    factors: [],
  })

  const profile = ref({})


  /* Getters */






  /* Actions */
  const emailAuth = async (e, p) => {
    const client = useSupabaseClient()
    const { data, error } = await client.auth.signInWithPassword({
      email: e,
      password: p,
    }).then(
      client.auth.onAuthStateChange((event, session) => {
        // console.log(event)
        if (event === 'SIGNED_IN')
          navigateTo('/confirm');
        // console.log(session.user);
        user.value = session.user;
      })
    )
    if (error) {
      console.error(error)
    }
  }

  return {
    emailAuth,
    user,
    profile
  }
}, {
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
