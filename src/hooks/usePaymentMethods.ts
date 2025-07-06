
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface PaymentMethod {
  id: string;
  chama_id: string;
  method_type: 'till' | 'paybill' | 'phone';
  method_name: string;
  method_number: string;
  is_active: boolean;
  created_at: string;
}

export const usePaymentMethods = (chamaId: string) => {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && chamaId) {
      fetchPaymentMethods();
    }
  }, [user, chamaId]);

  const fetchPaymentMethods = async () => {
    try {
      const { data, error } = await supabase
        .from('chama_payment_methods')
        .select('*')
        .eq('chama_id', chamaId)
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching payment methods:', error);
        setError('Failed to load payment methods');
        return;
      }

      setPaymentMethods(data || []);
    } catch (error) {
      console.error('Unexpected error fetching payment methods:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    paymentMethods,
    loading,
    error,
    refetch: fetchPaymentMethods
  };
};
