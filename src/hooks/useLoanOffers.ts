
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface LoanOffer {
  id: string;
  loan_application_id: string;
  investor_id: string;
  offered_amount: number;
  offered_interest_rate: number;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useLoanOffers = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState<LoanOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOffers();
    }
  }, [user]);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_offers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching loan offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOffer = async (offerData: {
    loan_application_id: string;
    offered_amount: number;
    offered_interest_rate: number;
    message?: string;
  }) => {
    try {
      const { error } = await supabase
        .from('loan_offers')
        .insert({
          investor_id: user?.id,
          ...offerData
        });

      if (error) throw error;
      await fetchOffers();
    } catch (error) {
      console.error('Error creating loan offer:', error);
      throw error;
    }
  };

  const updateOfferStatus = async (offerId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('loan_offers')
        .update({ status })
        .eq('id', offerId);

      if (error) throw error;
      await fetchOffers();
    } catch (error) {
      console.error('Error updating offer status:', error);
      throw error;
    }
  };

  return { offers, loading, createOffer, updateOfferStatus };
};
