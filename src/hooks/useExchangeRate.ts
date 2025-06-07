import { useState, useEffect } from 'react';

interface ExchangeRates {
  USD_KES: number;
  lastUpdated: Date;
}

export const useExchangeRate = () => {
  const [rates, setRates] = useState<ExchangeRates>({
    USD_KES: 129.5, // Default rate as fallback
    lastUpdated: new Date()
  });
  const [loading, setLoading] = useState(false);

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      // In a real app, you'd fetch from a currency API
      // For demo purposes, using a mock rate with some variation
      const mockRate = 129.5 + (Math.random() - 0.5) * 2; // Simulate rate fluctuation
      
      setRates({
        USD_KES: mockRate,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Keep existing rates on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    // Update rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const convertUSDToKES = (usdAmount: number): number => {
    return usdAmount * rates.USD_KES;
  };

  const convertKESToUSD = (kesAmount: number): number => {
    return kesAmount / rates.USD_KES;
  };

  const formatCurrency = (amount: number, currency: 'USD' | 'KES' = 'USD'): string => {
    if (currency === 'KES') {
      return `KSh ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return {
    rates,
    loading,
    convertUSDToKES,
    convertKESToUSD,
    formatCurrency,
    refreshRates: fetchExchangeRates
  };
};
