import { defineStore, acceptHMRUpdate } from 'pinia';
import weekYear from 'dayjs/plugin/weekYear.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'

const dayjs = useDayjs();

dayjs.extend(weekYear)
dayjs.extend(weekOfYear)
///////////////////////////////////////////////////////////////////////////////////////////
/* TODO */
///////////////////////////////////////////////////////////////////////////////////////////
// TODO: Refactor as composable or component logic

export const useTimelineStore = defineStore('Timeline', () => {
    /* State */
    const weekDays = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    const viewList = ref([
        { name: 'Day', code: 'd' },
        { name: 'Week', code: 'w' },
        { name: 'Month', code: 'M' },
        // { name: 'Year', code: 'y' }
    ])

    /* Default View Date */
    const viewDate = ref(dayjs().format('YYYY-MM-DD'))

    /* Default view on load */
    const viewSelect = ref({ name: 'Month', code: 'M' })

    /* Format View Selection */
    // TODO: Format for Dayjs usage
    const selectFormat = computed(() => viewSelect.value.name)

    /* Build Calendar */
    const day = computed(() => { return dayjs(viewDate.value); })

    // FIXME: Organize this better
    /* Selected View Time Values */
    const viewStart = computed(() => dayjs(day.value).startOf(selectFormat.value).add(-1, 'day'))
    const viewEnd = computed(() => dayjs(day.value).endOf(selectFormat.value).add(-1, 'day'))

    const formatViewStart = computed(() => dayjs(day.value).startOf(selectFormat.value).format('YYYY-MM-DD'))
    const formatViewEnd = computed(() => dayjs(day.value).endOf(selectFormat.value).format('YYYY-MM-DD'))

    // FIXME: Can probably get rid of these
    const formatWeekStart = computed(() => dayjs(day.value).startOf(selectFormat.value).add(-1, 'day').format('YYYY-MM-DD'))
    const formatWeekEnd = computed(() => dayjs(day.value).endOf(selectFormat.value).add(1, 'day').format('YYYY-MM-DD'))

    const monthDisplay = computed(() => dayjs(viewDate.value).format('MMMM YYYY'))
    const _currentMonth = computed(() => dayjs(viewDate.value).format('YYYY-MM'))

    const formatMonthStart = computed(() => day.value.startOf('month').add(-1, 'day').format('YYYY-MM-DD'))
    const formatMonthEnd = computed(() => day.value.endOf('month').add(-1, 'day').format('YYYY-MM-DD'))

    /* Comp View: Year */
    const viewYearStart = computed(() => dayjs(day.value).startOf('year'))
    const viewYearEnd = computed(() => dayjs(day.value).endOf('year'))

    const compYear = computed(() => dayjs(day.value).subtract(1, 'year'))
    const compYearStart = computed(() => dayjs(compYear.value).startOf('year'))
    const compYearEnd = computed(() => dayjs(compYear.value).endOf('year'))


    /* Comp View: Month */
    const viewMonthStart = computed(()=> dayjs(day.value).startOf('month'))
    const viewMonthEnd = computed(() => dayjs(day.value).endOf('month'))

    const compMonthStart = computed(() => dayjs(compYear.value).startOf('month'))
    const compMonthEnd = computed(() => dayjs(compYear.value).endOf('month'))

    const compFormatMonth = computed(()=> dayjs(compWeek.value).format('YYYY-MM'))


    /* Comp View: Week */
    const viewWeek = computed(() => dayjs(day.value).week())
    const viewWeekStart = computed(() => dayjs().week(viewWeek.value).startOf('week'))
    const viewWeekEnd = computed(() => dayjs().week(viewWeek.value).endOf('week'))

    const compWeek = computed(() => dayjs(day.value).subtract(52, 'week'))
    const compWeekStart = computed(() => dayjs(compWeek.value).startOf('week'))
    const compWeekEnd = computed(() => dayjs(compWeek.value).endOf('week'))

    // TODO: Move to composable, don't need this as a global state
    /* Calendar Pane*/
    const prependCalendar = computed(() => {
        let monthStart = day.value.startOf('month');
        let weekStart = monthStart.startOf('week');
        let firstDay = monthStart.diff(weekStart, 'day');
        return Array.from(new Array(firstDay).keys());
    })

    /* Build Calendar Pane */
    const calendar = computed(() => {
        const timeline = useTimelineStore()
        let ranges = [];
        /*
        let rangeStart = timeline.day.startOf('month').add(-1, 'day');
        let rangeEnd = timeline.day.endOf('month').add(-1, 'day');
        */

        /* Changed it to use the dropdown ref in timeline store */
        /*
        let rangeStart = timeline.viewStart.add(-1, 'day')
        let rangeEnd = timeline.viewEnd.add(-1, 'day');
*/
        /* Moved the addition to the timeline store */
        let rangeStart = viewStart.value
        let rangeEnd = viewEnd.value

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

    /* Timetravel */
    /*     
        function shiftView(amount){
            const income = useIncomeData()
            viewDate.value = day.value.add(amount, selectFormat.value).format('YYYY-MM-DD');
            // income.dayFilter(_currentMonth.value)  
        }
     */

    const shiftView = (amount) => {
        viewDate.value = day.value.add(amount, selectFormat.value).format('YYYY-MM-DD');
    }


    return {
        day,
        viewDate,
        viewStart,
        viewEnd,
        monthDisplay,
        _currentMonth,
        formatMonthStart,
        formatMonthEnd,
        selectFormat,
        shiftView,
        prependCalendar,
        formatViewStart,
        formatViewEnd,
        formatWeekStart,
        formatWeekEnd,
        // Comp View: Selected Week
        viewWeek,
        viewWeekStart,
        viewWeekEnd,
        compWeek,
        compWeekStart,
        compWeekEnd,
        // Comp View: Selected Month
        viewMonthStart,
        viewMonthEnd,
        compMonthStart,
        compMonthEnd,
        // Comp View: Year
        viewYearStart,
        viewYearEnd,
        compYearStart,
        compYearEnd,
        calendar,
        // For the Form
        weekDays,
        viewList,
        viewSelect,
        // Formatted DayJS values
        compFormatMonth
    }
}, {
    // persist: true,
},)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTimelineStore, import.meta.hot))
}


