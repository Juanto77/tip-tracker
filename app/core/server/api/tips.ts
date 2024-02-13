import { serverSupabaseClient } from '#supabase/server';

// TODO * Write Logic for API routes
// TODO * [Data Fetching](https://nuxt.com/docs/getting-started/data-fetching)
// TODO * API Endpoint

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const { data, error } = await client.from('tips').select('*');
  if (error) {
    console.error(error);
  }
  return data;
});
