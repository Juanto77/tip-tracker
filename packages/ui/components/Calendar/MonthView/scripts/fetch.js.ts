
/* Fetch with combined data processing */
// FIXME: Browser: Uncaught (in promise) TypeError: undefined has no properties
async function fetch() {
    const request = await client.from( 'user_tip' ).select( `id, inTime, netIncome` ).gte( 'inTime', rangeStart.value ).lte( 'inTime', rangeEnd.value ).then( ( request ) => {
        // console.log( request );
        const data = request.data;
        data?.forEach( ( el, idx, arr ) => {
            let date = dayjs( el.inTime ).format( 'YYYY-MM-DD' );
            // let income = el.netIncome
            // let id = el.id

            let filter = arr.filter( ( item ) => {
                let itemDate = dayjs( item.inTime ).format( 'YYYY-MM-DD' );
                return itemDate === date;
            } );

            let sum = filter.reduce( ( acc, item ) => {
                return acc + item.netIncome;
            }, 0 );

            // store.calendarPane[ date ] = { netIncome: sum };
            calendar.value[ date ] = { netIncome: sum };
        } ); // end of filter

    } );
    // return incomeData;
};

/* calling a function to process data */
async function fetch() {
    const { data } = await client.from( 'user_tip' ).select( 'id, inTime, netIncome' ).gte( 'inTime', rangeStart.value ).lte( 'inTime', rangeEnd.value );

    // incoming.value = data;
    // store.procIncome = data;
    parseData( data );

    // console.log( incoming.value );
}

/* Using asyncData */
const { data: incomeData, pending, status, error } = await useAsyncData( 'incomeData', () => client.from( 'user_tip' ).select( `id, inTime, netIncome` ).gte( 'inTime', rangeStart.value ).lte( 'inTime', rangeEnd.value ) );

const d = incomeData.value.data;


/* Last working Fetch before refactor */
async function fetchIncome() {
    const { data } = await client.from( 'user_tip' ).select( 'id, inTime, netIncome' ).gte( 'inTime', rStart.value ).lte( 'inTime', rEnd.value );
    groupIncome( data );
}