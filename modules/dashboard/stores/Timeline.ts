import { defineStore, acceptHMRUpdate } from 'pinia';

const dayjs = useDayjs();


export const useTimelineStore = defineStore( 'Timeline', () => {
    /* State */
    const viewDate = ref( dayjs().format( 'YYYY-MM-DD' ) )



    /* GETTERS */
    const day = computed( () => { return dayjs( viewDate.value ); } )

    const currentMonth = computed( () => dayjs( viewDate.value ).format( 'MMMM YYYY' ) )


    const monthStart = computed( () => day.value.startOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' ) )

    const monthEnd = computed( () => day.value.endOf( 'month' ).add( -1, 'day' ).format( 'YYYY-MM-DD' ) )



    return { viewDate, day, currentMonth, monthStart, monthEnd }
}, {
    // persist: true,
}, )

if ( import.meta.hot ) {
    import.meta.hot.accept( acceptHMRUpdate( useTimelineStore, import.meta.hot ) )
}


