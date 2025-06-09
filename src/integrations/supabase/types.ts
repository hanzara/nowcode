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
      disputes: {
        Row: {
          created_at: string
          description: string
          id: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      investment_insights: {
        Row: {
          confidence_score: number | null
          content: string
          created_at: string
          expires_at: string | null
          id: string
          insight_type: string
          is_premium: boolean | null
          risk_score: number | null
          target_user_id: string | null
          title: string
        }
        Insert: {
          confidence_score?: number | null
          content: string
          created_at?: string
          expires_at?: string | null
          id?: string
          insight_type: string
          is_premium?: boolean | null
          risk_score?: number | null
          target_user_id?: string | null
          title: string
        }
        Update: {
          confidence_score?: number | null
          content?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          insight_type?: string
          is_premium?: boolean | null
          risk_score?: number | null
          target_user_id?: string | null
          title?: string
        }
        Relationships: []
      }
      learning_content: {
        Row: {
          category: string
          content_body: string | null
          content_type: string
          content_url: string | null
          created_at: string
          description: string | null
          difficulty_level: string
          estimated_duration: number | null
          id: string
          is_published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content_body?: string | null
          content_type: string
          content_url?: string | null
          created_at?: string
          description?: string | null
          difficulty_level: string
          estimated_duration?: number | null
          id?: string
          is_published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content_body?: string | null
          content_type?: string
          content_url?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string
          estimated_duration?: number | null
          id?: string
          is_published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lender_ratings: {
        Row: {
          borrower_id: string
          communication_rating: number | null
          created_at: string
          id: string
          lender_id: string
          loan_application_id: string | null
          overall_rating: number | null
          reliability_rating: number | null
          review_text: string | null
          terms_rating: number | null
          updated_at: string
        }
        Insert: {
          borrower_id: string
          communication_rating?: number | null
          created_at?: string
          id?: string
          lender_id: string
          loan_application_id?: string | null
          overall_rating?: number | null
          reliability_rating?: number | null
          review_text?: string | null
          terms_rating?: number | null
          updated_at?: string
        }
        Update: {
          borrower_id?: string
          communication_rating?: number | null
          created_at?: string
          id?: string
          lender_id?: string
          loan_application_id?: string | null
          overall_rating?: number | null
          reliability_rating?: number | null
          review_text?: string | null
          terms_rating?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lender_ratings_loan_application_id_fkey"
            columns: ["loan_application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_applications: {
        Row: {
          amount: number
          borrower_id: string
          collateral: string | null
          created_at: string
          duration_months: number
          funding_progress: number | null
          id: string
          interest_rate: number
          loan_id: string | null
          monthly_payment: number | null
          status: string | null
          total_payment: number | null
          updated_at: string
        }
        Insert: {
          amount: number
          borrower_id: string
          collateral?: string | null
          created_at?: string
          duration_months: number
          funding_progress?: number | null
          id?: string
          interest_rate: number
          loan_id?: string | null
          monthly_payment?: number | null
          status?: string | null
          total_payment?: number | null
          updated_at?: string
        }
        Update: {
          amount?: number
          borrower_id?: string
          collateral?: string | null
          created_at?: string
          duration_months?: number
          funding_progress?: number | null
          id?: string
          interest_rate?: number
          loan_id?: string | null
          monthly_payment?: number | null
          status?: string | null
          total_payment?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loan_applications_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_offers: {
        Row: {
          created_at: string
          id: string
          investor_id: string
          loan_application_id: string
          message: string | null
          offered_amount: number
          offered_interest_rate: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          investor_id: string
          loan_application_id: string
          message?: string | null
          offered_amount: number
          offered_interest_rate: number
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          investor_id?: string
          loan_application_id?: string
          message?: string | null
          offered_amount?: number
          offered_interest_rate?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loan_offers_loan_application_id_fkey"
            columns: ["loan_application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      loans: {
        Row: {
          amount: number
          collateral_required: string | null
          created_at: string
          duration_months: number
          id: string
          interest_rate: number
          lender_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          collateral_required?: string | null
          created_at?: string
          duration_months: number
          id?: string
          interest_rate: number
          lender_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          collateral_required?: string | null
          created_at?: string
          duration_months?: number
          id?: string
          interest_rate?: number
          lender_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      mobile_money_accounts: {
        Row: {
          account_name: string | null
          created_at: string
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          phone_number: string
          provider: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          phone_number: string
          provider: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          phone_number?: string
          provider?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string
          credit_score: number | null
          email: string | null
          full_name: string | null
          id: string
          loan_eligibility: number | null
          phone_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          credit_score?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          loan_eligibility?: number | null
          phone_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          country?: string | null
          created_at?: string
          credit_score?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          loan_eligibility?: number | null
          phone_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saving_group_members: {
        Row: {
          group_id: string
          id: string
          is_active: boolean | null
          joined_at: string
          last_contribution_date: string | null
          role: string | null
          total_contributed: number | null
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          is_active?: boolean | null
          joined_at?: string
          last_contribution_date?: string | null
          role?: string | null
          total_contributed?: number | null
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          is_active?: boolean | null
          joined_at?: string
          last_contribution_date?: string | null
          role?: string | null
          total_contributed?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saving_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "saving_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      saving_groups: {
        Row: {
          contribution_frequency: string | null
          created_at: string
          created_by: string
          current_members: number | null
          description: string | null
          group_type: string | null
          id: string
          is_active: boolean | null
          max_members: number | null
          min_contribution: number | null
          name: string
          target_amount: number | null
          total_saved: number | null
          updated_at: string
        }
        Insert: {
          contribution_frequency?: string | null
          created_at?: string
          created_by: string
          current_members?: number | null
          description?: string | null
          group_type?: string | null
          id?: string
          is_active?: boolean | null
          max_members?: number | null
          min_contribution?: number | null
          name: string
          target_amount?: number | null
          total_saved?: number | null
          updated_at?: string
        }
        Update: {
          contribution_frequency?: string | null
          created_at?: string
          created_by?: string
          current_members?: number | null
          description?: string | null
          group_type?: string | null
          id?: string
          is_active?: boolean | null
          max_members?: number | null
          min_contribution?: number | null
          name?: string
          target_amount?: number | null
          total_saved?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      staking_pools: {
        Row: {
          apy: number
          created_at: string
          currency: string
          id: string
          is_active: boolean | null
          max_stake: number | null
          min_stake: number
          name: string
          total_staked: number | null
          updated_at: string
        }
        Insert: {
          apy: number
          created_at?: string
          currency: string
          id?: string
          is_active?: boolean | null
          max_stake?: number | null
          min_stake: number
          name: string
          total_staked?: number | null
          updated_at?: string
        }
        Update: {
          apy?: number
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean | null
          max_stake?: number | null
          min_stake?: number
          name?: string
          total_staked?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          reference_id: string | null
          source: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          source: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          source?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_learning_progress: {
        Row: {
          completed_at: string | null
          content_id: string | null
          created_at: string
          id: string
          score: number | null
          status: string
          time_spent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          content_id?: string | null
          created_at?: string
          id?: string
          score?: number | null
          status?: string
          time_spent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          content_id?: string | null
          created_at?: string
          id?: string
          score?: number | null
          status?: string
          time_spent?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "learning_content"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          experience_years: number | null
          id: string
          location: string | null
          profession: string | null
          profile_type: string
          success_rate: number | null
          total_borrowed: number | null
          total_funded: number | null
          updated_at: string
          user_id: string
          verification_status: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          experience_years?: number | null
          id?: string
          location?: string | null
          profession?: string | null
          profile_type: string
          success_rate?: number | null
          total_borrowed?: number | null
          total_funded?: number | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          experience_years?: number | null
          id?: string
          location?: string | null
          profession?: string | null
          profile_type?: string
          success_rate?: number | null
          total_borrowed?: number | null
          total_funded?: number | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      user_referrals: {
        Row: {
          bonus_earned: number | null
          completed_at: string | null
          created_at: string
          id: string
          referral_code: string
          referred_id: string
          referrer_id: string
          status: string | null
        }
        Insert: {
          bonus_earned?: number | null
          completed_at?: string | null
          created_at?: string
          id?: string
          referral_code: string
          referred_id: string
          referrer_id: string
          status?: string | null
        }
        Update: {
          bonus_earned?: number | null
          completed_at?: string | null
          created_at?: string
          id?: string
          referral_code?: string
          referred_id?: string
          referrer_id?: string
          status?: string | null
        }
        Relationships: []
      }
      user_stakes: {
        Row: {
          amount: number
          created_at: string
          id: string
          is_active: boolean | null
          last_reward_date: string | null
          pool_id: string
          rewards_earned: number | null
          stake_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_reward_date?: string | null
          pool_id: string
          rewards_earned?: number | null
          stake_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_reward_date?: string | null
          pool_id?: string
          rewards_earned?: number | null
          stake_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stakes_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "staking_pools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          started_at: string
          status: string
          subscription_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          started_at?: string
          status?: string
          subscription_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          started_at?: string
          status?: string
          subscription_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_tokens: {
        Row: {
          balance: number | null
          created_at: string
          id: string
          total_earned: number | null
          total_spent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string
          id?: string
          total_earned?: number | null
          total_spent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string
          id?: string
          total_earned?: number | null
          total_spent?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_wallets: {
        Row: {
          balance: number | null
          created_at: string
          currency: string | null
          id: string
          is_connected: boolean | null
          locked_collateral: number | null
          updated_at: string
          user_id: string
          wallet_address: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          is_connected?: boolean | null
          locked_collateral?: number | null
          updated_at?: string
          user_id: string
          wallet_address?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          is_connected?: boolean | null
          locked_collateral?: number | null
          updated_at?: string
          user_id?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          description: string | null
          id: string
          status: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          status?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          status?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_lender_average_rating: {
        Args: { lender_user_id: string }
        Returns: number
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
