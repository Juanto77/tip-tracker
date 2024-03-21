import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~sTypes/database'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event);

    const { data, error } = await client.from('user_tip').select('id, inTime, netIncome')
    if (error) {
        console.error(error);
    }
    return data;
});
