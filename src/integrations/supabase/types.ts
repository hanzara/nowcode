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
      chama_activities: {
        Row: {
          activity_type: string
          amount: number | null
          chama_id: string | null
          created_at: string | null
          description: string
          id: string
          member_id: string | null
        }
        Insert: {
          activity_type: string
          amount?: number | null
          chama_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          member_id?: string | null
        }
        Update: {
          activity_type?: string
          amount?: number | null
          chama_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chama_activities_chama_id_fkey"
            columns: ["chama_id"]
            isOneToOne: false
            referencedRelation: "chamas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chama_activities_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "chama_members"
            referencedColumns: ["id"]
          },
        ]
      }
      chama_contributions: {
        Row: {
          amount: number
          chama_id: string | null
          created_at: string | null
          id: string
          member_id: string | null
          payment_method: string | null
          status: string | null
        }
        Insert: {
          amount: number
          chama_id?: string | null
          created_at?: string | null
          id?: string
          member_id?: string | null
          payment_method?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          chama_id?: string | null
          created_at?: string | null
          id?: string
          member_id?: string | null
          payment_method?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chama_contributions_chama_id_fkey"
            columns: ["chama_id"]
            isOneToOne: false
            referencedRelation: "chamas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chama_contributions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "chama_members"
            referencedColumns: ["id"]
          },
        ]
      }
      chama_loan_repayments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          loan_id: string | null
          payment_date: string | null
          payment_method: string | null
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          loan_id?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          loan_id?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chama_loan_repayments_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "chama_loans"
            referencedColumns: ["id"]
          },
        ]
      }
      chama_loans: {
        Row: {
          amount: number
          approved_at: string | null
          borrower_id: string | null
          chama_id: string | null
          created_at: string | null
          due_date: string | null
          duration_months: number
          id: string
          interest_rate: number | null
          repaid_amount: number | null
          status: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          borrower_id?: string | null
          chama_id?: string | null
          created_at?: string | null
          due_date?: string | null
          duration_months: number
          id?: string
          interest_rate?: number | null
          repaid_amount?: number | null
          status?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          borrower_id?: string | null
          chama_id?: string | null
          created_at?: string | null
          due_date?: string | null
          duration_months?: number
          id?: string
          interest_rate?: number | null
          repaid_amount?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chama_loans_borrower_id_fkey"
            columns: ["borrower_id"]
            isOneToOne: false
            referencedRelation: "chama_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chama_loans_chama_id_fkey"
            columns: ["chama_id"]
            isOneToOne: false
            referencedRelation: "chamas"
            referencedColumns: ["id"]
          },
        ]
      }
      chama_members: {
        Row: {
          auto_debit_enabled: boolean | null
          chama_id: string | null
          id: string
          is_active: boolean | null
          joined_at: string | null
          last_contribution_date: string | null
          role: string | null
          total_contributed: number | null
          user_id: string
        }
        Insert: {
          auto_debit_enabled?: boolean | null
          chama_id?: string | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          last_contribution_date?: string | null
          role?: string | null
          total_contributed?: number | null
          user_id: string
        }
        Update: {
          auto_debit_enabled?: boolean | null
          chama_id?: string | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          last_contribution_date?: string | null
          role?: string | null
          total_contributed?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chama_members_chama_id_fkey"
            columns: ["chama_id"]
            isOneToOne: false
            referencedRelation: "chamas"
            referencedColumns: ["id"]
          },
        ]
      }
      chama_messages: {
        Row: {
          chama_id: string | null
          id: string
          message: string
          sender_id: string | null
          sent_at: string | null
        }
        Insert: {
          chama_id?: string | null
          id?: string
          message: string
          sender_id?: string | null
          sent_at?: string | null
        }
        Update: {
          chama_id?: string | null
          id?: string
          message?: string
          sender_id?: string | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chama_messages_chama_id_fkey"
            columns: ["chama_id"]
            isOneToOne: false
            referencedRelation: "chamas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chama_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "chama_members"
            referencedColumns: ["id"]
          },
        ]
      }
      chama_metrics: {
        Row: {
          average_repayment_performance: number | null
          calculated_at: string | null
          chama_id: string | null
          created_at: string | null
          id: string
          net_worth: number | null
          pending_votes_count: number | null
          roi_percentage: number | null
          upcoming_contributions_count: number | null
        }
        Insert: {
          average_repayment_performance?: number | null
          calculated_at?: string | null
          chama_id?: string | null
          created_at?: string | null
          id?: string
          net_worth?: number | null
          pending_votes_count?: number | null
          roi_percentage?: number | null
          upcoming_contributions_count?: number | null
        }
        Update: {
          average_repayment_performance?: number | null
          calculated_at?: string | null
          chama_id?: string | null
          created_at?: string | null
          id?: string
          net_worth?: number | null
          pending_votes_count?: number | null
          roi_percentage?: number | null
          upcoming_contributions_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chama_metrics_chama_id_fkey"
            columns: ["chama_id"]
            isOneToOne: false
            referencedRelation: "chamas"
            referencedColumns: ["id"]
          },
        ]
      }
      chama_settings: {
        Row: {
          chama_id: string | null
          created_at: string | null
          id: string
          late_payment_penalty: number | null
          loan_interest_rate: number | null
          max_loan_amount: number | null
          updated_at: string | null
          voting_threshold: number | null
        }
        Insert: {
          chama_id?: string | null
          created_at?: string | null
          id?: string
          late_payment_penalty?: number | null
          loan_interest_rate?: number | null
          max_loan_amount?: number | null
          updated_at?: string | null
          voting_threshold?: number | null
        }
        Update: {
          chama_id?: string | null
          created_at?: string | null
          id?: string
          late_payment_penalty?: number | null
          loan_interest_rate?: number | null
          max_loan_amount?: number | null
          updated_at?: string | null
          voting_threshold?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chama_settings_chama_id_fkey"
            columns: ["chama_id"]
            isOneToOne: true
            referencedRelation: "chamas"
            referencedColumns: ["id"]
          },
        ]
      }
      chama_votes: {
        Row: {
          chama_id: string | null
          created_at: string | null
          deadline: string | null
          description: string | null
          id: string
          initiated_by: string | null
          no_votes: number | null
          reference_id: string | null
          status: string | null
          title: string
          total_eligible_voters: number | null
          vote_type: string
          yes_votes: number | null
        }
        Insert: {
          chama_id?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          initiated_by?: string | null
          no_votes?: number | null
          reference_id?: string | null
          status?: string | null
          title: string
          total_eligible_voters?: number | null
          vote_type: string
          yes_votes?: number | null
        }
        Update: {
          chama_id?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          initiated_by?: string | null
          no_votes?: number | null
          reference_id?: string | null
          status?: string | null
          title?: string
          total_eligible_voters?: number | null
          vote_type?: string
          yes_votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chama_votes_chama_id_fkey"
            columns: ["chama_id"]
            isOneToOne: false
            referencedRelation: "chamas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chama_votes_initiated_by_fkey"
            columns: ["initiated_by"]
            isOneToOne: false
            referencedRelation: "chama_members"
            referencedColumns: ["id"]
          },
        ]
      }
      chamas: {
        Row: {
          contribution_amount: number
          contribution_frequency: string
          created_at: string | null
          created_by: string
          current_members: number | null
          description: string | null
          id: string
          max_members: number | null
          name: string
          status: string | null
          total_savings: number | null
          updated_at: string | null
        }
        Insert: {
          contribution_amount: number
          contribution_frequency?: string
          created_at?: string | null
          created_by: string
          current_members?: number | null
          description?: string | null
          id?: string
          max_members?: number | null
          name: string
          status?: string | null
          total_savings?: number | null
          updated_at?: string | null
        }
        Update: {
          contribution_amount?: number
          contribution_frequency?: string
          created_at?: string | null
          created_by?: string
          current_members?: number | null
          description?: string | null
          id?: string
          max_members?: number | null
          name?: string
          status?: string | null
          total_savings?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
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
      investment_projects: {
        Row: {
          business_owner_id: string
          category: string
          created_at: string | null
          current_funding: number | null
          description: string
          duration_months: number
          funding_deadline: string | null
          id: string
          location: string | null
          minimum_investment: number | null
          project_start_date: string | null
          projected_roi: number
          risk_score: number | null
          status: string | null
          target_amount: number
          title: string
          updated_at: string | null
          verified_at: string | null
        }
        Insert: {
          business_owner_id: string
          category: string
          created_at?: string | null
          current_funding?: number | null
          description: string
          duration_months: number
          funding_deadline?: string | null
          id?: string
          location?: string | null
          minimum_investment?: number | null
          project_start_date?: string | null
          projected_roi: number
          risk_score?: number | null
          status?: string | null
          target_amount: number
          title: string
          updated_at?: string | null
          verified_at?: string | null
        }
        Update: {
          business_owner_id?: string
          category?: string
          created_at?: string | null
          current_funding?: number | null
          description?: string
          duration_months?: number
          funding_deadline?: string | null
          id?: string
          location?: string | null
          minimum_investment?: number | null
          project_start_date?: string | null
          projected_roi?: number
          risk_score?: number | null
          status?: string | null
          target_amount?: number
          title?: string
          updated_at?: string | null
          verified_at?: string | null
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
      loan_agreements: {
        Row: {
          borrower_id: string
          created_at: string | null
          duration_months: number
          end_date: string | null
          id: string
          interest_rate: number
          investor_id: string
          loan_offer_id: string | null
          monthly_payment: number
          principal_amount: number
          repayment_schedule: Json | null
          signed_at: string | null
          start_date: string | null
          status: string | null
          terms_and_conditions: string | null
          total_payment: number
        }
        Insert: {
          borrower_id: string
          created_at?: string | null
          duration_months: number
          end_date?: string | null
          id?: string
          interest_rate: number
          investor_id: string
          loan_offer_id?: string | null
          monthly_payment: number
          principal_amount: number
          repayment_schedule?: Json | null
          signed_at?: string | null
          start_date?: string | null
          status?: string | null
          terms_and_conditions?: string | null
          total_payment: number
        }
        Update: {
          borrower_id?: string
          created_at?: string | null
          duration_months?: number
          end_date?: string | null
          id?: string
          interest_rate?: number
          investor_id?: string
          loan_offer_id?: string | null
          monthly_payment?: number
          principal_amount?: number
          repayment_schedule?: Json | null
          signed_at?: string | null
          start_date?: string | null
          status?: string | null
          terms_and_conditions?: string | null
          total_payment?: number
        }
        Relationships: [
          {
            foreignKeyName: "loan_agreements_loan_offer_id_fkey"
            columns: ["loan_offer_id"]
            isOneToOne: false
            referencedRelation: "loan_offers"
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
          disbursed_at: string | null
          documents: Json | null
          duration_months: number
          eligibility_score: number | null
          funding_progress: number | null
          guarantors: Json | null
          id: string
          interest_rate: number
          loan_id: string | null
          monthly_payment: number | null
          next_payment_due: string | null
          purpose: string | null
          rejection_reason: string | null
          repayment_method: string | null
          status: string | null
          total_payment: number | null
          updated_at: string
        }
        Insert: {
          amount: number
          borrower_id: string
          collateral?: string | null
          created_at?: string
          disbursed_at?: string | null
          documents?: Json | null
          duration_months: number
          eligibility_score?: number | null
          funding_progress?: number | null
          guarantors?: Json | null
          id?: string
          interest_rate: number
          loan_id?: string | null
          monthly_payment?: number | null
          next_payment_due?: string | null
          purpose?: string | null
          rejection_reason?: string | null
          repayment_method?: string | null
          status?: string | null
          total_payment?: number | null
          updated_at?: string
        }
        Update: {
          amount?: number
          borrower_id?: string
          collateral?: string | null
          created_at?: string
          disbursed_at?: string | null
          documents?: Json | null
          duration_months?: number
          eligibility_score?: number | null
          funding_progress?: number | null
          guarantors?: Json | null
          id?: string
          interest_rate?: number
          loan_id?: string | null
          monthly_payment?: number | null
          next_payment_due?: string | null
          purpose?: string | null
          rejection_reason?: string | null
          repayment_method?: string | null
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
      loan_notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          loan_application_id: string | null
          message: string
          notification_type: string
          scheduled_for: string | null
          sent_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          loan_application_id?: string | null
          message: string
          notification_type: string
          scheduled_for?: string | null
          sent_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          loan_application_id?: string | null
          message?: string
          notification_type?: string
          scheduled_for?: string | null
          sent_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loan_notifications_loan_application_id_fkey"
            columns: ["loan_application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
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
      loan_payments: {
        Row: {
          agreement_id: string | null
          amount: number
          created_at: string | null
          due_date: string
          id: string
          interest_amount: number
          paid_date: string | null
          payment_method: string | null
          payment_number: number
          principal_amount: number
          status: string | null
        }
        Insert: {
          agreement_id?: string | null
          amount: number
          created_at?: string | null
          due_date: string
          id?: string
          interest_amount: number
          paid_date?: string | null
          payment_method?: string | null
          payment_number: number
          principal_amount: number
          status?: string | null
        }
        Update: {
          agreement_id?: string | null
          amount?: number
          created_at?: string | null
          due_date?: string
          id?: string
          interest_amount?: number
          paid_date?: string | null
          payment_method?: string | null
          payment_number?: number
          principal_amount?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_payments_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "loan_agreements"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_policies: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          policy_type: string
          policy_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          policy_type: string
          policy_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          policy_type?: string
          policy_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      loan_repayments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          late_fee: number | null
          loan_application_id: string | null
          payment_date: string | null
          payment_method: string
          payment_reference: string | null
          proof_of_payment_url: string | null
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          late_fee?: number | null
          loan_application_id?: string | null
          payment_date?: string | null
          payment_method: string
          payment_reference?: string | null
          proof_of_payment_url?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          late_fee?: number | null
          loan_application_id?: string | null
          payment_date?: string | null
          payment_method?: string
          payment_reference?: string | null
          proof_of_payment_url?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_repayments_loan_application_id_fkey"
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
      member_reputation: {
        Row: {
          chama_id: string | null
          contribution_score: number | null
          created_at: string | null
          id: string
          last_calculated: string | null
          member_id: string | null
          overall_score: number | null
          participation_score: number | null
          repayment_score: number | null
          updated_at: string | null
        }
        Insert: {
          chama_id?: string | null
          contribution_score?: number | null
          created_at?: string | null
          id?: string
          last_calculated?: string | null
          member_id?: string | null
          overall_score?: number | null
          participation_score?: number | null
          repayment_score?: number | null
          updated_at?: string | null
        }
        Update: {
          chama_id?: string | null
          contribution_score?: number | null
          created_at?: string | null
          id?: string
          last_calculated?: string | null
          member_id?: string | null
          overall_score?: number | null
          participation_score?: number | null
          repayment_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_reputation_chama_id_fkey"
            columns: ["chama_id"]
            isOneToOne: false
            referencedRelation: "chamas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_reputation_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "chama_members"
            referencedColumns: ["id"]
          },
        ]
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
      p2p_chats: {
        Row: {
          created_at: string | null
          escrow_id: string
          id: string
          message: string
          sender_id: string
        }
        Insert: {
          created_at?: string | null
          escrow_id: string
          id?: string
          message: string
          sender_id: string
        }
        Update: {
          created_at?: string | null
          escrow_id?: string
          id?: string
          message?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "p2p_chats_escrow_id_fkey"
            columns: ["escrow_id"]
            isOneToOne: false
            referencedRelation: "p2p_escrows"
            referencedColumns: ["id"]
          },
        ]
      }
      p2p_escrows: {
        Row: {
          amount: number
          asset: string
          buyer_id: string
          created_at: string | null
          currency: string
          id: string
          listing_id: string
          payment_confirmed: boolean
          released_at: string | null
          seller_id: string
          status: string
        }
        Insert: {
          amount: number
          asset: string
          buyer_id: string
          created_at?: string | null
          currency: string
          id?: string
          listing_id: string
          payment_confirmed?: boolean
          released_at?: string | null
          seller_id: string
          status?: string
        }
        Update: {
          amount?: number
          asset?: string
          buyer_id?: string
          created_at?: string | null
          currency?: string
          id?: string
          listing_id?: string
          payment_confirmed?: boolean
          released_at?: string | null
          seller_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "p2p_escrows_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "p2p_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      p2p_listings: {
        Row: {
          amount: number
          asset: string
          created_at: string | null
          currency: string
          description: string | null
          id: string
          is_active: boolean
          payment_method: string
          price_per_unit: number
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          asset: string
          created_at?: string | null
          currency: string
          description?: string | null
          id?: string
          is_active?: boolean
          payment_method: string
          price_per_unit: number
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          asset?: string
          created_at?: string | null
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          payment_method?: string
          price_per_unit?: number
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      p2p_ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          escrow_id: string
          id: string
          ratee_id: string
          rater_id: string
          rating: number
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          escrow_id: string
          id?: string
          ratee_id: string
          rater_id: string
          rating: number
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          escrow_id?: string
          id?: string
          ratee_id?: string
          rater_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "p2p_ratings_escrow_id_fkey"
            columns: ["escrow_id"]
            isOneToOne: false
            referencedRelation: "p2p_escrows"
            referencedColumns: ["id"]
          },
        ]
      }
      p2p_verifications: {
        Row: {
          created_at: string | null
          email_verified: boolean
          id: string
          id_document_url: string | null
          phone_verified: boolean
          selfie_url: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_verified?: boolean
          id?: string
          id_document_url?: string | null
          phone_verified?: boolean
          selfie_url?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_verified?: boolean
          id?: string
          id_document_url?: string | null
          phone_verified?: boolean
          selfie_url?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment_requests: {
        Row: {
          amount: number
          borrower_id: string
          created_at: string | null
          id: string
          investor_id: string
          loan_offer_id: string | null
          payment_details: Json | null
          payment_method: string
          processed_at: string | null
          requested_at: string | null
          status: string | null
        }
        Insert: {
          amount: number
          borrower_id: string
          created_at?: string | null
          id?: string
          investor_id: string
          loan_offer_id?: string | null
          payment_details?: Json | null
          payment_method: string
          processed_at?: string | null
          requested_at?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          borrower_id?: string
          created_at?: string | null
          id?: string
          investor_id?: string
          loan_offer_id?: string | null
          payment_details?: Json | null
          payment_method?: string
          processed_at?: string | null
          requested_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_requests_loan_offer_id_fkey"
            columns: ["loan_offer_id"]
            isOneToOne: false
            referencedRelation: "loan_offers"
            referencedColumns: ["id"]
          },
        ]
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
          preferred_language: string | null
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
          preferred_language?: string | null
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
          preferred_language?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_updates: {
        Row: {
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          project_id: string | null
          title: string
          update_type: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          project_id?: string | null
          title: string
          update_type?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          project_id?: string | null
          title?: string
          update_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "investment_projects"
            referencedColumns: ["id"]
          },
        ]
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
      sponsor_contributions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          message: string | null
          payment_method: string | null
          sponsor_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          message?: string | null
          payment_method?: string | null
          sponsor_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          message?: string | null
          payment_method?: string | null
          sponsor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsor_contributions_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "wallet_sponsors"
            referencedColumns: ["id"]
          },
        ]
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
      student_wallets: {
        Row: {
          balance: number | null
          class_level: string | null
          created_at: string | null
          id: string
          parent_id: string
          school_name: string | null
          student_name: string
          target_amount: number | null
          target_deadline: string | null
          updated_at: string | null
        }
        Insert: {
          balance?: number | null
          class_level?: string | null
          created_at?: string | null
          id?: string
          parent_id: string
          school_name?: string | null
          student_name: string
          target_amount?: number | null
          target_deadline?: string | null
          updated_at?: string | null
        }
        Update: {
          balance?: number | null
          class_level?: string | null
          created_at?: string | null
          id?: string
          parent_id?: string
          school_name?: string | null
          student_name?: string
          target_amount?: number | null
          target_deadline?: string | null
          updated_at?: string | null
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
      tuition_payments: {
        Row: {
          academic_year: string | null
          amount: number
          created_at: string | null
          id: string
          payment_type: string
          receipt_number: string | null
          school_paybill: string | null
          status: string | null
          term: string | null
          wallet_id: string | null
        }
        Insert: {
          academic_year?: string | null
          amount: number
          created_at?: string | null
          id?: string
          payment_type: string
          receipt_number?: string | null
          school_paybill?: string | null
          status?: string | null
          term?: string | null
          wallet_id?: string | null
        }
        Update: {
          academic_year?: string | null
          amount?: number
          created_at?: string | null
          id?: string
          payment_type?: string
          receipt_number?: string | null
          school_paybill?: string | null
          status?: string | null
          term?: string | null
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tuition_payments_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "student_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_investments: {
        Row: {
          amount_invested: number
          created_at: string | null
          exit_date: string | null
          id: string
          investor_id: string
          last_return_date: string | null
          project_id: string | null
          returns_earned: number | null
          shares_percentage: number
          status: string | null
        }
        Insert: {
          amount_invested: number
          created_at?: string | null
          exit_date?: string | null
          id?: string
          investor_id: string
          last_return_date?: string | null
          project_id?: string | null
          returns_earned?: number | null
          shares_percentage: number
          status?: string | null
        }
        Update: {
          amount_invested?: number
          created_at?: string | null
          exit_date?: string | null
          id?: string
          investor_id?: string
          last_return_date?: string | null
          project_id?: string | null
          returns_earned?: number | null
          shares_percentage?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_investments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "investment_projects"
            referencedColumns: ["id"]
          },
        ]
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
      vote_responses: {
        Row: {
          created_at: string | null
          id: string
          response: boolean
          vote_id: string | null
          voter_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          response: boolean
          vote_id?: string | null
          voter_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          response?: boolean
          vote_id?: string | null
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vote_responses_vote_id_fkey"
            columns: ["vote_id"]
            isOneToOne: false
            referencedRelation: "chama_votes"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_sponsors: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          relationship: string | null
          sponsor_email: string | null
          sponsor_name: string
          sponsor_phone: string | null
          total_contributed: number | null
          wallet_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          relationship?: string | null
          sponsor_email?: string | null
          sponsor_name: string
          sponsor_phone?: string | null
          total_contributed?: number | null
          wallet_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          relationship?: string | null
          sponsor_email?: string | null
          sponsor_name?: string
          sponsor_phone?: string | null
          total_contributed?: number | null
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_sponsors_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "student_wallets"
            referencedColumns: ["id"]
          },
        ]
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
      calculate_loan_eligibility: {
        Args: { user_id_param: string; requested_amount: number }
        Returns: number
      }
      calculate_loan_schedule: {
        Args: {
          principal: number
          interest_rate: number
          duration_months: number
          start_date: string
        }
        Returns: Json
      }
      calculate_member_reputation: {
        Args: { member_chama_id: string; member_user_id: string }
        Returns: undefined
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_lender_average_rating: {
        Args: { lender_user_id: string }
        Returns: number
      }
      get_p2p_listings_with_profiles: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["CompositeTypes"]["p2p_listing_with_profile"][]
      }
      is_chama_admin: {
        Args: { chama_id_to_check: string }
        Returns: boolean
      }
      is_chama_admin_or_treasurer: {
        Args: { chama_id_to_check: string }
        Returns: boolean
      }
      is_chama_member: {
        Args: { chama_id_to_check: string }
        Returns: boolean
      }
      update_chama_metrics: {
        Args: { target_chama_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      p2p_listing_with_profile: {
        id: string | null
        user_id: string | null
        type: string | null
        asset: string | null
        amount: number | null
        price_per_unit: number | null
        currency: string | null
        payment_method: string | null
        description: string | null
        is_active: boolean | null
        created_at: string | null
        user_profiles: Json | null
      }
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
