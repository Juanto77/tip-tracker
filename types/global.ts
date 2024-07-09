import type { Database, Tables, Json } from '~/types/database';

declare global {
  // type Tables = <T>(arg: string)=> T;
  // type jobs = <T>(arg: 'jobs');
  // type tips = <T><'tips'>;
  type tipMeta = Database['public']['Tables']['jobs']['Row']['tip_meta'];
  type jobs = Database['public']['Tables']['job_pool']['Relationships']
  type userTip = Tables<'user_tip'>
}

export type { userTip }