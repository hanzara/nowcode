
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Loan {
  id: string;
  amount: number;
  interest_rate: number;
  duration_months: number;
  collateral_required: string | null;
  status: string;
  created_at: string;
}

export interface LoanApplication {
  id: string;
  borrower_id: string;
  loan_id: string | null;
  amount: number;
  interest_rate: number;
  duration_months: number;
  collateral: string | null;
  status: string;
  monthly_payment: number | null;
  total_payment: number | null;
  funding_progress: number;
  created_at: string;
  updated_at: string;
  purpose: string | null;
  repayment_method: string | null;
  guarantors: any;
  documents: any;
  eligibility_score: number | null;
  rejection_reason: string | null;
  disbursed_at: string | null;
  next_payment_due: string | null;
}

export const useLoans = () => {
  const { user } = useAuth();
  const [marketplaceLoans, setMarketplaceLoans] = useState<LoanApplication[]>([]);
  const [userApplications, setUserApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketplaceLoans();
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  const fetchMarketplaceLoans = async () => {
    try {
      // Fetch all pending loan applications for the marketplace
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMarketplaceLoans(data || []);
    } catch (error) {
      console.error('Error fetching marketplace loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('borrower_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserApplications(data || []);
    } catch (error) {
      console.error('Error fetching loan applications:', error);
    }
  };

  const submitLoanApplication = async (applicationData: {
    amount: number;
    interest_rate: number;
    duration_months: number;
    collateral: string;
    monthly_payment: number;
    total_payment: number;
    purpose?: string;
    repayment_method?: string;
  }) => {
    try {
      if (!user) {
        throw new Error('User must be authenticated to submit loan application');
      }

      const { data, error } = await supabase
        .from('loan_applications')
        .insert({
          borrower_id: user.id,
          amount: applicationData.amount,
          interest_rate: applicationData.interest_rate,
          duration_months: applicationData.duration_months,
          collateral: applicationData.collateral,
          monthly_payment: applicationData.monthly_payment,
          total_payment: applicationData.total_payment,
          purpose: applicationData.purpose || null,
          repayment_method: applicationData.repayment_method || 'wallet',
          status: 'pending',
          funding_progress: 0
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting loan application:', error);
        throw error;
      }

      console.log('Loan application submitted successfully:', data);
      await fetchUserApplications();
      await fetchMarketplaceLoans(); // Refresh marketplace to show new application
      return data;
    } catch (error) {
      console.error('Error submitting loan application:', error);
      throw error;
    }
  };

  return { 
    marketplaceLoans, 
    userApplications, 
    loading, 
    submitLoanApplication,
    refetch: () => {
      fetchUserApplications();
      fetchMarketplaceLoans();
    }
  };
};
