import { useTimelineStore } from "~Dashboard/stores/Timeline";

const dayjs = useDayjs()
export const useCalendar = () => {
    const timeline = useTimelineStore()

    const weekDays = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])

    const prependCalendar = computed(() => {
        const timeline = useTimelineStore()
        let monthStart = timeline.day.startOf('month');
        let weekStart = monthStart.startOf('week');
        let firstDay = monthStart.diff(weekStart, 'day');
        return Array.from(new Array(firstDay).keys());
    })

    const calendar = computed(() => {
        const timeline = useTimelineStore()
        let ranges = [];
        // /*
        let rangeStart = timeline.day.startOf('month').add(-1, 'day');
        let rangeEnd = timeline.day.endOf('month').add(-1, 'day');
        // */

        /*
         let rangeStart = day.value.startOf( 'month' ).add( -1, 'day' );
         let rangeEnd = day.value.endOf( 'month' ).add( -1, 'day' );
         */

        let currentDate = rangeStart;

        while (currentDate.isBefore(rangeEnd) || currentDate.isSame(rangeEnd)) {
            // while ( currentDate.isBefore( timeline.monthEnd ) || currentDate.isSame( timeline.monthEnd ) ) {
            currentDate = currentDate.add(1, 'day');
            let date = dayjs(currentDate).format('YYYY-MM-DD');
            ranges.push(currentDate);
            // state.calendarObj[ date ] = 0; //Posts to state value
        }
        return ranges
    })

    const shiftMonth = (amount) => {
        timeline.viewDate = timeline.day.add(amount, 'month').format('YYYY-MM-DD');
        // this.fetch();
    }

    return { weekDays, prependCalendar, calendar, shiftMonth }
}
