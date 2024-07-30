import { serverSupabaseClient } from '#supabase/server';

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client.from('user_tip').select('*');
  if (error) {
    console.error(error);
  }
  return data;
});
