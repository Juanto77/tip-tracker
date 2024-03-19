/* Stores */
let incomeData = () => useState<CalendarData>( 'income', () => ( [] ) as Object as CalendarData );
let incomeObj = () => useState( 'income', {} as Object as CalendarData );
const incomeObj = useState<CalendarData>( 'Income', () => ( {} ) as Object as CalendarData );
let incomeObj = reactive( [] ) as Object as CalendarData;
const calendar = useState<DateArray>( 'Calendar', () => ( {} as DateArray ) );


const calendar = useState<CalendarData>( 'calendar', () => ( {} ) as Object as CalendarData );

/* use state with out typecheck */
const calendar = useState( 'calendar', () => ( {} ) );
const incomeData = useState( 'incomeData', () => ( {} ) );

let incomeObj = ref( {} );
let calendar = ref( {} ) as Object as CalendarData;