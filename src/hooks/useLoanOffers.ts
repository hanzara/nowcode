
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
      
      // Set up real-time subscription for loan offers
      const channel = supabase
        .channel('loan-offers-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'loan_offers'
          },
          (payload) => {
            console.log('Loan offer change detected:', payload);
            fetchOffers(); // Refresh offers when changes occur
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchOffers = async () => {
    try {
      // Fetch offers that are either made by the current user (investor) 
      // or on loan applications owned by the current user (borrower)
      const { data, error } = await supabase
        .from('loan_offers')
        .select(`
          *,
          loan_applications!inner(borrower_id)
        `)
        .or(`investor_id.eq.${user?.id},loan_applications.borrower_id.eq.${user?.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to flatten the structure
      const transformedData = data?.map(offer => ({
        id: offer.id,
        loan_application_id: offer.loan_application_id,
        investor_id: offer.investor_id,
        offered_amount: offer.offered_amount,
        offered_interest_rate: offer.offered_interest_rate,
        message: offer.message,
        status: offer.status,
        created_at: offer.created_at,
        updated_at: offer.updated_at
      })) || [];

      setOffers(transformedData);
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
      if (!user) {
        throw new Error('User must be authenticated to create offers');
      }

      const { error } = await supabase
        .from('loan_offers')
        .insert({
          investor_id: user.id,
          ...offerData,
          status: 'pending'
        });

      if (error) throw error;
      
      // Refresh offers after creating
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
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', offerId);

      if (error) throw error;
      
      // Refresh offers after updating
      await fetchOffers();
    } catch (error) {
      console.error('Error updating offer status:', error);
      throw error;
    }
  };

  return { 
    offers, 
    loading, 
    createOffer, 
    updateOfferStatus,
    refetch: fetchOffers
  };
};
