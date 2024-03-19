
/* As Computed Prop */
const parseData = computed( () => {
    let cleanData = {};
    d.forEach( ( el, idx, arr ) => {
        // console.log(incoming.value)
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


        /* use global store */
        // store.calendarPane[ date ] = { netIncome: sum };


        /* Use Local state mgmg */
        // calendar.value[ date ] = { netIncome: sum };

        cleanData[ date ] = { netIncome: sum };

    } ); // end of forEach
    return cleanData;
} );

/* As Function */
const parseData = ( arr ) => {
    arr.forEach( ( el, idx, arr ) => {
        // console.log(incoming.value)
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


        /* use global store */
        // store.calendarPane[ date ] = { netIncome: sum };


        /* Use Local state mgmg */
        calendar.value[ date ] = { netIncome: sum };

    } ); // end of forEach
};

/* Last working iteration before refactor */
const groupIncome = ( arr: any ) => { //Formerly parseData

    arr.forEach( ( el: any, idx: any, arr: any ) => {
        // console.log(incoming.value)
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

        calendar.value[ date ] = { netIncome: sum }; //FIXME: Fix Type

    } ); // end of forEach
    return;
};