import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~Server/types/database';
import { useDayjs } from '#imports';


export default eventHandler( async ( event ) => {
    const client = await serverSupabaseClient( event );

    const { data } = await client.from( 'user_tip' ).select( 'id, jobID, inTime, netIncome' );



    return data;
} );
