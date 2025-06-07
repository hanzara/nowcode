
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loan } from '@/hooks/useLoans';

interface MarketplaceLoansDisplayProps {
  marketplaceLoans: Loan[];
  loading: boolean;
}

const MarketplaceLoansDisplay: React.FC<MarketplaceLoansDisplayProps> = ({
  marketplaceLoans,
  loading
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Available Loans</CardTitle>
        <CardDescription>Browse loans available in the marketplace</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading marketplace loans...</div>
        ) : marketplaceLoans.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No loans available in the marketplace.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {marketplaceLoans.map((loan) => (
              <div key={loan.id} className="border rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount</span>
                    <span className="font-medium">{loan.amount} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Interest Rate</span>
                    <span className="font-medium">{loan.interest_rate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Duration</span>
                    <span className="font-medium">{loan.duration_months} months</span>
                  </div>
                  {loan.collateral_required && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Collateral</span>
                      <span className="font-medium text-xs">{loan.collateral_required}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketplaceLoansDisplay;
