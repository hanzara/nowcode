
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
}

export const useLoans = () => {
  const { user } = useAuth();
  const [marketplaceLoans, setMarketplaceLoans] = useState<Loan[]>([]);
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
      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .eq('status', 'available')
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
      console.error('Error fetching user applications:', error);
    }
  };

  const submitLoanApplication = async (applicationData: {
    amount: number;
    interest_rate: number;
    duration_months: number;
    collateral: string;
    monthly_payment: number;
    total_payment: number;
  }) => {
    try {
      const { error } = await supabase
        .from('loan_applications')
        .insert({
          borrower_id: user?.id,
          ...applicationData
        });

      if (error) throw error;
      await fetchUserApplications();
    } catch (error) {
      console.error('Error submitting loan application:', error);
      throw error;
    }
  };

  return { marketplaceLoans, userApplications, loading, submitLoanApplication };
};
