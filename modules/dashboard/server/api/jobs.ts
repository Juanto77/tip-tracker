import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~Server/types/database'


export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client.from('jobs').select('*')
  if (error) {
    console.error(error);
  }
  return data;
});


/* 
export default defineEventHandler(async (event) => {
  return await serverSupabaseUser(event)
}) */