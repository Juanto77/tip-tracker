import { useTimelineStore } from "~Dashboard/stores/Timeline";

export const useDashboard = () => {
  const dayjs = useDayjs()
  const timeline = useTimelineStore()

  const shiftMonth = ( amount: number ) => {
    timeline.viewDate = timeline.day.add( amount, 'month' ).format( 'YYYY-MM-DD' );
    // this.fetch();
  }

  return { shiftMonth }
};
