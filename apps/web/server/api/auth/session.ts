import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data: { session }, error } = await client.auth.getSession();
  if (error) {
    throw createError({ statusMessage: error?.message })
  }
  event.context._session = session ?? null;
  return event.context._session;
})
