
import { defineStore, acceptHMRUpdate } from 'pinia';
const dayjs = useDayjs();


type CalendarData = {
    value: {
        id: number | 0,
        inTime: string | '';
        netIncome: number | 0;
    }[];
};

type ServerData = {
    [ index: string ]: {
        value: {
            id: number | 0,
            inTime: string | '';
            netIncome: number | 0;
        };
    };
};

export const useCalendarStore = defineStore( 'Calendar', {
    state: () => ( {
        d: {} as CalendarData,

        procIncome: {} as CalendarData,

        calendarPane: {},


    } ),
    getters: {

    },
    actions: {
        /*
        async fetch() {
            try {
                const response = await $fetch('/api/userIncome').then((res) => {
                    let load = res?.forEach((el) => {
                        // let group = [];
                        let id = el.id;
                        let date = dayjs(el.inTime).format('YYYY-MM-DD')
                        let income = el.netIncome;
                        this.d[date] = { id: id, inTime: date, netIncome: income } as CalendarData;
                    })
                })
            } catch (error) {
                console.log(error)
            }


        }
        */

        async fetch() {
            const client = useSupabaseClient();
            const { data } = await client.from( 'user_tip' ).select( 'id, inTime, netIncome' );
            // .gte( 'inTime', rangeStart.value ).lte( 'inTime', rangeEnd.value );

            // incoming.value = data;
            this.procIncome = data;
            // parseData( data );

            console.log( incoming.value );
        }



        ///////////////////////////////////////////////////////////////////////////////////////////
    }, // end of actions
},
);


if ( import.meta.hot ) {
    import.meta.hot.accept( acceptHMRUpdate( useCalendarStore, import.meta.hot ) );
}
