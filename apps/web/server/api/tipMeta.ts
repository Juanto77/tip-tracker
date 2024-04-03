import { serverSupabaseClient } from '#supabase/server';

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { data } = await client.from('jobs').select('tip_metab');
  //   let meta = tipMeta[0]['tip_metab'];
  //   return meta;
  return data;
});
