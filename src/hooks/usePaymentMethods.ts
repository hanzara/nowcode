
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
      // For now, create default payment methods since the table doesn't exist in types yet
      const defaultPaymentMethods: PaymentMethod[] = [
        {
          id: '1',
          chama_id: chamaId,
          method_type: 'phone',
          method_name: 'Treasurer M-Pesa',
          method_number: '0705448355',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          chama_id: chamaId,
          method_type: 'till',
          method_name: 'Chama Till',
          method_number: '123456',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          chama_id: chamaId,
          method_type: 'paybill',
          method_name: 'Chama Paybill',
          method_number: '400200',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ];

      setPaymentMethods(defaultPaymentMethods);
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
