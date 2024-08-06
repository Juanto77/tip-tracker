import { useTimelineStore } from "~/stores/TimelineStore";

const dayjs = useDayjs()
export const useCalendar = () => {

    /* Default */
    const viewDate = ref(dayjs().format('YYYY-MM-DD'))


    /* View Options */
    const weekDays = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    const viewList = ref([{ name: 'Week', code: 'w' }, { name: 'Month', code: 'M' }, { name: 'Year', code: 'y' }])

    /* Default View */
    const viewSelect = ref({ name: 'Month', code: 'M' })

    /* Selected View Name Print */
    const selectFormat = computed(() => viewSelect.value.name)

    /* View: Day */
    const day = computed(() => { return dayjs(viewDate.value); })

    /* View: Week */
    const viewStart = computed(() => dayjs(day.value).startOf(selectFormat.value))
    const viewEnd = computed(() => dayjs(day.value).endOf(selectFormat.value))

    /* Month */
    const viewMonth = computed(() => dayjs(viewDate.value).format('MMMM YYYY'))
    const monthStart = computed(() => day.value.startOf('month').add(-1, 'day').format('YYYY-MM-DD'))
    const monthEnd = computed(() => day.value.endOf('month').add(-1, 'day').format('YYYY-MM-DD'))


    const prependCalendar = computed(() => {
        let monthStart = day.value.startOf('month');
        let weekStart = monthStart.startOf('week');
        let firstDay = monthStart.diff(weekStart, 'day');
        return Array.from(new Array(firstDay).keys());
    })

    const calendar = computed(() => {
        let ranges = [];
   
        let rangeStart = viewStart.value.add(-1, 'day')
        let rangeEnd = viewEnd.value.add(-1, 'day');

        let currentDate = rangeStart;

        while (currentDate.isBefore(rangeEnd) || currentDate.isSame(rangeEnd)) {
            // while ( currentDate.isBefore( timeline.monthEnd ) || currentDate.isSame( timeline.monthEnd ) ) {
            currentDate = currentDate.add(1, 'day');
            let date = dayjs(currentDate).format('YYYY-MM-DD');
            ranges.push(currentDate);
        }
        return ranges
    })

    const shiftView = (amount) => {
        viewDate.value = day.value.add(amount, selectFormat.value).format('YYYY-MM-DD');
        // this.fetch();
    }

    return { weekDays, prependCalendar, calendar, viewSelect, viewMonth, shiftView, day, viewDate, viewStart, viewEnd }
}
