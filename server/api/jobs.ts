import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';



export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  // const cookies = parseCookies(event)
  // console.log(event)
  const { data, error } = await client.from('user_jobs').select('*')
  if (error) {
    console.error(error);
  }
  return data;
});


/* 
export default defineEventHandler(async (event) => {
  return await serverSupabaseUser(event)
}) */