
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { RefreshCw } from 'lucide-react';

interface CurrencyDisplayProps {
  usdAmount: number;
  showToggle?: boolean;
  defaultCurrency?: 'USD' | 'KES';
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ 
  usdAmount, 
  showToggle = true, 
  defaultCurrency = 'USD' 
}) => {
  const { convertUSDToKES, formatCurrency, rates, loading, refreshRates } = useExchangeRate();
  const [displayCurrency, setDisplayCurrency] = useState<'USD' | 'KES'>(defaultCurrency);

  const kesAmount = convertUSDToKES(usdAmount);
  const displayAmount = displayCurrency === 'USD' ? usdAmount : kesAmount;

  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium">
        {formatCurrency(displayAmount, displayCurrency)}
      </span>
      
      {showToggle && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDisplayCurrency(displayCurrency === 'USD' ? 'KES' : 'USD')}
          className="text-xs h-6 px-2"
        >
          {displayCurrency === 'USD' ? 'Show KES' : 'Show USD'}
        </Button>
      )}
      
      {displayCurrency === 'KES' && (
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
