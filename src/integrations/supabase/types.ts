export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_activity_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          target_id: string | null
          target_type: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          target_id?: string | null
          target_type?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          amount: number
          created_at: string
          id: string
          investment_date: string
          investor_id: string
          project_id: string
          roi_earned: number | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          investment_date?: string
          investor_id: string
          project_id: string
          roi_earned?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          investment_date?: string
          investor_id?: string
          project_id?: string
          roi_earned?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          created_at: string
          id: string
          is_default: boolean | null
          is_verified: boolean | null
          metadata: Json
          provider: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          is_verified?: boolean | null
          metadata: Json
          provider: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          is_verified?: boolean | null
          metadata?: Json
          provider?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_tokens: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          last_four: string | null
          metadata: Json | null
          payment_method_type: string
          provider: string
          token_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          last_four?: string | null
          metadata?: Json | null
          payment_method_type: string
          provider: string
          token_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          last_four?: string | null
          metadata?: Json | null
          payment_method_type?: string
          provider?: string
          token_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          description: string
          farmer_id: string
          id: string
          images: string[] | null
          location: string
          price: number
          quantity: number
          status: string | null
          title: string
          unit: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          farmer_id: string
          id?: string
          images?: string[] | null
          location: string
          price: number
          quantity?: number
          status?: string | null
          title: string
          unit: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          farmer_id?: string
          id?: string
          images?: string[] | null
          location?: string
          price?: number
          quantity?: number
          status?: string | null
          title?: string
          unit?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          backup_codes: Json | null
          badges: string[] | null
          created_at: string | null
          farm_location: Json | null
          first_name: string | null
          id: string
          id_document_url: string | null
          last_name: string | null
          level: number | null
          phone: string | null
          phone_verified: boolean | null
          role: string | null
          ts_balance: number | null
          two_factor_enabled: boolean | null
          two_factor_method: string | null
          two_factor_setup_at: string | null
          updated_at: string | null
          username: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
          wallet_balance: number | null
          xp: number | null
        }
        Insert: {
          backup_codes?: Json | null
          badges?: string[] | null
          created_at?: string | null
          farm_location?: Json | null
          first_name?: string | null
          id: string
          id_document_url?: string | null
          last_name?: string | null
          level?: number | null
          phone?: string | null
          phone_verified?: boolean | null
          role?: string | null
          ts_balance?: number | null
          two_factor_enabled?: boolean | null
          two_factor_method?: string | null
          two_factor_setup_at?: string | null
          updated_at?: string | null
          username?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          wallet_balance?: number | null
          xp?: number | null
        }
        Update: {
          backup_codes?: Json | null
          badges?: string[] | null
          created_at?: string | null
          farm_location?: Json | null
          first_name?: string | null
          id?: string
          id_document_url?: string | null
          last_name?: string | null
          level?: number | null
          phone?: string | null
          phone_verified?: boolean | null
          role?: string | null
          ts_balance?: number | null
          two_factor_enabled?: boolean | null
          two_factor_method?: string | null
          two_factor_setup_at?: string | null
          updated_at?: string | null
          username?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          wallet_balance?: number | null
          xp?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          action_history: Json | null
          admin_feedback: string | null
          admin_id: string | null
          admin_name: string | null
          approved_at: string | null
          category: Database["public"]["Enums"]["project_category"]
          completion_date: string | null
          created_at: string
          denied_at: string | null
          description: string
          duration: string
          expected_roi: string
          farmer_id: string
          farmer_name: string
          funding_amount: string
          id: string
          images: string[] | null
          location: Database["public"]["Enums"]["kenyan_county"]
          minimum_investment: string
          progress_percentage: number | null
          progress_status:
            | Database["public"]["Enums"]["project_progress_status"]
            | null
          status: Database["public"]["Enums"]["project_status"]
          title: string
          updated_at: string
        }
        Insert: {
          action_history?: Json | null
          admin_feedback?: string | null
          admin_id?: string | null
          admin_name?: string | null
          approved_at?: string | null
          category: Database["public"]["Enums"]["project_category"]
          completion_date?: string | null
          created_at?: string
          denied_at?: string | null
          description: string
          duration: string
          expected_roi: string
          farmer_id: string
          farmer_name: string
          funding_amount: string
          id?: string
          images?: string[] | null
          location: Database["public"]["Enums"]["kenyan_county"]
          minimum_investment: string
          progress_percentage?: number | null
          progress_status?:
            | Database["public"]["Enums"]["project_progress_status"]
            | null
          status?: Database["public"]["Enums"]["project_status"]
          title: string
          updated_at?: string
        }
        Update: {
          action_history?: Json | null
          admin_feedback?: string | null
          admin_id?: string | null
          admin_name?: string | null
          approved_at?: string | null
          category?: Database["public"]["Enums"]["project_category"]
          completion_date?: string | null
          created_at?: string
          denied_at?: string | null
          description?: string
          duration?: string
          expected_roi?: string
          farmer_id?: string
          farmer_name?: string
          funding_amount?: string
          id?: string
          images?: string[] | null
          location?: Database["public"]["Enums"]["kenyan_county"]
          minimum_investment?: string
          progress_percentage?: number | null
          progress_status?:
            | Database["public"]["Enums"]["project_progress_status"]
            | null
          status?: Database["public"]["Enums"]["project_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      security_events: {
        Row: {
          created_at: string
          details: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          resolved: boolean | null
          severity: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          resolved?: boolean | null
          severity?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          resolved?: boolean | null
          severity?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      token_purchases: {
        Row: {
          amount: number
          bonus_tokens: number
          created_at: string
          id: string
          metadata: Json | null
          payment_method: string
          payment_provider: string
          payment_reference: string | null
          status: string
          tokens_purchased: number
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          bonus_tokens?: number
          created_at?: string
          id?: string
          metadata?: Json | null
          payment_method: string
          payment_provider: string
          payment_reference?: string | null
          status?: string
          tokens_purchased: number
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          bonus_tokens?: number
          created_at?: string
          id?: string
          metadata?: Json | null
          payment_method?: string
          payment_provider?: string
          payment_reference?: string | null
          status?: string
          tokens_purchased?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          description: string | null
          id: string
          metadata: Json | null
          payment_method: string | null
          status: string
          transaction_reference: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          status?: string
          transaction_reference?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          status?: string
          transaction_reference?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trusted_devices: {
        Row: {
          created_at: string
          device_fingerprint: string
          device_name: string | null
          id: string
          ip_address: unknown | null
          last_used_at: string | null
          trusted_until: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device_fingerprint: string
          device_name?: string | null
          id?: string
          ip_address?: unknown | null
          last_used_at?: string | null
          trusted_until?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device_fingerprint?: string
          device_name?: string | null
          id?: string
          ip_address?: unknown | null
          last_used_at?: string | null
          trusted_until?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_name: string
          created_at: string
          description: string
          id: string
          points_earned: number
          token_reward: number
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_name: string
          created_at?: string
          description: string
          id?: string
          points_earned?: number
          token_reward?: number
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_name?: string
          created_at?: string
          description?: string
          id?: string
          points_earned?: number
          token_reward?: number
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tokens: {
        Row: {
          balance: number
          conversion_rate: number
          created_at: string
          id: string
          locked_balance: number
          total_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          conversion_rate?: number
          created_at?: string
          id?: string
          locked_balance?: number
          total_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          conversion_rate?: number
          created_at?: string
          id?: string
          locked_balance?: number
          total_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          created_at: string | null
          document_type: string
          document_url: string
          id: string
          reviewed_at: string | null
          reviewer_id: string | null
          reviewer_notes: string | null
          status: string | null
          updated_at: string | null
          uploaded_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_type: string
          document_url: string
          id?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          status?: string | null
          updated_at?: string | null
          uploaded_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_type?: string
          document_url?: string
          id?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          status?: string | null
          updated_at?: string | null
          uploaded_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_backup_codes: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_latest_otp_for_testing: {
        Args: { p_user_id: string }
        Returns: string
      }
      get_platform_setting: {
        Args: { setting_key: string }
        Returns: Json
      }
      log_admin_activity: {
        Args: {
          p_action: string
          p_admin_id: string
          p_details?: Json
          p_target_id?: string
          p_target_type?: string
        }
        Returns: string
      }
      send_two_factor_code: {
        Args: { p_method?: string; p_user_id: string }
        Returns: string
      }
      update_platform_setting: {
        Args: { admin_id: string; setting_key: string; setting_value: Json }
        Returns: boolean
      }
      update_user_token_balance: {
        Args: {
          p_balance_change: number
          p_total_earned_change?: number
          p_transaction_id?: string
          p_user_id: string
        }
        Returns: boolean
      }
      verify_two_factor_code: {
        Args: {
          p_code: string
          p_device_fingerprint?: string
          p_user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      kenyan_county:
        | "baringo"
        | "bomet"
        | "bungoma"
        | "busia"
        | "elgeyo_marakwet"
        | "embu"
        | "garissa"
        | "homa_bay"
        | "isiolo"
        | "kajiado"
        | "kakamega"
        | "kericho"
        | "kiambu"
        | "kilifi"
        | "kirinyaga"
        | "kisii"
        | "kisumu"
        | "kitui"
        | "kwale"
        | "laikipia"
        | "lamu"
        | "machakos"
        | "makueni"
        | "mandera"
        | "marsabit"
        | "meru"
        | "migori"
        | "mombasa"
        | "muranga"
        | "nairobi"
        | "nakuru"
        | "nandi"
        | "narok"
        | "nyamira"
        | "nyandarua"
        | "nyeri"
        | "samburu"
        | "siaya"
        | "taita_taveta"
        | "tana_river"
        | "tharaka_nithi"
        | "trans_nzoia"
        | "turkana"
        | "uasin_gishu"
        | "vihiga"
        | "wajir"
        | "west_pokot"
      project_category:
        | "crops"
        | "livestock"
        | "fishing"
        | "horticulture"
        | "poultry"
        | "dairy"
        | "beekeeping"
        | "forestry"
        | "aquaculture"
        | "agro_processing"
      project_progress_status:
        | "planning"
        | "in_progress"
        | "completed"
        | "cancelled"
      project_status: "pending" | "approved" | "denied"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      kenyan_county: [
        "baringo",
        "bomet",
        "bungoma",
        "busia",
        "elgeyo_marakwet",
        "embu",
        "garissa",
        "homa_bay",
        "isiolo",
        "kajiado",
        "kakamega",
        "kericho",
        "kiambu",
        "kilifi",
        "kirinyaga",
        "kisii",
        "kisumu",
        "kitui",
        "kwale",
        "laikipia",
        "lamu",
        "machakos",
        "makueni",
        "mandera",
        "marsabit",
        "meru",
        "migori",
        "mombasa",
        "muranga",
        "nairobi",
        "nakuru",
        "nandi",
        "narok",
        "nyamira",
        "nyandarua",
        "nyeri",
        "samburu",
        "siaya",
        "taita_taveta",
        "tana_river",
        "tharaka_nithi",
        "trans_nzoia",
        "turkana",
        "uasin_gishu",
        "vihiga",
        "wajir",
        "west_pokot",
      ],
      project_category: [
        "crops",
        "livestock",
        "fishing",
        "horticulture",
        "poultry",
        "dairy",
        "beekeeping",
        "forestry",
        "aquaculture",
        "agro_processing",
      ],
      project_progress_status: [
        "planning",
        "in_progress",
        "completed",
        "cancelled",
      ],
      project_status: ["pending", "approved", "denied"],
    },
  },
} as const
