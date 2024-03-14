function buildCal() {
    const day = dayjs() // Todays Date
    // console.log('day', day)

    const year = dayjs().year() // 2024
    // console.log('year:', year)

    const month = dayjs().month() // 2
    // console.log('month:', month)

    const firstDay = dayjs().startOf('month').day() //5
    // console.log('firstDay:', firstDay)

    const lastDay = dayjs().endOf('month').date() // Returns 31
    // console.log(lastDay)

    const days = 7;
    const weeks = Math.ceil((firstDay + lastDay) / days) // 6. You forgot a set or parentheses, dumbass.
    // console.log('weeks:', weeks);

    return Array.from({ length: weeks }).map((_, week) => Array.from({ length: days }).map((_, day) => {

        const index = week * days + day;
        // console.log('index:', index);
        const dateDay = index - firstDay + 1;
        // console.log('dateDay:', dateDay);
        return dateDay > 0 && dateDay <= lastDay ? dateDay : 0;

    }));
}

buildCal();