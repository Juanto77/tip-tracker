/* A bit redundant because I don't need hold values elsewhere, I can post them straight from jobData, though it's useful because fetchJobs makes use of it.

TODO * Refactor for updated db structure
*/

declare interface Job {
  id?: number;
  name?: string;
  job_name?: string;
  bus_tip?: number;
  bar_tip?: number;
  food_tip?: number;
  card_fee?: number;
  tip_meta?: {};
  tip_metab?: {};
  user_id?: number;
}