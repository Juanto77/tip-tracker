import { serverSupabaseClient } from '#supabase/server';

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const { data, error } = await client.from('job_pool').select(`*`);
  if (error) {
    console.error(error);
  }
  return data;
});
