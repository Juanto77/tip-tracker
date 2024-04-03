import { serverSupabaseClient } from '#supabase/server';



export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event);

    const { data, error } = await client.from('user_tip').select('id, inTime, outTime, totalHours, creditTip, cashTip, sales, totalSales, stats, tipOut, creditNet, cashNet, netIncome')
    if (error) {
        console.log(error)
    }
    return data
})