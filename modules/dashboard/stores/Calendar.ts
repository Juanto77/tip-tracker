import { defineStore, acceptHMRUpdate } from 'pinia';
import { useTimelineStore } from './Timeline';
// import { useTimelineStore } from './Timeline';
const dayjs = useDayjs();
// const timeline = useTimelineStore()

export const useCalendarStore = defineStore( 'Calendar', () => {
    /* State */
    const viewDate = ref( dayjs().format( 'YYYY-MM-DD' ) )

    const weekDays = ref( [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ] )
    /*
    const income = ref( {} )
 
    const incomeMerged = ref( {} )
 
    const tipIncome = ref( {} )
 
    const dateArr = ref( [] ) // labels for chart.js
 
    const incomeArr = ref( [] ) // dataset for chart.js
    */
    ///////////////////////////////////////////////////////////////////////////////////////////
    /*
    const day = computed( () => { return dayjs( viewDate.value ); } )

    const currentMonth = computed( () => dayjs( viewDate.value ).format( 'MMMM YYYY' ) )


    const monthStart = computed( () => day.value.startOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' ) )

    const monthEnd = computed( () => day.value.endOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' ) )
    */

    const prependCalendar = computed( () => {
        const timeline = useTimelineStore()
        let monthStart = timeline.day.startOf( 'month' );
        let weekStart = monthStart.startOf( 'week' );
        let firstDay = monthStart.diff( weekStart, 'day' );
        return Array.from( new Array( firstDay ).keys() );
    } )

    const calendar = computed( () => {
        const timeline = useTimelineStore()
        let ranges = [];
        // /*
        let rangeStart = timeline.day.startOf( 'month' ).add( -1, 'day' );
        let rangeEnd = timeline.day.endOf( 'month' ).add( -1, 'day' );
        // */
        /*
         let rangeStart = day.value.startOf( 'month' ).add( -1, 'day' );
         let rangeEnd = day.value.endOf( 'month' ).add( -1, 'day' );
         */

        let currentDate = rangeStart;

        while ( currentDate.isBefore( rangeEnd ) || currentDate.isSame( rangeEnd ) ) {
            // while ( currentDate.isBefore( timeline.monthEnd ) || currentDate.isSame( timeline.monthEnd ) ) {
            currentDate = currentDate.add( 1, 'day' );
            let date = dayjs( currentDate ).format( 'YYYY-MM-DD' );
            ranges.push( currentDate );
            // state.calendarObj[ date ] = 0; //Posts to state value
        }
        return ranges
    } )

    ///////////////////////////////////////////////////////////////////////////////////////////


    return { viewDate, weekDays, prependCalendar, calendar };
} );

if ( import.meta.hot ) {
    import.meta.hot.accept( acceptHMRUpdate( useCalendarStore, import.meta.hot ) );
}
