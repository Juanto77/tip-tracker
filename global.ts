import type { Database as DB, Tables as T, Json } from '~/types/database';

declare global {
  type Database = DB;
  // type Tables = <T>(arg: string)=> T;
  // type jobs = <T>(arg: 'jobs');
  // type tips = <T><'tips'>;
  type tipMeta = DB['public']['Tables']['jobs']['Row']['tip_meta'];
}
