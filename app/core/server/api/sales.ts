import { serverSupabaseClient } from '#supabase/server';
import type { Database, Tables } from '~sTypes/database'
import type { userTip } from '~sTypes/global'


export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<userTip>(event);

    const { data, error } = await client.from('user_tip').select('id, inTime, outTime, totalHours, creditTip, cashTip, sales->, stats, tipOut, creditNet, cashNet, netIncome')
    if (error) {
        console.log(error)
    }
    return data
})