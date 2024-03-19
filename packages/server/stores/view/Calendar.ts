
import { defineStore, acceptHMRUpdate } from 'pinia';
const dayjs = useDayjs();
import toObject from 'dayjs/plugin/toObject';
dayjs.extend( toObject );


export const useCalendarStore = defineStore( 'Calendar', {
    state: () => ( {
        ///////////////////////////////////////////////////////////////////////////////////////////
        viewDate: dayjs().format( 'YYYY-MM-DD' ),

        weekDays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ],

        calendarObject: {},

        tipIncome: []


        ///////////////////////////////////////////////////////////////////////////////////////////
    } ),// END OF STATE
    getters: {
        ///////////////////////////////////////////////////////////////////////////////////////////
        currentMonth: ( state ) => {
            return dayjs( state.viewDate ).format( 'MMMM YYYY' );
        },
        day: ( state ) => {
            return dayjs( state.viewDate );
        },

        /* Calendar Ref */
        rangeStart: ( state ) => {
            return state.day.startOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
        },
        rangeEnd: ( state ) => {
            return state.day.endOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
        },
        /* First Day Placement */
        prependCalendar: ( state ) => {
            let monthStart = state.day.startOf( 'month' );
            let weekStart = monthStart.startOf( 'week' );
            let firstDay = monthStart.diff( weekStart, 'day' );
            return Array.from( new Array( firstDay ).keys() );
        },
        /* Build Calendar */
        calendar: ( state ) => {
            let ranges = [];
            let rangeStart = state.day.startOf( 'month' ).add( -1, 'day' );
            let rangeEnd = state.day.endOf( 'month' ).add( -1, 'day' );

            let currentDate = rangeStart;

            while ( currentDate.isBefore( rangeEnd ) || currentDate.isSame( rangeEnd ) ) {
                currentDate = currentDate.add( 1, 'day' );
                ranges.push( currentDate );
            }

            return ranges;
        },


        /* Depreciated */
        ///////////////////////////////////////////////////////////////////////////////////////////
        /* For Prepend */

        monthStart: ( state ) => {
            return state.day.startOf( 'month' );
        },
        weekStart: ( state ) => {
            return state.monthStart.startOf( 'week' );
        },

        firstDay: ( state ) => {
            return state.monthStart.diff( state.weekStart, 'day' );
        },
        ///////////////////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////////////
    }, // END OF GETTERS
    actions: {
        ///////////////////////////////////////////////////////////////////////////////////////////
        /*
                shiftMonth:( amount: number ) => {
                    calendar.value = {};
                    viewDate.value = viewDate.value.add( amount, 'month' );
                    rStart.value = viewDate.value.startOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
                    rEnd.value = viewDate.value.endOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
                    rangeStart.value = viewDate.value.startOf( 'month' ).add( -1, 'day' );
                    rangeEnd.value = viewDate.value.endOf( 'month' ).add( -1, 'day' );
                    buildCalendar();
        
                },
        */
        shiftMonth( amount: number ) {
            this.viewDate = this.day.add( amount, 'month' ).format( 'YYYY-MM-DD' );
            // this.fetch();
        },
        ///////////////////////////////////////////////////////////////////////////////////////////

        async fetch() {
            const client = useSupabaseClient();
            const { data } = await client.from( 'user_tip' ).select( 'id, inTime, netIncome' );
            // .gte( 'inTime', this.rangeStart ).lte( 'inTime', this.rangeEnd );
            let arr = data;
            arr.forEach( ( el: any, idx: any, arr: any ) => {

                let date = dayjs( el.inTime ).format( 'YYYY-MM-DD' );

                let filter = arr.filter( ( item ) => {
                    let itemDate = dayjs( item.inTime ).format( 'YYYY-MM-DD' );
                    return itemDate === date;
                } );

                let sum = filter.reduce( ( acc, item ) => {
                    return acc + item.netIncome;
                }, 0 );

                // units[ date ] = { netIncome: sum };
                this.calendarObject[ date ] = { netIncome: sum }; //FIXME: Fix Type
            } ); // end of forEach

        }

        ///////////////////////////////////////////////////////////////////////////////////////////
    }, // END OF ACTIONS
    ///////////////////////////////////////////////////////////////////////////////////////////
}, // END OF STORE DEFINITION
);// END OF USE STORE DEFINITION


if ( import.meta.hot ) {
    import.meta.hot.accept( acceptHMRUpdate( useCalendarStore, import.meta.hot ) );
}
