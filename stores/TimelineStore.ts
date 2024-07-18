import { defineStore, acceptHMRUpdate } from 'pinia';

const dayjs = useDayjs();


export const useTimelineStore = defineStore('Timeline', () => {
    /* State */
    const viewDate = ref(dayjs().format('YYYY-MM-DD'))
    const weekDays = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    const viewList = ref([
        {name: 'Day', code: 'd'},
        { name: 'Week', code: 'w' },
        { name: 'Month', code: 'M' },
        // { name: 'Year', code: 'y' }
    ])

/* Current View Selection (Week, Month, Year) */
    const viewSelect = ref({ name: 'Month', code: 'M' })
    
    /* Format View Selection for */
    // TODO: Format for Dayjs usage
    const selectFormat = computed(() => viewSelect.value.name)

    /* Build Calendar */
    const day = computed(() => { return dayjs(viewDate.value); })
    
    const viewStart = computed(() => dayjs(day.value).startOf(selectFormat.value).add(-1, 'day'))
    const viewEnd = computed(() => dayjs(day.value).endOf(selectFormat.value).add(-1, 'day'))
    
    const currentMonth = computed(() => dayjs(viewDate.value).format('MMMM YYYY'))
    const _currentMonth = computed(() => dayjs(viewDate.value).format('YYYY-MM'))
    const monthStart = computed(() => day.value.startOf('month').add(-1, 'day').format('YYYY-MM-DD'))
    const monthEnd = computed(() => day.value.endOf('month').add(-1, 'day').format('YYYY-MM-DD'))

    const prependCalendar = computed(() => {
        let monthStart = day.value.startOf('month');
        let weekStart = monthStart.startOf('week');
        let firstDay = monthStart.diff(weekStart, 'day');
        return Array.from(new Array(firstDay).keys());
    })

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
        let rangeStart = timeline.viewStart
        let rangeEnd = timeline.viewEnd

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

    /* Change Month */
    const shiftView = (amount) => {
        const income = useIncomeData()
        viewDate.value = day.value.add(amount, selectFormat.value).format('YYYY-MM-DD');
        income.dayFilter(_currentMonth.value)
    }

    return { viewDate,weekDays, viewList, viewSelect, day, viewStart, viewEnd, currentMonth, _currentMonth, monthStart, monthEnd, selectFormat, shiftView,prependCalendar, calendar }
}, {
    // persist: true,
},)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTimelineStore, import.meta.hot))
}


