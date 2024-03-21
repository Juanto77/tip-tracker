/* Define Imports */
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useDashboardStore } from './Dashboard';
import type { Database } from '~sTypes/database';

/* Define local vars */
const dayjs = useDayjs();
const dashboard = useDashboardStore;
export const useCalendarStore = defineStore( 'Calendar', {
    state: () => ( {

    } ),




    getters: {},
    actions: {},
} );

if ( import.meta.hot ) {
    import.meta.hot.accept( acceptHMRUpdate( useCalendarStore, import.meta.hot ) );
}
