export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      job_j: {
        Row: {
          created_at: string
          id: number
          jid: number
          role_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          jid?: number
          role_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          jid?: number
          role_id?: number | null
        }
        Relationships: []
      }
      job_pool: {
        Row: {
          beerSales: boolean | null
          foodSales: boolean | null
          id: number
          jid: number
          jname: string | null
          jrole: string | null
          liquorSales: boolean | null
          retailSales: boolean | null
          user_id: string
          val: number | null
          wineSales: boolean | null
        }
        Insert: {
          beerSales?: boolean | null
          foodSales?: boolean | null
          id?: number
          jid?: number
          jname?: string | null
          jrole?: string | null
          liquorSales?: boolean | null
          retailSales?: boolean | null
          user_id: string
          val?: number | null
          wineSales?: boolean | null
        }
        Update: {
          beerSales?: boolean | null
          foodSales?: boolean | null
          id?: number
          jid?: number
          jname?: string | null
          jrole?: string | null
          liquorSales?: boolean | null
          retailSales?: boolean | null
          user_id?: string
          val?: number | null
          wineSales?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_duplicate_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_job_pool_jid_fkey"
            columns: ["jid"]
            isOneToOne: false
            referencedRelation: "jobs_d"
            referencedColumns: ["id"]
          }
        ]
      }
      jobs: {
        Row: {
          bar_tip: number | null
          bus_tip: number | null
          card_fee: number | null
          food_tip: number | null
          id: number
          name: string | null
          tip_meta: Json | null
          tip_metab: Json[] | null
          user_id: string
        }
        Insert: {
          bar_tip?: number | null
          bus_tip?: number | null
          card_fee?: number | null
          food_tip?: number | null
          id?: number
          name?: string | null
          tip_meta?: Json | null
          tip_metab?: Json[] | null
          user_id: string
        }
        Update: {
          bar_tip?: number | null
          bus_tip?: number | null
          card_fee?: number | null
          food_tip?: number | null
          id?: number
          name?: string | null
          tip_meta?: Json | null
          tip_metab?: Json[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      jobs_d: {
        Row: {
          id: number
          name: string | null
          user_id: string
        }
        Insert: {
          id?: number
          name?: string | null
          user_id: string
        }
        Update: {
          id?: number
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_jobs_d_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_duplicate: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          tips: Json | null
          tips2: Json[] | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          tips?: Json | null
          tips2?: Json[] | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          tips?: Json | null
          tips2?: Json[] | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_duplicate_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tips: {
        Row: {
          bar_out: number | null
          bar_tip: number
          beer_sales: number | null
          bus_out: number | null
          bus_tip: number | null
          calc: Json[] | null
          card_fee: number | null
          cash: number | null
          credit: number | null
          credit_revenue: number | null
          date: string | null
          food_out: number | null
          food_sales: number | null
          food_tip: number
          guest_count: number | null
          id: number
          in_time: string | null
          job_id: number
          liquor_percent: number | null
          liquor_sales: number | null
          out_time: string | null
          pa: number | null
          ppa: number | null
          retail_sales: number | null
          total_hours: number
          total_revenue: number | null
          user_id: string
          wine_sales: number | null
        }
        Insert: {
          bar_out?: number | null
          bar_tip?: number
          beer_sales?: number | null
          bus_out?: number | null
          bus_tip?: number | null
          calc?: Json[] | null
          card_fee?: number | null
          cash?: number | null
          credit?: number | null
          credit_revenue?: number | null
          date?: string | null
          food_out?: number | null
          food_sales?: number | null
          food_tip?: number
          guest_count?: number | null
          id?: number
          in_time?: string | null
          job_id: number
          liquor_percent?: number | null
          liquor_sales?: number | null
          out_time?: string | null
          pa?: number | null
          ppa?: number | null
          retail_sales?: number | null
          total_hours?: number
          total_revenue?: number | null
          user_id: string
          wine_sales?: number | null
        }
        Update: {
          bar_out?: number | null
          bar_tip?: number
          beer_sales?: number | null
          bus_out?: number | null
          bus_tip?: number | null
          calc?: Json[] | null
          card_fee?: number | null
          cash?: number | null
          credit?: number | null
          credit_revenue?: number | null
          date?: string | null
          food_out?: number | null
          food_sales?: number | null
          food_tip?: number
          guest_count?: number | null
          id?: number
          in_time?: string | null
          job_id?: number
          liquor_percent?: number | null
          liquor_sales?: number | null
          out_time?: string | null
          pa?: number | null
          ppa?: number | null
          retail_sales?: number | null
          total_hours?: number
          total_revenue?: number | null
          user_id?: string
          wine_sales?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tips_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tips_duplicate: {
        Row: {
          BeerS: number | null
          Cash: number | null
          Credit: number | null
          Date: string | null
          FoodS: number | null
          guestNum: number | null
          Hours: number | null
          id: string
          In: string | null
          LiquorS: number | null
          Out: string | null
          pa: number | null
          RetailS: number | null
          user_id: string
          WineS: number | null
        }
        Insert: {
          BeerS?: number | null
          Cash?: number | null
          Credit?: number | null
          Date?: string | null
          FoodS?: number | null
          guestNum?: number | null
          Hours?: number | null
          id?: string
          In?: string | null
          LiquorS?: number | null
          Out?: string | null
          pa?: number | null
          RetailS?: number | null
          user_id: string
          WineS?: number | null
        }
        Update: {
          BeerS?: number | null
          Cash?: number | null
          Credit?: number | null
          Date?: string | null
          FoodS?: number | null
          guestNum?: number | null
          Hours?: number | null
          id?: string
          In?: string | null
          LiquorS?: number | null
          Out?: string | null
          pa?: number | null
          RetailS?: number | null
          user_id?: string
          WineS?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tips_duplicate_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      json_return: {
        Args: {
          id: number
        }
        Returns: Json
      }
      new_tip: {
        Args: {
          user_id_input: string
          job_id_input: number
          date_input: string
          cash_input: number
          credit_input: number
          beer_sales_input: number
          food_sales_input: number
          liquor_sales_input: number
          wine_sales_input: number
          retail_sales_input: number
          guest_count_input: number
        }
        Returns: {
          bar_out: number | null
          bar_tip: number
          beer_sales: number | null
          bus_out: number | null
          bus_tip: number | null
          calc: Json[] | null
          card_fee: number | null
          cash: number | null
          credit: number | null
          credit_revenue: number | null
          date: string | null
          food_out: number | null
          food_sales: number | null
          food_tip: number
          guest_count: number | null
          id: number
          in_time: string | null
          job_id: number
          liquor_percent: number | null
          liquor_sales: number | null
          out_time: string | null
          pa: number | null
          ppa: number | null
          retail_sales: number | null
          total_hours: number
          total_revenue: number | null
          user_id: string
          wine_sales: number | null
        }[]
      }
      newtip: {
        Args: Record<PropertyKey, never>
        Returns: {
          bar_out: number | null
          bar_tip: number
          beer_sales: number | null
          bus_out: number | null
          bus_tip: number | null
          calc: Json[] | null
          card_fee: number | null
          cash: number | null
          credit: number | null
          credit_revenue: number | null
          date: string | null
          food_out: number | null
          food_sales: number | null
          food_tip: number
          guest_count: number | null
          id: number
          in_time: string | null
          job_id: number
          liquor_percent: number | null
          liquor_sales: number | null
          out_time: string | null
          pa: number | null
          ppa: number | null
          retail_sales: number | null
          total_hours: number
          total_revenue: number | null
          user_id: string
          wine_sales: number | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never