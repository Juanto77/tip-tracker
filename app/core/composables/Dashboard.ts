import type { Database } from '~sTypes/database';

export const useDashboard = () => {


  /* Page Config */
  const client = useSupabaseClient<Database>();
  const dayjs = useDayjs();


  /* Components config */
  const props = withDefaults( defineProps<Props>(), {
    modelValue: () => null,
    startDate: () => '2024-03-07',
  } );

  const emits = defineEmits( [ 'update:modelValue' ] );

  const viewDate = ref( dayjs( props.startDate ) );

  /* Types */
  type Props = {
    modelValue?: any;
    startDate?: string;
  };

  type DateArray = {
    [ index: string ]: {
      netIncome?: number,
    };
  };

  type CalendarData = {
    [ index: string ]: {
      id?: number | 0,
      inTime?: string | '';
      netIncome?: number | 0;
    };
  };

  type dataModel = {
    id: number | 0,
    inTime: string | '',
    netIncome: number | 0,
  };
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  /* Data Holding */

  let calendar = ref( {} ) as CalendarData;
  let incoming = ref( [] );


  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  /* Fetch using supabase */
  const rangeStart = ref( viewDate.value.startOf( 'month' ).add( -1, 'day' ) );
  const rangeEnd = ref( viewDate.value.endOf( 'month' ).add( -1, 'day' ) );

  const rStart = ref( rangeStart.value );
  const rEnd = ref( rangeEnd.value );




  const parseData = ( arr: any ) => {
    let cleanData = {};

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


      /* use global store */
      // store.calendarPane[ date ] = { netIncome: sum };


      /* Use Local state mgmg */
      calendar.value[ date ] = { netIncome: sum };

      // cleanData[ date ] = { netIncome: sum };

      // calendarPane.value[ date ] = { netIncome: sum };

    } ); // end of forEach
    return;
  };


  async function fetch() {
    const { data } = await client.from( 'user_tip' ).select( 'id, inTime, netIncome' ).gte( 'inTime', rStart.value ).lte( 'inTime', rEnd.value );
    parseData( data );
  }





  /* Calendar */
  const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ];


  ///////////////////////////////////////////////////////////////////////////////////////////


  /* Create Calendar in an Object */
  const calendarPane = () => {
    // const calendarPane = computed( () => {
    let group: DateArray = {};

    /* Keep these for ref */
    // let rangeStart = viewDate.value.startOf('month').add(-1, 'day');
    // let rangeEnd = viewDate.value.endOf('month').add(-1, 'day');


    let currentDate = rangeStart.value;

    while ( currentDate.isBefore( rangeEnd.value ) || currentDate.isSame( rangeEnd.value ) ) {

      currentDate = currentDate.add( 1, 'day' );
      let date = dayjs( currentDate ).format( 'YYYY-MM-DD' );

      /* use local group */
      group[ date ] = { netIncome: 0 };

      /* Use State */
      calendar.value[ date ] = { netIncome: 0 };

      /* Reactive */
      // calendar[ date ] = { netIncome: undefined };

    }
    fetch();

    // });
    return group;
    ///////////////////////////////////////////////////////////////////////////////////////////
  };
  // );
  calendarPane();
  // calendar.value = calendarPane.value;




  ///////////////////////////////////////////////////////////////////////////////////////////


  const shiftMonth = function ( amount: number ) {
    calendar.value = {};
    viewDate.value = viewDate.value.add( amount, 'month' );
    rStart.value = viewDate.value.startOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
    rEnd.value = viewDate.value.endOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' );
    rangeStart.value = viewDate.value.startOf( 'month' ).add( -1, 'day' );
    rangeEnd.value = viewDate.value.endOf( 'month' ).add( -1, 'day' );
    console.log( rStart.value );
    calendarPane();
    // console.log('shiftMonth', viewDate.value)
    // console.log('shiftStart', rangeStart)
    // console.log('shiftEnd', rangeEnd)
  };

  const reset = function () {
    // filterData(amount);
    viewDate.value = dayjs();
  };

  const daysToPrepend = computed( () => {
    const monthStart = viewDate.value.startOf( 'month' );
    const firstWeekStart = monthStart.startOf( 'week' );
    const firstDayStart = monthStart.diff( firstWeekStart, 'day' );
    return Array.from( new Array( firstDayStart ).keys() );
  } );
  return { props, viewDate, calendar, parseData, weekDays, calendarPane, shiftMonth, reset, daysToPrepend, incoming, fetch, rStart, rEnd, };
};
