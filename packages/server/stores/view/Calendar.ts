import { defineStore, acceptHMRUpdate } from 'pinia'
const dayjs = useDayjs();

type CalendarData = {
    value: {
        id: number | 0,
        inTime: string | '';
        netIncome: number | 0;
    }[]
}

type ServerData = {
    [index: string]: {
        value: {
            id: number | 0,
            inTime: string | '';
            netIncome: number | 0;
        }
    }
}

export const useCalendarStore = defineStore('Calendar', {
    state: () => ({
        d: {} as CalendarData,

        procIncome: {} as CalendarData,

        calendarPane: {},


    }),
    getters: {
        // day: () => { return dayjs },
        // // today: (state) => { return dayjs.format('dddd: YYYY-MM-DD') },
        // // year: (state) => { return dayjs.year(); },
        // firstDay: (state) => { return dayjs.startOf('month').day() },
        // lastDate: (state) => { return dayjs.endOf('month').date(); },
        // monthStart: (state) => { return dayjs.startOf('month').format('dddd: YYYY-MM-DD'); },
        // monthEnd: (state) => { return dayjs.endOf('month').format('dddd: YYYY-MM-DD'); },
        // dInMonth: (state) => { return dayjs.daysInMonth(); },
        // weeks: (state) => { return Math.ceil(dayjs.startOf('month').day() + dayjs.endOf('month').date()) / 7; },
    },
    actions: {
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
    }, // End of fetch()
},
)


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCalendarStore, import.meta.hot))
}
