import { serverSupabaseServiceRole } from '#supabase/server'

export default eventHandler(async (event) => {

    const client = serverSupabaseServiceRole(event)


    const { data } = await client.schema('auth').from('users').select('*')

    return data
})