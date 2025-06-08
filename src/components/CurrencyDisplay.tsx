import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { RefreshCw } from 'lucide-react';

interface CurrencyDisplayProps {
  amount: number;
  currency?: 'USD' | 'KES';
  showToggle?: boolean;
  defaultCurrency?: 'USD' | 'KES';
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ 
  amount, 
  currency,
  showToggle = true, 
  defaultCurrency = 'KES' 
}) => {
  const { convertUSDToKES, convertKESToUSD, formatCurrency, rates, loading, refreshRates } = useExchangeRate();
  const [displayCurrency, setDisplayCurrency] = useState<'USD' | 'KES'>(defaultCurrency);

  // If currency is specified, use that directly
  if (currency) {
    return (
      <span className="font-medium">
        {formatCurrency(amount, currency)}
      </span>
    );
  }

  // Otherwise, treat amount as KES and allow conversion
  const usdAmount = convertKESToUSD(amount);
  const displayAmount = displayCurrency === 'KES' ? amount : usdAmount;

  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium">
        {formatCurrency(displayAmount, displayCurrency)}
      </span>
      
      {showToggle && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDisplayCurrency(displayCurrency === 'KES' ? 'USD' : 'KES')}
          className="text-xs h-6 px-2"
        >
          {displayCurrency === 'KES' ? 'Show USD' : 'Show KES'}
        </Button>
      )}
      
      {displayCurrency === 'USD' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshRates}
          disabled={loading}
          className="h-6 w-6 p-0"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
        </Button>
      )}
    </div>
  );
};

export default CurrencyDisplay;
