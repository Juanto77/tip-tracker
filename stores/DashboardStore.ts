/* Imports */
import { defineStore, acceptHMRUpdate } from 'pinia';
// import { useCalendarStore } from './Calendar';
// import { useTimelineStore } from './Timeline';
/* Local vars */
const dayjs = useDayjs();
// const timeline = useTimelineStore();


export const useDashboardStore = defineStore( 'Dashboard', {
    state: () => ( {
        ///////////////////////////////////////////////////////////////////////////////////////////
        viewDate: dayjs().format( 'YYYY-MM-DD' ),

        weekDays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ],

        // calendarObj: {}, // for use with computed values

        incomeData: {}, // Change to merged income

        tipIncome: {},

        dateArr: [], // Labels for Chart.js


        incomeArr: [], // Dataset for chart.js





        ///////////////////////////////////////////////////////////////////////////////////////////

        persist: true,
    } ),// END OF STATE
    getters: {
        ///////////////////////////////////////////////////////////////////////////////////////////
        currentMonth: ( state ) => {
            return dayjs( state.viewDate ).format( 'MMMM YYYY' );
        },
        day: ( state ) => {
            return dayjs( state.viewDate );
        },
        rangeStart: ( state ) => {
            return state.day.startOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
        },
        rangeEnd: ( state ) => {
            return state.day.endOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
        },
        prependCalendar: ( state ) => {
            let monthStart = state.day.startOf( 'month' );
            let weekStart = monthStart.startOf( 'week' );
            let firstDay = monthStart.diff( weekStart, 'day' );
            return Array.from( new Array( firstDay ).keys() );
        },
        calendar: ( state ) => {
            let ranges = [];
            /*
            let rangeStart = timeline.day.startOf( 'month' ).add( -1, 'day' );
            let rangeEnd = timeline.day.endOf( 'month' ).add( -1, 'day' );
            */
            let rangeStart = state.day.startOf( 'month' ).add( -1, 'day' );
            let rangeEnd = state.day.endOf( 'month' ).add( -1, 'day' );

            let currentDate = rangeStart;

            while ( currentDate.isBefore( rangeEnd ) || currentDate.isSame( rangeEnd ) ) {
                // while ( currentDate.isBefore( timeline.monthEnd ) || currentDate.isSame( timeline.monthEnd ) ) {
                currentDate = currentDate.add( 1, 'day' );
                let date = dayjs( currentDate ).format( 'YYYY-MM-DD' );
                ranges.push( currentDate );
                // state.calendarObj[ date ] = 0; //Posts to state value
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


        shiftMonth( amount: number ) {
            this.viewDate = this.day.add( amount, 'month' ).format( 'YYYY-MM-DD' );
            // this.fetch();
        },




        /* Fetch & Process Data */
        async fetch() {
            const client = useSupabaseClient<Database>();
            const { data } = await client.from( 'user_tip' ).select( 'id, jobID, inTime, netIncome' );
            // .gte( 'inTime', this.rangeStart ).lte( 'inTime', this.rangeEnd );

            this.tipIncome = data;


            /* Fucking around with Maps */

            const idArr = data?.map( ( x ) => x.id );
            const jobID = data?.map( ( x ) => x.jobID );
            const dateArr = data?.map( ( x ) => dayjs( x.inTime ).format( 'YYYY-MM-DD' ) );
            const netIncomeArr = data?.map( ( x ) => x.netIncome );

            this.dateArr = dateArr;
            this.incomeArr = netIncomeArr;



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
                // this.calendarObject[ date ] = { netIncome: sum }; //FIXME: Fix Type

                // Push to isolated income object
                // this.incomeData[ date ] = sum;
                this.incomeData[ date ] = { date: date, netIncome: sum }; // using array index as key

                // merge data with calendar data
                // this.calendarObj[ date ] = sum; 
            } ); // end of forEach

        }

        ///////////////////////////////////////////////////////////////////////////////////////////
    }, // END OF ACTIONS
    ///////////////////////////////////////////////////////////////////////////////////////////
}, // END OF STORE DEFINITION
);// END OF USE STORE DEFINITION


if ( import.meta.hot ) {
    import.meta.hot.accept( acceptHMRUpdate( useDashboardStore, import.meta.hot ) );
}
