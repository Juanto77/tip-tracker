import { defineStore, acceptHMRUpdate } from 'pinia';

const dayjs = useDayjs();


export const useTimelineStore = defineStore('Timeline', () => {
    /* State */
    const viewDate = ref(dayjs().format('YYYY-MM-DD'))

    // Typecheck & change format for dayjs
    const viewSelect = ref({ name: 'Month', code: 'M' })

    /* GETTERS */
    /* Day */
    const day = computed(() => { return dayjs(viewDate.value); })

    /* Week */
    /*
    const viewStart = computed(() => dayjs(day.value).startOf(viewSelect.value.name).add(-1, 'day'))
    const viewEnd = computed(() => dayjs(day.value).endOf(viewSelect.value.name).add(-1, 'day'))
*/
    const viewStart = computed(() => dayjs(day.value).startOf(selectFormat.value).add(-1, 'day'))
    const viewEnd = computed(() => dayjs(day.value).endOf(selectFormat.value).add(-1, 'day'))

    /* Month */
    const currentMonth = computed(() => dayjs(viewDate.value).format('MMMM YYYY'))

    const monthStart = computed(() => day.value.startOf('month').add(-1, 'day').format('YYYY-MM-DD'))

    const monthEnd = computed(() => day.value.endOf('month').add(-1, 'day').format('YYYY-MM-DD'))

    // TODO: Format for Dayjs usage
    const selectFormat = computed(() => viewSelect.value.name)

    /* FUNCTION */
    const shiftView = (amount) => {
        viewDate.value = day.value.add(amount, selectFormat.value).format('YYYY-MM-DD');
    }

    return { viewDate, viewSelect, day, viewStart, viewEnd, currentMonth, monthStart, monthEnd, selectFormat, shiftView }
}, {
    // persist: true,
},)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTimelineStore, import.meta.hot))
}


